/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import moment from 'moment'
import {
  TextNormal,
  TextPrimary,
  DropDownProfile,
  SubmitButton,
  Toast
} from '../../../../components'
import { Input, InputItem, InputWrapper, InputBox, Textarea, ErrorName, InputCustom } from '../../styled'
import { useProfile, useErrorName } from '../../../../hooks'
import editProfileFormSchema from '../../editProfileSchema'
import {
  getDayByMonthAndYear,
  getListMonth,
  getListYear,
  parsePhone,
  decodeNumber
} from '../../../../utils'
import { CONFIG, USER_ROLE } from '../../../../constants'

const genderDropdown = [
  {
    value: 2,
    name: 'profile.edit.unselected'
  },
  {
    value: 0,
    name: 'profile.edit.male'
  },
  {
    value: 1,
    name: 'profile.edit.female'
  }
]

const WrapperInput = ({
  title,
  register,
  error,
  name,
  placeholder,
  isRequired = false,
  ...rest
}) => {
  const { t } = useTranslation()
  return (
    <InputWrapper>
      <TextPrimary fontSize="size_14" fontWeight="fw_600">
        {title}
        {isRequired && <span>*</span>}
      </TextPrimary>
      <InputItem>
        <InputBox>
          <Input
            className={error && 'error'}
            {...register(name)}
            placeholder={placeholder}
            {...rest}
          />
          <TextNormal fontSize="size_12" fontWeight="fw_400" color="text_danger">
            {error && t(error.message)}
          </TextNormal>
        </InputBox>
      </InputItem>
    </InputWrapper>
  )
}

