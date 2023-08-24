import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Row, Spin } from 'antd'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  InputBox,
  SubmitButton,
  TextNormal,
  TextPrimary
} from '../../../components'
import { useRegisterEmail } from '../../../hooks'
import AuthLayout from '../../layouts/auth'
import registerSchema from './registerSchema'
import { Body, ErrorBox, Wrapper } from './styled'

const RegisterEmailScreen = () => {
  const { t } = useTranslation()

  const { isLoading, onRegisterEmail, errorRegister } = useRegisterEmail()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'all',
    defaultValues: {}
  })

  const renderError = () => {
    switch (errorRegister.type) {
      case 'ERROR_SAME_EMAIL_ADDRESS_REQUIRED':
        return t('register.used_email')
      default:
        return ''
    }
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
          <form onSubmit={handleSubmit(onRegisterEmail)}>
            <Row gutter={[32, 24]}>
              <Col span={6} className="register-label">
                {t('register.email')}
              </Col>
              <Col span={18}>
                <InputBox
                  register={register}
                  name="email"
                  error={errors.email}
                  placeholder="name@example.com"
                />
              </Col>

              <Col span={24}>
                <Row gutter={[32, 0]}>
                  <Col span={6} className="register-label">
                    {t('register.register_name')}
                  </Col>
                  <Col span={18}>
                    <InputBox
                      register={register}
                      name="fullName"
                      error={errors.fullName}
                    />
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <Row gutter={[32, 0]}>
                  <Col span={6} className="register-label">
                    {t('register.furigana_name')}
                  </Col>
                  <Col span={18}>
                    <InputBox
                      register={register}
                      name="fullFurigana"
                      error={errors.fullFurigana}
                    />
                  </Col>
                </Row>
              </Col>

              <Col span={6} className="register-label">
                {t('register.company_name')}
              </Col>
              <Col span={18}>
                <InputBox
                  register={register}
                  name="companyName"
                  error={errors.companyName}
                />
              </Col>
              {errorRegister && (
                <Col span={24}>
                  <ErrorBox>
                    <TextNormal fontWeight="fw_400" color="error">
                      {renderError()}
                    </TextNormal>
                  </ErrorBox>
                </Col>
              )}
              <Col offset={6}>
                <Spin spinning={isLoading}>
                  <SubmitButton
                    htmlType="submit"
                    title={<span>{t('register.register')}</span>}
                    disabled={!isValid}
                  />
                </Spin>
              </Col>
            </Row>
          </form>
        </Body>
      </Wrapper>
    </AuthLayout>
  )
}

export default RegisterEmailScreen
