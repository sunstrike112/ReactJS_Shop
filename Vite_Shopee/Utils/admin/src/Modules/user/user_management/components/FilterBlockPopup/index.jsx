/* eslint-disable react/prop-types */
import { Col, Row } from 'antd'
import { FormInput, FormSelect, FormTreeSelect, HeaderSearch } from 'Components'
import React, { useCallback, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const FilterBlock = ({
  t,
  loadUsersAction,
  loadGroupsAction,
  loadAttributesAction,
  groupsOption,
  attributesOption,
  pageSize,
  companies,
  companyIdChange,
  setCompanyIdChange
}) => {
  const form = useForm({
    defaultValues: {
      group: [],
      attribute: [],
      companyId: {
        label: companies[0]?.companyName,
        value: companies[0]?.companyId
      },
      signinId: ''
    }
  })

  const { handleSubmit, reset, watch, setValue } = form
  const [companyId] = watch(['companyId'])
  useEffect(() => {
    setCompanyIdChange(companyId.value)
  }, [companyId])
  const onSubmit = (formData) => {
    const { group, attribute, fullname, email, signinId } = formData
    const filter = {
      departmentIdList: group.map((item) => item.value),
      attributeIdList: attribute.map((item) => item.value),
      fullname,
      email,
      signinId: signinId.trim()
    }
    loadUsersAction({
      params: {
        filter: {
          ...filter,
          companyId: formData.companyId.value
        },
        page: 1,
        limit: pageSize,
        flagRegister: true
      }
    })
  }

  const handleCancel = useCallback(() => {
    reset({
      fullname: '',
      email: '',
      group: [],
      attribute: [],
      companyId: {
        label: companies[0]?.companyName,
        value: companies[0]?.companyId
      },
      signinId: ''
    })
    loadUsersAction({
      params: {
        page: 1,
        limit: 100,
        flagRegister: true,
        companyId: companies[0]?.companyId,
        filter: {}
      }
    })
  }, [])

  useEffect(() => {
    loadAttributesAction({ params: { companyId: companyIdChange, flagRegister: true } })
    loadGroupsAction({ params: { companyId: companyIdChange, flagRegister: true } })
    setValue('group', [])
    setValue('attribute', [])
  }, [companyIdChange])
  const companiesOption = useMemo(() => companies
    .filter((item) => !!item.companyName)
    .map((item) => ({
      label: item.companyName,
      value: item.companyId
    })), [companies])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <Row className="form-group" gutter={24}>
          <Col span={12}>
            <FormSelect
              t={t}
              name="companyId"
              label={t('management.company_name')}
              placeholder={null}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right',
                wrapperCol: { span: 16 }
              }}
              defaultValue={companiesOption[0]}
              options={companiesOption}
              isClearable={false}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="fullname"
              label={t('management.name_filter')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="email"
              label={t('management.email_filter')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormTreeSelect
              t={t}
              name="group"
              valueKey="departmentId"
              labelKey="name"
              options={groupsOption}
              label={t('management.group')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right',
                wrapperCol: { span: 16 }
              }}
              multiple
            />
          </Col>
          <Col span={12}>
            <FormTreeSelect
              t={t}
              name="attribute"
              valueKey="attributeId"
              labelKey="attributeName"
              options={attributesOption}
              label={t('management.attribute')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right',
                wrapperCol: { span: 16 }
              }}
              multiple
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="signinId"
              label={t('common:loginId')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
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
