/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormSelect, HeaderSearch } from 'Components'
import { Row, Col } from 'antd'
import { DEFAULT_PAG } from 'Utils'
import { STATUS_USE_PASSWORD } from 'Constants'
import { useSettingPasswordPlan } from 'Hooks'

const FilterBlock = ({ t, setRowSelected, getPasswordsAction, pageSize, isAdding }) => {
  const { resetStateAction } = useSettingPasswordPlan()
  const STATUS_PASSWORD = [
    { value: null, label: t('common:select_all') },
    { value: STATUS_USE_PASSWORD.USED, label: t('common:USED') },
    { value: STATUS_USE_PASSWORD.NOT_USE, label: t('common:NOT_USE') }
  ]

  const DEFAULT_VALUE = {
    status: STATUS_PASSWORD[0]
  }

  const form = useForm({
    defaultValues: DEFAULT_VALUE
  })
  const { handleSubmit, reset, watch, setValue } = form

  const statusWatch = watch('status')

  useEffect(() => {
    const currentStatusOfUse = STATUS_PASSWORD.find(({ value }) => value === statusWatch.value)
    setValue('status', currentStatusOfUse)
  }, [t])

  const onSubmit = (formData) => {
    const { status } = formData
    getPasswordsAction({
      params: {
        ...DEFAULT_PAG,
        limit: pageSize,
        filter: { status: status?.value || null }
      }
    })
  }

  const handleReset = () => {
    reset(DEFAULT_VALUE)
    resetStateAction()
    setRowSelected({ selectedRowKeys: [], selectedRows: [] })
  }

  useEffect(() => {
    reset(DEFAULT_VALUE)
  }, [isAdding])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleReset} onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={24} justify="center" style={{ minWidth: 900 }}>
          <Col span={16}>
            <FormSelect
              label={t('status_use_password')}
              name="status"
              options={STATUS_PASSWORD}
              isClearable={false}
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
