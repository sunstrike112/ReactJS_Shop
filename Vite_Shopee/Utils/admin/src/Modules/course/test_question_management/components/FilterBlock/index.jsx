/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { getAutocompleteCourse } from 'APIs'
import { useLoadTestUnits, useLoadTestQuestions } from 'Hooks'

import { FormInput, FormSelect, HeaderSearch, FormAutocompleteV2 } from 'Components'
import { Row, Col } from 'antd'
import { debounce } from 'lodash'
import styled from 'styled-components'

const FilerBlockDiv = styled.div`
  .ant-form.ant-form-horizontal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .ant-form.ant-form-horizontal > div:nth-child(1) {
    margin-right: 100px;
  }

  .ant-form-vertical .ant-form-item {
    flex-direction: row;
  }

  form.ant-form.ant-form-vertical {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .dropdown-tree-select {
    padding: 0 4px 0 0;
    word-break: break-word;
  }
`

const FilterBlock = ({ setRowSelected, isSuperAdmin, companyAll }) => {
  const { t } = useTranslation(['report_setting'])
  const { loadTestUnitsAction, testUnits } = useLoadTestUnits()
  const { loadTestQuestionsAction, pagination, resetQuestionsAction } = useLoadTestQuestions()
  const { limit } = pagination

  const { companyOptions, valueOfNissokenCompany, idOfNissokenCompany } = companyAll

  const optionsType = [
    { value: null, label: t('common:select_all') },
    { value: 'SELECT_ONE', label: t('unit_setting:question_setting.single_choice') },
    { value: 'CHOOSE_MANY', label: t('unit_setting:question_setting.multiple_choice') },
    { value: 'DESCRIPTION', label: t('unit_setting:question_setting.description_choice') }
  ]

  const defaultValues = {
    questionType: optionsType[0],
    unit: [],
    courseId: '',
    query: ''
  }

  const form = useForm({ defaultValues })
  const { handleSubmit, setValue, watch, reset } = form

  const [companyIdWatch] = watch(['companyId'])

  const [isLoading, setIsLoading] = useState(false)
  const [groupOptions, setGroupOptions] = useState([])
  const [courseSelected, setCourseSelected] = useState(null)

  const questionTypeWatch = watch('questionType')
  const courseWatch = watch('courseId')

  useEffect(() => {
    // change value follow by language
    const indexQuestionType = optionsType.findIndex((item) => item.value === questionTypeWatch.value)
    setValue('questionType', optionsType[indexQuestionType])
  }, [t])

  const onSubmit = useCallback((formData) => {
    const { unit, questionType, query, companyId } = formData
    const data = {
      courseId: courseSelected,
      unitId: unit?.length ? unit.map(({ value }) => value) : [],
      questionType: questionType?.value || '',
      query: query.trim(),
      companyId: companyId?.value
    }
    loadTestQuestionsAction({ params: { page: 1, limit: limit || 100, filter: { ...data } } })
  }, [limit, courseSelected])

  const renderTitle = (title) => (
    <span>
      {title}
    </span>
  )

  const renderItem = (item) => ({
    data: JSON.stringify(item),
    value: item.courseName,
    title: item.courseName,
    label: (
      <span>
        {item.courseName}
      </span>
    )
  })

  const handleConvertToGroupOptions = (data) => Object.keys(data).map((key) => ({
    label: renderTitle(key === 'No category' ? t('unit_setting:filter.no_category') : key),
    options: data[key].map(renderItem)
  }))

  const handleGetCourse = debounce((courseName = '', companyId = idOfNissokenCompany) => {
    setIsLoading(true)
    getAutocompleteCourse({ courseName, companyId: isSuperAdmin && companyId })
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

  const handleSelect = useCallback((value, option) => {
    setValue('unit', null)
    const selected = { ...option, data: JSON.parse(option.data) }
    if (selected) {
      const { courseId } = selected.data
      setCourseSelected(courseId)
      loadTestUnitsAction({ params: { courseId } })
    }
  }, [])

  const handleClearCourse = useCallback(() => {
    setValue('unit', null)
    setCourseSelected(null)
  }, [])

  const handleResetData = useCallback(() => {
    reset(defaultValues)
    if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
    }
    setGroupOptions([])
    setCourseSelected(null)
    handleGetCourse()
    resetQuestionsAction()
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }, [isSuperAdmin, valueOfNissokenCompany])

  const handleSelectCompany = useCallback((valueCompany) => {
    setValue('companyId', valueCompany)
    setValue('courseId', '')
    handleGetCourse('', valueCompany.value)
    setCourseSelected(null)
  }, [])

  useEffect(() => {
    handleSuggestion()
  }, [t])

  useEffect(() => {
    if (isSuperAdmin) {
      setValue('companyId', valueOfNissokenCompany)
    }
  }, [isSuperAdmin, valueOfNissokenCompany])

  return (
    <HeaderSearch onCancel={() => handleResetData()} onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <FilerBlockDiv>
          <Row gutter={24} style={{ minWidth: 900 }}>
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
            <Col span={12}>
              <FormAutocompleteV2
                label={t('course:block_course_title')}
                name="courseId"
                options={groupOptions}
                onSelect={handleSelect}
                onSearch={handleSuggestion}
                allowClear
                onClear={handleClearCourse}
                loading={isLoading}
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
                name="unit"
                label={t('unit_setting:unit')}
                placeholder={t('common:select')}
                options={courseWatch ? testUnits : []}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
                isMulti
                loading={isLoading}
              />
            </Col>
            <Col span={12}>
              <FormSelect
                t={t}
                name="questionType"
                isSearchable={false}
                label={t('unit_setting:question_setting.question_type')}
                placeholder={null}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
                options={optionsType}
                isClearable={false}
              />
            </Col>
            <Col span={12}>
              <FormInput
                name="query"
                label={t('unit_setting:question_setting.question_text')}
                wrapperProps={{
                  colon: false,
                  labelCol: { span: 10 },
                  wrapperCol: { span: 14 },
                  labelAlign: 'right'
                }}
              />
            </Col>
          </Row>
        </FilerBlockDiv>
      </FormProvider>
    </HeaderSearch>
  )
}

export default FilterBlock
