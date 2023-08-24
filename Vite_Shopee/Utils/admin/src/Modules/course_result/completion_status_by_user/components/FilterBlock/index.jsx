/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Col, Row } from 'antd'
import { COMPANY_NAME, COURSE_TYPE, PROGRESS_OPTION } from 'Constants'
import { identity, includes, pickBy, uniqBy } from 'lodash'
import moment from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { FormInput, FormRadio, FormRangePickerV2, FormSelect, FormTreeSelect, HeaderSearch } from 'Components'
import { useGroupAttribute, useMyCompany, useUnitStatus } from 'Hooks'
import QueryString from 'qs'
import { useLocation } from 'react-router-dom'
import { DEFAULT_PAG, handleSearchSelectTree, getLastWeeksDate } from 'Utils'

const FORM_TIME_NAMES = ['completeStartTime', 'completeEndTime', 'startTime', 'endTime']
const FORM_TREE_SELECT_NAMES = ['listCourseIds', 'listGroupIds', 'listAtrributeIds']
export const FILTER_OPTION = [
  { value: false, label: 'common:default_filter' },
  { value: true, label: 'common:recent_date' }
]

const FilterBlock = ({ setSortInfo, sortParams, isSuperAdmin, companyAll, setRowSelected }) => {
  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll
  const {
    pagination,
    listCourse,
    listUnitLesson,
    listUnitTest,
    listUnitSurvey,
    listUnitReport,
    listUnitAll,
    isLoadingCourseList,
    loadUnitListLessonAction,
    loadUnitListTestAction,
    loadUnitListSurveyAction,
    loadUnitListReportAction,
    loadUnitListAllAction,
    loadUnitStatusAction,
    loadCourseListAction,
    loadSaveFilterAction,
    loadDateTimeVariableAction,
    resetUnitsLearnCourseAction
  } = useUnitStatus()
  const { loadAttributesAction, loadGroupsAction, groups: listGroup, attributes: listAttribute } = useGroupAttribute()
  const { t } = useTranslation(['courseResult'])
  const location = useLocation()
  const filterValues = useMemo(() => QueryString.parse(location.search.substring(1)), [location.search])
  const { limit: pageSize } = pagination
  const [unitOptions, setUnitOptions] = useState(listUnitAll)
  const [courseSelected, setCourseSelected] = useState([])
  const listUnitIdLesson = listUnitLesson?.map((item) => item.unitId)
  const listUnitIdTest = listUnitTest?.map((item) => item.unitId)
  const listUnitIdSurvey = listUnitSurvey?.map((item) => item.unitId)
  const listUnitIdReport = listUnitReport?.map((item) => item.unitId)

  const DEFAULT_VALUES = useMemo(() => ({
    name: '',
    email: '',
    listGroupIds: [],
    listAtrributeIds: [],
    listCourseIds: [],
    listUnitIds: [],
    completeTime: [],
    completeEndTime: null,
    completeStartTime: null,
    startTime: null,
    endTime: null,
    completeStatus: PROGRESS_OPTION(t)[0],
    signinId: '',
    defaultFilter: false
  }), [t, isSuperAdmin])

  const form = useForm({
    defaultValues: DEFAULT_VALUES
  })

  const { handleSubmit, reset, watch, setValue } = form

  const [
    completeEnd,
    completeStart,
    start,
    end,
    course,
    courseTypeWatch,
    companyIdWatch
  ] = watch([
    'completeEndTime',
    'completeStartTime',
    'startTime',
    'endTime',
    'listCourseIds',
    'courseType',
    'companyId'
  ])

  const { courseTypeAll } = useMyCompany(companyIdWatch?.label || '')

  const onSubmit = (formData) => {
    const {
      name,
      email,
      listGroupIds,
      listAtrributeIds,
      courseType,
      listCourseIds,
      listUnitIds,
      completeStartTime,
      completeEndTime,
      startTime,
      endTime,
      companyId,
      completeStatus,
      signinId
    } = formData

    const filter = pickBy({
      companyId: companyId?.value,
      userName: name.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      lstGroup: listGroupIds.map((v) => v.value),
      lstAttribute: listAtrributeIds.map((v) => v.value),
      courseType: courseType.value,
      lstCourse: listCourseIds.map((v) => v.value),
      listUnitTests: (listUnitIds.map((v) => v.value)).filter((v) => includes(listUnitIdTest, v)),
      listUnitReports: (listUnitIds.map((v) => v.value)).filter((v) => includes(listUnitIdReport, v)),
      listUnitSurveys: (listUnitIds.map((v) => v.value)).filter((v) => includes(listUnitIdSurvey, v)),
      listUnitLessons: (listUnitIds.map((v) => v.value)).filter((v) => includes(listUnitIdLesson, v)),
      completeStartTime: moment(completeStartTime).startOf('day').valueOf(),
      completeEndTime: moment(completeEndTime).endOf('day').valueOf(),
      startTime: moment(startTime).startOf('day').valueOf(),
      endTime: moment(endTime).endOf('day').valueOf(),
      sortBy: sortParams?.params?.sortBy,
      sortType: sortParams?.params?.sortType,
      completeStatus: completeStatus.value,
      signinId: signinId.trim()
    }, identity)

    loadUnitStatusAction({
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
      ...DEFAULT_VALUES,
      courseType: isSuperAdmin ? { value: COURSE_TYPE.NISSOKEN, label: COMPANY_NAME.NISSOKEN } : { value: COURSE_TYPE.COMPANY, label: COMPANY_NAME.COMPANY },
      companyId: isSuperAdmin && valueOfNissokenCompany,
      sortBy: null,
      sortType: null
    })
    resetUnitsLearnCourseAction()
    loadCourseListAction({
      params: {
        courseType: isSuperAdmin ? COURSE_TYPE.NISSOKEN : COURSE_TYPE.COMPANY,
        companyId: isSuperAdmin && idOfNissokenCompany
      } })
    if (isSuperAdmin) {
      loadGroupsAction({ params: { companyId: idOfNissokenCompany } })
      loadAttributesAction({ params: { companyId: idOfNissokenCompany } })
    }
    setSortInfo(null)
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }, [pageSize, isSuperAdmin, DEFAULT_VALUES, courseTypeAll, valueOfNissokenCompany])

  useEffect(() => {
    const courseTypeDefault = isSuperAdmin ? COURSE_TYPE.NISSOKEN : COURSE_TYPE.COMPANY
    // For get companyId
    let companyId

    if (isSuperAdmin) {
      if (filterValues.companyId?.isAllCompany === 'true') {
        companyId = ''
      } else if (filterValues.companyId?.value) {
        companyId = filterValues.companyId.value
      } else {
        companyId = idOfNissokenCompany
      }
    }
    loadCourseListAction({
      params: {
        courseType: filterValues.courseType?.value || courseTypeDefault,
        companyId
      }
    })
    loadGroupsAction({ params: { companyId } })
    loadAttributesAction({ params: { companyId } })
  }, [isSuperAdmin, filterValues])

  useEffect(() => {
    // FOR set init data
    if (Object.keys(filterValues).length) {
      const { workspaceId, courseType, ...restFilterValues } = filterValues
      // eslint-disable-next-line no-restricted-syntax
      for (let key in restFilterValues) {
        if (restFilterValues[key]) {
          if (FORM_TIME_NAMES.includes(key)) {
            setValue(key, moment(Number(restFilterValues[key])))
          } else if (FORM_TREE_SELECT_NAMES.includes(key)) {
            setValue(key, restFilterValues[key].map((item) => ({ ...item, value: Number(item.value) })))
          } else {
            setValue(key, restFilterValues[key])
          }
        }
      }
    } else if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
      setValue('courseType', { value: COURSE_TYPE.NISSOKEN, label: COMPANY_NAME.NISSOKEN })
    } else {
      setValue('courseType', { value: COURSE_TYPE.COMPANY, label: COMPANY_NAME.COMPANY })
    }
  }, [filterValues, valueOfNissokenCompany, isSuperAdmin])

  useEffect(() => {
    if (filterValues.courseType) {
      setValue('courseType', filterValues.courseType)
    } else if (isSuperAdmin) {
      setValue('courseType', { value: COURSE_TYPE.NISSOKEN, label: COMPANY_NAME.NISSOKEN })
    } else {
      setValue('courseType', { value: COURSE_TYPE.COMPANY, label: COMPANY_NAME.COMPANY })
    }
  }, [filterValues.courseType, isSuperAdmin])

  useEffect(() => {
    loadUnitListLessonAction()
    loadUnitListTestAction()
    loadUnitListSurveyAction()
    loadUnitListReportAction()
  }, [])

  const getListUnitAll = useCallback(() => {
    loadUnitListAllAction({
      lstCourse: courseSelected.map((v) => v.value)
    })
  }, [courseSelected])

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
      } })
    setValue('courseType', courseType)
    setValue('listCourseIds', [])
  }, [companyIdWatch])

  const handleSelectCompany = (company) => {
    setValue('companyId', company)
    setValue('listGroupIds', [])
    setValue('listAtrributeIds', [])
    setValue('listCourseIds', [])
    setValue('listUnitIds', [])

    if (company.label === COMPANY_NAME.NISSOKEN) {
      setValue('courseType', { value: COURSE_TYPE.NISSOKEN, label: COMPANY_NAME.NISSOKEN })
    } else {
      setValue('courseType', { value: COURSE_TYPE.COMPANY, label: COMPANY_NAME.COMPANY })
    }
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
    // change value follow by language
    const indexCourseType = courseTypeAll.findIndex((item) => item.value === courseTypeWatch?.value)
    if (indexCourseType !== -1) {
      setValue('courseType', courseTypeAll[indexCourseType])
    }
  }, [t])

  useEffect(() => {
    setCourseSelected(course)
    setUnitOptions(listUnitAll)
  })

  return (
    <FormProvider {...form}>
      <HeaderSearch onSubmit={handleSubmit(onSubmit)} onCancel={handleCancel}>
        <Row gutter={24}>
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
              name="name"
              label={t('name')}
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
            <FormTreeSelect
              t={t}
              multiple
              name="listGroupIds"
              valueKey="departmentId"
              labelKey="name"
              label={t('group')}
              options={listGroup}
              filterTreeNode={handleSearchSelectTree}
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
              dropdownClassName="dropdown-tree-select"
              onKeyDown={handleEnterSearch}
              filterTreeNode={handleSearchSelectTree}
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
              dropdownClassName="dropdown-tree-select"
              onKeyDown={handleEnterSearch}
              listHeight={140}
              filterTreeNode={handleSearchSelectTree}
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
              onKeyDown={handleEnterSearch}
              dropdownClassName="dropdown-tree-select"
              options={courseSelected.length > 0 ? uniqBy(unitOptions, 'unitId') : []}
              onDropdownVisibleChange={getListUnitAll}
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
              startTimeName="completeStartTime"
              endTimeName="completeEndTime"
              startTime={completeStart}
              endTime={completeEnd}
              label={t('completion_date_and_time')}
            />
          </Col>
          <Col span={12}>
            <FormRangePickerV2
              setValue={setValue}
              startTimeName="startTime"
              endTimeName="endTime"
              startTime={start}
              endTime={end}
              label={t('learning_start_date_and_time')}
            />
          </Col>
          <Col span={12}>
            <FormSelect
              t={t}
              name="completeStatus"
              label={t('learning_progress')}
              isClearable={false}
              isSearchable={false}
              options={PROGRESS_OPTION(t)}
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
