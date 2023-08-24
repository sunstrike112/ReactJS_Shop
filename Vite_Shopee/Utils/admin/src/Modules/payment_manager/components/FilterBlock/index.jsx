/* eslint-disable react/prop-types */
import { Col, Row } from 'antd'
import { FormInput, HeaderSearch, FormDatePicker } from 'Components'
import { useLoadPaymentList } from 'Hooks'
import React, { useEffect } from 'react'
import moment from 'moment'
import { FormProvider, useForm } from 'react-hook-form'

const FilterBlock = ({ t }) => {
  const {
    pagination,
    loadPaymentHistoryListAction,
    resetStateAction
  } = useLoadPaymentList()

  const { limit: pageSize } = pagination

  const defaultValues = {
    companyName: '',
    month: moment(new Date())
  }
  const form = useForm({ defaultValues })
  const { handleSubmit, reset, setValue, watch } = form

  const {
    month
  } = watch()

  useEffect(() => {
    if (month) {
      setValue('month', month || '')
    }
  }, [month])

  const onSubmit = (data) => {
    loadPaymentHistoryListAction({
      params: {
        filter: { ...data, month: data?.month ? moment(new Date(data?.month))?.format('YYYY-MM') : '' },
        page: 1,
        limit: pageSize
      }
    })
  }

  const handleResetData = () => {
    reset(defaultValues)
    resetStateAction()
  }

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleResetData} onSubmit={handleSubmit(onSubmit)}>
        <Row className="form-group" gutter={24} justify="center" style={{ minWidth: 900 }}>
          <Col span={12}>
            <FormDatePicker
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
              className="facit-control"
              t={t}
              suffixIcon={null}
              name="month"
              picker="month"
              useDate
              format="YYYY/MM"
              label={t('manager.month')}
              allowClear={false}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="companyName"
              label={t('manager.company_name')}
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
