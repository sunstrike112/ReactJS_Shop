/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Space, Button, Skeleton } from 'antd'
import { EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { QUERY } from 'Constants'
import {
  useLoadReportDetail,
  useSettingQuestionReport,
  useLoadQuestionReport,
  useRoles,
  useHistories,
  useGetQuery
} from 'Hooks'
import { isEmpty } from 'lodash'
import {
  FormTextArea,
  FormUploadImage,
  Title,
  FormLabel,
  FormUploadV2,
  PopupButton
} from 'Components'
import {
  Divider,
  Wrapper
} from 'Themes/facit'
import { RoutesName } from 'Modules/course/routes'
import { getFileFromS3 } from 'Utils'
import {
  Row,
  Right,
  ContentUpload,
  ActionUpload
} from './styled'
import Schema from './schema'
import { SettingQuestionModal } from './components'

const ReportQuestionSettingScreen = () => {
  const { t } = useTranslation(['report_setting'])
  const history = useHistories()
  const { reportId } = useParams()

  const { queryWorkspaceID } = useGetQuery()
  const { isViewing, createBy } = useRoles()
  const { detailReport, loadReportDetailAction } = useLoadReportDetail()
  const { settingQuestionReportAction, isLoadingSettingQuestionReport } = useSettingQuestionReport()
  const { loadQuestionReportAction, reportQuestions } = useLoadQuestionReport()
  const { data: dataReport, isLoading } = detailReport

  const [visibleModal, setVisibleModal] = useState(false)

  const form = useForm({
    resolver: yupResolver(Schema(t))
  })

  const { handleSubmit, setValue, formState: { errors }, control } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fileList'
  })

  useEffect(() => {
    loadReportDetailAction({ reportId })
    loadQuestionReportAction({ reportId })
  }, [])

  const handleSetData = () => {
    setValue('overView', dataReport.overView || '')
    setValue('imageExplanation', getFileFromS3(dataReport.imagePath))
    if (dataReport.fileAttachOverview?.length) {
      setValue('fileList', dataReport.fileAttachOverview.map((item) => ({ pathFile: item })))
    } else {
      setValue('fileList', [{ pathFile: '' }])
    }
  }

  useEffect(() => {
    if (detailReport) {
      handleSetData()
    }
  }, [detailReport])

  const onSubmit = useCallback((formData) => {
    const { overView, imageExplanation, fileList } = formData
    const files = fileList
      .filter((item) => item.pathFile)
      .map(({ pathFile }) => ({ fileName: pathFile.fileName, socialPath: pathFile.socialPath, type: '' }))
    const data = { overView, imageExplanation, files }
    settingQuestionReportAction({ reportId, data, history, t, createBy })
  }, [])

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('unit_setting:question_setting.title')}
        backRoute={`${RoutesName.REPORT_DETAIL}/${reportId}?${QUERY.CREATE_BY}=${createBy}${queryWorkspaceID.CONNECT}`}
        backRouteText="report_setting:back_report_details"
      />
      <div className="form-wrapper">
        <form>
          <FormProvider {...form}>
            <Row>
              <FormLabel title={t('detail.overview')} />
              <Right>
                <FormTextArea
                  name="overView"
                  rows={4}
                  total={4000}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('detail.image_explain')} />
              <Right>
                <FormUploadImage t={t} name="imageExplanation" />
                <p>
                  {t('common:require_image_size_and_type', {
                    imgSize: '10MB',
                    imgType: '(jpg, gif, png)'
                  })}
                </p>
              </Right>
            </Row>
            <Divider />
            {
            fields.map((field, index) => (
              <div key={field.id}>
                <Row>
                  <FormLabel title={t('detail.file_explain')} />
                  <Right className="upload__file">
                    <ContentUpload>
                      <Skeleton active loading={isLoading}>
                        <FormUploadV2 name={`fileList.${index}.pathFile`} maxCount={1} />
                      </Skeleton>
                      <p>
                        {t('common:require_file', {
                          fileSize: '10MB'
                        })}
                      </p>
                    </ContentUpload>
                    {index === fields.length - 1
                    && (
                      <ActionUpload>
                        <Space style={{ marginTop: '10px' }}>
                          {fields.length > 1
                          && (
                            <Button
                              htmlType="button"
                              type="primary"
                              onClick={() => remove(fields.length - 1)}
                            >
                              <MinusOutlined />
                            </Button>
                          )}
                          {fields.length < 5
                          && (
                            <Button
                              htmlType="button"
                              type="primary"
                              onClick={() => append({ pathFile: '' })}
                            >
                              <PlusOutlined />
                            </Button>
                          )}
                        </Space>
                      </ActionUpload>
                    )}
                  </Right>
                </Row>
                <Divider />
              </div>
            ))
          }
            <Row>
              <FormLabel title={t('detail.question_to_set')} />
              <Right className="question__setting">
                <Button
                  size="large"
                  onClick={() => setVisibleModal(true)}
                >
                  <EditOutlined />
                  {t(isViewing ? 'common:view_question' : 'detail.handle_change_question')}
                </Button>
                <span style={{ marginLeft: 10 }}>
                  {t('detail.question_are_setting', { number: reportQuestions.length })}
                </span>
              </Right>
            </Row>
            <Divider />
            <div className="form-action-group">
              <PopupButton
                icon={EditOutlined}
                titlePopup={t('common:popup_confirm',
                  { key: t('unit_setting:question_setting.title') })}
                onConfirm={handleSubmit(onSubmit)}
                textButton={t('common:button_setup')}
                okText="common:button_setup"
                disabled={!isEmpty(errors)
                  || isLoadingSettingQuestionReport
                  || isViewing}
                isLoading={isLoadingSettingQuestionReport}
              />
            </div>
          </FormProvider>
        </form>
      </div>
      {visibleModal && (
        <SettingQuestionModal
          t={t}
          visible={visibleModal}
          setVisible={setVisibleModal}
          reportId={reportId}
          isViewing={isViewing}
        />
      )}
    </Wrapper>
  )
}

export default ReportQuestionSettingScreen
