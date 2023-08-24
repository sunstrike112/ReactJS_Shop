/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, FormSelect, HeaderSearch } from 'Components'
import { useQuestionSetting } from 'Hooks'
import { Row, Col } from 'antd'

const FilterBlock = ({ t, isClearData, setIsClearData, setRowSelected }) => {
  const { unitId } = useParams()
  const { getQuestionListAction, questionSetting } = useQuestionSetting()
  const { pagination } = questionSetting
  const { limit } = pagination

  const optionsType = [
    { value: null, label: t('common:select_all') },
    { value: 'SELECT_ONE', label: t('question_setting.single_choice') },
    { value: 'CHOOSE_MANY', label: t('question_setting.multiple_choice') },
    { value: 'DESCRIPTION', label: t('question_setting.description_choice') }
  ]

  const defaultValues = {
    questionType: optionsType[0],
    questionText: ''
  }

  const form = useForm({ defaultValues })
  const { handleSubmit, reset, setValue, watch } = form

  const questionTypeWatch = watch('questionType')

  useEffect(() => {
    // change value follow by language
    const indexQuestionType = optionsType.findIndex((item) => item.value === questionTypeWatch.value)
    setValue('questionType', optionsType[indexQuestionType])
  }, [t])

  const onSubmit = useCallback((formData) => {
    const { questionType, questionText } = formData
    const data = {
      questionType: questionType.value,
      questionText: questionText.trim()
    }
    getQuestionListAction({ unitId, params: { page: 1, limit: limit || 100, filter: { ...data } } })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }, [unitId, limit])

  const handleResetData = useCallback(() => {
    reset(defaultValues)
    setIsClearData(!isClearData)
    getQuestionListAction({ unitId, params: { page: 1, limit: limit || 100 } })
    setRowSelected({
      selectedRowKeys: [],
      selectedRows: []
    })
  }, [limit])

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={() => handleResetData()} onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={24} style={{ minWidth: 900 }}>
          <Col span={12}>
            <FormSelect
              t={t}
              name="questionType"
              isSearchable={false}
              label={t('question_setting.question_type')}
              placeholder={null}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                labelAlign: 'right'
              }}
              options={optionsType}
              isClearable={false}
            />
          </Col>
          <Col span={12}>
            <FormInput
              name="questionText"
              label={t('question_setting.question_text')}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
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
