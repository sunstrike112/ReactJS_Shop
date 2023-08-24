/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable operator-linebreak */
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
import { useVerifyPassword } from '../../../hooks'
import AuthLayout from '../../layouts/auth'
import { Body, Wrapper } from './styled'
import verifyPassSchema from './verifyPassSchema'

const VerifyPasswordScreen = () => {
  const {
    isLoading,
    onRegisterPassword,
    onRedirectToLogin,
    isSuccess,
    verifiedData,
    errorMesg,
    isSettingPasswordSuccess
  } = useVerifyPassword()
  const { t } = useTranslation()
  const isErrorOrSuccess = errorMesg || isSettingPasswordSuccess

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue
  } = useForm({
    resolver: yupResolver(verifyPassSchema),
    mode: 'all',
    defaultValues: {}
  })

  useEffect(() => {
    if (isSuccess) {
      setValue('email', verifiedData.email)
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
                : handleSubmit(onRegisterPassword)
            }
          >
            {isErrorOrSuccess ? (
              <BoxError
                title={
                  isSettingPasswordSuccess
                    ? t('register.register_user_success')
                    : errorMesg
                }
                error={!!errorMesg}
              />
            ) : (
              <Row gutter={[32, 24]}>
                <Col span={7} className="register-label">
                  {t('register.email')}
                </Col>
                <Col span={17}>
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
                <Col span={7} className="register-label">
                  {t('register.password')}
                  <span className="register-label--required">*</span>
                </Col>
                <Col span={17}>
                  <InputBox
                    type="password"
                    register={register}
                    name="newPassWord"
                    error={errors.newPassWord}
                    autoComplete="new-password"
                    isPassword
                  />
                </Col>

                <Col span={7} className="register-label">
                  {t('register.password_confirm')}
                  <span className="register-label--required">*</span>
                </Col>
                <Col span={17}>
                  <InputBox
                    type="password"
                    register={register}
                    name="confirmPassWord"
                    error={errors.confirmPassWord}
                    autoComplete="new-password"
                    isPassword
                  />
                </Col>
              </Row>
            )}
            <Row gutter={[32, 24]} justify={isErrorOrSuccess ? 'center' : ''}>
              <Col offset={isErrorOrSuccess ? 0 : 7}>
                <Spin
                  spinning={isLoading}
                  wrapperClassName="spin-button-submit"
                >
                  <SubmitButton
                    htmlType="submit"
                    title={<span>{isErrorOrSuccess ? t('forgot_password.back__login') : t('register.setting')}</span>}
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

export default VerifyPasswordScreen
