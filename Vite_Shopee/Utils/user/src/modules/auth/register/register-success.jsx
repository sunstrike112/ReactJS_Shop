/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import { Form, Row } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { SubmitButton, TextPrimary } from '../../../components'
import { locationLogin } from '../../../utils'
import AuthLayout from '../../layouts/auth'
import { Body, Wrapper, MessageBox } from './styled'

const RegisterEmailScreen = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const [form] = Form.useForm()

  const handleSubmit = () => {
    history.push(locationLogin())
  }

  return (
    <AuthLayout isFooter={false}>
      <Wrapper>
        <TextPrimary
          className="login__title"
          fontSize="size_24"
          fontWeight="bold"
        >
          {t('register.register_title')}
        </TextPrimary>

        <Body>
          <MessageBox>
            <TextPrimary fontSize="size_14" className="first-success-message">
              {t('register.register_success_message_1')}
            </TextPrimary>

            <TextPrimary fontSize="size_14">
              {t('register.register_success_message_2')}
            </TextPrimary>

            <TextPrimary fontSize="size_14">
              {t('register.register_success_message_3')}
            </TextPrimary>

            <TextPrimary fontSize="size_14">
              {t('register.register_success_message_4')}
            </TextPrimary>
          </MessageBox>
          <Form
            name="register"
            onFinish={handleSubmit}
            requiredMark={false}
            form={form}
          >
            <Row justify="center">
              <Form.Item>
                <SubmitButton
                  htmlType="submit"
                  title={<span>{t('register.register_close')}</span>}
                />
              </Form.Item>
            </Row>
          </Form>
        </Body>
      </Wrapper>
    </AuthLayout>
  )
}

export default RegisterEmailScreen
