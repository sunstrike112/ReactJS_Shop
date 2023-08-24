/* eslint-disable react/prop-types */
import { Col, Row } from 'antd'
import { FormInput, FormRangePickerV2, FormSelect, HeaderSearch } from 'Components'
import { useRoles } from 'Hooks'
import { identity, pickBy } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { DEFAULT_PAG } from 'Utils'

const FilterBlock = ({ t, loadFindUserAction, pageSize, isReloading, setIsReloading, companyAll, resetNotificationsAction }) => {
  const POST_OPTION = useMemo(() => ([
    { label: t('management.ALL'), value: 'ALL' },
    { label: t('management.BEFORE'), value: 'BEFORE' },
    { label: t('management.PUBLISHING'), value: 'PUBLISHING' },
    { label: t('management.END'), value: 'END' }
  ]), [t])

  const PUSH_OPTION = useMemo(() => ([
    { label: t('management.ALL'), value: null },
    { label: t('management.YES'), value: '1' },
    { label: t('management.NO'), value: '0' }
  ]), [t])

  const { isSuperAdmin, isAdmin, isCompany } = useRoles()
  const { companyOptions, valueOfNissokenCompany } = companyAll

  const defaultValues = {
    statusToGet: POST_OPTION[0],
    sendNotification: PUSH_OPTION[0],
    publicationStartTo: null,
    publicationStartFrom: null,
    publicationEndFrom: null,
    publicationEndTo: null,
    companyId: valueOfNissokenCompany,
    signinId: ''
  }

  const form = useForm({ defaultValues })
  const { handleSubmit, reset, setValue, watch } = form
  const [
    publicationStartTo,
    publicationStartFrom,
    publicationEndFrom,
    publicationEndTo,
    statusToGetWatch
  ] = watch([
    'publicationStartTo',
    'publicationStartFrom',
    'publicationEndFrom',
    'publicationEndTo',
    'statusToGet'
  ])

  const onSubmit = (formData) => {
    const { statusToGet, sendNotification, endPost, startPost, ...data } = formData
    const dataSearch = pickBy({
      ...data,
      title: data?.title?.trim(),
      publicationStartFrom: moment(publicationStartFrom).startOf('day').valueOf(),
      publicationStartTo: moment(publicationStartTo).endOf('day').valueOf(),
      publicationEndFrom: moment(publicationEndFrom).startOf('day').valueOf(),
      publicationEndTo: moment(publicationEndTo).endOf('day').valueOf(),
      statusToGet: statusToGet?.value,
      sendNotification: sendNotification.value,
      companyId: formData?.companyId?.value,
      signinId: formData?.signinId.trim()
    }, identity)
    loadFindUserAction({
      params: {
        page: DEFAULT_PAG.page,
        limit: pageSize,
        filter: dataSearch
      }
    })
  }

  const handleCancel = (() => {
    reset(defaultValues)
    resetNotificationsAction()
  })

  const handleSetDefaultValue = () => {
    setValue('companyId', valueOfNissokenCompany)
  }
  useEffect(() => {
    if (isSuperAdmin || isAdmin) {
      handleSetDefaultValue()
    }
  }, [companyAll, isSuperAdmin, isAdmin])

  useEffect(() => {
    // change value follow by language
    const indexStatusToGet = POST_OPTION.findIndex((item) => item.value === statusToGetWatch.value)
    setValue('statusToGet', POST_OPTION[indexStatusToGet])
  }, [t])

  useEffect(() => {
    const resetFilter = {
      title: '',
      statusToGet: POST_OPTION[0],
      sendNotification: PUSH_OPTION[0],
      publicationStartTo: null,
      publicationStartFrom: null,
      publicationEndFrom: null,
      publicationEndTo: null,
      companyId: valueOfNissokenCompany
    }
    if (isReloading) {
      reset(resetFilter)
    }
    setIsReloading(false)
  }, [isReloading])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={24}>
          {(isSuperAdmin || isAdmin) && (
          <Col span={12}>
            <FormSelect
              label={t('company:company_name')}
              name="companyId"
              options={companyOptions}
              isClearable={false}
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
              name="title"
              label={t('management.title_text')}
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
              t={t}
              name="statusToGet"
              isSearchable={false}
              label={t('management.new_status')}
              placeholder={null}
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
              options={POST_OPTION}
              isClearable={false}
            />
          </Col>
          {(isSuperAdmin || isCompany)
          && (
          <Col span={12}>
            <FormSelect
              t={t}
              name="sendNotification"
              isSearchable={false}
              label={t('post.create.push')}
              placeholder={null}
              wrapperProps={{
                colon: false,
                labelCol: { span: 10 },
                wrapperCol: { span: 14 },
                labelAlign: 'right'
              }}
              options={PUSH_OPTION}
              isClearable={false}
            />
          </Col>
          )}
          <Col span={12}>
            <FormRangePickerV2
              setValue={setValue}
              startTimeName="publicationStartFrom"
              endTimeName="publicationStartTo"
              startTime={publicationStartFrom}
              endTime={publicationStartTo}
              label={t('management.start_post')}
            />
          </Col>
          <Col span={12}>
            <FormRangePickerV2
              setValue={setValue}
              startTimeName="publicationEndFrom"
              endTimeName="publicationEndTo"
              startTime={publicationEndFrom}
              endTime={publicationEndTo}
              label={t('management.end_post')}
            />
          </Col>
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
        </Row>
      </HeaderSearch>
    </FormProvider>
  )
}

FilterBlock.propTypes = {
  loadFindUserAction: PropTypes.func,
  pageSize: PropTypes.number,
  isReloading: PropTypes.bool,
  setIsReloading: PropTypes.func
}

export default FilterBlock
