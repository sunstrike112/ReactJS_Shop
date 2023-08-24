/* eslint-disable react/prop-types */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Spin } from 'antd'

import { TextPrimary, TextNormal, SubmitButton } from '../../../../components'
import {
  Input,
  InputBox,
  InputItem,
  InputWrapper
} from '../../styled'

import { useProfile } from '../../../../hooks'
import { verifyCodeSchema } from '../../changeEmailSchema'

const ChangeEmail = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(verifyCodeSchema)
  })
  const { changeEmail, profile, loading, verifyCode, errors: errorsProfile } = useProfile()

  const onSubmit = (data) => {
    changeEmail({
      userId: profile.userId,
      verifyCode: data.verifyCode,
      email: verifyCode.email
    })
  }

  const handleError = () => {
    const type = errorsProfile.error ? errorsProfile.error.type : errorsProfile.type
    switch (type) {
      case 'ERROR_CODE_INVALID':
      case 'ERROR_CAN_NOT_GET_TRANSACTION_INFORMATION': {
        return t('profile.errors.code_invalid')
      }
      default:
        return ''
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <TextPrimary fontSize="size_14" fontWeight="fw_600">
          {t('profile.edit.email')}
          <span>*</span>
        </TextPrimary>
        <InputItem>
          <InputBox>
            <Input
              readOnly
              className="input__pass"
              value={verifyCode.email}
            />
          </InputBox>
        </InputItem>
      </InputWrapper>
      <InputWrapper>
        <TextPrimary fontSize="size_14" fontWeight="fw_600">
          {t('profile.email.confirmation_code')}
          <span>*</span>
        </TextPrimary>
        <InputItem>
          <InputBox>
            <Input
              className={`${(errors.verifyCode || errorsProfile.changeEmail) && 'error'} input__pass`}
              {...register('verifyCode')}
            />
            <TextNormal fontSize="size_12" fontWeight="fw_400" color="text_danger">
              {(errors.verifyCode || errorsProfile.changeEmail) && t('profile.email.incorrect_confirmation_code')}
              {(errorsProfile.type || errorsProfile.error?.type) && handleError()}
            </TextNormal>
          </InputBox>
        </InputItem>
      </InputWrapper>
      <SubmitButton disabled={loading} htmlType="submit">
        {loading && <Spin size="small" />}
        <TextPrimary
          color="white"
          fontSize="size_15"
          fontWeight="fw_700"
        >
          {t('common.change')}
        </TextPrimary>
      </SubmitButton>
    </form>
  )
}

export default ChangeEmail
