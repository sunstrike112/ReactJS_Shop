/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, FormSelect, FormTreeSelect, HeaderSearch } from 'Components'
import { useLoadCourseCategory, useLoadCourseAssignment } from 'Hooks'
import { Row, Col } from 'antd'
import { COMPANY_NAME } from 'Constants/course'
import { COURSE_TYPE } from 'Constants'
import { DEFAULT_PAG } from 'Utils'

const FilterBlockSelectCourse = ({ t, setRowSelected }) => {
  const { courseCategoryOptions, isLoadingCategory, loadCourseCategoryAction } = useLoadCourseCategory()
  const { loadCourseAssignmentAction, pagination: { limit } } = useLoadCourseAssignment()

  const courseTypeOptions = [
    { value: COURSE_TYPE.NISSOKEN, label: COMPANY_NAME.NISSOKEN }
  ]

  const DEFAULT_VALUE = {
    categoryId: [],
    courseType: courseTypeOptions[0]
  }

  const form = useForm({
    defaultValues: DEFAULT_VALUE
  })
  const { handleSubmit, reset, setValue } = form

  const onSubmit = useCallback((formData) => {
    const { courseName, categoryId, courseType } = formData
    const data = {
      courseName: courseName ? encodeURIComponent(courseName?.trim()) : '',
      categoryId: categoryId?.length ? categoryId?.map((item) => item.value) : [],
      courseType: courseType.value
    }
    loadCourseAssignmentAction({ params: { ...DEFAULT_PAG, limit: limit || DEFAULT_PAG.limit, isJobnare: true, filter: { ...data } } })
  }, [limit])

  const handleReset = () => {
    reset(DEFAULT_VALUE)
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
    loadCourseAssignmentAction({ params: { ...DEFAULT_PAG, isJobnare: true, filter: { courseType: COURSE_TYPE.NISSOKEN } } })
    loadCourseCategoryAction({
      params: {
        courseType: COURSE_TYPE.NISSOKEN
      }
    })
  }

  const handleOnChange = (courseType) => {
    loadCourseCategoryAction({
      params: {
        courseType: courseType.value
      }
    })
    setValue('courseType', courseType)
    setValue('categoryId', [])
  }

  return (
    <FormProvider {...form}>
      <HeaderSearch
        onCancel={handleReset}
        onSubmit={handleSubmit(onSubmit)}
        popup
      >
        <Row className="form-group" gutter={24}>
          <Col span={12}>
            <FormSelect
              t={t}
              name="courseType"
              label={t('course_type')}
              isSearchable={false}
              isClearable={false}
              options={courseTypeOptions}
              onChange={handleOnChange}
              wrapperProps={{
                colon: false,
                labelCol: { span: 11 },
                wrapperCol: { span: 13 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormTreeSelect
              t={t}
              name="categoryId"
              valueKey="courseCategoryId"
              labelKey="courseCategoryName"
              label={t('course:registration_course.management.course_category_name')}
              options={courseCategoryOptions}
              loading={isLoadingCategory}
              disabled={isLoadingCategory}
              wrapperProps={{
                colon: false,
                labelCol: { span: 11 },
                wrapperCol: { span: 13 },
                labelAlign: 'right'
              }}
              multiple
            />
          </Col>
          <Col span={12}>
            <FormInput
              t={t}
              name="courseName"
              label={t('common:course')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 11 },
                wrapperCol: { span: 13 },
                labelAlign: 'right'
              }}
            />
          </Col>
        </Row>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlockSelectCourse
