/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup'
import { Spin } from 'antd'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  SubmitButton,
  TextNormal,
  TextPrimary
} from '../../../../components'
import { useProfile } from '../../../../hooks'
import { emailSchema } from '../../changeEmailSchema'
import {
  Input,
  InputBox,
  InputItem,
  InputWrapper
} from '../../styled'
import { USER_ROLE } from '../../../../constants'

const VerifyCode = () => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(emailSchema)
  })
  const { verifyCodeEmail, changeEmail, profile, loading } = useProfile()

  const isRequiredVerifyEmail = useMemo(() => Boolean(!profile.isNew) || [USER_ROLE.COMPANY_ADMIN].includes(profile.role), [profile.isNew, profile.role])

  useEffect(() => {
    setValue('isRequiredVerifyEmail', isRequiredVerifyEmail)
  }, [isRequiredVerifyEmail])

  useEffect(() => {
    setValue('email', profile.email)
  }, [profile.email])

  const onSubmit = (formData) => {
    const { email } = formData
    if (isRequiredVerifyEmail) {
      verifyCodeEmail({
        email,
        userId: profile.userId
      })
    } else {
      changeEmail({
        userId: profile.userId,
        email
      })
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <TextPrimary fontSize="size_14" fontWeight="fw_600">
          {t('profile.edit.email')}
          {isRequiredVerifyEmail && <span>*</span>}
        </TextPrimary>
        <InputItem>
          <InputBox>
            <Input
              {...register('email')}
              className={`${errors.email && 'error'} input__pass`}
              placeholder={t('profile.edit.placeholder_email')}
            />
            <TextNormal fontSize="size_12" fontWeight="fw_400" color="text_danger">
              {errors.email && t(errors.email.message)}
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
          style={{ marginLeft: loading ? 6 : 0 }}
        >
          {t('common.change')}
        </TextPrimary>
      </SubmitButton>
    </form>
  )
}

export default VerifyCode
