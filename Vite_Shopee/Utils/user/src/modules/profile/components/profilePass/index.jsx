/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PassWrapper } from './styled'
import { TextPrimary, TextNormal, SubmitButton } from '../../../../components'
import { Input, InputBox, InputItem, InputWrapper } from '../../styled'
import { useProfile } from '../../../../hooks'
import changePasswordSchema from '../../changePasswordSchema'

const ProfilePass = () => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(changePasswordSchema)
  })

  const [currentPassword] = watch(['currentPassword'])

  const { changePassword, loading, profile, errors: errorsResponse, removeErrorPasswordAction } = useProfile()

  useEffect(() => {
    if (errorsResponse.type) {
      removeErrorPasswordAction()
    }
  }, [currentPassword])

  const onSubmit = async (data) => {
    changePassword({
      changePasswordUserDto: {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
        currentPassword: data.currentPassword
      },
      userId: profile.userId
    })
  }

  const handleError = () => {
    switch (errorsResponse.type) {
      case 'ERROR_CURRENT_PASSWORD_INVALID': {
        return t('profile.errors.current_password_invalid')
      }
      default:
        return ''
    }
  }

  return (
    <PassWrapper>
      <TextPrimary className="pass__header" fontSize="size_24" fontWeight="fw_600">
        {t('profile.password.title')}
      </TextPrimary>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <TextPrimary fontSize="size_14" fontWeight="fw_600">
            {t('profile.password.currentPass')}
            <span>*</span>
          </TextPrimary>
          <InputItem>
            <InputBox>
              <Input
                type="password"
                className={`${errors.currentPassword && 'error'} input__pass`}
                {...register('currentPassword')}
              />
              <TextNormal fontSize="size_12" fontWeight="fw_400" color="text_danger">
                {errors.currentPassword && t(errors.currentPassword.message)}
                {errorsResponse.type && handleError()}
              </TextNormal>
            </InputBox>
          </InputItem>
        </InputWrapper>
        <InputWrapper>
          <TextPrimary fontSize="size_14" fontWeight="fw_600">
            {t('profile.password.newPass')}
            <span>*</span>
          </TextPrimary>
          <InputItem>
            <InputBox>
              <Input
                type="password"
                className={`${errors.newPassword && 'error'} input__pass`}
                {...register('newPassword')}
              />
              <TextNormal fontSize="size_12" fontWeight="fw_400" color="text_danger">
                {errors.newPassword && t(errors.newPassword.message)}
              </TextNormal>
            </InputBox>
          </InputItem>
        </InputWrapper>
        <InputWrapper>
          <TextPrimary fontSize="size_14" fontWeight="fw_600">
            {t('profile.password.newPass_confirm')}
            <span>*</span>
          </TextPrimary>
          <InputItem>
            <InputBox>
              <Input
                type="password"
                className={`${errors.confirmPassword && 'error'} input__pass`}
                {...register('confirmPassword')}
              />
              <TextNormal fontSize="size_12" fontWeight="fw_400" color="text_danger">
                {errors.confirmPassword && t(errors.confirmPassword.message)}
              </TextNormal>
            </InputBox>
          </InputItem>
        </InputWrapper>
        <SubmitButton loading={loading} htmlType="submit" title={t('profile.edit.change')} />
      </form>
    </PassWrapper>
  )
}

export default ProfilePass
