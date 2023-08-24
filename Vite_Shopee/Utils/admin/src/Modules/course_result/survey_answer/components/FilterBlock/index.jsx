/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { Row, Col } from 'antd'
import { pickBy, identity, uniqBy } from 'lodash'

import { useSurveyAnswer, useMyCompany, useGroupAttribute } from 'Hooks'
import { handleSearchSelectTree } from 'Utils'
import {
  FormInput,
  FormTreeSelect,
  FormSelect,
  HeaderSearch
} from 'Components'

const FilterBlock = ({ setSortInfo, sortParams, isSuperAdmin, companyAll, setRowSelected }) => {
  const {
    pagination,
    listCourse,
    listUnitAll,
    isLoadingCourseList,
    loadSurveyAnswerAction,
    loadCourseListAction,
    loadUnitListLessonAction,
    loadUnitListTestAction,
    loadUnitListSurveyAction,
    loadUnitListReportAction,
    loadUnitListAllAction,
    loadSaveFilterAction,
    resetStateAction
  } = useSurveyAnswer()
  const {
    loadAttributesAction,
    loadGroupsAction,
    groups: listGroup,
    attributes: listAttribute
  } = useGroupAttribute()

  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll

  const { t } = useTranslation(['courseResult'])
  const { limit: pageSize } = pagination
  const [unitOptions, setUnitOptions] = useState(listUnitAll)
  const [courseSelected, setCourseSelected] = useState([])

  const responseStatusOptions = useMemo(() => ([
    { value: 'ANSWERED', label: t('answered') },
    { value: 'NOTANSWERED', label: t('not_answered') }
  ]), [t])

  const form = useForm({
    defaultValues: {
      signinId: '',
      name: '',
      email: '',
      listGroupIds: [],
      listAtrributeIds: [],
      listCourseIds: [],
      listUnitIds: [],
      listUserType: [],
      responseStatus: []
    }
  })

  const { handleSubmit, reset, setValue, watch } = form

  const [
    possibleResponseStatusWatch,
    course,
    courseTypeWatch,
    companyIdWatch] = watch([
    'responseStatus',
    'listCourseIds',
    'courseType',
    'companyId'
  ])

  const { courseTypeAll } = useMyCompany(companyIdWatch?.label || '')

  useEffect(() => {
    loadCourseListAction({
      params: {
        courseType: isSuperAdmin ? 'NISSOKEN' : 'COMPANY',
        companyId: isSuperAdmin && idOfNissokenCompany
      }
    })
    loadGroupsAction({ params: { companyId: isSuperAdmin && idOfNissokenCompany } })
    loadAttributesAction({ params: { companyId: isSuperAdmin && idOfNissokenCompany } })
    loadUnitListLessonAction()
    loadUnitListTestAction()
    loadUnitListSurveyAction()
    loadUnitListReportAction()
  }, [isSuperAdmin])

  useEffect(() => {
    if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
    }
  }, [isSuperAdmin, valueOfNissokenCompany])

  useEffect(() => {
    if (courseTypeAll[1].label) {
      setValue('courseType', courseTypeAll[1])
    }
  }, [courseTypeAll])

  useEffect(() => {
    const indexResponseStatusOption = responseStatusOptions.findIndex((item) => item.value === possibleResponseStatusWatch?.value)
    setValue('responseStatus', responseStatusOptions[indexResponseStatusOption])

    const indexCourseType = courseTypeAll.findIndex((item) => item.value === courseTypeWatch?.value)
    if (indexCourseType !== -1) {
      setValue('courseType', courseTypeAll[indexCourseType])
    }
  }, [t])

  const onSubmit = (formData) => {
    const {
      signinId,
      name,
      email,
      listGroupIds,
      listAtrributeIds,
      listCourseIds,
      listUnitIds,
      responseStatus,
      courseType,
      companyId
    } = formData

    const filter = pickBy({
      companyId: companyId?.value,
      signinId: signinId.trim().toLowerCase(),
      userName: name.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      listGroup: listGroupIds.map((v) => v.value),
      listAttribute: listAtrributeIds.map((v) => v.value),
      courseType: courseType.value,
      listCourse: listCourseIds.map((v) => v.value),
      listUnits: (listUnitIds.map((v) => v.value)),
      SurveyResultStatus: responseStatus?.value,
      sortBy: sortParams?.params?.sortBy,
      isAscending: sortParams?.params?.isAscending
    }, identity)

    loadSurveyAnswerAction({
      params: {
        ...filter,
        page: 1,
        limit: pageSize
      }
    })
    loadSaveFilterAction({ ...filter })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }

  const handleCancel = useCallback(() => {
    reset({
      companyId: valueOfNissokenCompany,
      signinId: '',
      name: '',
      email: '',
      listGroupIds: [],
      listAtrributeIds: [],
      courseType: courseTypeAll[1],
      listCourseIds: [],
      listUnitIds: [],
      listUserType: [],
      responseStatus: [],
      sortBy: null,
      isAscending: null
    })
    setSortInfo(null)
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
    resetStateAction()
    loadCourseListAction({
      params: {
        courseType: isSuperAdmin ? 'NISSOKEN' : 'COMPANY',
        companyId: isSuperAdmin && idOfNissokenCompany
      }
    })
    if (isSuperAdmin) {
      loadGroupsAction({ params: { companyId: idOfNissokenCompany } })
      loadAttributesAction({ params: { companyId: idOfNissokenCompany } })
    }
  }, [pageSize, isSuperAdmin, valueOfNissokenCompany])

  const handleEnterSearch = (event) => {
    if (event.code === 'Enter') {
      event.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  const handleChangeCourseType = useCallback((courseType) => {
    loadCourseListAction({
      params: {
        courseType: courseType.value,
        companyId: isSuperAdmin && companyIdWatch?.value
      }
    })
    setValue('courseType', courseType)
    setValue('listCourseIds', [])
  }, [companyIdWatch])

  const handleSelectCompany = (company) => {
    setValue('companyId', company)
    setValue('listGroupIds', [])
    setValue('listAtrributeIds', [])
    setValue('listCourseIds', [])
    setValue('courseType', courseTypeAll[1])
    setValue('listUnitIds', [])
    loadGroupsAction({ params: { companyId: company.value } })
    loadAttributesAction({ params: { companyId: company.value } })
    loadCourseListAction({
      params: {
        courseType: company.value === idOfNissokenCompany ? 'NISSOKEN' : 'COMPANY',
        companyId: company?.value
      }
    })
  }

  useEffect(() => {
    setCourseSelected(course)
    setUnitOptions(listUnitAll)
  }, [course, listUnitAll])

  useEffect(() => {
    loadUnitListAllAction({
      unitType: 'SURVEY',
      lstCourse: courseSelected.map((v) => v.value)
    })
  }, [courseSelected])

  return (
    <FormProvider {...form}>
      <HeaderSearch onSubmit={handleSubmit(onSubmit)} onCancel={handleCancel}>
        <Row className="form-group" gutter={24}>
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
              name="name"
              label={t('name')}
              dropdownClassName="dropdown-tree-select"
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
              label={t('email')}
              dropdownClassName="dropdown-tree-select"
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
              multiple
              name="listGroupIds"
              valueKey="departmentId"
              labelKey="name"
              label={t('group')}
              options={listGroup}
              filterTreeNode={handleSearchSelectTree}
              onKeyDown={handleEnterSearch}
              dropdownClassName="dropdown-tree-select"
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
              multiple
              name="listAtrributeIds"
              valueKey="attributeId"
              labelKey="attributeName"
              label={t('attribute')}
              options={listAttribute}
              filterTreeNode={handleSearchSelectTree}
              onKeyDown={handleEnterSearch}
              dropdownClassName="dropdown-tree-select"
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
              name="courseType"
              label={t('course:course_type')}
              isClearable={false}
              isSearchable={false}
              options={courseTypeAll}
              onChange={handleChangeCourseType}
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
              multiple
              name="listCourseIds"
              valueKey="courseId"
              labelKey="courseName"
              label={t('course')}
              options={listCourse}
              loading={isLoadingCourseList}
              disabled={isLoadingCourseList}
              filterTreeNode={handleSearchSelectTree}
              onKeyDown={handleEnterSearch}
              dropdownClassName="dropdown-tree-select"
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
              multiple
              name="listUnitIds"
              valueKey="unitId"
              labelKey="unitName"
              label={t('unit')}
              options={courseSelected.length > 0 ? uniqBy(unitOptions, 'unitId') : []}
              filterTreeNode={handleSearchSelectTree}
              onKeyDown={handleEnterSearch}
              dropdownClassName="dropdown-tree-select"
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
              key={t.language}
              name="responseStatus"
              label={t('response_status')}
              options={responseStatusOptions}
              isSearchable={false}
              isClearable
              filterTreeNode={handleSearchSelectTree}
              onKeyDown={handleEnterSearch}
              dropdownClassName="dropdown-tree-select"
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
