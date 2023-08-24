/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, FormSelect, HeaderSearch } from 'Components'
import { useLoadAutomaticAssignment } from 'Hooks'
import { Row, Col } from 'antd'

const FilterBlock = ({ t, setRowSelected, isSuperAdmin, companyAll, setCompanyId }) => {
  const { unitId } = useParams()
  const { loadAutomaticAssignmentAction, pagination, resetAutoAssignmentsAction } = useLoadAutomaticAssignment()
  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll

  const { limit } = pagination

  const form = useForm()
  const { handleSubmit, reset, setValue, watch } = form

  const onSubmit = useCallback((formData) => {
    const { assignmentName, companyId } = formData
    const data = { assignmentName: assignmentName?.trim(), companyId: companyId?.value }
    loadAutomaticAssignmentAction({
      params: {
        Page: 1,
        limit: limit || 100,
        filter: { ...data }
      }
    })
  }, [unitId, limit])
  const [
    companyId
  ] = watch([
    'companyId'
  ])
  const handleReset = () => {
    reset({
      assignmentName: '',
      companyId: valueOfNissokenCompany
    })
    resetAutoAssignmentsAction()
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }

  useEffect(() => {
    if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
      setCompanyId(1)
    }
  }, [valueOfNissokenCompany, isSuperAdmin])

  useEffect(() => {
    if (isSuperAdmin && companyId) {
      setCompanyId(companyId?.value || idOfNissokenCompany)
    }
  }, [companyId, isSuperAdmin])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleReset} onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={24} justify="center" style={{ minWidth: 900 }}>
          {isSuperAdmin && (
            <Col span={12}>
              <FormSelect
                label={t('company:company_name')}
                name="companyId"
                options={companyOptions}
                isClearable={false}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
              />
            </Col>
          )}
          <Col span={isSuperAdmin ? 12 : 16}>
            <FormInput
              name="assignmentName"
              label={t('auto_assignment_settings')}
              wrapperProps={{
                colon: false,
                labelCol: { span: isSuperAdmin ? 10 : 8 },
                wrapperCol: { span: isSuperAdmin ? 14 : 16 },
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
