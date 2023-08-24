/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import { REGEX } from 'Constants'
import { MEMBER_TYPE_CONSTANT } from 'Utils'
import * as yup from 'yup'
import { validAvoidCharacter, validLoginId, validPassword } from '../register_user/schema'

const validateFuriganaLetters = (value) => {
  const pattern = /^(([ァ-ヶ]|ー)+((　)([ァ-ヶ]|ー)+))$/
  return pattern.test(value)
}

const validFullName = (value) => {
  // const regxOnlySpaceName = /^([a-zA-Z0-9]+((　)[a-zA-Z0-9]+))+$/
  const regxOnlySpaceName = /^\S+(　)\S+$/
  return regxOnlySpaceName.test(value)
}

export const validEmployeNumber = (value) => {
  if (!value) return true
  const regexEmployeeNumber = REGEX.EMPLOYEE_NUMBER
  return regexEmployeeNumber.test(value)
}

export const companyAdminSchema = (t) => yup.object().shape({
  email: yup.string()
    .max(50, t('error_message:validation.email_max_length'))
    .email(t('error_message:validation.email_invalid'))
    .when('memberType', {
      is: (memberType) => memberType === MEMBER_TYPE_CONSTANT.COMPANY_ADMIN,
      then: yup.string().required(t('error_message:validation.required', { key: t('register_user.email') }))
    })
    .trim(),
  signinId: yup
    .string()
    .required(t('error_message:validation.required', { key: t('common:loginId') }))
    .max(255, t('error_message:validation.max_length', { key: t('common:loginId'), max: 255 }))
    .test(
      'isNotValidLoginId',
      t('error_message:validation.incorrectLoginId'),
      validLoginId
    )
    .trim(),
  fullName: yup
    .string()
    .required(t('error_message:validation.required', { key: t('register_user.full_name') }))
    .test('isValidFullName', t('error_message:validation.full_name_invalid'), validFullName)
    .trim(),
  fullNameKatakana: yup
    .string()
    .required(t('error_message:required_fullname_katakana'))
    .test(
      'isNotFurigana',
      t('error_message:fullname_katakana_valid'),
      validateFuriganaLetters

    )
    .trim(),
  newPassword: yup.string()
    .test('isValidLetters2', t('user:register_user.validate_letter_new_password'), validPassword)
    .when('isShowPassword', {
      is: (isShowPassword) => isShowPassword,
      then: yup.string().min(8, t('user:register_user.new_pass_min_length'))
    })
    .max(20, t('user:register_user.new_pass_max_length'))
    .test(
      'isValidLetters',
      t('user:register_user.new_pass_invalid_letter'),
      validAvoidCharacter
    )
    .trim(),
  confirmPassword: yup.string()
    .when('isShowPassword', {
      is: (isShowPassword) => isShowPassword,
      then: yup.string().required(t('error_message:validation.required', { key: t('common:confirmPassword') }))
    })
    .oneOf([yup.ref('newPassword'), null], t('user:register_user.confirm_password_not_match')),
  classification: yup
    .object()
    .shape()
    .nullable()
    .required(t('error_message:validation.required', { key: t('user:detail:classification') })),
  employeeNumber: yup.string()
    .nullable()
    .transform((v) => (v === '' ? null : v))
    .max(50, ('error_message:validation.employee_max_length'))
    .test(
      'isNotValidEmployeeNumber',
      t('error_message:validation.incorrectEmployeeId'),
      validEmployeNumber
    )
    .trim()
})

export const workspaceVirtualSchema = (t) => yup.object().shape({
  email: yup.string()
    .max(50, t('error_message:validation.email_max_length'))
    .email(t('error_message:validation.email_invalid'))
    .trim(),
  signinId: yup
    .string()
    .required(t('error_message:validation.required', { key: t('common:loginId') }))
    .max(255, t('error_message:validation.max_length', { key: t('common:loginId'), max: 255 }))
    .test(
      'isNotValidLoginId',
      t('error_message:validation.incorrectLoginId'),
      validLoginId
    )
    .trim(),
  fullName: yup
    .string()
    .required(t('error_message:validation.required', { key: t('register_user.full_name') }))
    .test('isValidFullName', t('error_message:validation.full_name_invalid'), validFullName)
    .trim(),
  fullNameKatakana: yup
    .string()
    .required(t('error_message:required_fullname_katakana'))
    .test(
      'isNotFurigana',
      t('error_message:fullname_katakana_valid'),
      validateFuriganaLetters

    )
    .trim(),
  classification: yup
    .object()
    .shape()
    .nullable()
    .required(t('error_message:validation.required', { key: t('user:detail:classification') })),
  employeeNumber: yup.string()
    .nullable()
    .transform((v) => (v === '' ? null : v))
    .max(50, ('error_message:validation.employee_max_length'))
    .test(
      'isNotValidEmployeeNumber',
      t('error_message:validation.incorrectEmployeeId'),
      validEmployeNumber
    )
    .trim()
})

export const defaultSchema = (t) => yup.object().shape({
  email: yup
    .string()
    .required(t('error_message:validation.required', { key: t('edit_user.email') }))
    .email(t('error_message:validation.email_invalid'))
    .trim()
})
