/* eslint-disable no-unused-vars */
import { REGEX } from 'Constants'
import * as yup from 'yup'
import { userClassificationOptions, USER_ROLE_CSV } from '../../constant'
import { validAvoidCharacter, validLoginId, validPassword } from '../register_user/schema'

const ERROR_CHARACTER_JP = '?'

const validateFuriganaLetters = (value) => {
  const pattern = /^(([ァ-ヶ]|ー)+((　)([ァ-ヶ]|ー)+))$/

  return pattern.test(value)
}

const validFullName = (value) => {
  const regxOnlySpaceName = /^\S+(　)\S+$/
  return regxOnlySpaceName.test(value)
}

const checkClassification = (value) => {
  const dataTransform = userClassificationOptions.map((item) => item.label)
  return dataTransform.includes(value)
}

const validLetters = (value) => {
  if (!value) return true
  const regxLetters = new RegExp(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~@.-]*$/)
  return regxLetters.test(value)
}

const validLetters2 = (value) => {
  if (!value) return true

  const regxLetters = new RegExp(/[^a-zA-z]/)
  const regxNumbers = new RegExp(/[^\d]/)

  return regxLetters.test(value) && regxNumbers.test(value)
}

const checkOldJapanese = (value) => !(value.includes(ERROR_CHARACTER_JP))

export const validEmployeNumber = (value) => {
  if (!value) return true
  const regexEmployeeNumber = REGEX.EMPLOYEE_NUMBER
  return regexEmployeeNumber.test(value)
}

const userSchema = ({ isExist, t }) => yup.object().shape(
  isExist // No validate password with account exist (case update account user)
    ? {
      email: yup.string()
        .max(50, ('error_message:validation.email_max_length'))
        .email(('error_message:validation.email_invalid'))
        .trim(),
      signinId: yup.string()
        .required(t('error_message:validation.required', { key: t('common:loginId') }))
        .max(255, ('error_message:validation.signinId_max_length'))
        .test(
          'isNotValidLoginId',
          ('error_message:validation.incorrectLoginId'),
          validLoginId
        )
        .trim(),
      password: yup.string()
        .nullable()
        .transform((v) => (v === '' ? null : v))
        .test('isValidLetters2', ('user:register_user.validate_letter'), validPassword)
        .min(8, ('user:register_user.pass_min_length'))
        .max(20, ('user:register_user.pass_max_length'))
        .test(
          'isValidLetters',
          ('user:register_user.pass_invalid_letter'),
          validAvoidCharacter
        )
        .trim(),
      fullName: yup.string()
        .required(('register_user.fullName_required'))
        .max(60, 'error_message:validation.name_max_length')
        .trim()
        .test(
          'fullName_is_invalid',
          'user:validate.fullName_invalid',
          (value) => checkOldJapanese(value)
        )
        .test('isValidFullName', 'error_message:validation.full_name_invalid', validFullName),
      fullNameKatakana: yup
        .string()
        .required('register_user.fullNameKatakana_required')
        .max(60, 'error_message:validation.nameKatakana__max_length')
        .test(
          'isNotFuri',
          'error_message:fullname_katakana_valid',
          validateFuriganaLetters
        )
        .trim(),
      classification: yup
        .string()
        .trim()
        .required('register_user.classification_required')
        .test(
          'classification_not_exist',
          'error_message:classification_not_exist',
          checkClassification
        ),
      userRole: yup
        .string()
        .trim()
        .required('register_user.userRole_required')
        .test(
          'useRole_not_exist',
          'register_user.useRole_not_exist',
          (value) => {
            if (!value) return true
            return USER_ROLE_CSV.map((m) => m.value).includes(value.trim?.())
          }
        )
        .matches(/^(employee)$/, 'register_user.userRole_onlyEmp')
    }
    : {
      email: yup.string()
        .max(50, ('error_message:validation.email_max_length'))
        .email(('error_message:validation.email_invalid'))
        .trim(),
      signinId: yup.string()
        .required(t('error_message:validation.required', { key: t('common:loginId') }))
        .max(255, ('error_message:validation.signinId_max_length'))
        .test(
          'isNotValidLoginId',
          ('error_message:validation.incorrectLoginId'),
          validLoginId
        )
        .trim(),
      password: yup.string()
        .nullable()
        .transform((v) => (v === '' ? null : v))
        .test('isValidLetters2', ('user:register_user.validate_letter'), validPassword)
        .min(8, ('user:register_user.pass_min_length'))
        .max(20, ('user:register_user.pass_max_length'))
        .test(
          'isValidLetters',
          ('user:register_user.pass_invalid_letter'),
          validAvoidCharacter
        )
        .trim(),
      fullName: yup.string()
        .required(('register_user.fullName_required'))
        .max(60, 'error_message:validation.name_max_length')
        .trim()
        .test(
          'fullName_is_invalid',
          'user:validate.fullName_invalid',
          (value) => checkOldJapanese(value)
        )
        .test('isValidFullName', 'error_message:validation.full_name_invalid', validFullName),
      fullNameKatakana: yup
        .string()
        .required('register_user.fullNameKatakana_required')
        .max(60, 'error_message:validation.nameKatakana__max_length')
        .test(
          'isNotFuri',
          'error_message:fullname_katakana_valid',
          validateFuriganaLetters
        )
        .trim(),
      classification: yup
        .string()
        .trim()
        .required('register_user.classification_required')
        .test(
          'classification_not_exist',
          'error_message:classification_not_exist',
          checkClassification
        ),
      userRole: yup
        .string()
        .trim()
        .required('register_user.userRole_required')
        .test(
          'useRole_not_exist',
          'register_user.useRole_not_exist',
          (value) => {
            if (!value) return true
            return USER_ROLE_CSV.map((m) => m.value).includes(value.trim?.())
          }
        )
        .matches(/^(employee)$/, 'register_user.userRole_onlyEmp'),
      employeeNumber: yup.string()
        .max(50, ('error_message:validation.employee_max_length'))
        .test(
          'isNotValidEmployeeNumber',
          ('error_message:validation.incorrectEmployeeId'),
          validLoginId
        )
        .trim()
    }
)
export default userSchema
