/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Col, Row } from 'antd'
import { FormInput, HeaderSearch } from 'Components'

const DEFAULT_VALUE = {
  courseName: '',
  courseCategory: []
}

const FilterBlock = ({ t, setRowSelected, loadExceptCourseAction, limit }) => {
  const form = useForm({
    defaultValues: DEFAULT_VALUE
  })
  const { handleSubmit, reset } = form

  const onSubmit = useCallback((formData) => {
    const { courseName } = formData
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
    loadExceptCourseAction({ params: { page: 1, limit, courseName } })
  }, [limit])

  const handleCancel = () => {
    reset(DEFAULT_VALUE)
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
    loadExceptCourseAction({ params: { page: 1, limit: 100 } })
  }

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={24} justify="center" style={{ minWidth: 900 }}>
          <Col span={16}>
            <FormInput
              name="courseName"
              label={t('course_name')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 6 },
                wrapperCol: { span: 18 },
                labelAlign: 'right'
              }}
              maxLength={100}
            />
          </Col>
        </Row>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
