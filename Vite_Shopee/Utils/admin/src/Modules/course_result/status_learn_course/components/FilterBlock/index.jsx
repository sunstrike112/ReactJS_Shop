/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { Row, Col } from 'antd'
import { pickBy, identity, omit } from 'lodash'
import moment from 'moment'
import { COURSE_TYPE, PROGRESS_OPTION } from 'Constants'

import { useCourseStatus, useMyCompany, useGroupAttribute } from 'Hooks'
import { handleSearchSelectTree } from 'Utils'
import {
  FormInput,
  FormTreeSelect,
  FormRangePickerV2,
  HeaderSearch,
  FormSelect
} from 'Components'

const FilterBlock = ({ sortParams, setSortInfo, isSuperAdmin, companyAll, setRowSelected, setFilterValues }) => {
  const { t } = useTranslation(['courseResult'])
  const {
    pagination,
    listCourse,
    isLoadingCourseList,
    loadCourseListAction,
    loadCourseStatusAction,
    loadSaveFilterAction,
    resetCoursesAction
  } = useCourseStatus()

  const { loadAttributesAction, loadGroupsAction, groups: listGroup, attributes: listAttribute } = useGroupAttribute()
  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll

  const { limit: pageSize } = pagination

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      listGroupIds: [],
      listAtrributeIds: [],
      listCourseIds: [],
      completeEndTime: null,
      completeStartTime: null,
      startTime: null,
      endTime: null,
      learningProgress: PROGRESS_OPTION(t)[0],
      signinId: ''
    }
  })

  const { handleSubmit, reset, watch, setValue } = form

  const [
    completeEnd,
    completeStart,
    start,
    end,
    courseTypeWatch,
    companyIdWatch
  ] = watch(['completeEndTime', 'completeStartTime', 'startTime', 'endTime', 'courseType', 'companyId'])

  const { courseTypeAll } = useMyCompany(companyIdWatch?.label || '')

  const onSubmit = (formData) => {
    const {
      name,
      email,
      listGroupIds,
      listAtrributeIds,
      courseType,
      listCourseIds,
      completeStartTime,
      completeEndTime,
      startTime,
      endTime,
      companyId,
      learningProgress,
      signinId
    } = formData

    const filter = pickBy({
      companyId: companyId?.value,
      userName: name.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      lstGroup: listGroupIds.map(({ value }) => value),
      lstAttribute: listAtrributeIds.map(({ value }) => value),
      courseType: courseType.value,
      learningProgress: learningProgress.value,
      lstCourse: listCourseIds.map(({ value }) => value),
      completeStartTime: moment(completeStartTime).startOf('day').valueOf(),
      completeEndTime: moment(completeEndTime).endOf('day').valueOf(),
      startTime: moment(startTime).startOf('day').valueOf(),
      endTime: moment(endTime).endOf('day').valueOf(),
      sortBy: sortParams?.params?.sortBy,
      sortType: sortParams?.params?.sortType,
      signinId: signinId.trim()
    }, identity)

    const filterValuesForUnitScreen = omit({
      ...filter,
      companyId,
      name: filter.userName,
      listGroupIds,
      listAtrributeIds,
      listCourseIds,
      completeStatus: learningProgress,
      courseType
    }, ['userName', 'lstGroup', 'lstAttribute', 'lstCourse', 'learningProgress', 'sortBy', 'sortType'])

    setFilterValues(filterValuesForUnitScreen)

    loadCourseStatusAction({
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
      name: '',
      email: '',
      companyId: valueOfNissokenCompany,
      listGroupIds: [],
      listAtrributeIds: [],
      listCourseIds: [],
      courseType: courseTypeAll[1],
      learningProgress: PROGRESS_OPTION(t)[0],
      time: [],
      completeTime: [],
      completeStartTime: null,
      completeEndTime: null,
      startTime: null,
      endTime: null,
      sortBy: null,
      sortType: null,
      signinId: ''
    })
    resetCoursesAction()
    setSortInfo(null)
    setFilterValues({})
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
    loadCourseListAction({
      params: {
        courseType: isSuperAdmin ? COURSE_TYPE.NISSOKEN : COURSE_TYPE.COMPANY,
        companyId: isSuperAdmin && idOfNissokenCompany
      } })
    if (isSuperAdmin) {
      loadGroupsAction({ params: { companyId: idOfNissokenCompany } })
      loadAttributesAction({ params: { companyId: idOfNissokenCompany } })
    }
  }, [pageSize, isSuperAdmin, valueOfNissokenCompany, courseTypeAll])

  useEffect(() => {
    if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
    }
  }, [isSuperAdmin, valueOfNissokenCompany])

  useEffect(() => {
    loadCourseListAction({
      params: {
        courseType: isSuperAdmin ? COURSE_TYPE.NISSOKEN : COURSE_TYPE.COMPANY,
        companyId: isSuperAdmin && idOfNissokenCompany
      }
    })
    loadGroupsAction({ params: { companyId: isSuperAdmin && idOfNissokenCompany } })
    loadAttributesAction({ params: { companyId: isSuperAdmin && idOfNissokenCompany } })
  }, [isSuperAdmin])

  useEffect(() => {
    if (courseTypeAll) {
      setValue('courseType', courseTypeAll[1])
    }
  }, [courseTypeAll])

  useEffect(() => {
    // change value follow by language
    const indexCourseType = courseTypeAll.findIndex((item) => item?.value === courseTypeWatch?.value)
    if (indexCourseType !== -1) {
      setValue('courseType', courseTypeAll[indexCourseType])
    }
  }, [t])

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
        courseType: company.value === idOfNissokenCompany ? COURSE_TYPE.NISSOKEN : COURSE_TYPE.COMPANY,
        companyId: company?.value
      }
    })
  }

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
            <FormTreeSelect
              t={t}
              multiple
              name="listGroupIds"
              valueKey="departmentId"
              labelKey="name"
              label={t('group')}
              options={listGroup}
              onKeyDown={handleEnterSearch}
              dropdownClassName="dropdown-tree-select"
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
              name="listAtrributeIds"
              valueKey="attributeId"
              labelKey="attributeName"
              label={t('attribute')}
              options={listAttribute}
              onKeyDown={handleEnterSearch}
              dropdownClassName="dropdown-tree-select"
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
              onKeyDown={handleEnterSearch}
              dropdownClassName="dropdown-tree-select"
              loading={isLoadingCourseList}
              disabled={isLoadingCourseList}
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
              startTimeName="completeStartTime"
              endTimeName="completeEndTime"
              startTime={completeStart}
              endTime={completeEnd}
              label={t('completion_date_and_time')}
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
              label={t('learning_start_date_and_time')}
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
              name="learningProgress"
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

export default FilterBlock
