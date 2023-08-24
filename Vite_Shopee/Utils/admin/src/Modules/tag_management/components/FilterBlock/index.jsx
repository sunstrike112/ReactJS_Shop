/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Col, Row } from 'antd'
import { FormInput, FormSelect, HeaderSearch } from 'Components'
import { COMPANY_NAME } from 'Constants/course'
import { useLoadCompanyAll, useTagManagement } from 'Hooks'
import { identity, pickBy } from 'lodash'
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { DEFAULT_PAG } from 'Utils'

const FilterBlock = ({ t, getListTagApi, isSuperAdmin }) => {
  const { listTag: { pagination }, resetStateAction } = useTagManagement()
  const { limit: pageSize, page } = pagination
  const { companyAll } = useLoadCompanyAll()
  const { companyOptions, idOfNissokenCompany } = companyAll

  const form = useForm({
    defaultValues: {
      name: '',
      companyId: {
        label: COMPANY_NAME.NISSOKEN,
        value: 1
      }
    }
  })
  const { handleSubmit, reset, setValue } = form

  const onSubmit = useCallback(({ name, companyId }) => {
    const filter = pickBy({
      name: name.trim(),
      companyId: isSuperAdmin && companyId?.value
    }, identity)
    getListTagApi({
      ...filter,
      page: DEFAULT_PAG.page,
      limit: pageSize
    })
  }, [pageSize])

  const handleCancel = useCallback(() => {
    reset({ name: '' })
    resetStateAction()
  }, [])

  const handleSelectCompany = (company) => {
    setValue('companyId', company)
    setValue('name', '')
  }

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <Row justify="center" gutter={24} style={{ minWidth: 900 }}>
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
          <Col span={isSuperAdmin ? 12 : 16}>
            <FormInput
              name="name"
              label={t('tag_name')}
              wrapperProps={{
                colon: false
              }}
            />
          </Col>
        </Row>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
