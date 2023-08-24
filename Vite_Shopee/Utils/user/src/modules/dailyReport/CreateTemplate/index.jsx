/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Col, Space } from 'antd'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BACK_ICON } from '../../../assets'
import { Modal, TextNormal } from '../../../components'
import { FormInput, FormTextArea } from '../../../components/form'
import { useDailyReports, useHistories } from '../../../hooks'
import { fontWeight } from '../../../themes/fonts'
import HomeLayout from '../../layouts/home'
import Schema from './schema'
import { Wrapper } from './styled'

const CreateTemplateScreen = () => {
  // Use hooks
  const history = useHistories()
  const { t } = useTranslation()
  const {
    createTemplateAction
  } = useDailyReports()
  // End use hooks

  const [visibleCreateSuccess, setVisibleCreateSuccess] = useState(false)

  const form = useForm({
    resolver: yupResolver(Schema()),
    defaultValues: {
      title: '',
      description: ''
    }
  })
  const { handleSubmit, formState: { errors } } = form

  const onSubmit = (formData) => {
    const data = {
      title: formData.title.trim(),
      description: formData.description.trim()
    }
    createTemplateAction({
      data,
      callback: {
        done: () => setVisibleCreateSuccess(true)
      }
    })
  }

  const goBack = () => history.go(-1)

  return (
    <HomeLayout>
      <Wrapper>
        <div className="talk-board-form">
          <div className="title">{t('dailyReports.template.create_template')}</div>
          <hr />
          <FormProvider {...form}>
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
            />
            <FormTextArea
              t={t}
              name="description"
              label={t('dailyReports.template.description')}
              isRequired
              maxLength={4000}
              total={4000}
              rows={8}
              wrapperProps={{
                colon: false,
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
                labelAlign: 'left'
              }}
            />
            <div className="form-action-group">
              <Space>
                <Button
                  htmlType="button"
                  className="btn-cancel"
                  onClick={goBack}
                  style={{
                    border: '1px solid #1A1A1A',
                    fontWeight: '500'
                  }}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-post"
                  onClick={handleSubmit(onSubmit)}
                  disabled={Object.keys(errors).length}
                >
                  {/* The text will be auto inserted space in the middle if text just includes 2 character => add &#127; html charter code to fix it */}
                  &#127;{t('dailyReports.template.save')}
                </Button>
              </Space>
            </div>
          </FormProvider>
        </div>
      </Wrapper>
      <Modal
        isModalVisible={visibleCreateSuccess}
        setIsModalVisible={setVisibleCreateSuccess}
        isCancel={false}
        description={t('dailyReports.template.create_success')}
        okText={t('common.yes')}
        onOk={goBack}
        borderRadiusButton={6}
      />
    </HomeLayout>
  )
}

export default CreateTemplateScreen
