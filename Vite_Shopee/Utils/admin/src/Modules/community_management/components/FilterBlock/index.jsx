/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Col, Row } from 'antd'
import {
  FormInput,
  FormSelect,
  FormTreeSelect,
  FormRangePickerV2,
  HeaderSearch
} from 'Components'
import { COMPANY_NAME } from 'Constants/course'
import {
  useCommunityManagement, useLoadCompanyAll
} from 'Hooks'
import React, { useCallback, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { DEFAULT_PAG } from 'Utils'
import moment from 'moment'

const STATUS_OPTIONS = [
  { label: 'common:all', value: null },
  { label: 'common:enable', value: 1 },
  { label: 'common:disabled', value: 0 }
]

const FilterBlock = ({ t, isSuperAdmin, setRowSelected }) => {
  const {
    getListTalkBoardAction,
    getAttributeAction,
    getGroupAction,
    getTagAction,
    listTag,
    listGroup,
    listAttribute,
    listTalkBoard: { pagination },
    resetTalkboardAction
  } = useCommunityManagement()
  const { limit: pageSize } = pagination
  const { companyAll } = useLoadCompanyAll()
  const { companyOptions, idOfNissokenCompany } = companyAll

  const form = useForm({
    defaultValues: {
      creator: '',
      title: '',
      description: '',
      lstTagId: [],
      lstDepartmentId: [],
      lstAttributeId: [],
      enabled: STATUS_OPTIONS[0],
      startDate: null,
      endDate: null,
      companyId: {
        label: COMPANY_NAME.NISSOKEN,
        value: 1
      }
    }
  })
  const { handleSubmit, reset, setValue, watch } = form
  const [startDateTime, endDateTime] = watch(['startDate', 'endDate'])

  useEffect(() => {
    getAttributeAction({ companyId: isSuperAdmin && idOfNissokenCompany })
    getGroupAction({ companyId: isSuperAdmin && idOfNissokenCompany })
    getTagAction({ hasTalkBoard: true, companyId: isSuperAdmin && idOfNissokenCompany })
  }, [isSuperAdmin, idOfNissokenCompany])

  const onSubmit = useCallback(({ creator, title, description, lstTagId, lstDepartmentId, lstAttributeId, enabled, companyId, startDate, endDate }) => {
    const filter = {
      creator: creator.trim(),
      title: title.trim(),
      description: description.trim(),
      lstTagId: lstTagId.map((item) => item.value),
      lstDepartmentId: lstDepartmentId.map((item) => item.value),
      lstAttributeId: lstAttributeId.map((item) => item.value),
      enabled: enabled.value,
      startDate: moment(startDate).startOf('day').valueOf(),
      endDate: moment(endDate).endOf('day').valueOf()
    }
    if (isSuperAdmin) {
      if (!companyId?.value && !companyId?.isAllCompany) {
        filter.companyId = idOfNissokenCompany
      }

      if (companyId?.value) {
        filter.companyId = companyId?.value
      }
    }

    getListTalkBoardAction({
      ...filter,
      page: 1,
      limit: pageSize || 100
    })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }, [pageSize])

  const handleCancel = useCallback(() => {
    reset({
      name: '',
      creator: '',
      title: '',
      description: '',
      lstTagId: [],
      lstDepartmentId: [],
      lstAttributeId: [],
      startDate: null,
      endDate: null,
      enabled: { label: t('common:all'), value: null },
      companyId: {
        label: COMPANY_NAME.NISSOKEN,
        value: 1
      }
    })
    resetTalkboardAction()
  }, [])

  const handleSelectCompany = (company) => {
    setValue('companyId', company)
    setValue('lstTagId', [])
    setValue('lstDepartmentId', [])
    setValue('lstAttributeId', [])
    getAttributeAction({ companyId: company.value })
    getGroupAction({ companyId: company.value })
    getTagAction({ companyId: company.value, hasTalkBoard: true })
  }

  const listGroupOption = useMemo(() => listGroup.data.map((item) => ({ ...item, childList: item.children })), [listGroup])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={24} style={{ minWidth: 900 }}>
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
          <Col span={12}>
            <FormInput
              name="creator"
              label={t('creator')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="title"
              label={t('title')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="description"
              label={t('description')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormTreeSelect
              name="lstTagId"
              label={t('tag')}
              valueKey="id"
              labelKey="name"
              options={listTag.data}
              multiple
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormTreeSelect
              name="lstDepartmentId"
              label={t('group')}
              valueKey="key"
              labelKey="title"
              options={listGroupOption}
              multiple
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormTreeSelect
              name="lstAttributeId"
              label={t('attribute')}
              valueKey="key"
              labelKey="title"
              options={listAttribute.data}
              multiple
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormSelect
              label={t('status')}
              name="enabled"
              options={STATUS_OPTIONS}
              isClearable={false}
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormRangePickerV2
              setValue={setValue}
              startTimeName="startDate"
              endTimeName="endDate"
              startTime={startDateTime}
              endTime={endDateTime}
              label={t('created_date')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
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
