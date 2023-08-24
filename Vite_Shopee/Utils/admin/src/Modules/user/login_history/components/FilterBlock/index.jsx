/* eslint-disable react/prop-types */
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Row, Col } from 'antd'
import { pickBy, identity } from 'lodash'
import moment from 'moment'
import { useLoadCompanyAll, useRoles } from 'Hooks'

import { FormRangePickerV2, FormInput, HeaderSearch, FormSelect } from 'Components'
import { DEFAULT_PAG } from 'Utils'

const DEFAULT_VALUE = {
  email: '',
  ip: '',
  fromDate: null,
  toDate: null,
  siginId: ''
}

const FilterBlock = ({ t, loadLoginHistoriesAction, resetLoginHistoriesAction, pageSize }) => {
  const { isSuperAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll({ params: { flagRegister: false } })
  const { companyOptions, valueOfNissokenCompany } = companyAll

  const form = useForm({
    defaultValues: {
      ...DEFAULT_VALUE,
      companyId: valueOfNissokenCompany
    }
  })

  const { handleSubmit, reset, setValue, watch } = form
  const [
    fromDate,
    toDate,
    companyId
  ] = watch(['fromDate', 'toDate', 'companyId'])

  const onSubmit = (formData) => {
    const filter = pickBy({
      ...formData,
      fromDate: moment(formData.fromDate).startOf('day').valueOf(),
      toDate: moment(formData.toDate).endOf('day').valueOf(),
      companyId: isSuperAdmin ? companyId.value : null,
      email: formData.email.trim(),
      ip: formData.ip.trim(),
      fullName: formData.fullName.trim(),
      signinId: formData.signinId.trim()
    }, identity)
    loadLoginHistoriesAction({
      params: {
        page: DEFAULT_PAG.page,
        limit: pageSize,
        filter
      }
    })
  }
  const handleCancel = () => {
    reset({ ...DEFAULT_VALUE, companyId: valueOfNissokenCompany })
    resetLoginHistoriesAction()
  }

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Row className="form-group" gutter={24} style={{ minWidth: 900 }}>
            {isSuperAdmin && (
              <Col span={12}>
                <FormSelect
                  label="company:company_name"
                  name="companyId"
                  options={companyOptions}
                  isClearable={false}
                  wrapperProps={{
                    colon: false,
                    labelCol: { span: 10 },
                    wrapperCol: { span: 16 },
                    labelAlign: 'right'
                  }}
                />
              </Col>
            )}
            <Col span={12}>
              <FormInput
                name="email"
                label={t('login_history_management.email')}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 16 },
                  labelAlign: 'right'
                }}
              />
            </Col>
            <Col span={12}>
              <FormInput
                name="ip"
                label={t('login_history_management.user_ip')}
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
                startTimeName="fromDate"
                endTimeName="toDate"
                startTime={fromDate}
                endTime={toDate}
                label={t('login_history_management.login_time')}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
              />
            </Col>
            <Col span={12}>
              <FormInput
                name="fullName"
                label={t('login_history_management.full_name')}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 16 },
                  labelAlign: 'right'
                }}
              />
            </Col>
            <Col span={12}>
              <FormInput
                name="signinId"
                label={t('common:loginId')}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 16 },
                  labelAlign: 'right'
                }}
              />
            </Col>
          </Row>
        </div>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
