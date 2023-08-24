/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Col, Row } from 'antd'
import {
  FormInput,
  FormSelect,
  HeaderSearch
} from 'Components'
import { COMPANY_NAME, ID_NISSOKEN_COMPANY } from 'Constants'
import { SORT_BY_TYPE } from 'Constants/sorter'
import {
  useLoadCompanyAll
} from 'Hooks'
import { useTemplateManagement } from 'Hooks/template_management'
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { DEFAULT_PAG } from 'Utils'

const FilterBlock = ({ t, isSuperAdmin, setRowSelected }) => {
  const {
    getListTemplateAction,
    listTemplate: { pagination },
    resetStateAction
  } = useTemplateManagement()
  const { limit: pageSize } = pagination
  const { companyAll } = useLoadCompanyAll()
  const { companyOptions, idOfNissokenCompany } = companyAll

  const form = useForm({
    defaultValues: {
      title: '',
      email: '',
      signinId: '',
      companyId: {
        label: COMPANY_NAME.NISSOKEN,
        value: ID_NISSOKEN_COMPANY
      }
    }
  })
  const { handleSubmit, reset, setValue } = form

  const onSubmit = useCallback(({ title, email, companyId, signinId }) => {
    const filter = {
      title: title.trim(),
      email: email.trim(),
      signinId: signinId.trim(),
      companyId: isSuperAdmin && companyId?.value
    }

    getListTemplateAction({
      ...filter,
      page: 1,
      limit: pageSize,
      sortType: SORT_BY_TYPE.descend
    })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }, [pageSize])

  const handleCancel = useCallback(() => {
    reset({
      title: '',
      email: '',
      signinId: ''
    })
    resetStateAction()
  }, [])

  const handleSelectCompany = (company) => {
    setValue('companyId', company)
  }

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={24} style={{ minWidth: 900 }}>
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
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
              />
            </Col>
          )}
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
          <Col span={12}>
            <FormInput
              name="email"
              label={t('email')}
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
              name="title"
              label={t('title')}
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

export default FilterBlock
