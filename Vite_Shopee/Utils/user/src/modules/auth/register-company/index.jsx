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
  TextNormal,
  TextPrimary
} from '../../../components'
import { useErrorName, useRegisterCompany } from '../../../hooks'
import AuthLayout from '../../layouts/auth'
import registerSchema from './registerSchema'
import { Body, PlanPopup, Wrapper } from './styled'

const RegisterCompanyScreen = () => {
  const {
    isLoading,
    isSuccess,
    onRegisterCompany,
    verifiedData,
    errorMesg,
    isRegisterSuccess,
    onRedirectToLogin
  } = useRegisterCompany()
  const { t } = useTranslation()
  const isErrorOrSuccess = errorMesg || isRegisterSuccess

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'all',
    defaultValues: {}
  })
  const [lastPersonIncharge, firstPersonIncharge] = watch([
    'lastPersonIncharge',
    'firstPersonIncharge'
  ])

  const { isShowErrorName: isShowErrorPersonInChargeName } = useErrorName(
    lastPersonIncharge,
    firstPersonIncharge,
    errors.lastPersonIncharge || errors.firstPersonIncharge
  )

  useEffect(() => {
    if (isSuccess) {
      setValue('email', verifiedData.email)
      setValue('firstRegisterName', verifiedData.firstRegisterName)
      setValue('lastRegisterName', verifiedData.lastRegisterName)
      setValue('companyName', verifiedData.companyName)
      setValue('mobilePhone', verifiedData.mobilePhone)
      setValue('tel', verifiedData.mobilePhone)
      setValue('lastFurigana', verifiedData.lastFurigana)
      setValue('firstFurigana', verifiedData.firstFurigana)
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
          {t('register.register_company_title')}
        </TextPrimary>
        <Body>
          <form
            onSubmit={
              isErrorOrSuccess
                ? onRedirectToLogin
                : handleSubmit(onRegisterCompany)
            }
          >
            {isErrorOrSuccess ? (
              <BoxError
                title={
                  isRegisterSuccess
                    ? t('register.register_company_success')
                    : errorMesg
                }
                error={!!errorMesg}
              />
            ) : (
              <Row gutter={[32, 24]}>
                <Col span={8} className="register-label">
                  {t('register.email')}
                </Col>
                <Col span={16}>
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

                <Col span={8} className="register-label">
                  {t('register.register_name')}
                </Col>
                <Col span={8}>
                  <InputBox
                    type="text"
                    register={register}
                    name="lastRegisterName"
                    error={errors.lastRegisterName}
                    placeholder={t('register.surname')}
                    readOnly
                  />
                </Col>
                <Col span={8}>
                  <InputBox
                    type="text"
                    register={register}
                    name="firstRegisterName"
                    error={errors.firstRegisterName}
                    placeholder={t('register.firstname')}
                    readOnly
                  />
                </Col>

                <Col span={8} className="register-label">
                  {t('register.furigana_name')}
                </Col>
                <Col span={8}>
                  <InputBox
                    type="text"
                    register={register}
                    name="lastFurigana"
                    error={errors.lastFurigana}
                    placeholder={t('register.surname')}
                    readOnly
                  />
                </Col>
                <Col span={8}>
                  <InputBox
                    type="text"
                    register={register}
                    name="firstFurigana"
                    error={errors.firstFurigana}
                    placeholder={t('register.firstname')}
                    readOnly
                  />
                </Col>

                <Col span={8} className="register-label">
                  {t('register.company_name')}
                  <span className="register-label--required">*</span>
                </Col>
                <Col span={16}>
                  <InputBox
                    type="text"
                    register={register}
                    name="companyName"
                    error={errors.companyName}
                  />
                </Col>
                <Col span={24}>
                  <Row gutter={[32, 0]}>
                    <Col span={8} className="register-label">
                      {t('register.person_in_charge')}
                      <span className="register-label--required">*</span>
                    </Col>
                    <Col span={8}>
                      <InputBox
                        type="text"
                        register={register}
                        name="lastPersonIncharge"
                        error={errors.lastPersonIncharge || isShowErrorPersonInChargeName}
                        placeholder={t('register.surname')}
                      />
                    </Col>
                    <Col span={8}>
                      <InputBox
                        type="text"
                        register={register}
                        name="firstPersonIncharge"
                        error={errors.firstPersonIncharge || isShowErrorPersonInChargeName}
                        placeholder={t('register.firstname')}
                      />
                    </Col>
                    {isShowErrorPersonInChargeName && (
                      <Col offset={8} span={16}>
                        <TextNormal
                          fontSize="size_14"
                          fontWeight="fw_400"
                          color="text_danger"
                        >
                          {t('register.validate.max_person_in_charge')}
                        </TextNormal>
                      </Col>
                    )}
                  </Row>
                </Col>
                <Col span={8} className="register-label">
                  {t('register.tel')}
                  <span className="register-label--required">*</span>
                </Col>
                <Col span={16}>
                  <InputBox
                    type="text"
                    register={register}
                    name="mobilePhone"
                    error={errors.mobilePhone}
                  />
                </Col>

                <Col span={8} className="register-label">
                  {t('register.password')}
                  <span className="register-label--required">*</span>
                </Col>
                <Col span={16}>
                  <InputBox
                    type="password"
                    register={register}
                    name="password"
                    error={errors.password}
                    autoComplete="new-password"
                    isPassword
                  />
                </Col>

                <Col span={8} className="register-label">
                  {t('register.password_confirm')}
                  <span className="register-label--required">*</span>
                </Col>
                <Col span={16}>
                  <InputBox
                    type="password"
                    register={register}
                    name="confirmPassword"
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                    isPassword
                  />
                </Col>
                <Col span={8} className="register-label">
                  <PlanPopup>
                    {t('register.contract_plan')}
                  </PlanPopup>
                </Col>
                <Col span={16}>
                  <InputBox
                    type="text"
                    register={register}
                    name="packagePlan.packagePlanName"
                    error={errors?.packagePlan?.packagePlanName}
                    value={t('register.trial')}
                    autoComplete="new-password"
                    readOnly
                  />
                </Col>
              </Row>
            )}
            <Row gutter={[32, 24]} justify={isErrorOrSuccess ? 'center' : ''}>
              <Col offset={isErrorOrSuccess ? 0 : 8}>
                <Spin
                  spinning={isLoading}
                  wrapperClassName="spin-button-submit"
                >
                  <SubmitButton
                    htmlType="submit"
                    title={<span>{isErrorOrSuccess ? t('forgot_password.back__login') : t('register.setting')}</span>}
                    disabled={isErrorOrSuccess ? false : !isValid || isShowErrorPersonInChargeName}
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

export default RegisterCompanyScreen
