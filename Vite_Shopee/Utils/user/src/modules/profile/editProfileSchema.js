/* eslint-disable no-useless-escape */
import * as yup from 'yup'

const validateFuriganaLetters = (value) => {
  const pattern = /^(([ァ-ヶ]|ー)+((　)([ァ-ヶ]|ー)+))$/
  return pattern.test(value)
}

const validatePhoneNumber = (value) => {
  if (!value) {
    return true
  }
  const regex11DigitalSpecial = /^\d{3}[-]\d{4}[-]\d{4}$/
  const regex11Digital = /^\d{11}$/
  const regex10DigitalSpecial = /^\d{3}[-]\d{3}[-]\d{4}$/
  const regex10Digital = /^\d{10}$/

  return regex10Digital.test(value) || regex10DigitalSpecial.test(value) || regex11Digital.test(value) || regex11DigitalSpecial.test(value)
}

const validFullName = (value) => {
  const regxOnlySpaceName = /^\S+(　)\S+$/
  return regxOnlySpaceName.test(value)
}

export const validLoginId = (value) => {
  // Rules of regex loginId: includes alphabet, numbers or symbols (not space and character 2 bytes)
  const regexLoginId = /^[a-zA-Z0-9./<>?~;:,"'`!@#$%^&*()\[\]{}_+=|\\-]*$/
  return regexLoginId.test(value)
}

export default ({ isUserCompany }) => yup.object().shape({
  signinId: yup.string()
    .required('profile.edit.required_loginId')
    .max(255, 'login.required_loginId_max')
    .test(
      'isNotValidLoginId',
      'register.validate.validateOfLoginId',
      validLoginId
    )
    .trim(),
  fullName: yup.string()
    .required('profile.edit.require_fullName')
    .test('isValidFullName', 'register.validate.fullname_space_required', validFullName)
    .trim(),
  companyNameIndividual:
    !isUserCompany
      ? yup.string()
        .required('profile.edit.require_company')
        .trim()
      : yup.string().trim(),
  fullNameKatakana: yup.string()
    .required('profile.edit.require_fullName_translate')
    .trim()
    .test(
      'isNotFurigana',
      'register.validate.furigana_fullname_invalid',
      validateFuriganaLetters
    ),
  cellPhone: yup.string()
    .trim()
    .required('profile.edit.require_phoneNumber')
    .test('isNotNumberPhone', 'profile.edit.require_phoneNumber_maxLength', validatePhoneNumber),
  address: yup.string().trim().max(250, 'register.validate.max_address_max_company'),
  overviewYourSelf: yup.string()
    .max(2000, 'register.validate.max_company_name')
    .trim()
})
