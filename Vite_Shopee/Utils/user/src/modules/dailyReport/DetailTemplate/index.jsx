/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { FormInput, FormTextArea } from '../../../components/form'
import { useDailyReports } from '../../../hooks'
import HomeLayout from '../../layouts/home'
import Schema from './schema'
import { Wrapper } from './styled'

const DetailTemplate = () => {
  // Use hooks
  const { t } = useTranslation()
  const { templateId } = useParams()
  const {
    templateDetail,
    loadTemplateDetailAction
  } = useDailyReports()
  // End use hooks

  const form = useForm({
    resolver: yupResolver(Schema()),
    defaultValues: {
      title: '',
      description: ''
    }
  })
  const { setValue, formState: { errors, isDirty } } = form

  const setInitData = () => {
    setValue('title', templateDetail.data.title)
    setValue('description', templateDetail.data.description)
  }

  useEffect(() => {
    loadTemplateDetailAction({ templateId })
  }, [])

  useEffect(() => {
    if (templateDetail) {
      setInitData()
    }
  }, [templateDetail])

  return (
    <HomeLayout>
      <Wrapper>
        <div className="talk-board-form">
          <div className="title">{t('dailyReports.template.detail_template')}</div>
          <hr />
          <FormProvider {...form} isDirty={isDirty}>
            <FormInput
              t={t}
              name="title"
              label={t('dailyReports.template.title')}
              isRequired
              maxLength={100}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'left'
              }}
              style={{ color: '#1A1A1A' }}
              disabled
            />

            <FormTextArea
              t={t}
              name="description"
              label={t('dailyReports.template.description')}
              isRequired
              maxLength={2000}
              total={2000}
              rows={8}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'left'
              }}
              style={{ color: '#1A1A1A' }}
              disabled
            />
          </FormProvider>
        </div>
      </Wrapper>
    </HomeLayout>
  )
}

export default DetailTemplate
