/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, FormSelect, FormTreeSelect, HeaderSearch } from 'Components'
import { useLoadCourseCategory, useLoadCourseAssignment, useRoles } from 'Hooks'
import { Row, Col } from 'antd'
import { COMPANY_NAME } from 'Constants/course'

const FilterBlockSelectCourse = ({ t, setRowSelected }) => {
  const { courseCategoryOptions, isLoadingCategory, loadCourseCategoryAction } = useLoadCourseCategory()
  const { loadCourseAssignmentAction, pagination: { limit } } = useLoadCourseAssignment()
  const { isHideJobNare } = useRoles()

  const courseTypeOptions = isHideJobNare
    ? [{ value: 'COMPANY', label: COMPANY_NAME.COMPANY }]
    : [{ value: 'COMPANY', label: COMPANY_NAME.COMPANY }, { value: 'NISSOKEN', label: COMPANY_NAME.NISSOKEN }]

  const form = useForm({
    defaultValues: {
      categoryId: [],
      courseType: courseTypeOptions[0]
    }
  })
  const { handleSubmit, reset, setValue } = form

  const onSubmit = useCallback((formData) => {
    const { courseName, categoryId, courseType } = formData
    const data = {
      courseName: courseName?.trim() || '',
      categoryId: categoryId?.length ? categoryId?.map((item) => item.value) : [],
      courseType: courseType.value
    }
    loadCourseAssignmentAction({ params: { page: 1, limit: limit || 100, filter: { ...data } } })
  }, [limit])

  const handleReset = () => {
    reset()
    loadCourseAssignmentAction({ params: { page: 1, limit: 100, filter: { courseType: 'COMPANY' } } })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
    loadCourseCategoryAction({
      params: {
        courseType: 'COMPANY'
      } })
  }

  const handleOnChange = useCallback((courseType) => {
    loadCourseCategoryAction({
      params: {
        courseType: courseType.value
      } })
    setValue('courseType', courseType)
    setValue('categoryId', [])
  }, [])

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
              label={t('select_course.course_type')}
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
