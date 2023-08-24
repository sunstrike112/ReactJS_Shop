/* eslint-disable no-unused-vars */
import * as yup from 'yup'
import { REGEX } from 'Constants'
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

const checkOldJapanese = (value) => !(value.includes(ERROR_CHARACTER_JP))

const checkGroupAndAttribute = (value, attributeIdList = []) => {
  if (!value) {
    return true
  }
  const dataValidate = value ? value.split(',').map((item) => item.trim()).filter((f) => !!f) : []
  const foundError = dataValidate.filter((f) => !attributeIdList.includes(f))
  return !(foundError.length > 0)
}

export const validEmployeNumber = (value) => {
  if (!value) return true
  const regexEmployeeNumber = REGEX.EMPLOYEE_NUMBER
  return regexEmployeeNumber.test(value)
}

const userSchema = ({
  attributeIdList,
  departmentIdList,
  t
}) => yup.object().shape({
  email: yup.string()
    .max(50, ('error_message:validation.email_max_length'))
    .email(('error_message:validation.email_invalid'))
    .trim(),
  companyCode: yup.string()
    .when('email', {
      is: (email) => !email,
      then: yup.string().required(t('error_message:validation.required', { key: t('common:company_code') }))
    })
    .trim(),
  signinId: yup.string()
    .max(255, ('error_message:validation.signinId_max_length'))
    .when('email', {
      is: (email) => !email,
      then: yup.string().required(t('error_message:validation.required', { key: t('common:loginId') }))
    })
    .test(
      'isNotValidLoginId',
      ('error_message:validation.incorrectLoginId'),
      validLoginId
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
  attributeIdList: yup
    .string()
    .trim()
    .test(
      'attribute_is_invalid',
      'user:validate.attribute_invalid',
      (value) => checkOldJapanese(value)
    )
    .test(
      'attributes_not_exist',
      'error_message:attributes_not_exist',
      (value) => checkGroupAndAttribute(value, attributeIdList)
    ),
  departmentIdList: yup
    .string()
    .trim()
    .test(
      'group_is_invalid',
      'user:validate.group_invalid',
      (value) => checkOldJapanese(value)
    )
    .test(
      'departments_not_exist',
      'error_message:departments_not_exist',
      (value) => checkGroupAndAttribute(value, departmentIdList)
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
    ),
  employeeNumber: yup.string()
    .max(50, ('error_message:validation.employee_max_length'))
    .test(
      'isNotValidEmployeeNumber',
      ('error_message:validation.incorrectEmployeeId'),
      validEmployeNumber
    )
    .trim()
})
export default userSchema
