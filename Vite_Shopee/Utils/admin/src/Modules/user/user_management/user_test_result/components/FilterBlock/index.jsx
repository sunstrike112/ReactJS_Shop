/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Row, Col } from 'antd'

import { FormInput, HeaderSearch } from 'Components'

const FilterBlock = ({ t }) => {
  const form = useForm()
  const { handleSubmit, reset } = form

  const onSubmit = useCallback(() => {
  }, [])

  const handleCancel = useCallback(() => {
    reset({
      courseName: '',
      unitName: ''
    })
  }, [])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <Row className="form-group" gutter={24}>
          <Col span={24}>
            <FormInput
              name="courseName"
              label={t('user_test_result.course_name')}
              wrapperProps={{
                colon: false
              }}
            />
          </Col>
          <Col span={24}>
            <FormInput
              name="email"
              label={t('user_test_result.unit_name')}
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
