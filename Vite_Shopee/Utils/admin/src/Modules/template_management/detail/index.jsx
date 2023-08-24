/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import { EditOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import
{
  FormInput,
  FormLabel,
  FormTextArea, ModalNonForm,
  Text, Title
} from 'Components'

import { useTemplateManagement } from 'Hooks/template_management'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Divider, Right, Row, Wrapper } from 'Themes/facit'
import Schema from './schema'

const TemplateDetailScreen = () => {
  const { t } = useTranslation(['reportTemplateManagement'])

  const { templateId } = useParams()
  const {
    getTemplateDetailAction,
    templateDetail
  } = useTemplateManagement()

  const form = useForm({
    resolver: yupResolver(Schema(t))
  })

  const [visibleErrorSize, setVisibleErrorSize] = useState(false)

  const { dataTemplate } = templateDetail

  const {
    setValue
  } = form

  useEffect(() => {
    getTemplateDetailAction({ templateId })
  }, [])

  const setInitData = () => {
    setValue('title', dataTemplate.title)
    setValue('name', dataTemplate.name)
    setValue('email', dataTemplate.email)
    setValue('description', dataTemplate.description)
    setValue('createdDate', moment(dataTemplate.createdDate).format('YYYY-MM-DD'))
    setValue('signinId', dataTemplate.signinId)
  }

  useEffect(() => {
    if (dataTemplate?.id) {
      setInitData()
    }
  }, [dataTemplate])

  return (
    <Wrapper>
      <Title icon={EditOutlined} title={t('template_detail')} />
      <div className="form-wrapper">
        <form>
          <FormProvider {...form}>
            <Row>
              <FormLabel
                title={t('common:loginId')}
              />
              <Right>
                <FormInput
                  t={t}
                  name="signinId"
                  maxLength={100}
                  disabled
                  style={{ color: '#1A1A1A' }}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('name')}
              />
              <Right>
                <FormInput
                  t={t}
                  name="name"
                  maxLength={100}
                  disabled
                  style={{ color: '#1A1A1A' }}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('title')}
              />
              <Right>
                <FormInput
                  t={t}
                  name="title"
                  maxLength={100}
                  disabled
                  style={{ color: '#1A1A1A' }}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('email')}
              />
              <Right>
                <FormInput
                  t={t}
                  name="email"
                  maxLength={100}
                  disabled
                  style={{ color: '#1A1A1A' }}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('description')}
              />
              <Right>
                <FormTextArea
                  t={t}
                  name="description"
                  total={4000}
                  rows={4}
                  disabled
                  style={{ color: '#1A1A1A' }}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('createdDate')}
              />
              <Right>
                <FormInput
                  t={t}
                  name="createdDate"
                  maxLength={100}
                  disabled
                  style={{ color: '#1A1A1A' }}
                />
              </Right>
            </Row>
            <Divider />
          </FormProvider>
        </form>
      </div>
      {/* Modal warning exceeded limit */}
      <ModalNonForm
        size="small"
        visible={visibleErrorSize}
        cancel={false}
        onSubmit={() => setVisibleErrorSize(false)}
        onCancel={() => setVisibleErrorSize(false)}
        onSubmitText={t('common:agree')}
      >
        <Text.primary
          fontSize="size_16"
          style={{ textAlign: 'center' }}
        >
          {t('upload_file:talk_board.upload_exceed_limit')}
        </Text.primary>
      </ModalNonForm>
    </Wrapper>
  )
}

export default TemplateDetailScreen
