import { Form, Row, Spin } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SubmitButton, TextPrimary } from '../../../components'
import { TYPE_REGISTER } from '../../../constants'
import { useResedEmail } from '../../../hooks'
import AuthLayout from '../../layouts/auth'
import { Body, MessageBox, Wrapper } from './styled'

const RegisterEmailScreen = () => {
  const { onSubmit, isLoading, typeRegister } = useResedEmail()
  const { t } = useTranslation()

  const isUser = typeRegister === TYPE_REGISTER.INDIVIDUAL
  const isCompany = typeRegister === TYPE_REGISTER.COMPANY

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
            <TextPrimary fontSize="size_14" className="message">
              {isUser
                ? t('register.resend_link_message')
                : isCompany
                  ? t('register.expired_register_company_link')
                  : t('register.expired_register_employee_link')}
            </TextPrimary>
          </MessageBox>
          <Form name="resend" onFinish={onSubmit}>
            <Row justify="center">
              <Form.Item>
                <Spin
                  spinning={isLoading}
                  wrapperClassName="spin-button-submit"
                >
                  <SubmitButton
                    htmlType="submit"
                    title={(
                      <span>
                        {isUser
                          ? t('register.resend_link')
                          : t('register.register_close')}
                      </span>
                    )}
                  />
                </Spin>
              </Form.Item>
            </Row>
          </Form>
        </Body>
      </Wrapper>
    </AuthLayout>
  )
}

export default RegisterEmailScreen
