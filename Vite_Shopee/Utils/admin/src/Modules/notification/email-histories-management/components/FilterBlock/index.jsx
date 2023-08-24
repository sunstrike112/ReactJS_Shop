import React, { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, FormSelect, HeaderSearch, FormRangePickerV2 } from 'Components'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { pickBy, identity } from 'lodash'
import moment from 'moment'

const FilterBlock = ({ t, loadSendHistoryAction, pageSize, isSuperAdmin, companyAll, resetEmailHistoriesAction }) => {
  const POST_OPTION = [
    { label: t('management.SENDING'), value: 'SENDING' },
    { label: t('management.DONE'), value: 'DONE' },
    { label: t('common:error'), value: 'ERROR' }
  ]

  const { companyOptions, valueOfNissokenCompany } = companyAll

  const defaultValues = {
    emailSubject: '',
    senderName: '',
    sendStatus: '',
    sendStartTime: null,
    sendEndTime: null,
    signinId: ''
  }
  const form = useForm({ defaultValues })
  const { handleSubmit, reset, setValue, watch } = form
  const [
    sendStartTime,
    sendEndTime
  ] = watch(['sendStartTime', 'sendEndTime'])

  const onSubmit = (formData) => {
    const { sendStatus, endPost, startPost, companyId, signinId, ...data } = formData
    const dataSearch = pickBy({
      ...data,
      companyId: companyId?.value,
      emailSubject: data?.emailSubject?.trim(),
      senderName: data?.senderName?.trim(),
      sendStartTime: moment(sendStartTime).startOf('day').valueOf(),
      sendEndTime: moment(sendEndTime).endOf('day').valueOf(),
      sendStatus: sendStatus?.value,
      signinId: signinId?.trim()
    }, identity)
    loadSendHistoryAction({
      params: {
        limit: pageSize,
        page: 1,
        filter: dataSearch
      }
    })
  }

  useEffect(() => {
    if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
    }
  }, [valueOfNissokenCompany, isSuperAdmin])

  const handleCancel = useCallback(() => {
    reset({
      ...defaultValues,
      companyId: valueOfNissokenCompany
    })
    resetEmailHistoriesAction()
  }, [valueOfNissokenCompany])

  const handleSelectCompany = useCallback((company) => {
    reset({
      ...defaultValues,
      companyId: company
    })
  }, [])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={24}>
          {isSuperAdmin && (
          <Col span={12}>
            <FormSelect
              label="company:company_name"
              name="companyId"
              options={companyOptions}
              isClearable={false}
              onChange={handleSelectCompany}
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
            />
          </Col>
          )}
          <Col span={12}>
            <FormInput
              name="emailSubject"
              label={t('management.subject')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormRangePickerV2
              setValue={setValue}
              startTimeName="sendStartTime"
              endTimeName="sendEndTime"
              startTime={sendStartTime}
              endTime={sendEndTime}
              label={t('management.send_date_and_time')}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="senderName"
              label={t('management.sender_name')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormSelect
              t={t}
              name="sendStatus"
              isSearchable={false}
              isClearable
              label={t('management.sending_status')}
              placeholder={null}
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
              options={POST_OPTION}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="signinId"
              label={t('common:loginId')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
            />
          </Col>
        </Row>
      </HeaderSearch>
    </FormProvider>
  )
}

FilterBlock.propTypes = {
  loadSendHistoryAction: PropTypes.func,
  pageSize: PropTypes.number,
  isSuperAdmin: PropTypes.bool,
  companyAll: PropTypes.object,
  resetEmailHistoriesAction: PropTypes.func
}

export default FilterBlock
