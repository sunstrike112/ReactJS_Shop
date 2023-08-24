/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Row, Spin } from 'antd'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BoxError, InputBox, PrimaryButton, SubmitButton, TextNormal, TextPrimary } from '../../../components'
import { useAuth, useMaintainNotice } from '../../../hooks'
import AuthLayout from '../../layouts/auth'
import forgotPasswordSchema from './forgotPasswordSchema'
import { Body, GuideBox, ListButton, Wrapper } from './styled'
import { MAINTENANCE } from '../../../apis/api'
import { locationLogin } from '../../../utils'

const ForgotPassWordScreen = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { getEmailReset, isSentEmailReset, errorEmailReset, isLoadingEmailReset } = useAuth()

  const { maintainNoticeMessage } = useMaintainNotice()

  const onFinish = (values) => {
    const email = values.email.toLowerCase().trim()
    getEmailReset({ email })
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'all',
    defaultValues: {}
  })

  const renderContentBox = () => {
    if (isSentEmailReset) {
      return (
        <>
          <div className="notice__title">
            <TextNormal fontSize="size_13" fontWeight="fw_600">
              {t('forgot_password.guide_3')}
            </TextNormal>
          </div>
          <TextNormal fontSize="size_13">{t('forgot_password.guide_4')}</TextNormal>
          <TextNormal fontSize="size_13">{t('forgot_password.guide_5')}</TextNormal>
          <TextNormal fontSize="size_13" fontWeight="fw_600" className="notice__note">
            {t('forgot_password.guide_6')}
          </TextNormal>
          <TextNormal fontSize="size_13">{t('forgot_password.guide_7')}</TextNormal>
        </>
      )
    }
    return (
      <TextPrimary fontSize="size_13" fontWeight="fw_400">
        <b>{t('forgot_password.guide_1')}</b>
        <br />
        {t('forgot_password.guide_1_des1')}
        <br />
        {t('forgot_password.guide_1_des2')}
        <br />
        <b>{t('forgot_password.guide_2')}</b>
        <br />
        {t('forgot_password.guide_2_des1')}
      </TextPrimary>
    )
  }

  const renderContentError = () => {
    switch (errorEmailReset.type) {
      case 'ERROR_MAIL_NOT_FOUND':
        return t('forgot_password.wrong_email')
      case 'ERROR_USER_NOT_ACTIVATED':
        return t('forgot_password.wrong_active')
      case 'ERROR_ACCOUNT_HAS_NOT_APPROVED':
        return t('reset_password.account_not_approved')
      case 'UNAUTHORIZED':
        return t('errors.server_maintaining')
      case 'ERROR_COMPANY_HAS_CANCELLATION_RE_REGISTER_CONTINUE_USING':
        return t('forgot_password.error_company_has_cancellation_re_register_continue_using')
      case 'ERROR_COMPANY_HAS_CANCELLATION_CONTACT_ADMIN':
        return t('forgot_password.error_company_has_cancellation_contact_admin')
      default:
        return t(errorEmailReset.type)
    }
  }

  return (
    <AuthLayout isFooter={false}>
      <Wrapper>
        <Body>
          <GuideBox>{renderContentBox()}</GuideBox>
          <form onSubmit={handleSubmit(onFinish)}>
            <Row gutter={[32, 8]}>
              {!isSentEmailReset && (
                <Col span={24}>
                  <TextNormal className="register-label" fontWeight="fw_600">
                    {t('forgot_password.email_address')}
                  </TextNormal>
                  <InputBox type="text" register={register} name="email" error={errors.email} />
                </Col>
              )}
              {(errorEmailReset && !isSentEmailReset) && (
                <Col span={24}>
                  <BoxError style={{ margin: '0 16px' }} title={renderContentError()} />
                </Col>
              )}
              <Col span={24}>
                <ListButton>
                  <PrimaryButton
                    background="white"
                    className="back__button"
                    title={t('forgot_password.back__login')}
                    onClick={() => history.push(locationLogin())}
                    fontSize="size_15"
                  />
                  {!isSentEmailReset && (
                    <Spin spinning={isLoadingEmailReset} wrapperClassName="spin-button-submit">
                      <SubmitButton title={t('forgot_password.reset__button')} disabled={!isValid} />
                    </Spin>
                  )}
                </ListButton>
              </Col>
            </Row>
          </form>
        </Body>
      </Wrapper>
    </AuthLayout>
  )
}

export default ForgotPassWordScreen
