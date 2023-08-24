/* eslint-disable react/prop-types */
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col } from 'antd'
import { pickBy, identity, uniqBy, includes } from 'lodash'
import moment from 'moment'

import { FormProvider, useForm } from 'react-hook-form'
import {
  FormInput,
  FormTreeSelect,
  FormSelect,
  HeaderSearch,
  FormRangePickerV2
} from 'Components'
import { handleSearchSelectTree } from 'Utils'
import { useReportResult } from 'Hooks/report_result'
import { useUnitStatus, useMyCompany, useRoles, useGroupAttribute } from 'Hooks'

const FilterBlock = ({
  setSortInfo,
  sortParams,
  pageSize,
  companyAll
}) => {
  const {
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
    loadCourseListAction,
    loadSaveFilterAction
  } = useUnitStatus()
  const { loadAttributesAction, loadGroupsAction, groups: listGroup, attributes: listAttribute } = useGroupAttribute()
  const { loadReportResultAction, resetStateAction } = useReportResult()
  const { isSuperAdmin } = useRoles()
  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll
  const { t } = useTranslation(['courseResult'])
  const submissionStatusOption = useMemo(() => ([
    { value: null, label: t('common:select_all') },
    { value: 'NOT_PARTICIPATE', label: t('not_participate') },
    { value: 'PARTICIPATING', label: t('participating') },
    { value: 'COMPLETED', label: t('completed') }
  ]), [t])

  const evaluateStatusOption = useMemo(() => ([
    { value: null, label: t('common:select_all') },
    { value: 'NEW', label: t('new') },
    { value: 'SUBMITTED', label: t('submitted') },
    { value: 'RESUBMITTED', label: t('resubmitted') },
    { value: 'EVALUATION_COMPLETED', label: t('evaluation_completed') },
    { value: 'WAITING_FOR_RELEASE', label: t('waiting_for_release') }
  ]), [t])

  const [unitOptions, setUnitOptions] = useState(listUnitAll)
  const [courseSelected, setCourseSelected] = useState([])
  const listUnitIdLesson = listUnitLesson?.map((item) => item.unitId)
  const listUnitIdTest = listUnitTest?.map((item) => item.unitId)
  const listUnitIdSurvey = listUnitSurvey?.map((item) => item.unitId)
  const listUnitIdReport = listUnitReport?.map((item) => item.unitId)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      listGroupIds: [],
      listAtrributeIds: [],
      listCourseIds: [],
      listUnitIds: [],
      startTime: null,
      endTime: null
    }
  })

  const { handleSubmit, reset, watch, setValue } = form

  const [
    start,
    end,
    course,
    possibleSubmissionStatus,
    possibleEvaluateStatus,
    courseTypeWatch,
    companyIdWatch
  ] = watch([
    'startTime',
    'endTime',
    'listCourseIds',
    'submissionStatus',
    'evaluationStatus',
    'courseType',
    'companyId'
  ])
  const { courseTypeAll } = useMyCompany(companyIdWatch?.label || '')
  useEffect(() => {
    const indexPossibleSubmissionStatus = submissionStatusOption.findIndex((item) => item.value === possibleSubmissionStatus?.value)
    const indexPossibleEvaluateStatus = evaluateStatusOption.findIndex((item) => item.value === possibleEvaluateStatus?.value)
    setValue('submissionStatus', submissionStatusOption[indexPossibleSubmissionStatus])
    setValue('evaluationStatus', evaluateStatusOption[indexPossibleEvaluateStatus])
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
      evaluationStatus,
      submissionStatus,
      startTime,
      endTime,
      courseType,
      companyId
    } = formData

    const filter = pickBy({
      signinId: signinId.trim().toLowerCase(),
      userName: name.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      listGroup: listGroupIds.map((v) => v.value),
      listAttribute: listAtrributeIds.map((v) => v.value),
      courseType: courseType.value,
      companyId: companyId?.value,
      listCourse: listCourseIds.map((v) => v.value),
      listUnitTests: (listUnitIds.map((v) => v.value)).filter((v) => includes(listUnitIdTest, v)),
      listUnitReports: (listUnitIds.map((v) => v.value)).filter((v) => includes(listUnitIdReport, v)),
      listUnitSurveys: (listUnitIds.map((v) => v.value)).filter((v) => includes(listUnitIdSurvey, v)),
      listUnitLessons: (listUnitIds.map((v) => v.value)).filter((v) => includes(listUnitIdLesson, v)),
      submissionTimeStart: moment(startTime).startOf('day').valueOf(),
      submissionTimeEnd: moment(endTime).endOf('day').valueOf(),
      evaluationStatus: evaluationStatus?.value,
      submissionStatus: submissionStatus?.value,
      isAscending: sortParams?.params?.isAscending
    }, identity)

    loadReportResultAction({
      params: {
        ...filter,
        page: 1,
        limit: pageSize
      }
    })
    loadSaveFilterAction({ ...filter })
  }

  const handleCancel = useCallback(() => {
    reset({
      name: '',
      email: '',
      signinId: '',
      companyId: valueOfNissokenCompany,
      listGroupIds: [],
      listAtrributeIds: [],
      listCourseIds: [],
      listUnitIds: [],
      completeTime: [],
      evaluationStatus: [],
      submissionStatus: [],
      startTime: null,
      endTime: null,
      sortBy: null,
      isAscending: null
    })
    resetStateAction()
    loadCourseListAction({
      params: {
        courseType: isSuperAdmin ? 'NISSOKEN' : 'COMPANY'
      }
    })
    if (isSuperAdmin) {
      loadGroupsAction({ params: { companyId: idOfNissokenCompany } })
      loadAttributesAction({ params: { companyId: idOfNissokenCompany } })
    }
    setSortInfo(null)
  }, [pageSize, isSuperAdmin, valueOfNissokenCompany])

  const getListUnitAll = useCallback(() => {
    loadUnitListAllAction({
      unitType: 'REPORT',
      lstCourse: courseSelected.map((v) => v.value)
    })
  }, [courseSelected])

  useEffect(() => {
    loadCourseListAction({
      params: {
        courseType: isSuperAdmin && 'NISSOKEN',
        companyId: isSuperAdmin && idOfNissokenCompany
      }
    })
    loadAttributesAction({ params: { companyId: isSuperAdmin && idOfNissokenCompany } })
    loadGroupsAction({ params: { companyId: isSuperAdmin && idOfNissokenCompany } })
    loadUnitListLessonAction()
    loadUnitListTestAction()
    loadUnitListSurveyAction()
    loadUnitListReportAction()
  }, [isSuperAdmin])

  useEffect(() => {
    if (courseTypeAll) {
      setValue('courseType', courseTypeAll[1])
    }
  }, [courseTypeAll])

  const handleEnterSearch = (event) => {
    if (event.code === 'Enter') {
      event.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

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

  const handleSelectCourseType = useCallback((courseType) => {
    loadCourseListAction({
      params: {
        courseType: courseType.value,
        companyId: isSuperAdmin && companyIdWatch?.value
      }
    })
    setValue('courseType', courseType)
    setValue('listCourseIds', [])
  }, [companyIdWatch])

  useEffect(() => {
    if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
    }
  }, [companyAll, isSuperAdmin])

  useEffect(() => {
    if (courseTypeAll[1].label) {
      setValue('courseType', courseTypeAll[1])
    }
  }, [courseTypeAll])

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
        <div>
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
              <FormTreeSelect
                t={t}
                multiple
                name="listGroupIds"
                valueKey="departmentId"
                labelKey="name"
                label={t('group')}
                options={listGroup}
                onKeyDown={handleEnterSearch}
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
                onKeyDown={handleEnterSearch}
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
                multiple
                name="listCourseIds"
                valueKey="courseId"
                labelKey="courseName"
                label={t('course')}
                options={listCourse}
                loading={isLoadingCourseList}
                disabled={isLoadingCourseList}
                onKeyDown={handleEnterSearch}
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
                name="listUnitIds"
                valueKey="unitId"
                labelKey="unitName"
                label={t('unit')}
                onKeyDown={handleEnterSearch}
                options={courseSelected.length > 0 ? uniqBy(unitOptions, 'unitId') : []}
                onDropdownVisibleChange={() => {
                  getListUnitAll()
                }}
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
                name="submissionStatus"
                label={t('completeStatus')}
                options={submissionStatusOption}
                isSearchable={false}
                isClearable
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
                key={t.language}
                name="evaluationStatus"
                label={t('evaluationStatus')}
                options={evaluateStatusOption}
                isSearchable={false}
                isClearable
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
              <FormRangePickerV2
                setValue={setValue}
                startTimeName="startTime"
                endTimeName="endTime"
                startTime={start}
                endTime={end}
                label={t('submission_date')}
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
