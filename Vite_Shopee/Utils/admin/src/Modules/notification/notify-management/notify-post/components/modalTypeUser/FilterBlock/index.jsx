/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import {
  FormInput,
  FormTreeSelect,
  FormSelect,
  HeaderSearch
} from 'Components'
import { Row, Col } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'
import { useRoles, useLoadCompanyAll, useGroupAttribute } from 'Hooks'

const FilterBlock = ({ t, listUserAction, setRowSelected, lstUserId }) => {
  const { loadAttributesAction, loadGroupsAction, groups: listGroup, attributes: listAttribute } = useGroupAttribute()
  const { isSuperAdmin, isAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()
  const { idOfNissokenCompany, companyOptions, valueOfNissokenCompany } = companyAll

  const defaultValues = {
    name: '',
    email: '',
    listGroupIds: [],
    listAtrributeIds: [],
    companyId: valueOfNissokenCompany,
    signinId: ''
  }
  const form = useForm({ defaultValues })

  const { handleSubmit, reset, setValue } = form

  const onSubmitSearch = (data) => {
    const filter = {
      userName: data.userName.trim(),
      userEmail: data.userEmail.trim(),
      lstGroup: data.listGroupIds.map((elm) => elm.value),
      lstAttribute: data.listAtrributeIds.map((elm) => elm.value),
      companyId: (isSuperAdmin || isAdmin) && data?.companyId?.value,
      signinId: data.signinId.trim()
    }
    listUserAction({
      params: {
        limit: 100,
        page: 1,
        ...filter
      },
      loadAll: isSuperAdmin || isAdmin
    })
  }

  const handleCancel = () => {
    reset(defaultValues)
    if (isSuperAdmin || isAdmin) {
      listUserAction({
        params: {
          limit: 100,
          page: 1,
          companyId: defaultValues.companyId.value
        },
        loadAll: true
      })
    } else {
      listUserAction({
        params: {
          limit: 100,
          page: 1
        }
      })
    }
  }

  const handleSetDefaultValue = () => {
    setValue('companyId', valueOfNissokenCompany)
  }
  useEffect(() => {
    if (isSuperAdmin || isAdmin) {
      handleSetDefaultValue()
    }
  }, [companyAll, isSuperAdmin, isAdmin])

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter') {
        event.preventDefault()
        handleSubmit(onSubmitSearch)()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  })

  useEffect(() => {
    if (isSuperAdmin || isAdmin) {
      loadGroupsAction({ params: { companyId: isSuperAdmin && idOfNissokenCompany } })
      loadAttributesAction({ params: { companyId: isSuperAdmin && idOfNissokenCompany } })
      listUserAction({
        params: {
          limit: 100,
          page: 1,
          companyId: idOfNissokenCompany
        },
        loadAll: isSuperAdmin || isAdmin
      })
    } else {
      loadGroupsAction({ params: { companyId: '' } })
      loadAttributesAction({ params: { companyId: '' } })
      listUserAction({
        params: {
          limit: 100,
          page: 1,
          companyId: idOfNissokenCompany
        }
      })
    }
  }, [isSuperAdmin, isAdmin])

  const handleSelectCompany = (company) => {
    setValue('companyId', company)
    setValue('listGroupIds', [])
    setValue('listAtrributeIds', [])
    loadGroupsAction({ params: { companyId: company?.value } })
    loadAttributesAction({ params: { companyId: company?.value } })
  }

  return (
    <FormProvider {...form}>
      <HeaderSearch
        onCancel={handleCancel}
        onSubmit={handleSubmit(onSubmitSearch)}
      >
        <Row gutter={24}>
          {(isSuperAdmin || isAdmin) && (
          <Col span={12}>
            <FormSelect
              label={t('company:company_name')}
              name="companyId"
              options={companyOptions}
              onChange={handleSelectCompany}
              isClearable={false}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right'
              }}
            />
          </Col>
          )}
          <Col span={12}>
            <FormInput
              name="userEmail"
              label={t('post.create.email')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="userName"
              label={t('post.name')}
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
              name="listAtrributeIds"
              valueKey="attributeId"
              labelKey="attributeName"
              options={listAttribute}
              label={t('post.attribute')}
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
              name="listGroupIds"
              valueKey="departmentId"
              labelKey="name"
              options={listGroup}
              label={t('post.group')}
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
