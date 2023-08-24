/* eslint-disable react/prop-types */
import React, { useCallback, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { getAutocompleteCourse } from 'APIs'
import { useLoadReports } from 'Hooks'

import { FormAutocomplete, FormSelect, HeaderSearch } from 'Components'
import { Row, Col } from 'antd'

const FilterBlock = () => {
  const { t, i18n } = useTranslation(['report_setting'])
  const { loadReportsAction } = useLoadReports()

  const optionsPublish = useMemo(() => ([
    { value: null, label: t('common:select_all') },
    { value: 'PUBLIC', label: t('publish') },
    { value: 'PRIVATE', label: t('do_not_publish') }
  ]), [t])

  const defaultValues = {
    courseIds: '',
    publishSetting: optionsPublish[0]
  }

  const form = useForm({ defaultValues })
  const { handleSubmit, watch, setValue } = form

  const publishSettingWatch = watch('publishSetting')

  useEffect(() => {
    // change value follow by language
    const indexPublishSetting = optionsPublish.findIndex((item) => item.value === publishSettingWatch.value)
    setValue('publishSetting', optionsPublish[indexPublishSetting])
  }, [t])

  const handleConvertToOptions = (v) => ({
    data: v,
    label: v.courseName,
    value: v.courseName
  })

  const handleConvertToGroupOptions = (data) => Object.keys(data).map((key) => ({
    label: key === 'No category' ? t('unit_setting:filter.no_category') : key,
    options: data[key].map(handleConvertToOptions)
  }))

  const handleSuggestion = async (inputValue) => {
    const response = await getAutocompleteCourse({ courseName: inputValue })
    const courseGroupByCategoryObj = response.data.data
    const groupOptions = handleConvertToGroupOptions(courseGroupByCategoryObj)
    return groupOptions
  }

  const onSubmit = useCallback((formData) => {
    const { courseIds, publishSetting } = formData
    const data = {
      courseIds: courseIds?.data?.courseId || '',
      publishSetting: publishSetting.value
    }
    loadReportsAction({ params: { page: 1, limit: 100, filter: { ...data } } })
  }, [])

  return (
    <FormProvider {...form}>
      <HeaderSearch onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={24}>
          <Col span={12}>
            <FormAutocomplete
              key={i18n.language}
              t={t}
              name="courseIds"
              label={t('course:block_course_title')}
              placeholder={t('course:block_course_title')}
              handleSuggestion={handleSuggestion}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right'
              }}
            />
          </Col>
          <Col span={12}>
            <FormSelect
              t={t}
              name="publishSetting"
              isSearchable={false}
              label={t('publish_other_students')}
              placeholder={null}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right'
              }}
              options={optionsPublish}
              isClearable={false}
            />
          </Col>
        </Row>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
