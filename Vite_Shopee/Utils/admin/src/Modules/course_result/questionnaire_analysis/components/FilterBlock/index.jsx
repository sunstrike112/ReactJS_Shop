/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { Row, Col } from 'antd'
import { pickBy, identity, uniqBy } from 'lodash'

import { useMyCompany, useQuestionnaire } from 'Hooks'
import {
  HeaderSearch,
  FormSelect,
  FormTreeSelect
} from 'Components'
import styled from 'styled-components'
import { handleSearchSelectTree } from 'Utils'

const Wrapper = styled.div`
  .ant-select-selector {
    align-items: center;
  }
`

const wrapperProps = {
  colon: false,
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
  labelAlign: 'right'
}

const COMPANY_ID = 'companyId'

const FilterBlock = ({
  sortParams,
  // setSortInfo,
  isSuperAdmin,
  companyAll,
  setRowSelected,
  pagination,
  action,
  resetAction,
  resetDataTableAction,
  saveFilter,
  isSurvey
}) => {
  const { t } = useTranslation(['courseResult'])

  const {
    listCourse,
    listUnitAll,
    isLoadingCourseList,
    loadCourseListAction,
    loadUnitListAllAction
  } = useQuestionnaire()

  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll
  const { limit: pageSize } = pagination
  const [unitOptions, setUnitOptions] = useState(listUnitAll)

  const form = useForm({
    defaultValues: {
      name: null,
      courseId: null,
      unitTestId: null,
      unitSurveyId: null
    }
  })
  const { handleSubmit, reset, watch, setValue, getValues } = form

  const [
    courseIdWatch,
    courseTypeWatch,
    companyIdWatch
  ] = watch(['courseId', 'courseType', 'companyId'])

  const { courseTypeAll } = useMyCompany(companyIdWatch?.label || '')

  useEffect(() => {
    loadCourseListAction({
      params: {
        courseType: isSuperAdmin ? 'NISSOKEN' : 'COMPANY',
        companyId: isSuperAdmin && idOfNissokenCompany
      }
    })
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
    if (courseIdWatch?.value) {
      loadUnitListAllAction({
        unitType: isSurvey ? 'SURVEY' : 'TEST',
        lstCourse: [courseIdWatch.value]
      })
      setValue('unitTestId', null)
      setValue('unitSurveyId', null)
    }
  }, [courseIdWatch?.value])

  useEffect(() => {
    const indexCourseType = courseTypeAll.findIndex((item) => item.value === courseTypeWatch?.value)
    if (indexCourseType !== -1) {
      setValue('courseType', courseTypeAll[indexCourseType])
    }
  }, [t])

  const onSubmit = useCallback((formData) => {
    resetDataTableAction()
    const {
      companyId,
      courseId,
      unitTestId,
      unitSurveyId,
      courseType
    } = formData

    const filter = pickBy({
      companyId: companyId?.value,
      courseId: courseId?.value ? [courseId?.value] : null,
      courseType: courseType?.value,
      unitTestId: unitTestId?.value,
      unitSurveyId: unitSurveyId?.value,
      sortBy: sortParams?.params?.sortBy,
      sortType: sortParams?.params?.sortType
    }, identity)

    action({
      params: {
        ...filter,
        page: 1,
        limit: pageSize
      }
    })

    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })

    saveFilter({ ...filter })
  }, [sortParams, action, pageSize, setRowSelected])

  const handleCancel = () => {
    reset({
      companyId: valueOfNissokenCompany,
      courseType: courseTypeAll[1],
      courseId: null,
      unitTestId: null,
      unitSurveyId: null,
      sortBy: null,
      sortType: null
    })

    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })

    // setSortInfo(null)
    resetAction()
    loadCourseListAction({
      params: {
        courseType: isSuperAdmin ? 'NISSOKEN' : 'COMPANY',
        companyId: isSuperAdmin && idOfNissokenCompany
      }
    })
  }

  useEffect(() => {
    if (isSuperAdmin) {
      setValue(COMPANY_ID, valueOfNissokenCompany)
    }
  }, [isSuperAdmin, valueOfNissokenCompany])

  const [init, setInit] = useState(false)
  useEffect(() => {
    if (init) handleCancel()
    setInit(true)
  }, [isSurvey])

  useEffect(() => {
    setUnitOptions(listUnitAll)
  }, [listUnitAll])

  const handleSelectCompany = (company) => {
    reset({
      companyId: company,
      courseType: courseTypeAll[1],
      courseId: null,
      unitTestId: null,
      unitSurveyId: null,
      sortBy: null,
      sortType: null
    })
    loadCourseListAction({
      params: {
        courseType: company.value === idOfNissokenCompany ? 'NISSOKEN' : 'COMPANY',
        companyId: company?.value
      }
    })
  }

  const handleChangeCourseType = (courseType) => {
    loadCourseListAction({
      params: {
        courseType: courseType.value,
        companyId: isSuperAdmin && companyIdWatch?.value
      }
    })
    reset({
      companyId: getValues().companyId,
      courseType,
      courseId: null,
      unitTestId: null,
      unitSurveyId: null,
      sortBy: null,
      sortType: null
    })
  }

  const handleEnterSearch = (event) => {
    if (event.code === 'Enter') {
      event.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  return (
    <Wrapper>
      <FormProvider {...form}>
        <HeaderSearch onSubmit={handleSubmit(onSubmit)} onCancel={handleCancel} className="filter-block">
          <Row gutter={24} style={{ width: '100%' }}>
            {isSuperAdmin && (
              <Col span={12}>
                <FormSelect
                  name={COMPANY_ID}
                  label={t('company:company_name')}
                  options={companyOptions}
                  isClearable={false}
                  onChange={handleSelectCompany}
                  wrapperProps={wrapperProps}
                />
              </Col>
            )}
            <Col span={12}>
              <FormSelect
                t={t}
                name="courseType"
                label={t('course:course_type')}
                isClearable={false}
                isSearchable={false}
                options={courseTypeAll}
                onChange={handleChangeCourseType}
                wrapperProps={wrapperProps}
              />
            </Col>
            <Col span={12}>
              <FormTreeSelect
                t={t}
                name="courseId"
                rules={{ required: t('required_pls_select_course') }}
                valueKey="courseId"
                labelKey="courseName"
                label={t('questionnaire_course_name')}
                options={listCourse}
                loading={isLoadingCourseList}
                disabled={isLoadingCourseList}
                filterTreeNode={handleSearchSelectTree}
                onKeyDown={handleEnterSearch}
                dropdownClassName="dropdown-tree-select"
                wrapperProps={wrapperProps}
              />
            </Col>
            <Col span={12}>
              <FormTreeSelect
                t={t}
                name={isSurvey ? 'unitSurveyId' : 'unitTestId'}
                valueKey="unitId"
                labelKey="unitName"
                label={t(isSurvey ? 'questionnaire_survey_name' : 'questionnaire_unit_name')}
                options={courseIdWatch?.length !== 0 ? uniqBy(unitOptions, 'unitId') : []}
                filterTreeNode={handleSearchSelectTree}
                onKeyDown={handleEnterSearch}
                dropdownClassName="dropdown-tree-select"
                wrapperProps={wrapperProps}
              />
            </Col>
          </Row>
        </HeaderSearch>
      </FormProvider>
    </Wrapper>
  )
}

export default FilterBlock
