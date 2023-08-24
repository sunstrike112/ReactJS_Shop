/* eslint-disable react/prop-types */
import React, { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { Row, Col } from 'antd'
import { pickBy, identity } from 'lodash'

import { useCourseStatus, useMyCompany } from 'Hooks'
import { UseSurveyResult } from 'Hooks/survey_result'
import { HeaderSearch, FormTreeSelect, FormSelect } from 'Components'
import { handleSearchSelectTree } from 'Utils'

const FilterBlock = ({ pageSize, isSuperAdmin, companyAll }) => {
  const {
    listCourse,
    loadCourseListAction,
    isLoadingCourseList
  } = useCourseStatus()
  const { loadSurveyResultAction } = UseSurveyResult()
  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll
  const { t } = useTranslation(['courseResult'])
  const form = useForm({
    defaultValues: {
      listCourseIds: []
    }
  })

  const { handleSubmit, reset, setValue, watch } = form

  const [courseTypeWatch, companyIdWatch] = watch(['courseType', 'companyId'])

  const { courseTypeAll } = useMyCompany(companyIdWatch?.label || '')

  const onSubmit = (formData) => {
    const { listCourseIds, courseType, companyId } = formData

    const filter = pickBy({
      companyId: companyId?.value,
      listCourse: listCourseIds?.value,
      courseType: courseType?.value
    }, identity)

    loadSurveyResultAction({
      params: {
        filter,
        page: 1,
        limit: pageSize
      }
    })
  }

  const handleCancel = useCallback(() => {
    reset({
      listCourseIds: [],
      courseType: courseTypeAll[1],
      companyId: valueOfNissokenCompany
    })
    loadCourseListAction({
      params: {
        courseType: isSuperAdmin ? 'NISSOKEN' : 'COMPANY',
        companyId: isSuperAdmin && idOfNissokenCompany
      }
    })
    loadSurveyResultAction({
      params: {
        page: 1,
        limit: pageSize,
        filter: {
          courseType: isSuperAdmin ? 'NISSOKEN' : 'COMPANY',
          companyId: isSuperAdmin && idOfNissokenCompany
        }
      }
    })
  }, [pageSize, isSuperAdmin, valueOfNissokenCompany])

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

  const handleSelectCompany = useCallback((company) => {
    setValue('companyId', company)
    loadCourseListAction({
      params: {
        courseType: company.value === idOfNissokenCompany ? 'NISSOKEN' : 'COMPANY',
        companyId: company?.value
      }
    })
  }, [])

  useEffect(() => {
    loadCourseListAction({
      params: {
        courseType: isSuperAdmin && 'NISSOKEN',
        companyId: isSuperAdmin && idOfNissokenCompany
      }
    })
  }, [])

  useEffect(() => {
    if (courseTypeAll[1].label) {
      setValue('courseType', courseTypeAll[1])
    }
  }, [courseTypeAll])

  useEffect(() => {
    if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
    }
  }, [companyAll, isSuperAdmin])

  useEffect(() => {
    // change value follow by language
    const indexCourseType = courseTypeAll.findIndex((item) => item.value === courseTypeWatch?.value)
    if (indexCourseType !== -1) {
      setValue('courseType', courseTypeAll[indexCourseType])
    }
  }, [t])

  return (
    <FormProvider {...form}>
      <HeaderSearch className="form" onSubmit={handleSubmit(onSubmit)} onCancel={handleCancel}>
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
              name="listCourseIds"
              valueKey="courseId"
              labelKey="courseName"
              label={t('course')}
              options={listCourse}
              placeholder=""
              dropdownStyle={{ paddingRight: 12 }}
              filterTreeNode={handleSearchSelectTree}
              loading={isLoadingCourseList}
              disabled={isLoadingCourseList}
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
