/* eslint-disable react/prop-types */
import { Col, Row } from 'antd'
import {
  FormInput,
  FormRangePickerV2,
  FormSelect,
  FormTreeSelect,
  HeaderSearch
} from 'Components'
import { COMPANY_NAME } from 'Constants'
import {
  useCommunityManagement, useLoadCompanyAll
} from 'Hooks'
import { useReportManagement } from 'Hooks/report_management'
import moment from 'moment/moment'
import React, { useCallback, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const FilterBlock = ({ t, isSuperAdmin }) => {
  const {
    getAttributeAction,
    getGroupAction,
    listGroup,
    listAttribute
  } = useCommunityManagement()

  const {
    getListReportAction,
    listReport: { pagination },
    resetStateAction
  } = useReportManagement()
  const { limit: pageSize } = pagination
  const { companyAll } = useLoadCompanyAll()
  const { companyOptions, idOfNissokenCompany } = companyAll

  const form = useForm({
    defaultValues: {
      searchText: '',
      creator: '',
      content: '',
      signinId: '',
      departmentIds: [],
      attributeIds: [],
      companyId: {
        label: COMPANY_NAME.NISSOKEN,
        value: 1
      }
    }
  })
  const { handleSubmit, reset, setValue, watch } = form

  const [startDateTime, endDateTime] = watch(['dateFrom', 'dateTo'])

  useEffect(() => {
    getAttributeAction({ companyId: isSuperAdmin && idOfNissokenCompany })
    getGroupAction({ companyId: isSuperAdmin && idOfNissokenCompany })
    // getListReportAction({ page: 1, limit: 100, sortType: 'desc', companyId: isSuperAdmin && idOfNissokenCompany })
  }, [isSuperAdmin, idOfNissokenCompany])

  const onSubmit = useCallback(({ searchText, creator, content, departmentIds, attributeIds, dateFrom, dateTo, companyId, signinId }) => {
    const listAtt = attributeIds?.map((item) => item.value)
    const listDep = departmentIds?.map((item) => item.value)
    const filter = {
      companyId: isSuperAdmin && (companyId?.value || idOfNissokenCompany),
      searchText: searchText.trim(),
      creator: creator.trim(),
      signinId: signinId.trim(),
      content: content.trim(),
      departmentIds: listDep?.join(','),
      attributeIds: listAtt?.join(','),
      dateFrom: moment(dateFrom).startOf('day').valueOf(),
      dateTo: moment(dateTo).endOf('day').valueOf(),
      sortType: 'desc'
    }

    getListReportAction({
      ...filter,
      page: 1,
      limit: pageSize
    })
  }, [pageSize])

  const handleCancel = useCallback(() => {
    reset({
      searchText: '',
      creator: '',
      content: '',
      email: '',
      signinId: '',
      departmentIds: [],
      attributeIds: [],
      dateFrom: null,
      dateTo: null
    })
    resetStateAction()
  }, [])

  const handleSelectCompany = (company) => {
    setValue('companyId', company)
    setValue('departmentIds', [])
    setValue('attributeIds', [])
    getAttributeAction({ companyId: company.value })
    getGroupAction({ companyId: company.value })
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
              name="signinId"
              label={t('common:loginId')}
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
              name="searchText"
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
              name="content"
              label={t('content')}
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
              name="departmentIds"
              label={t('communityManagement:group')}
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
              name="attributeIds"
              label={t('communityManagement:attribute')}
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
            <FormRangePickerV2
              setValue={setValue}
              startTimeName="dateFrom"
              endTimeName="dateTo"
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
