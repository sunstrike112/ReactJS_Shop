/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, HeaderSearch } from 'Components'
import { Row, Col } from 'antd'
import { DEFAULT_PAG } from 'Utils'

const FilterBlockSelectAdmin = ({ t, setRowSelected, getAdminsNissokenAction, pageSize }) => {
  const form = useForm({
    defaultValues: { email: '', signinId: '' }
  })
  const { handleSubmit, reset } = form

  const onSubmit = useCallback((formData) => {
    const { email, signinId } = formData
    getAdminsNissokenAction({ params: { ...DEFAULT_PAG, limit: pageSize || DEFAULT_PAG.limit, filter: { email: email.trim(), signinId: signinId.trim() } } })
  }, [pageSize])

  const handleReset = () => {
    reset()
    getAdminsNissokenAction({ params: DEFAULT_PAG })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }

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
              t={t}
              name="email"
              label={t('common:email')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
            />
            <FormInput
              t={t}
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

export default FilterBlockSelectAdmin
