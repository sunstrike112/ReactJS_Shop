import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { BoxError, InputBox, SubmitButton, TextNormal, PrimaryButton } from '../../../components'
import { useSettingPassword, useAuth } from '../../../hooks'
import { locationLogin } from '../../../utils'
import AuthLayout from '../../layouts/auth'
import { Wrapper, Body } from '../setting-password/styled'

const ResendSettingToken = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { register, handleSubmit, setValue } = useForm()
  const { dataEmailFromToken } = useSettingPassword()
  const { getEmailReset, isSentEmailReset, isLoadingEmailReset } = useAuth()

  useEffect(() => {
    if (dataEmailFromToken) {
      setValue('emailResend', dataEmailFromToken.email)
    }
  }, [dataEmailFromToken])

  const onSubmit = (data) => {
    getEmailReset({ email: data.emailResend })
  }
  return (
    <AuthLayout isFooter={false}>
      <Wrapper>
        <Body>
          {isSentEmailReset ? (
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
              <PrimaryButton
                style={{ marginTop: '15px' }}
                className="back__button"
                title={t('forgot_password.back__login')}
                onClick={() => history.push(locationLogin())}
                fontSize="size_15"
              />
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <BoxError
                title={t('reset_password.token_expired')}
              />
              <InputBox
                style={{ marginBottom: '10px' }}
                type="text"
                register={register}
                name="emailResend"
                readOnly
              />
              <Spin spinning={isLoadingEmailReset} wrapperClassName="spin-button-submit">
                <SubmitButton title="Resend email" />
              </Spin>
            </form>
          )}
        </Body>
      </Wrapper>
    </AuthLayout>
  )
}

export default ResendSettingToken