const ProfileForm = () => {
  const { t } = useTranslation()
  const { updateProfile, profile, userRole, isUpdatedProfile, isUpdatingProfile } = useProfile()
  const isUserCompany = useMemo(() => [USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN].includes(userRole), [userRole])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(editProfileFormSchema({ isUserCompany })),
    mode: 'onTouched'
  })
  const [
    fullName,
    fullNameKatakana,
    overviewYourSelf
  ] = watch([
    'fullName',
    'fullNameKatakana',
    'overviewYourSelf'
  ])
  const { isShowErrorName } = useErrorName(fullName, errors.fullName)
  const { isShowErrorName: isShowErrorFuriganaName } = useErrorName(fullNameKatakana, errors.fullNameKatakana)

  const [isValidBirthDay, setIsValidBirthDay] = useState({
    isValid: true,
    msg: '',
    className: '',
    errorType: ''
  })

  const [yyyy, setYYYY] = useState(null)
  const [mm, setMM] = useState(null)
  const [dd, setDD] = useState(null)
  const [gender, setGender] = useState(0)

  const years = getListYear()
  const months = getListMonth()
  const days = getDayByMonthAndYear()
  useEffect(() => {
    if ((yyyy && mm && dd) || (!yyyy && !mm && !dd)) {
      return setIsValidBirthDay({
        isValid: true,
        msg: ''
      })
    }
    if (!yyyy && (mm || dd)) {
      return setIsValidBirthDay({
        isValid: false,
        msg: 'profile.edit.require_birthday_year',
        className: 'invalid_year',
        errorType: 'year'
      })
    }

    if (!mm && (yyyy || dd)) {
      return setIsValidBirthDay({
        isValid: false,
        msg: 'profile.edit.require_birthday_month',
        className: 'invalid_month',
        errorType: 'month'
      })
    }

    if (!dd && (yyyy || mm)) {
      return setIsValidBirthDay({
        isValid: false,
        msg: 'profile.edit.require_birthday_day',
        className: 'invalid_day',
        errorType: 'day'
      })
    }

    if (yyyy && mm && dd) {
      const birthday = moment(new Date(`${yyyy}/${mm}/${dd}`)).unix()
      const now = moment().unix()
      if (birthday > now) {
        return setIsValidBirthDay({
          isValid: false,
          msg: 'profile.edit.birthday_not_in_future',
          className: 'invalid_year'
        })
      }
    }
    return false
  }, [yyyy, mm, dd])

  useEffect(() => {
    setValue('companyCode', profile.companyCode || '')
    setValue('signinId', profile.signinId || '')
    setValue('fullName', profile.fullName || '')
    setValue('fullNameKatakana', profile.fullNameKatakana || '')
    setValue('address', profile.address || '')
    setValue('employeeNumber', profile.employeeNumber || '')
    setValue('overviewYourSelf', profile.overviewYourSelf || '')
    setValue('cellPhone', parsePhone(profile.cellPhone || ''))
    setGender(profile.gender || 0)
    if (profile.dayOfBirth) {
      const date = profile?.dayOfBirth.split('/')
      setYYYY(date[0])
      setMM(date[1])
      setDD(date[2])
      setGender(profile.gender)
    }
    if (!isUserCompany) {
      setValue('companyNameIndividual', profile.companyName || '')
    }
  }, [profile])

  const onSubmit = (data) => {
    const { companyCode, ...rest } = data
    if (isValidBirthDay.isValid) {
      updateProfile({
        ...rest,
        gender,
        cellPhone: decodeNumber(data.cellPhone),
        companyName: '',
        companyNameIndividual: data.companyNameIndividual,
        dayOfBirth: (mm && yyyy && dd) ? `${yyyy}/${mm}/${dd}` : null,
        userId: profile.userId
      })
    }
  }

  const onChange = (value, type) => {
    if (type === 'gender') {
      setGender(value)
    }
    if (type === 'yyyy') {
      setYYYY(value)
    }
    if (type === 'mm') {
      setMM(value)
    }
    if (type === 'dd') {
      setDD(value)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper isShowErrorName={isShowErrorName}>
          <TextPrimary fontSize="size_14" fontWeight="fw_600">
            {t('profile.home.companyCode')}
          </TextPrimary>
          <InputItem>
            <InputBox>
              <Input
                readOnly
                {...register('companyCode')}
              />
            </InputBox>
          </InputItem>
        </InputWrapper>
        <InputWrapper isShowErrorName={isShowErrorName}>
          <TextPrimary fontSize="size_14" fontWeight="fw_600">
            {t('profile.home.login_ID')}
            <span>*</span>
          </TextPrimary>
          <InputItem>
            <InputBox>
              <Input
                className={(errors.signinId || isShowErrorName) && 'error'}
                {...register('signinId')}
              />
              <TextNormal fontSize="size_12" fontWeight="fw_400" color="text_danger">
                {errors.signinId && t(errors.signinId.message)}
              </TextNormal>
            </InputBox>
          </InputItem>
        </InputWrapper>
        <InputWrapper isShowErrorName={isShowErrorName}>
          <TextPrimary fontSize="size_14" fontWeight="fw_600">
            {t('profile.edit.name')}
            <span>*</span>
          </TextPrimary>
          <InputItem>
            <InputBox>
              <Input
                className={(errors.fullName || isShowErrorName) && 'error'}
                {...register('fullName')}
                maxLength={60}
              />
              <TextNormal fontSize="size_12" fontWeight="fw_400" color="text_danger">
                {errors.fullName && t(errors.fullName.message)}
              </TextNormal>
            </InputBox>
          </InputItem>
        </InputWrapper>
        {isShowErrorName && (
          <ErrorName
            fontSize="size_12"
            fontWeight="fw_400"
            color="text_danger"
          >
            {t('register.validate.max_name')}
          </ErrorName>
        )}

        <InputWrapper isShowErrorName={isShowErrorFuriganaName}>
          <TextPrimary fontSize="size_14" fontWeight="fw_600">
            {t('profile.edit.name_translate')}
            <span>*</span>
          </TextPrimary>
          <InputItem>
            <InputBox>
              <Input
                className={(errors.fullNameKatakana || isShowErrorFuriganaName) && 'error'}
                {...register('fullNameKatakana')}
                maxLength={60}
              />
              <TextNormal fontSize="size_12" fontWeight="fw_400" color="text_danger">
                {errors.fullNameKatakana && t(errors.fullNameKatakana.message)}
              </TextNormal>
            </InputBox>
          </InputItem>
        </InputWrapper>
        {isShowErrorFuriganaName && (
          <ErrorName
            fontSize="size_12"
            fontWeight="fw_400"
            color="text_danger"
          >
            {t('register.validate.max_name_furigana')}
          </ErrorName>
        )}

        {!isUserCompany && (
          <WrapperInput
            title={t('profile.edit.company')}
            isRequired
            register={register}
            name="companyNameIndividual"
            placeholder={t('profile.edit.placeholder_company')}
            error={errors.companyNameIndividual}
            readOnly
          />
        )}
        <InputWrapper>
          <TextPrimary fontSize="size_14" fontWeight="fw_600">
            {t('profile.edit.gender')}
          </TextPrimary>
          <InputItem>
            <InputBox className="dropdown__gender">
              <DropDownProfile
                options={genderDropdown}
                onChange={(e) => onChange(e, 'gender')}
                value={gender}
                error={errors.gender}
              />
              <TextNormal fontSize="size_12" fontWeight="fw_400" color="text_danger">
                {errors.gender && errors.gender.message}
              </TextNormal>
            </InputBox>
          </InputItem>
        </InputWrapper>
        <InputWrapper>
          <TextPrimary fontSize="size_14" fontWeight="fw_600">
            {t('profile.edit.phone')}
            <span>*</span>
          </TextPrimary>
          <InputItem>
            <InputBox>
              <Controller
                render={
                  ({ field }) => (
                    <Input
                      className={errors.cellPhone && 'error'}
                      {...field}
                      onChange={(e) => {
                        e.preventDefault()
                        const phone = parsePhone(e.target.value)
                        field.onChange(phone)
                      }}
                      placeholder={t('profile.edit.placeholder_phoneNumber')}
                    />
                  )
                }
                control={control}
                name="cellPhone"
              />
              <TextNormal fontSize="size_12" fontWeight="fw_400" color="text_danger">
                {errors.cellPhone && t(errors.cellPhone.message)}
              </TextNormal>
            </InputBox>
          </InputItem>
        </InputWrapper>
        <InputWrapper>
          <TextPrimary fontSize="size_14" fontWeight="fw_600">
            {t('profile.edit.address')}
          </TextPrimary>
          <InputItem>
            <InputBox>
              <Input
                className={errors.address && 'error'}
                {...register('address')}
                placeholder={t('profile.edit.placeholder_province')}
              />
              <TextNormal fontSize="size_12" fontWeight="fw_400" color="text_danger">
                {errors.address && t(errors.address.message)}
              </TextNormal>
            </InputBox>
          </InputItem>
        </InputWrapper>
        <InputWrapper>
          <TextPrimary fontSize="size_14" fontWeight="fw_600">
            {t('profile.home.employeeNumber')}
          </TextPrimary>
          <InputItem>
            <InputBox>
              <Input
                readOnly
                {...register('employeeNumber')}
              />
            </InputBox>
          </InputItem>
        </InputWrapper>
        <InputWrapper>
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
          >
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 4,
              alignItems: 'center'
            }}
            >
              <TextPrimary fontSize="size_14" fontWeight="fw_600">
                {t('profile.edit.birthday')}
                <span>*</span>
              </TextPrimary>
              <InputItem>
                <InputCustom>
                  <InputBox className="dropdown">
                    <DropDownProfile
                      options={years}
                      onChange={(e) => onChange(e, 'yyyy')}
                      value={yyyy}
                      placeholder="yyyy"
                    />
                  </InputBox>
                  <TextNormal
                    fontSize="size_12"
                    fontWeight="fw_400"
                    color="text_danger"
                    className={isValidBirthDay.className}
                  >
                    {(!isValidBirthDay.isValid && isValidBirthDay.errorType === 'year') && t(isValidBirthDay.msg)}
                  </TextNormal>
                </InputCustom>
                <InputCustom>
                  <InputBox className="dropdown">
                    <DropDownProfile
                      options={months}
                      onChange={(e) => onChange(e, 'mm')}
                      value={mm}
                      placeholder="mm"
                    />
                  </InputBox>
                  <TextNormal
                    fontSize="size_12"
                    fontWeight="fw_400"
                    color="text_danger"
                    className={isValidBirthDay.className}
                  >
                    {(!isValidBirthDay.isValid && isValidBirthDay.errorType === 'month') && t(isValidBirthDay.msg)}
                  </TextNormal>
                </InputCustom>
                <InputCustom>
                  <InputBox className="dropdown">
                    <DropDownProfile
                      options={days}
                      onChange={(e) => onChange(e, 'dd')}
                      value={dd}
                      placeholder="dd"
                    />
                  </InputBox>
                  <TextNormal
                    fontSize="size_12"
                    fontWeight="fw_400"
                    color="text_danger"
                    className={isValidBirthDay.className}
                  >
                    {(!isValidBirthDay.isValid && isValidBirthDay.errorType === 'day') && t(isValidBirthDay.msg)}
                  </TextNormal>
                </InputCustom>
              </InputItem>
            </div>
            {/* <TextNormal
              fontSize="size_12"
              fontWeight="fw_400"
              color="text_danger"
              className={isValidBirthDay.className}
            >
              {!isValidBirthDay.isValid && t(isValidBirthDay.msg)}
            </TextNormal> */}
          </div>
        </InputWrapper>
        <InputWrapper>
          <TextPrimary fontSize="size_14" fontWeight="fw_600">
            {t('profile.edit.self_introduction')}
          </TextPrimary>
          <InputItem>
            <InputBox>
              <Textarea
                {...register('overviewYourSelf')}
                placeholder=""
                maxLength={2000}
              />
              <TextNormal fontSize="size_12" className="character">
                {t('profile.edit.characters', {
                  current: overviewYourSelf ? overviewYourSelf.length : 0,
                  maxLength: CONFIG.INTRODUCE_MAX_LENGTH
                })}
              </TextNormal>
            </InputBox>
          </InputItem>
        </InputWrapper>
        <SubmitButton loading={isUpdatingProfile} htmlType="submit" title={t('profile.edit.change')} />
      </form>
      <Toast
        content={t('profile.edit.update_success')}
        type="success"
        isShow={isUpdatedProfile}
      />

    </>
  )
}

export default ProfileForm
