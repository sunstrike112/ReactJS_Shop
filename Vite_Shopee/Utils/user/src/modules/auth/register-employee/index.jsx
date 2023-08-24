/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Row, Spin } from 'antd'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  BoxError,
  InputBox,
  SubmitButton,
  TextPrimary
} from '../../../components'
import { useRegisterEmployee } from '../../../hooks'
import AuthLayout from '../../layouts/auth'
import registerSchema from './registerSchema'
import { Body, Wrapper } from './styled'

const RegisterEmployeeScreen = () => {
  const {
    isLoading,
    isSuccess,
    onRegisterEmployee,
    verifiedData,
    onRedirectToLogin,
    isRegisterSuccess,
    errorMesg
  } = useRegisterEmployee()
  const { t } = useTranslation()
  const isErrorOrSuccess = errorMesg || isRegisterSuccess

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'all',
    defaultValues: {}
  })

  useEffect(() => {
    if (isSuccess && verifiedData?.email) {
      setValue('email', verifiedData.email)
      setValue('address', '')
      setValue('mobilePhone', '')
    }
  }, [isSuccess])

  return (
    <AuthLayout isFooter={false}>
      <Wrapper>
        <TextPrimary
          className="login__title"
          fontSize="size_24"
          fontWeight="bold"
        >
          {t('register.password_setting')}
        </TextPrimary>
        <Body>
          <form
            onSubmit={
              isErrorOrSuccess
                ? onRedirectToLogin
                : handleSubmit(onRegisterEmployee)
            }
          >
            {isErrorOrSuccess ? (
              <BoxError
                title={
                  isRegisterSuccess
                    ? t('register.register_employee_success')
                    : errorMesg
                }
                error={!!errorMesg}
              />
            ) : (
              <Row gutter={[32, 24]}>
                <Col span={6} className="register-label">
                  {t('register.email')}
                </Col>
                <Col span={18}>
                  <InputBox
                    type="text"
                    register={register}
                    name="email"
                    error={errors.email}
                    placeholder="abcde@fgh.com"
                    autocomplete="username"
                    readOnly
                  />
                </Col>
                <Col span={6} className="register-label">
                  {t('register.password')}
                  <span className="register-label--required">*</span>
                </Col>
                <Col span={18}>
                  <InputBox
                    type="password"
                    register={register}
                    name="password"
                    error={errors.password}
                    autoComplete="new-password"
                    isPassword
                  />
                </Col>

                <Col span={6} className="register-label">
                  {t('register.password_confirm')}
                  <span className="register-label--required">*</span>
                </Col>
                <Col span={18}>
                  <InputBox
                    type="password"
                    register={register}
                    name="confirmPassword"
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                    isPassword
                  />
                </Col>
              </Row>
            )}
            <Row gutter={[32, 24]} justify={isErrorOrSuccess ? 'center' : ''}>
              <Col offset={isErrorOrSuccess ? 0 : 6}>
                <Spin
                  spinning={isLoading}
                  wrapperClassName="spin-button-submit"
                >
                  <SubmitButton
                    htmlType="submit"
                    title={
                      <span> {isErrorOrSuccess ? t('forgot_password.back__login') : t('register.setting')} </span>
                    }
                    disabled={isErrorOrSuccess ? false : !isValid}
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

export default RegisterEmployeeScreen
