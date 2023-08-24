/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, FormRangePicker, HeaderSearch, FormSelect } from 'Components'
import { useLoadContractPlan, useCompanyManagement } from 'Hooks'
import { Row, Col } from 'antd'
import { COMPANY_TYPES_ALL, DEFAULT_PAG } from 'Utils'
import { REGEX } from 'Constants'

const FilterBlock = ({ t, isReloadTable, setFilterDownloadCSV, limit }) => {
  const { contractPlanData } = useLoadContractPlan()
  const { loadCompanyListAction, filter, resetCompaniesManagementAction } = useCompanyManagement()

  const form = useForm()
  const { handleSubmit, reset, setValue, watch, getValues } = form
  const [
    companyStatusWatch,
    registrationDateWatch,
    lastLoginWatch,
    planNameWatch,
    companyNameWatch,
    mailCompanyWatch,
    companyCodeWatch,
    companyCodeSerakuWatch
  ] = watch(['companyStatus', 'registrationDate', 'lastLogin', 'planName', 'companyName', 'mailCompany', 'companyCode', 'companyCodeSeraku'])

  const COMPANY_STATUS = useMemo(() => (COMPANY_TYPES_ALL.map((m) => ({ ...m, label: t(m.label) }))), [t])

  useEffect(() => {
    const indexCompanyStatus = COMPANY_STATUS.findIndex((item) => item.value === companyStatusWatch?.value)
    setValue('companyStatus', COMPANY_STATUS[indexCompanyStatus])
  }, [t])

  const onSubmit = useCallback((formData) => {
    const { registrationDate, lastLogin, companyStatus, planName, companyName, mailCompany, companyCode, companyCodeSeraku, ...data } = formData
    const [beforeCreatedAt, afterCreatedAt] = registrationDate || []
    const [beforeLastLogin, afterLastLogin] = lastLogin || []
    data.beforeCreatedAt = beforeCreatedAt ? new Date(beforeCreatedAt?.valueOf()).setUTCHours(0, 0, 0, 0) : 0
    data.afterCreatedAt = afterCreatedAt ? new Date(afterCreatedAt?.valueOf()).setUTCHours(23, 59, 59, 999) : 0
    data.beforeLastLogin = beforeLastLogin ? new Date(beforeLastLogin?.valueOf()).setUTCHours(0, 0, 0, 0) : 0
    data.afterLastLogin = afterLastLogin ? new Date(afterLastLogin?.valueOf()).setUTCHours(23, 59, 59, 999) : 0
    data.planName = planName?.label
    data.companyStatus = companyStatus?.value
    data.companyName = companyName?.trim() || null
    data.mailCompany = mailCompany?.trim() || null
    data.companyCode = companyCode?.trim() || null
    data.companyCodeSeraku = companyCodeSeraku || null
    loadCompanyListAction({ params: { page: DEFAULT_PAG.page, limit, filter: { ...data } } })
  }, [limit])

  const filterCSV = useMemo(() => ({
    beforeCreatedAt: getValues('registrationDate') ? new Date(getValues('registrationDate')[0]?.valueOf()).setUTCHours(0, 0, 0, 0) : 0,
    afterCreatedAt: getValues('registrationDate') ? new Date(getValues('registrationDate')[1]?.valueOf()).setUTCHours(23, 59, 59, 999) : 0,
    beforeLastLogin: getValues('lastLogin') ? new Date(getValues('lastLogin')[0]?.valueOf()).setUTCHours(0, 0, 0, 0) : 0,
    afterLastLogin: getValues('lastLogin') ? new Date(getValues('lastLogin')[1]?.valueOf()).setUTCHours(23, 59, 59, 999) : 0,
    planName: getValues('planName')?.label,
    companyStatus: getValues('companyStatus')?.value,
    companyName: getValues('companyName')?.trim() || null,
    companyCode: getValues('companyCode')?.trim() || null,
    mailCompany: getValues('mailCompany')?.trim() || null,
    companyCodeSeraku: getValues('companyCodeSeraku') || null
  }),
  [companyStatusWatch,
    registrationDateWatch,
    lastLoginWatch,
    planNameWatch,
    companyNameWatch,
    mailCompanyWatch,
    companyCodeWatch,
    companyCodeSerakuWatch
  ])

  useEffect(() => { setFilterDownloadCSV(filterCSV) }, [filterCSV])

  const handleReset = useCallback(() => {
    reset({
      companyStatus: null,
      planName: null
    })
    resetCompaniesManagementAction()
  }, [])

  useEffect(() => {
    if (isReloadTable) {
      handleSubmit(onSubmit)()
      setFilterDownloadCSV({ ...filter })
    }
  }, [isReloadTable])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleReset} onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={24}>
          <Col span={12}>
            <FormInput
              name="companyName"
              label={t('company_name')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="companyCode"
              label={t('common:company_code_v2')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
            />
          </Col>

          <Col span={12}>
            <FormInput
              name="mailCompany"
              label={t('common:email')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="companyCodeSeraku"
              label={t('myCompany:company_code_seraku')}
              maxLength={18}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
              onChange={(e) => setValue('companyCodeSeraku', e.target.value.replace(REGEX.SERAKU_CODE, ''))}
            />
          </Col>
          <Col span={12}>
            <FormRangePicker
              t={t}
              name="registrationDate"
              label={t('registration_date')}
              allowEmpty={[true, true]}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormRangePicker
              t={t}
              name="lastLogin"
              label={t('last_login_date')}
              allowEmpty={[true, true]}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormSelect
              t={t}
              name="planName"
              label={t('contract_plan')}
              isSearchable={false}
              options={contractPlanData}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormSelect
              t={t}
              name="companyStatus"
              label={t('company_status')}
              options={COMPANY_STATUS}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
            />
          </Col>
        </Row>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
