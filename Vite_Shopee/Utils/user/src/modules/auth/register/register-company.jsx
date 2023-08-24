import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Row, Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { MAINTENANCE } from '../../../apis/api'

import {
  InputBox,
  SubmitButton,
  TextNormal,
  TextPrimary,
  BoxError,
  PrimaryButton,
  DropDownProfile
} from '../../../components'

import { useRegisterEmail, useCheckEmailExist } from '../../../hooks'
import { locationLogin } from '../../../utils'
import AuthLayout from '../../layouts/auth'
import registerCompanySchema from './registerCompanySchema'
import { Body, ErrorBox, Wrapper } from './styled'

const userClassificationOptions = [
  { value: 1, name: '経営者' },
  { value: 2, name: '役職者' },
  { value: 3, name: '正社員' },
  { value: 4, name: '非正規社員' },
  { value: 5, name: 'ビジネスパートナー' }
]

const ERROR_NOTICE = [
  'ERROR_DOMAIN_EMAIL_ALREADY_EXIST'
]

const RegisterCompany = () => {
  const { t } = useTranslation()

  const { onRegisterCompany, errorRegister, registerCompanyState } = useRegisterEmail()
  const { isExistEmail, validateEmailCompany } = useCheckEmailExist()
  const history = useHistory()
  const [userClass, setUserClass] = useState(t('register.select'))

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(registerCompanySchema),
    mode: 'all'
  })

  useEffect(() => {
    if (userClass === t('register.select')) {
      setUserClass(t('register.select'))
      setValue('classification', t('register.select'))
    }
  }, [t])

  useEffect(() => {
    if (isExistEmail.data) {
      setValue('email', isExistEmail.data.email)
      setValue('fullName', isExistEmail.data.fullName || '')
      setValue('fullFurigana', isExistEmail.data.fullFurigana || '')
    }
  }, [isExistEmail.data])

  const renderError = () => {
    switch (errorRegister.type) {
      case 'ERROR_SAME_EMAIL_ADDRESS_REQUIRED':
        return t('register.used_email')
      default:
        return t(errorRegister.type)
    }
  }
  const onSubmit = (data) => {
    onRegisterCompany({
      ...data,
      signinId: isExistEmail.data.email,
      statusExist: isExistEmail.data.statusExist
    })
  }

  const renderTextError = () => {
    // Check error for case validation email
    if (validateEmailCompany.name) {
      return t(validateEmailCompany.message)
    }

    // Check error for case exist email
    if (isExistEmail?.error.type === MAINTENANCE) {
      return t('errors.server_maintaining')
    }
    return t(`errors.${isExistEmail.error?.type}`)
  }

  const handleSelectUserClass = (value) => {
    setUserClass(value)
    setValue('classification', value)
  }

  if ((isExistEmail?.error && !ERROR_NOTICE.includes(isExistEmail.error?.type)) || validateEmailCompany.name) {
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
          <Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <BoxError error title={renderTextError()} />
            <PrimaryButton
              title={t('reset_password.redirect_login')}
              onClick={() => history.push(locationLogin())}
            />
          </Body>
        </Wrapper>
      </AuthLayout>
    )
  }

  return (
    <Spin spinning={isExistEmail?.isLoading}>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row gutter={[32, 24]}>
                <Col span={6} className="register-label">
                  <span className="register-label--required">*</span>
                  {t('register.email')}
                </Col>
                <Col span={18}>
                  <InputBox
                    register={register}
                    name="email"
                    error={errors.email}
                    readOnly
                  />
                </Col>
                <Col span={24}>
                  <Row gutter={[32, 0]}>
                    <Col span={6} className="register-label">
                      <span className="register-label--required">*</span>
                      {t('register.register_name')}
                    </Col>
                    <Col span={18}>
                      <InputBox
                        register={register}
                        name="fullName"
                        error={errors.fullName}
                        maxLength={60}
                      />
                    </Col>
                    <Col span={6} />
                    <Col span={18}>
                      <span className="register-label--warning">{t('register.warning_name')}</span>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row gutter={[32, 0]}>
                    <Col span={6} className="register-label">
                      <span className="register-label--required">*</span>
                      {t('register.furigana_name')}
                    </Col>
                    <Col span={18}>
                      <InputBox
                        register={register}
                        name="fullFurigana"
                        error={errors.fullFurigana}
                        maxLength={60}
                      />
                    </Col>
                    <Col span={6} />
                    <Col span={18}>
                      <span className="register-label--warning">{t('register.warning_name')}</span>
                    </Col>
                  </Row>
                </Col>

                <Col span={6} className="register-label">
                  <span className="register-label--required">*</span>
                  {t('register.company_name')}
                </Col>
                <Col span={18}>
                  <InputBox
                    register={register}
                    name="companyName"
                    error={errors.companyName}
                    maxLength={250}
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
                <Col span={6} className="register-label">
                  <span className="register-label--required">*</span>
                  {t('register.phone')}
                </Col>
                <Col span={18}>
                  <InputBox
                    register={register}
                    name="cellPhoneNumber"
                    error={errors.cellPhoneNumber}
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
                <Col span={6} className="register-label">
                  {t('register.job')}
                </Col>
                <Col span={18}>
                  <InputBox
                    register={register}
                    name="careerName"
                    error={errors.careerName}
                    maxLength={250}
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
                <Col span={6} className="register-label">
                  <span className="register-label--required">*</span>
                  {t('register.user_classification')}
                </Col>
                <Col span={18}>
                  <DropDownProfile
                    className="dropdown__gender"
                    register={register}
                    name="classification"
                    options={userClassificationOptions}
                    onChange={handleSelectUserClass}
                    value={userClass}
                    defaultValues={userClass}
                  />
                  <TextNormal
                    fontWeight="fw_400"
                    color="error"
                    style={{ marginTop: 5 }}
                  >
                    {!userClass && t('register.classification_required')}
                  </TextNormal>
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
                <Col span={6} className="register-label">
                  <span className="register-label--required">*</span>
                  {t('register.address')}
                </Col>
                <Col span={18}>
                  <InputBox
                    register={register}
                    name="address"
                    error={errors.address}
                    maxLength={500}
                  />
                </Col>
                <Col span={6} className="register-label">
                  <span className="register-label--required">*</span>
                  {t('register.number_employee')}
                </Col>
                <Col span={18}>
                  <InputBox
                    register={register}
                    name="numberOfEmployee"
                    error={errors.numberOfEmployee}
                    type="number"
                    onKeyDown={(e) => [190, 188].includes(e.keyCode) && e.preventDefault()} // Prevent user typing decimal
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
                  <Spin spinning={registerCompanyState.isLoading}>
                    <SubmitButton
                      htmlType="submit"
                      title={<span>{t('register.register')}</span>}
                      disabled={(userClass && userClass !== t('register.select')) ? !isValid : true}
                    />
                  </Spin>
                </Col>
              </Row>
            </form>
          </Body>
        </Wrapper>
      </AuthLayout>
    </Spin>
  )
}

export default RegisterCompany
