/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, HeaderSearch } from 'Components'
import { Row, Col } from 'antd'

const DEFAULT_VALUE = {
  companyName: ''
}

const FilterBlock = ({ t, filter, pagination, loadCompanyTypesAction }) => {
  const { limit: pageSize } = pagination

  const form = useForm({
    defaultValues: DEFAULT_VALUE
  })
  const { handleSubmit, reset } = form

  const onSubmit = useCallback((formData) => {
    const { companyName } = formData
    const filterData = { ...filter, companyName }
    loadCompanyTypesAction({
      params: {
        page: 1,
        limit: pageSize,
        filter: filterData
      }
    })
  }, [pageSize, filter])

  const handleReset = useCallback(() => {
    reset(DEFAULT_VALUE)
    loadCompanyTypesAction({
      params: {
        page: 1,
        limit: 100,
        filter: {
          accessCourse: filter.accessCourse
        }
      }
    })
  }, [filter])

  return (
    <FormProvider {...form}>
      <HeaderSearch
        onCancel={handleReset}
        onSubmit={handleSubmit(onSubmit)}
        popup
      >
        <Row className="form-group" gutter={24} justify="center">
          <Col span={12}>
            <FormInput
              name="companyName"
              label={t('company:company_name')}
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
