import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BlockOutlined, CloseCircleOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { FormInput, FormTextArea, Title } from 'Components'
import { Wrapper, TBody, Tr, Th, Td, Block, Right } from 'Themes/facit'
import { Button, Spin, Modal } from 'antd'
import { useCompanyWaitingDetail, useHistories } from 'Hooks'
import RoutesName from 'Routes/constant'
import { FORMAT_TIME, NOT_FOUND_VALUE } from 'Constants'
import { formatDate } from 'Utils'
import moment from 'moment'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { StyledButtons, StyledEditMemoWrapper, StyledTableInfo } from './styled'
import Schema from './Schema'

export const SUBMIT_TYPES = {
  APPROVED: 1,
  DRAFT: 2,
  REFUSED: 3
}

const CompanyWaitingDetailScreen = () => {
  const { t, i18n } = useTranslation(['company'])
  const { confirm } = Modal
  const history = useHistories()
  const { data, isLoading, isUpdating, updateStatusType, companyId, updateStatusForCompanyWaitingAction, getCompanyWaitingDetailAction } = useCompanyWaitingDetail()
  const [isEditMemo, setIsEditMemo] = useState(false)

  const formMethods = useForm({
    resolver: yupResolver(Schema(t))
  })
  const { handleSubmit, setError, formState: { errors }, clearErrors, setValue, reset } = formMethods

  const onNavigateToList = () => {
    history.push(RoutesName.COMPANY_WAITING)
  }
  const showConfirmModal = (callback) => {
    confirm({
      title: t('waiting.warning_approve_and_refused_message'),
      icon: <ExclamationCircleFilled />,
      cancelText: t('common:cancel'),
      onOk() {
        callback()
      }
    })
  }

  useEffect(() => {
    clearErrors()
  }, [i18n.language])

  useEffect(() => {
    const { companyCodeSeraku, memo } = data
    reset({ companyCodeSeraku: companyCodeSeraku || '', memo: memo || ''	})
  }, [data.memo, data.companyCodeSeraku])

  const onSubmitMapping = {
    [SUBMIT_TYPES.APPROVED]: ({ formData, onSubmit }) => {
      if (!formData.companyCodeSeraku) {
        setError('companyCodeSeraku', {
          type: 'required',
          message: t('error_message:validation.required', { key: t('waiting.companyCodeSeraku') })
        })
      } else {
        showConfirmModal(onSubmit)
      }
    },
    [SUBMIT_TYPES.DRAFT]: ({ onSubmit }) => {
      if (errors.companyCodeSeraku) {
        clearErrors('companyCodeSeraku')
      }
      onSubmit()
    },
    [SUBMIT_TYPES.REFUSED]: ({ onSubmit }) => {
      if (errors.companyCodeSeraku) {
        clearErrors('companyCodeSeraku')
      }
      showConfirmModal(onSubmit)
    }
  }

  const onSubmit = (type) => (formData) => {
    const newFormData = { ...formData, email: data.email, isApproved: type }
    onSubmitMapping[type]({
      formData: newFormData,
      onSubmit: () => {
        updateStatusForCompanyWaitingAction({
          data: newFormData,
          resolve: () => {
            setIsEditMemo(false)
            if ([SUBMIT_TYPES.APPROVED, SUBMIT_TYPES.REFUSED].includes(newFormData.isApproved)) {
              onNavigateToList()
            }

            if ([SUBMIT_TYPES.DRAFT].includes(newFormData.isApproved)) {
              getCompanyWaitingDetailAction({ companyId })
            }
          }
        })
      }
    })
  }

  return (
    <Wrapper>
      <Title icon={BlockOutlined} title={t('waiting_detail.title')} />
      <Block>
        <FormProvider {...formMethods}>
          <Spin spinning={isLoading}>
            <StyledTableInfo>
              <TBody>
                <Tr>
                  <Th>{t('myCompany:register_date')}</Th>
                  <Td colSpan={3}>{formatDate(moment.unix(data.createdAt / 1000), FORMAT_TIME.YEAR_MONTH_DATE) || NOT_FOUND_VALUE}</Td>
                </Tr>
                <Tr>
                  <Th>{t('paymentManager:manager.company_name')}</Th>
                  <Td style={{ width: '35%' }}>{data.companyName || NOT_FOUND_VALUE}</Td>
                  <Th>{t('myCompany:address')}</Th>
                  <Td style={{ width: '35%' }}>{data.address || NOT_FOUND_VALUE}</Td>
                </Tr>
                <Tr>
                  <Th>{t('myCompany:tel_phone')}</Th>
                  <Td style={{ width: '35%' }}>{data.cellPhoneNumber || NOT_FOUND_VALUE}</Td>
                  <Th>{t('myCompany:career_name')}</Th>
                  <Td style={{ width: '35%' }}>{data.careerName || NOT_FOUND_VALUE}</Td>
                </Tr>
                <Tr>
                  <Th>{t('user:register_user.note')}</Th>
                  <Td colSpan={3}>
                    <StyledEditMemoWrapper>
                      {isEditMemo
                        ? <FormTextArea rows={5} showTextCount name="memo" total={1000} />
                        : <div className="memo">{data.memo || NOT_FOUND_VALUE}</div>}
                      <Button
                        icon={isEditMemo ? <CloseCircleOutlined /> : <EditOutlined />}
                        onClick={() => setIsEditMemo((prev) => !prev)}
                      />
                    </StyledEditMemoWrapper>
                  </Td>
                </Tr>
                <Tr>
                  <Th>{t('waiting.companyCodeSeraku')}</Th>
                  <Td colSpan={3}>
                    <Right className="input">
                      <FormInput
                        name="companyCodeSeraku"
                        maxLength={50}
                        onChange={(e) => setValue('companyCodeSeraku', e.target.value.replace(/\s/g, ''))}
                      />
                    </Right>
                  </Td>
                </Tr>
              </TBody>
            </StyledTableInfo>
          </Spin>
        </FormProvider>
        <StyledButtons>
          <Button
            type="primary"
            loading={[SUBMIT_TYPES.APPROVED].includes(updateStatusType) && isUpdating}
            onClick={() => {
              setValue('isApproved', true)
              handleSubmit(onSubmit(SUBMIT_TYPES.APPROVED))()
            }}
          >{t('waiting.reviewAndApproveChanges')}
          </Button>
          <Button
            type="primary"
            loading={[SUBMIT_TYPES.DRAFT].includes(updateStatusType) && isUpdating}
            onClick={() => {
              setValue('isApproved', false)
              handleSubmit(onSubmit(SUBMIT_TYPES.DRAFT))()
            }}
          >{t('waiting.saveChangesAndPutThemOnHold')}
          </Button>
          <Button
            type="primary"
            loading={[SUBMIT_TYPES.REFUSED].includes(updateStatusType) && isUpdating}
            onClick={() => {
              setValue('isApproved', false)
              handleSubmit(onSubmit(SUBMIT_TYPES.REFUSED))()
            }}
          >{t('common:refuse')}
          </Button>
        </StyledButtons>
        <StyledButtons>
          <Button onClick={onNavigateToList}>{t('common:back')}</Button>
        </StyledButtons>
      </Block>
    </Wrapper>
  )
}

export default CompanyWaitingDetailScreen
