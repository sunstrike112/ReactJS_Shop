/* eslint-disable react/prop-types */
import { Col, Row } from 'antd'
import { FormInput, FormTreeSelect, HeaderSearch } from 'Components'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const FilterBlock = (props) => {
  // Props
  const { t, setRowSelected, listAttribute, listGroup, loadListUserAction, setUsersLoaded } = props
  // Use forms
  const form = useForm({
    defaultValues: {
      userName: '',
      email: '',
      listDepartmentIds: [],
      listAttributeIds: []
    }
  })
  const { handleSubmit, reset } = form

  const onSubmit = (data) => {
    loadListUserAction({
      params: {
        ...data,
        page: 1,
        limit: 20,
        listDepartmentIds: data.listDepartmentIds.map((v) => v.value),
        listAttributeIds: data.listAttributeIds.map((v) => v.value)
      }
    })
    setUsersLoaded(true)
  }

  const handleReset = async () => {
    await reset({
      userName: '',
      email: '',
      listDepartmentIds: [],
      listAttributeIds: []
    })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
    handleSubmit(onSubmit)()
  }

  return (
    <FormProvider {...form}>
      <HeaderSearch popup onCancel={handleReset} onSubmit={handleSubmit(onSubmit)}>
        <Row style={{ marginRight: 0 }}>
          <Col span={24}>
            <FormInput
              name="userName"
              label={t('select_user.name')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={24}>
            <FormInput
              name="email"
              label={t('select_user.email')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 24 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={24}>
            <FormTreeSelect
              t={t}
              name="listDepartmentIds"
              valueKey="departmentId"
              labelKey="name"
              options={listGroup}
              label={t('select_user.group')}
              dropdownClassName="dropdown-tree-select"
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
              multiple
            />
          </Col>
          <Col span={24}>
            <FormTreeSelect
              t={t}
              name="listAttributeIds"
              valueKey="attributeId"
              labelKey="attributeName"
              label={t('select_user.attribute')}
              options={listAttribute}
              dropdownClassName="dropdown-tree-select"
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'right'
              }}
              multiple
            />
          </Col>
        </Row>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
