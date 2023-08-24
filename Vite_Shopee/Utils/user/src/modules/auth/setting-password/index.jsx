/* eslint-disable operator-linebreak */
import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Row, Spin } from 'antd'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { TextNormal, SubmitButton, InputBox, BoxError, PrimaryButton } from '../../../components'
import AuthLayout from '../../layouts/auth'
import settingPasswordSchema from './settingPasswordSchema'
import { Body, Wrapper } from './styled'
import { useVerifyToken, useSettingPassword } from '../../../hooks'
import { MAINTENANCE } from '../../../apis/api'
import { locationLogin } from '../../../utils'

const SettingPasswordScreen = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const { dataVerifyToken, isVerify, resetToken, error, isLoading, isRegisterCompany } = useVerifyToken()
  const { resetPassword, isSuccess, dataEmailFromToken } = useSettingPassword()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue
  } = useForm({
    resolver: yupResolver(settingPasswordSchema),
    mode: 'all',
    defaultValues: {}
  })

  useEffect(() => {
    if (isVerify) {
      setValue('email', dataVerifyToken.email)
    }
  }, [isVerify])

  useEffect(() => {
    if (dataEmailFromToken && !isRegisterCompany) {
      history.push('/setting-password/resend')
    }
  }, [dataEmailFromToken, isRegisterCompany])

  const onFinish = (values) => {
    const { newPassWord, confirmPassWord } = values
    resetPassword({ newPassWord, confirmPassWord, resetToken })
  }

  const renderBoxError = () => {
    switch (error.type) {
      case 'ERROR_USER_NOT_FOUND':
        return t('reset_password.token_disabled')
      case 'ERROR_USER_HAVE_SET_A_PASSWORD':
        return t('reset_password.reset_success')
      case 'ERROR_CHANGE_PASSWORD_TOKEN_EXPIRED':
        return t('reset_password.token_expiredV2')
      case MAINTENANCE:
        return t('errors.server_maintaining')
      default:
        return t(error.type)
    }
  }

  const renderContentBody = () => {
    if (error) {
      return (
        <>
          <BoxError title={renderBoxError()} />
          <PrimaryButton
            title={t('reset_password.redirect_login')}
            onClick={() => history.push(locationLogin())}
          />
        </>
      )
    }
    if (isSuccess) {
      return (
        <>
          <BoxError
            error={false}
            title={isRegisterCompany ? t('register.setting_password_success') : t('reset_password.reset_success')}
          />
          <PrimaryButton
            title={t('reset_password.redirect_login')}
            onClick={() => history.push(locationLogin())}
          />
        </>
      )
    }
    return (
      <form onSubmit={handleSubmit(onFinish)}>
        <Row gutter={[32, 8]}>
          <Col span={24}>
            <TextNormal className="register-label" fontWeight="fw_600">
              {t('forgot_password.email_address')}
            </TextNormal>
            <InputBox type="text" register={register} name="email" error={errors.email} readOnly />
          </Col>
          <Col span={24}>
            <TextNormal className="register-label" fontWeight="fw_600">
              {t('reset_password.new_pass')}
            </TextNormal>
            <InputBox
              type="password"
              register={register}
              name="newPassWord"
              error={errors.newPassWord}
              isPassword
            />
          </Col>
          <Col span={24}>
            <TextNormal className="register-label" fontWeight="fw_600">
              {t('reset_password.confirm_pass')}
            </TextNormal>
            <InputBox
              type="password"
              register={register}
              name="confirmPassWord"
              error={errors.confirmPassWord}
              isPassword
            />
          </Col>
          <Col span={24}>
            <Spin spinning={isLoading} wrapperClassName="spin-button-submit">
              <SubmitButton
                className="submit-button"
                htmlType="submit"
                title={<span>{t('reset_password.submit')}</span>}
                disabled={!isValid}
              />
            </Spin>
          </Col>
        </Row>
      </form>
    )
  }

  return (
    <AuthLayout isFooter={false}>
      <Wrapper>
        <TextNormal className="login__title" fontSize="size_24" fontWeight="fw_700">
          {t('reset_password.title')}
        </TextNormal>
        <Body>{renderContentBody()}</Body>
      </Wrapper>
    </AuthLayout>
  )
}

export default SettingPasswordScreen
