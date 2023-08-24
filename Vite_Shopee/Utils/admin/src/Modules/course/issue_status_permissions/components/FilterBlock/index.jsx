/* eslint-disable react/prop-types */
import { Row, Col } from 'antd'
import { FormInput, FormSelect, FormTreeSelect, HeaderSearch } from 'Components'
import { useMyCompany, useSelectRecipient, useLoadCompanyAll, useRoles, useGroupAttribute } from 'Hooks'
import React, { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const DEFAULT_VALUE = {
  listGroupIds: [],
  listAtrributeIds: [],
  listCourseIds: [],
  userName: '',
  email: '',
  possibleCourse: { value: 'ALL', label: '-' },
  signinId: ''
}

const FilterBlock = ({ setRowSelected }) => {
  const { t, i18n } = useTranslation(['issue_permission'])
  const AVAILABLE_OPTIONS = [
    { value: 'ALL', label: '-' },
    { value: 'POSSIBLE', label: t('management.only_available') },
    { value: 'IMPOSSIBLE', label: t('management.only_unavailable') }
  ]
  const { isSuperAdmin } = useRoles()
  const { companyAll } = useLoadCompanyAll()
  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll

  const {
    loadListCourseAction,
    listCourse,
    pagination,
    loadListIssuePermissionAction,
    isLoadingCourse,
    resetIssuesPermissionAction
  } = useSelectRecipient()
  const {
    attributes: listAttribute,
    groups: listGroup,
    loadAttributesAction,
    loadGroupsAction
  } = useGroupAttribute()

  const form = useForm({
    defaultValues: DEFAULT_VALUE
  })

  const { handleSubmit, reset, setValue, watch } = form
  const [
    possibleCourseWatch,
    companyIdWatch
  ] = watch([
    'possibleCourse',
    'companyId'
  ])
  const { courseTypeAll } = useMyCompany(companyIdWatch?.label || '')
  const { limit: pageSize } = pagination

  useEffect(() => {
    if (courseTypeAll) {
      setValue('courseType', courseTypeAll[1])
    }
  }, [courseTypeAll])

  useEffect(() => {
    if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
    }
  }, [valueOfNissokenCompany, isSuperAdmin])

  const onSubmit = (data) => {
    const filterData = {
      ...data,
      userName: data.userName.trim(),
      email: data.email.trim(),
      possibleCourse: data.possibleCourse.value,
      courseType: data.courseType?.value,
      listGroupIds: data.listGroupIds.map(({ value }) => value),
      listAtrributeIds: data.listAtrributeIds.map(({ value }) => value),
      listCourseIds: data.listCourseIds.map(({ value }) => value),
      companyId: isSuperAdmin && data.companyId.value,
      signinId: data.signinId.trim()
    }
    loadListIssuePermissionAction({
      params: {
        filter: filterData,
        page: 1,
        limit: pageSize
      }
    })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }

  const handleSelectCourseType = useCallback((courseType) => {
    loadListCourseAction({
      params: {
        courseType: courseType.value,
        companyId: isSuperAdmin && companyIdWatch?.value
      }
    })
    setValue('courseType', courseType)
    setValue('listCourseIds', [])
  }, [companyIdWatch])

  const handleCancel = () => {
    reset({
      ...DEFAULT_VALUE,
      courseType: courseTypeAll[1],
      companyId: isSuperAdmin && valueOfNissokenCompany
    })
    resetIssuesPermissionAction()
    if (isSuperAdmin) {
      loadGroupsAction({ params: { companyId: idOfNissokenCompany } })
      loadAttributesAction({ params: { companyId: idOfNissokenCompany } })
    }
    loadListCourseAction({
      params: {
        courseType: isSuperAdmin ? 'NISSOKEN' : 'COMPANY',
        companyId: isSuperAdmin && idOfNissokenCompany
      }
    })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }

  useEffect(() => {
    // change value follow by language
    const indexAvailableOption = AVAILABLE_OPTIONS.findIndex((item) => item.value === possibleCourseWatch?.value)
    setValue('possibleCourse', AVAILABLE_OPTIONS[indexAvailableOption])
  }, [t])

  useEffect(() => {
    loadListCourseAction({
      params: {
        courseType: isSuperAdmin ? 'NISSOKEN' : 'COMPANY',
        companyId: isSuperAdmin && idOfNissokenCompany
      }
    })
    loadAttributesAction({
      params: {
        companyId: isSuperAdmin && idOfNissokenCompany
      }
    })
    loadGroupsAction({
      params: {
        companyId: isSuperAdmin && idOfNissokenCompany
      } })
  }, [isSuperAdmin])

  const handleSelectCompany = (company) => {
    setValue('companyId', company)
    setValue('listGroupIds', [])
    setValue('listAtrributeIds', [])
    setValue('listCourseIds', [])
    setValue('courseType', courseTypeAll[1])
    loadGroupsAction({ params: { companyId: company.value } })
    loadAttributesAction({ params: { companyId: company.value } })
    loadListCourseAction({
      params: {
        courseType: (company.label === valueOfNissokenCompany.label)
          ? 'NISSOKEN' : 'COMPANY',
        companyId: company?.value
      }
    })
  }

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Row gutter={24} style={{ maxWidth: 900, minWidth: 700 }}>
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
                name="userName"
                label={t('select_user.name')}
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
                name="email"
                label={t('common.email')}
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
                t={t}
                name="listGroupIds"
                valueKey="departmentId"
                labelKey="name"
                options={listGroup}
                label={t('select_user.group')}
                dropdownClassName="dropdown-tree-select"
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
                multiple
                placeholder=""
              />
            </Col>
            <Col span={12}>
              <FormTreeSelect
                t={t}
                name="listAtrributeIds"
                valueKey="attributeId"
                labelKey="attributeName"
                options={listAttribute}
                label={t('select_user.attribute')}
                dropdownClassName="dropdown-tree-select"
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
                placeholder={null}
                multiple
              />
            </Col>
            <Col span={12}>
              <FormSelect
                t={t}
                name="courseType"
                label={t('course:course_type')}
                isClearable={false}
                isSearchable={false}
                options={courseTypeAll}
                onChange={handleSelectCourseType}
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
                t={t}
                name="listCourseIds"
                valueKey="courseId"
                labelKey="courseName"
                options={listCourse}
                label={t('common.course')}
                dropdownClassName="dropdown-tree-select"
                loading={isLoadingCourse}
                disabled={isLoadingCourse}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
                placeholder=""
                multiple
              />
            </Col>

            <Col span={12}>
              <FormSelect
                key={i18n.language}
                t={t}
                name="possibleCourse"
                isSearchable={false}
                label={t('management.course_availability')}
                placeholder={null}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
                options={AVAILABLE_OPTIONS}
                isClearable={false}
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
        </div>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
