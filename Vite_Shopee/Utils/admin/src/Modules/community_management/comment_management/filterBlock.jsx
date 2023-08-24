/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, HeaderSearch, FormSelect, FormRangePickerV2, FormTreeSelect } from 'Components'
import { useCommentManagement, useCommunityManagement } from 'Hooks'
import { Row, Col } from 'antd'
import { DEFAULT_PAG } from 'Utils'
import moment from 'moment'
import { COMPANY_NAME } from 'Constants/course'

const FilterBlock = ({ t, limit, isSuperAdmin, setSelectedRowKeys, companyAll }) => {
  const { companyOptions, idOfNissokenCompany } = companyAll
  const { getListCommentAction, resetCommentAction } = useCommentManagement()

  const {
    getAttributeAction,
    getGroupAction,
    listGroup,
    listAttribute
  } = useCommunityManagement()

  useEffect(() => {
    getAttributeAction({ companyId: isSuperAdmin && idOfNissokenCompany })
    getGroupAction({ companyId: isSuperAdmin && idOfNissokenCompany })
  }, [isSuperAdmin, idOfNissokenCompany])

  const commentStatus = [
    { value: null, label: t('common:all') },
    { value: 0, label: t('common:show') },
    { value: 1, label: t('common:hide') }
  ]

  const DEFAULT_VALUE = {
    hide: { value: null, label: t('common:all') },
    content: '',
    creator: '',
    signinId: '',
    startDate: null,
    endDate: null,
    departmentIds: [],
    attributeIds: [],
    companyId: {
      label: COMPANY_NAME.NISSOKEN,
      value: 1
    }
  }

  const form = useForm({
    defaultValues: DEFAULT_VALUE
  })
  const { handleSubmit, reset, watch, setValue } = form
  const [startDateTime, endDateTime] = watch(['startDate', 'endDate'])

  const onSubmit = useCallback((formData) => {
    const { content, hide, talkBoardName, creator, attributeIds, departmentIds, startDate, endDate, companyId, signinId } = formData
    const filterData = { ...formData,
      hide: hide.value,
      creator: creator.trim(),
      content: content.trim(),
      signinId: signinId.trim(),
      talkBoardName: talkBoardName.trim(),
      departmentIds: departmentIds.map((item) => item.value),
      attributeIds: attributeIds.map((item) => item.value),
      startDate: moment(startDate).startOf('day').valueOf() || null,
      endDate: moment(endDate).endOf('day').valueOf() || null,
      companyId: isSuperAdmin && companyId?.value
    }
    getListCommentAction({
      params: { ...DEFAULT_PAG, limit, ...filterData },
      filter: filterData
    })

    setSelectedRowKeys([])
  }, [limit])

  const handleReset = useCallback(() => {
    reset(DEFAULT_VALUE)
    resetCommentAction()
  }, [t])

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
      <HeaderSearch onCancel={handleReset} onSubmit={handleSubmit(onSubmit)}>
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
              label={t('comment')}
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
              name="talkBoardName"
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
            <FormTreeSelect
              name="attributeIds"
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
            <FormTreeSelect
              name="departmentIds"
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
          {isSuperAdmin ? (
            <>
              <Col span={12}>
                <FormSelect
                  t={t}
                  name="hide"
                  label={t('status')}
                  isSearchable={false}
                  options={commentStatus}
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
            </>
          ) : (
            <>
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
              <Col span={12}>
                <FormSelect
                  t={t}
                  name="hide"
                  label={t('status')}
                  isSearchable={false}
                  options={commentStatus}
                  isClearable={false}
                  wrapperProps={{
                    colon: false,
                    labelCol: { span: 10 },
                    wrapperCol: { span: 14 },
                    labelAlign: 'right'
                  }}
                />
              </Col>
            </>
          )}
        </Row>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
