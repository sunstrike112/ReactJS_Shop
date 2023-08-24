/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Col, Row } from 'antd'

import { FormTreeSelect, FormSelect, FormInput, HeaderSearch } from 'Components'
import { useRoles } from 'Hooks/auth'
import { useRegistrationCourses } from 'Hooks'
import { Wrapper } from './styled'

const DEFAULT_VALUE = {
  courseName: '',
  courseCategory: []
}

const FilterBlock = ({
  t,
  loadCoursesAction,
  categoriesOption,
  setRowSelected,
  companyAll,
  isLoadingCategoriesOption,
  loadAllCategoriesAction,
  isResetFilter,
  setIsResetFilter,
  isWebviewMode
}) => {
  const { pagination, resetStateAction } = useRegistrationCourses()
  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll
  const form = useForm({
    defaultValues: DEFAULT_VALUE
  })
  const { limit: pageSize } = pagination
  const { isSuperAdmin } = useRoles()
  const { handleSubmit, reset, setValue } = form

  useEffect(() => {
    if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
    }
  }, [companyAll, isSuperAdmin])

  useEffect(() => {
    if (isResetFilter) {
      reset({
        ...DEFAULT_VALUE,
        companyId: isSuperAdmin && valueOfNissokenCompany
      })
      setIsResetFilter(false)
    }
  }, [isResetFilter, isSuperAdmin])

  const onSubmit = useCallback((data) => {
    const { courseCategory, courseName, companyId } = data

    const newCategory = [...courseCategory]
    for (let i = 0; i < newCategory.length; i += 1) {
      for (let j = 0; j < categoriesOption.length; j += 1) {
        if (newCategory[i].value === categoriesOption[j].courseCategoryId
            && categoriesOption[j].childList.length) {
          categoriesOption[j].childList.map(({ courseCategoryId, courseCategoryName }) => {
            const indexItem = newCategory.findIndex((item) => item.value === courseCategoryId)
            if (indexItem === -1) {
              newCategory.push({
                value: courseCategoryId,
                label: courseCategoryName
              })
            }
            return null
          })
        }
      }
    }

    const filter = {
      courseCategoryIds: newCategory?.map((item) => item.value),
      courseName: courseName.trim(),
      companyId: isSuperAdmin && companyId?.value
    }

    loadCoursesAction({
      params: {
        filter,
        page: 1,
        limit: pageSize
      }
    })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }, [pageSize, categoriesOption])

  const handleCancel = useCallback(() => {
    reset({
      ...DEFAULT_VALUE,
      companyId: isSuperAdmin && valueOfNissokenCompany
    })
    if (isSuperAdmin) {
      loadAllCategoriesAction({ params: { companyId: idOfNissokenCompany } })
    }
    resetStateAction()
  }, [companyAll, isSuperAdmin, valueOfNissokenCompany])

  const handleSelectCompany = useCallback((company) => {
    setValue('companyId', company)
    setValue('courseCategory', [])
    loadAllCategoriesAction({ params: { companyId: company.value } })
  }, [])

  return (
    <FormProvider {...form}>
      <Wrapper>
        <HeaderSearch onCancel={handleCancel} onSubmit={handleSubmit(onSubmit)}>
          {!isWebviewMode ? (
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
                <FormTreeSelect
                  t={t}
                  name="courseCategory"
                  valueKey="courseCategoryId"
                  labelKey="courseCategoryName"
                  options={categoriesOption}
                  loading={isLoadingCategoriesOption}
                  label={t('registration_course.management.course_category_name')}
                  wrapperProps={{
                    colon: false,
                    labelCol: { span: 10 },
                    wrapperCol: { span: 14 },
                    labelAlign: 'right'
                  }}
                  multiple
                />
              </Col>
              <Col span={12}>
                <FormInput
                  name="courseName"
                  label={t('registration_course.management.course_name')}
                  wrapperProps={{
                    colon: false,
                    labelCol: { span: 10 },
                    wrapperCol: { span: 14 },
                    labelAlign: 'right'
                  }}
                  maxLength={100}
                />
              </Col>
            </Row>
          ) : (
            <Row gutter={24}>
              <FormInput
                name="courseName"
                label={t('registration_course.management.course_name')}
                maxLength={100}
              />
            </Row>
          )}
        </HeaderSearch>
      </Wrapper>
    </FormProvider>
  )
}

export default FilterBlock
