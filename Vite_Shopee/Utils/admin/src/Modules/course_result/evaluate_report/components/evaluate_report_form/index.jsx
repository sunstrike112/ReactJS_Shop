/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AuditOutlined, MinusOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { evaluateReport, publicReport } from 'APIs'
import { Title, FormRadio, FormSelect, FormTextArea, FormUpload, Toast, PopupButton } from 'Components'
import { Table, TBody, Tr, Th, Td, Block } from 'Themes/facit'
import { useReportResult, useEnterKeyPress } from 'Hooks'
import { yupResolver } from '@hookform/resolvers/yup'

import { isEmpty } from 'lodash'
import { EVALUATION_STATUSES } from 'Modules/course_result/constant'
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { USER_ROLE } from 'Constants/auth'
import { ListButton } from './styled'
import EvaluateReportSchema from './schema'

const PUBLIC_STATUS = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC'
}

const EvaluateReportForm = ({
  report,
  created,
  isSuperAdmin
}) => {
  const { t } = useTranslation(['courseResult'])
  const { loadReportDetailAction } = useReportResult()
  const DEFAULT_VALUES = {
    submitStatus: null,
    point: report?.point,
    fileAttachFeedback: [{ pathFile: '' }],
    feedBack: ''
  }
  const [isPublicSuccess, setIsPublicSuccess] = useState(false)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
  const btnEvaluateRef = useRef(null)
  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(EvaluateReportSchema(t))
  })
  const { handleSubmit, control, setValue, clearErrors, watch, formState: { errors } } = form
  const [pointWatch] = watch(['point'])
  const { fields: fileAttachFeedback, append, remove } = useFieldArray({
    control,
    name: 'fileAttachFeedback'
  })

  const renderPoint = () => [...Array(101)].map((point, index) => ({
    value: index,
    label: index
  }))

  const initForm = useCallback(() => {
    setValue('submitStatus', report.submitStatus)
    if (report.point) {
      setValue('point', {
        value: report.point,
        label: report.point
      })
    } else {
      setValue('point', null)
    }
    if (report.fileAttachFeedback?.length > 0) {
      setValue('fileAttachFeedback', report.fileAttachFeedback.map((v) => ({ pathFile: { ...v } })))
    } else {
      setValue('fileAttachFeedback', [{
        pathFile: ''
      }])
    }
    setValue('feedBack', report.feedBack)
    clearErrors()
  }, [report])
  useEnterKeyPress(btnEvaluateRef)
  useEffect(() => {
    if (!isEmpty(report)) {
      initForm()
    }
  }, [report])

  useEffect(() => {
    clearErrors()
  }, [t])

  const renderAttachFile = () => fileAttachFeedback.map((field, index) => (
    <>
      <Tr>
        <Th>{t('attach_file', { value: index + 1 })}</Th>
        <Td>
          <div style={{ marginTop: 8 }} key={field.id}>
            <FormUpload
              t={t}
              acceptFormat="*"
              name={`fileAttachFeedback.${index}.pathFile`}
              maxCount={1}
              disabled={isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(created)}
            />
            <p>
              {t('common:require_file', {
                fileSize: '10MB'
              })}
            </p>
          </div>
          <Space style={{ marginTop: 8 }}>
            {fileAttachFeedback.length > 1 && (
              <Button
                htmlType="button"
                type="primary"
                onClick={() => remove(index)}
              >
                <MinusOutlined />
              </Button>
            )}
            {fileAttachFeedback.length < 5 && (
              <Button
                htmlType="button"
                type="primary"
                onClick={() => append({ pathFile: '' })}
                disabled={isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(created)}
              >
                <PlusOutlined />
              </Button>
            )}
          </Space>
        </Td>
      </Tr>
    </>
  ))

  const onSubmit = useCallback(
    async (formData) => {
      const params = {
        listAttachFile: formData.fileAttachFeedback
          .filter((file) => file.pathFile)
          .map(({ pathFile }) => {
            const { fileName, socialPath, type } = pathFile
            return ({
              fileName,
              socialPath,
              type
            })
          }),
        userId: report.userId,
        courseId: report.courseId,
        reportId: report.reportId,
        reportStatus: formData.submitStatus,
        point: formData.point ? formData.point.value : null,
        feedback: formData.feedBack
      }
      const data = await evaluateReport({ params })
      if (data.code === 200) {
        loadReportDetailAction({ courseId: report.courseId, userId: report.userId, reportId: report.reportId })
        setIsSubmitSuccess(true)
        setTimeout(() => {
          setIsSubmitSuccess(false)
        }, 3000)
      }
    },
    [report]
  )

  const handlePublicReport = async () => {
    const params = {
      userId: report.userId,
      courseId: report.courseId,
      reportId: report.reportId,
      publicStatus: PUBLIC_STATUS.PUBLIC
    }
    const data = await publicReport({ params })
    if (data.code === 200) {
      setIsPublicSuccess(true)
      setTimeout(() => {
        setIsPublicSuccess(false)
      }, 3000)
    }
  }

  return (
    <>
      <Title icon={AuditOutlined} title={t('evaluation')} />
      <Block>
        <FormProvider {...form}>
          <Table>
            <TBody>
              <Tr>
                <Th>{t('evaluationStatus')}</Th>
                <Td>
                  <FormRadio name="submitStatus" t={t} options={EVALUATION_STATUSES.filter((status) => status.value && status.value !== 'NEW')} />
                </Td>
              </Tr>
              <Tr>
                <Th>{t('point_title')}</Th>
                <Td style={{ display: 'flex' }}>
                  <div style={{ width: 150 }}>
                    <FormSelect
                      name="point"
                      className="point"
                      defaultValue={report?.point}
                      options={renderPoint()}
                      isClearable={pointWatch?.value !== null}
                    />
                  </div>
                  <div style={{ marginLeft: 10, paddingTop: 10 }}>{t('point')}</div>
                </Td>
              </Tr>
              {renderAttachFile()}
              <Tr>
                <Th>{t('feedBack')}</Th>
                <Td>
                  <FormTextArea
                    name="feedBack"
                    Trs={4}
                    total={4000}
                  />
                </Td>
              </Tr>
            </TBody>
          </Table>
          <ListButton>
            <PopupButton
              icon={EditOutlined}
              titlePopup={t('submit_confirm')}
              textButton={t('evaluate')}
              onConfirm={handleSubmit(onSubmit)}
              disabled={!isEmpty(errors) || (isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(created))}
              refElement={btnEvaluateRef}
            />
            {/* <PopupButton
              icon={EditOutlined}
              titlePopup={t('public_confirm')}
              textButton={t('public_report')}
              onConfirm={handlePublicReport}
            /> */}
          </ListButton>
        </FormProvider>
      </Block>
      <Toast
        content={t('public_success')}
        type="success"
        isShow={isPublicSuccess}
        duration={3}
      />
      <Toast
        content={t('submit_success')}
        type="success"
        isShow={isSubmitSuccess}
        duration={3}
      />
    </>
  )
}

export default EvaluateReportForm
