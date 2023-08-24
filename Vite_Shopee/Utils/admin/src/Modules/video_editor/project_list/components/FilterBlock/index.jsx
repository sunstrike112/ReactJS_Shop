/* eslint-disable react/prop-types */
import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FormInput, HeaderSearch } from 'Components'
import { useLoadProjectList } from 'Hooks'
import { Row, Col } from 'antd'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup'
import { validateSpecialWord } from 'Utils'

const RowStyled = styled(Row)`
  margin: 0 !important;
  width: 100%;
  max-width: 500px;
`
export const projectNameSchema = (t) => yup.object().shape({
  projectName: yup.string()
    .max(100, t('error_message:validation.max_length', { key: t('project_name'), max: 100 }))
    .trim()
    .test('isValidateSpecialWord', t('error_message:validation.special_word'), validateSpecialWord)
})

const FilterBlock = () => {
  const { t } = useTranslation('project')
  const {
    pagination,
    loadListProjectsAction,
    resetStateAction
  } = useLoadProjectList()

  const { limit } = pagination

  const form = useForm({
    defaultValues: {
      projectName: ''
    },
    resolver: yupResolver(projectNameSchema(t))
  })
  const { handleSubmit, reset } = form

  const onSubmit = useCallback((formData) => {
    const { projectName } = formData
    const data = { projectName: projectName?.trim() }
    loadListProjectsAction({
      params: {
        page: 1,
        limit: limit || 100,
        filter: { ...data }
      }
    })
  }, [limit])

  const handleReset = () => {
    reset({
      projectName: ''
    })
    resetStateAction()
  }

  return (
    <FormProvider {...form}>
      <HeaderSearch onCancel={handleReset} onSubmit={handleSubmit(onSubmit)}>
        <RowStyled justify="center">
          <Col span={24}>
            <FormInput
              name="projectName"
              label={t('project_name')}
              wrapperProps={{
                colon: false,
                labelCol: 6,
                wrapperCol: 18,
                labelAlign: 'right'
              }}
            />
          </Col>
        </RowStyled>
      </HeaderSearch>
    </FormProvider>
  )
}

export default FilterBlock
