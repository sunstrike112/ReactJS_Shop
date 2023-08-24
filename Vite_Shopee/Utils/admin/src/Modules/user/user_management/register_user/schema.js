import { REGEX } from 'Constants'
import { MEMBER_TYPE_CONSTANT } from 'Utils'
import * as yup from 'yup'

const validateFullNameKatakanaLetters = (value) => {
  const pattern = REGEX.FULL_NAME_KATAKANA

  return pattern.test(value)
}

export const validAvoidCharacter = (value) => {
  if (!value) return true
  const regexLetters = REGEX.AVOID_CHARACTER
  return regexLetters.test(value)
}

export const validLoginId = (value) => {
  const regexLoginId = REGEX.LOGIN_ID
  return regexLoginId.test(value)
}

export const validPassword = (value) => {
  if (!value) return true

  const regexLetters = REGEX.ONLY_LETTERS
  const regexNumbers = REGEX.ONLY_NUMBER

  return regexLetters.test(value) && regexNumbers.test(value)
}

const validFullName = (value) => {
  const regexOnlySpaceName = REGEX.ONLY_SPACE_NAME
  return regexOnlySpaceName.test(value)
}

export const validEmployeNumber = (value) => {
  if (!value) return true
  const regexEmployeeNumber = REGEX.EMPLOYEE_NUMBER
  return regexEmployeeNumber.test(value)
}

export const companyAdminUser = (t) => yup.object().shape({
  email: yup.string()
    .max(50, t('error_message:validation.email_max_length'))
    .email(t('error_message:validation.email_invalid'))
    .when(['isShowPassword', 'memberType'], {
      is: (isShowPassword, memberType) => !isShowPassword || memberType === MEMBER_TYPE_CONSTANT.COMPANY_ADMIN,
      then: yup.string().required(t('error_message:validation.required', { key: t('register_user.email') })),
      otherwise: yup.string()
    })
    .trim(),
  signinId: yup.string()
    .required(t('error_message:validation.required', { key: t('common:loginId') }))
    .max(255, t('error_message:validation.max_length', { key: t('common:loginId'), max: 255 }))
    .test(
      'isNotValidLoginId',
      t('error_message:validation.incorrectLoginId'),
      validLoginId
    )
    .trim(),
  fullName: yup.string()
    .required(t('error_message:validation.required', { key: t('register_user.full_name') }))
    .trim()
    .test('isValidFullName', t('error_message:validation.full_name_invalid'), validFullName),
  fullNameKatakana: yup.string()
    .required(t('error_message:required_fullname_katakana'))
    .trim()
    .test(
      'isNotFuri',
      t('error_message:fullname_katakana_valid'),
      validateFullNameKatakanaLetters
    ),
  password: yup.string()
    .test('isValidLetters2', t('user:register_user.validate_letter'), validPassword)
    .when('isShowPassword', {
      is: (isShowPassword) => isShowPassword,
      then: yup.string().min(8, t('user:register_user.pass_min_length'))
    })
    .max(20, t('user:register_user.pass_max_length'))
    .test(
      'isValidLetters',
      t('user:register_user.pass_invalid_letter'),
      validAvoidCharacter
    )
    .trim(),
  classification: yup.object().shape()
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
}, ['password', 'email', 'memberType'])

export const workspaceVirtualSchema = (t) => yup.object().shape({
  email: yup.string()
    .max(50, t('error_message:validation.email_max_length'))
    .email(t('error_message:validation.email_invalid'))
    .trim(),
  signinId: yup.string()
    .required(t('error_message:validation.required', { key: t('common:loginId') }))
    .max(255, t('error_message:validation.max_length', { key: t('common:loginId'), max: 255 }))
    .test(
      'isNotValidLoginId',
      t('error_message:validation.incorrectLoginId'),
      validLoginId
    )
    .trim(),
  fullName: yup.string()
    .required(t('error_message:validation.required', { key: t('register_user.full_name') }))
    .trim()
    .test('isValidFullName', t('error_message:validation.full_name_invalid'), validFullName),
  fullNameKatakana: yup.string()
    .required(t('error_message:required_fullname_katakana'))
    .trim()
    .test(
      'isNotFuri',
      t('error_message:fullname_katakana_valid'),
      validateFullNameKatakanaLetters
    ),
  classification: yup.object().shape()
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

export const superAdminUser = (t) => yup.object().shape({
  signinId: yup.string()
    .required(t('error_message:validation.required', { key: t('common:loginId') }))
    .max(255, t('error_message:validation.max_length', { key: t('common:loginId'), max: 255 }))
    .test(
      'isNotValidLoginId',
      t('error_message:validation.incorrectLoginId'),
      validLoginId
    )
    .trim(),
  email: yup.string()
    .email(t('error_message:validation.email_invalid'))
    .trim(),
  password: yup.string()
    .required(t('error_message:validation.required', { key: t('common:password') }))
    .test('isValidLetters2', t('user:register_user.validate_letter'), validPassword)
    .min(8, t('user:register_user.pass_min_length'))
    .max(20, t('user:register_user.pass_max_length'))
    .test(
      'isValidLetters',
      t('user:register_user.pass_invalid_letter'),
      validAvoidCharacter
    )
    .trim()
})
