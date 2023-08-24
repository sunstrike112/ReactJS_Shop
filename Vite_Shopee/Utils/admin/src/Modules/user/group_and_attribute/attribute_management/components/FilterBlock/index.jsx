/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Row, Col } from 'antd'
import { pickBy, identity } from 'lodash'

import { FormInput, HeaderSearch } from 'Components'
import { useGroupAttribute } from 'Hooks/user'

const FilterBlock = ({ t, loadAttributesAction, isReloading }) => {
  const { pagination } = useGroupAttribute()
  const form = useForm()
  const { handleSubmit, reset } = form
  const { limit: pageSize } = pagination
  const onSubmit = useCallback(({ searchName }) => {
    const filter = pickBy({ searchName: searchName.trim() }, identity)
    loadAttributesAction({
      params: {
        ...filter,
        page: 1,
        limit: pageSize
      }
    })
  }, [pageSize])

  const handleCancel = useCallback(() => {
    reset({
      searchName: ''
    })
    loadAttributesAction({
      params: {
        page: 1,
        limit: 100
      }
    })
  }, [])

  useEffect(() => {
    if (isReloading) {
      reset({
        searchName: ''
      })
    }
  }, [isReloading])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <Row justify="center" gutter={24} style={{ minWidth: 900 }}>
          <Col span={16}>
            <FormInput
              name="searchName"
              label={t('attribute.attribute_name')}
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
