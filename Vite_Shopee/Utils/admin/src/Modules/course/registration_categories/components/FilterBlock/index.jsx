/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
import { Col, Row } from 'antd'
import { FormInput, FormSelect, HeaderSearch } from 'Components'
import { useDispatch } from 'react-redux'

import React, { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRoles } from 'Hooks'
import { resetState } from '../../store/actions'

const FilterBlock = ({
  onSearch,
  page,
  limit,
  setRowSelected,
  isCreateSuccess,
  setIsCreateSuccess,
  companyAll,
  isWebviewMode
}) => {
  const dispatch = useDispatch()

  const { t } = useTranslation(['course_category'])
  const form = useForm()
  const { handleSubmit, reset, setValue } = form

  const { isSuperAdmin } = useRoles()
  const { companyOptions, valueOfNissokenCompany } = companyAll

  useEffect(() => {
    if (isCreateSuccess) {
      reset({
        query: '',
        companyId: valueOfNissokenCompany
      })
      setIsCreateSuccess(false)
    }
  }, [isCreateSuccess])

  useEffect(() => {
    if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
    }
  }, [companyAll, isSuperAdmin])

  const onSubmit = useCallback((data) => {
    const { query, companyId } = data
    dispatch(onSearch({
      params: {
        page: 1,
        limit,
        filter: {
          query: query.trim(),
          companyId: companyId?.value
        }
      }
    }))
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }, [page, limit])
  const handleCancel = useCallback(() => {
    reset({
      query: '',
      companyId: valueOfNissokenCompany
    })
    dispatch(resetState())
  }, [companyAll])

  return (
    <FormProvider {...form} onSubmit={onSubmit}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        {isWebviewMode ? (
          <Row gutter={24}>
            {isSuperAdmin && (
              <Col span={24}>
                <FormSelect
                  label={t('company:company_name')}
                  name="companyId"
                  options={companyOptions}
                  isClearable={false}
                />
              </Col>
            )}
            <Col span={24}>
              <FormInput
                label={t('course_category:search_label')}
                name="query"
              />
            </Col>
          </Row>
        )
          : (
            <Row justify="center" style={{ minWidth: 900 }}>
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
                  label={t('course_category:search_label')}
                  name="query"
                  wrapperProps={{
                    colon: false,
                    labelCol: { span: 10 },
                    wrapperCol: { span: 14 },
                    labelAlign: 'right'
                  }}
                />
              </Col>
            </Row>
          )}
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
