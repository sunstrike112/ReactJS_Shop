import { WarningOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Row, Spin } from 'antd'
import { isEmpty } from 'lodash'
import React, { useCallback, useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BoxError, InputBox, SubmitButton, TextNormal, TextPrimary, UnderlineLink } from '../../../components'
import { FormRadio } from '../../../components/form'
import { loginWithAccountTextMap, LOGIN_WITH_ACCOUNTS, LOGIN_WITH_ACCOUNT_OPTIONS } from '../../../constants'
import { useAuth, useGlobalStore, useMaintainNotice } from '../../../hooks'
import { getLocalStorage, setLocalStorage, STORAGE } from '../../../utils'
import AuthLayout from '../../layouts/auth'
import loginSchema from './loginSchema'
import { Body, NoticeMaintain, StyledLoginIdWrapper, Wrapper } from './styled'

const MINUS_CHARACTER = '-'

const LoginScreen = () => {
  const { t } = useTranslation()

  const { signIn, errorLogin, isLoadingLogin, resetLoginErrorAction } = useAuth()
  const { getMaintainNoticeAction, maintainNoticeMessage } = useMaintainNotice()
  const { infoCompany } = useGlobalStore()

  // Use react-hook-form
  const formMethods = useForm({
    resolver: yupResolver(loginSchema)
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    setValue
  } = formMethods
  const [accountType, accountWatch, passwordWatch, companyCodeWatch] = watch(['accountType', 'account', 'password', 'companyCode'])
  // End use react-hook-form

  const onFinish = (values) => {
    const { password } = values
    const account = values.account.toLowerCase()
    const companyCode = values.companyCode?.toLowerCase()
    const data = {
      email: accountType === LOGIN_WITH_ACCOUNTS.EMAIL ? account : null,
      signinId: accountType === LOGIN_WITH_ACCOUNTS.LOGIN_ID ? `${companyCode}-${account}` : null,
      password
    }
    setLocalStorage(STORAGE.LOGIN_ACCOUNT_TYPE, accountType)
    signIn({ data })
  }

  const renderError = useMemo(() => t(`errors.${errorLogin?.type}`), [errorLogin, t])

  const handleFreeTrial = () => {
    window.open('https://www.growthcollege.jp/', '_blank')
  }

  const onChangeAccountType = useCallback((event) => {
    const { value } = event.target
    setValue('accountType', value)
    if (accountWatch) {
      setValue('account', '')
    }
    if (passwordWatch) {
      setValue('password', '')
    }
    if (companyCodeWatch) {
      setValue('companyCode', '')
    }
    if (!isEmpty(errors)) {
      clearErrors()
    }
    if (!isEmpty(errorLogin)) {
      resetLoginErrorAction()
    }
  }, [accountWatch, errors, passwordWatch, errorLogin, companyCodeWatch])

  useEffect(() => {
    const loginAccountTypeInLocal = getLocalStorage(STORAGE.LOGIN_ACCOUNT_TYPE)
    setValue('accountType', loginAccountTypeInLocal || LOGIN_WITH_ACCOUNTS.EMAIL)
  }, [])

  useEffect(() => {
    getMaintainNoticeAction()
  }, [])

  return (
    <AuthLayout isFooter={false}>
      <Wrapper>
        <TextPrimary className="login__title" fontSize="size_24" fontWeight="bold">
          {t('login.title')}
        </TextPrimary>
        <Body>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onFinish)}>
              <Row gutter={[32, 8]}>
                <Col span={24}>
                  <FormRadio
                    t={t}
                    name="accountType"
                    options={LOGIN_WITH_ACCOUNT_OPTIONS}
                    onChange={onChangeAccountType}
                  />
                </Col>
                <Col span={24}>
                  <TextNormal className="register-label" fontWeight="fw_600">
                    {t(loginWithAccountTextMap[accountType])}
                  </TextNormal>
                  {accountType === LOGIN_WITH_ACCOUNTS.LOGIN_ID
                    ? (
                      <>

                        <StyledLoginIdWrapper>
                          <div className="companyCode">
                            <InputBox placeholder={t('profile.home.companyCode')} isShowErrorText={false} type="text" register={register} name="companyCode" error={errors.companyCode} />
                          </div>
                          <TextNormal className="horizontalLine" fontWeight="fw_600">
                            {MINUS_CHARACTER}
                          </TextNormal>
                          <div className="account">
                            <InputBox placeholder={t('login.loginId_placeholder')} isShowErrorText={false} type="text" register={register} name="account" error={errors.account} />
                          </div>
                        </StyledLoginIdWrapper>
                        <TextNormal fontSize="size_14" fontWeight="fw_400" color="text_danger">
                          {(errors.account || errors.companyCode) && (t(errors.account?.message) || t(errors.companyCode?.message))}
                        </TextNormal>
                      </>
                    )
                    : <InputBox type="text" register={register} name="account" error={errors.account} />}
                </Col>
                <Col span={24}>
                  <TextNormal className="register-label" fontWeight="fw_600">
                    {t('profile.menu.password')}
                  </TextNormal>
                  <InputBox
                    type="password"
                    register={register}
                    name="password"
                    error={errors.password}
                    isPassword
                  />
                </Col>
                <Col span={24}>{errorLogin?.type && <BoxError title={renderError} />}</Col>
                <Col span={24}>
                  <Spin spinning={isLoadingLogin} wrapperClassName="spin-button-submit">
                    <SubmitButton
                      className="submit-button"
                      htmlType="submit"
                      title={<span>{t('login.title')}</span>}
                      disabled={Object.keys(errors).length}
                    />
                  </Spin>
                </Col>
              </Row>
            </form>
          </FormProvider>
          <div className="forgot__pass">
            <UnderlineLink
              title={t('login.forgot_pass')}
              to="/auth/forgot-password"
              color="text_secondary"
              fontSize="size_12"
            />
            <UnderlineLink
              to={(location) => ({ ...location })}
              title={t('login.free_trial_link')}
              color="text_secondary"
              fontSize="size_12"
              onClick={handleFreeTrial}
            />
          </div>
        </Body>
        {/* TODO */}
        {/* <FooterLogin>
          <SocialItem>
            <FB_ICON className="icon__social" />
            <TextPrimary fontWeight="fw_500" fontSize="size_15">
              {t('login.fb_social')}
            </TextPrimary>
          </SocialItem>
          <SocialItem>
            <GOOGLE_ICON className="icon__social" />
            <TextPrimary fontWeight="fw_500" fontSize="size_15">
              {t('login.google_social')}
            </TextPrimary>
          </SocialItem>
        </FooterLogin> */}
        {maintainNoticeMessage && (
          <NoticeMaintain>
            <TextNormal fontWeight="fw_400">
              <WarningOutlined style={{ marginRight: 10 }} />
              {maintainNoticeMessage}
            </TextNormal>
          </NoticeMaintain>
        )}

        {infoCompany.message && (
        <NoticeMaintain>
          <TextNormal fontWeight="fw_400">
            {infoCompany.message}
          </TextNormal>
        </NoticeMaintain>
        )}
      </Wrapper>
    </AuthLayout>
  )
}

export default LoginScreen
