/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, FormTreeSelect, HeaderSearch, FormSelect } from 'Components'
import { useReceiverEmail, useGroupAttribute } from 'Hooks'
import { Row, Col } from 'antd'

const DEFAULT_VALUE = {
  userName: '',
  email: '',
  group: [],
  attribute: [],
  signinId: ''
}

const FilterBlock = ({ t, setRowSelected, setSortInfo, isSuperAdmin, companyAll, listUserIds, setDataSource }) => {
  const { pagination, loadReceiverEmailAction } = useReceiverEmail()
  const { loadAttributesAction, loadGroupsAction, groups: groupOptions, attributes: attributesOptions } = useGroupAttribute()
  const { limit: pageSize } = pagination
  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll

  const form = useForm({
    defaultValues: DEFAULT_VALUE
  })
  const { handleSubmit, reset, setValue } = form

  const onSubmit = useCallback((formData) => {
    setDataSource([])
    const { userName, email, group, attribute, companyId, signinId } = formData
    const filter = {
      userName: userName.trim(),
      email: email.trim(),
      listDepartmentIds: group.map((item) => item.value),
      listAttributeIds: attribute.map((item) => item.value),
      companyId: isSuperAdmin && companyId?.value,
      signinId: signinId.trim()
    }
    loadReceiverEmailAction({
      params: {
        page: 1,
        limit: pageSize,
        filter
      },
      loadAll: isSuperAdmin
    })
  }, [pageSize])

  const handleReset = useCallback(() => {
    reset({
      ...DEFAULT_VALUE,
      companyId: isSuperAdmin && valueOfNissokenCompany
    })
    setSortInfo(null)
    if (!listUserIds.selectedRows.length) {
      setRowSelected({
        selectedRowKeys: [],
        selectedRows: []
      })
    }
    loadReceiverEmailAction({
      params: {
        page: 1,
        limit: 100,
        filter: {
          companyId: isSuperAdmin && idOfNissokenCompany
        },
        sort: {}
      },
      loadAll: isSuperAdmin
    })
    if (isSuperAdmin) {
      loadGroupsAction({ params: { companyId: idOfNissokenCompany } })
      loadAttributesAction({ params: { companyId: idOfNissokenCompany } })
    }
  }, [isSuperAdmin, valueOfNissokenCompany, listUserIds])

  const handleSelectCompany = useCallback((company) => {
    reset({
      ...DEFAULT_VALUE,
      companyId: company
    })
    loadGroupsAction({ params: { companyId: company.value } })
    loadAttributesAction({ params: { companyId: company.value } })
  }, [])

  useEffect(() => {
    if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
    }
  }, [isSuperAdmin, valueOfNissokenCompany])

  return (
    <FormProvider {...form}>
      <HeaderSearch
        onCancel={handleReset}
        onSubmit={handleSubmit(onSubmit)}
        popup
      >
        <Row className="form-group" gutter={24}>
          {isSuperAdmin && (
          <Col span={12}>
            <FormSelect
              label={t('company:company_name')}
              name="companyId"
              options={companyOptions}
              isClearable={false}
              onChange={handleSelectCompany}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
            />
          </Col>
          )}
          <Col span={12}>
            <FormInput
              name="userName"
              label={t('issue_permission:select_user.name')}
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
              name="email"
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
            <FormTreeSelect
              t={t}
              label={t('auto_assignment_course:target_group')}
              name="group"
              valueKey="departmentId"
              labelKey="name"
              options={groupOptions}
              multiple
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormTreeSelect
              t={t}
              label={t('auto_assignment_course:target_attribute')}
              name="attribute"
              valueKey="attributeId"
              labelKey="attributeName"
              options={attributesOptions}
              multiple
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
              name="signinId"
              label={t('common:loginId')}
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
