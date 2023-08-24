/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { debounce } from 'lodash'

import { HeaderSearch, FormAutocompleteV2, FormSelect } from 'Components'
import { getAutocompleteCourse } from 'APIs'
import { Row, Col } from 'antd'
import { COMPANY_NAME } from 'Constants/course'

const FilterBlock = ({ handleSelectCourseId, selectedCourse, isSuperAdmin, companyAll, selectCourseIdAction, setFilterDownloadCSV }) => {
  const { t } = useTranslation(['unit_setting'])

  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll

  const [isLoading, setIsLoading] = useState(false)
  const [groupOptions, setGroupOptions] = useState([])

  const form = useForm()
  const { setValue, watch, reset } = form

  const [companyIdWatch] = watch(['companyId'])

  const renderTitle = (title) => (
    <span>
      {title}
    </span>
  )

  const renderItem = (v) => ({
    data: JSON.stringify(v),
    value: `${v.courseId}`,
    title: v.courseName,
    label: (
      <span>
        {v.courseName}
      </span>
    )
  })

  const handleConvertToGroupOptions = (data) => (
    Object.keys(data).map((key) => ({
      label: renderTitle(key === 'No category' ? t('filter.no_category') : key),
      options: data[key].map(renderItem)
    }))
  )

  const handleGetCourse = debounce((courseName = '', companyId) => {
    setIsLoading(true)
    getAutocompleteCourse({ courseName, companyId })
      .then((response) => {
        const courseGroupByCategoryObj = response.data.data
        const options = handleConvertToGroupOptions(courseGroupByCategoryObj)
        setGroupOptions(options)
        setIsLoading(false)
      })
  }, 500)

  const handleSuggestion = useCallback((courseName = '') => {
    handleGetCourse(courseName, companyIdWatch?.value)
  }, [companyIdWatch])

  const handleSelectItem = (value, option) => {
    handleSelectCourseId(option, companyIdWatch)
  }

  useEffect(() => {
    if (isSuperAdmin) {
      setValue('companyId', { label: COMPANY_NAME.NISSOKEN, value: 1 })
      handleGetCourse('', idOfNissokenCompany)
    } else {
      handleGetCourse()
    }
  }, [isSuperAdmin])

  useEffect(() => {
    if (selectedCourse) {
      setValue('courseId', selectedCourse.title)
      if (isSuperAdmin) {
        if (selectedCourse.companyId.isAllCompany) {
          setValue('companyId', { label: t('common:select_all'), value: null, isAllCompany: true })
        } else {
          setValue('companyId', selectedCourse.companyId)
        }
        handleGetCourse('', selectedCourse.companyId.value)
      } else {
        handleGetCourse()
      }
    }
    setFilterDownloadCSV(selectedCourse.value)
  }, [isSuperAdmin, selectedCourse])

  const handleResetData = () => {
    reset({
      courseId: '',
      companyId: isSuperAdmin && valueOfNissokenCompany
    })
    selectCourseIdAction({
      data: {},
      companyId: valueOfNissokenCompany,
      title: '',
      value: '',
      label: {}
    })
    setGroupOptions([])
  }

  const handleSelectCompany = (valueCompany) => {
    reset({
      courseId: ''
    })
    selectCourseIdAction({
      data: {},
      companyId: valueCompany,
      title: '',
      value: '',
      label: {}
    })
  }

  return (
    <HeaderSearch onCancel={handleResetData}>
      <FormProvider {...form}>
        <Row className="form-group" gutter={24} justify="center" style={{ minWidth: 900 }}>
          {isSuperAdmin && (
            <Col span={12}>
              <FormSelect
                label={t('company:company_name')}
                name="companyId"
                options={companyOptions}
                onChange={handleSelectCompany}
                isClearable={false}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
              />
            </Col>
          )}
          <Col span={isSuperAdmin ? 12 : 16}>
            <FormAutocompleteV2
              label={t('filter.course_name')}
              name="courseId"
              options={isLoading ? [] : groupOptions}
              onSelect={handleSelectItem}
              onSearch={handleSuggestion}
              loading={isLoading}
              wrapperProps={{
                colon: false,
                labelCol: { span: isSuperAdmin ? 10 : 8 },
                wrapperCol: { span: isSuperAdmin ? 14 : 16 },
                labelAlign: 'right'
              }}
            />
          </Col>
        </Row>
      </FormProvider>
    </HeaderSearch>
  )
}

export default FilterBlock
