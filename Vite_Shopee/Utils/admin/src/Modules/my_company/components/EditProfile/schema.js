/* eslint-disable implicit-arrow-linebreak */
import * as yup from 'yup'

const validateFuriganaLetters = (value) => {
  const pattern = /^(([ァ-ヶ]|ー)+((　)([ァ-ヶ]|ー)+))$/
  return pattern.test(value)
}

const validateFuriganaComapany = (value) => {
  const pattern = /^([ァ-ヶーぁ-ん]+)$/
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

export default (t, isWorkspaceAdmin, isSuperAdmin, isVirtualCompany) => {
  if (isWorkspaceAdmin) {
    return yup.object().shape({})
  }
  const yupObject = {
    email: yup.string()
      .required(t('error_message:validation.required', { key: t('user:register_user.email') }))
      .max(50, t('error_message:validation.email_max_length'))
      .email(t('error_message:validation.email_invalid'))
      .trim(),
    managerFullName: yup
      .string()
      .required(t('validate.fullname_required'))
      .test('isValidFullName', t('validate.full_name_invalid'), validFullName)
      .trim(),
    managerFuriganaFullName: yup
      .string()
      .required(t('validate.furigana_surename_letters'))
      .trim()
      .test(
        'isNotNumber',
        t('validate.full_name_katakana_format'),
        validateFuriganaLetters
      ),
    companyFuriganaName: yup
      .string()
      .trim()
      .required(t('validate.furigana_company_letters'))
      .max(255, t('validate.max_furigana_company'))
      .test(
        'isNotNumber',
        t('validate.furigana_firstname_letters'),
        validateFuriganaComapany
      ),
    companyName: yup
      .string()
      .trim()
      .required(t('validate.company_name_required'))
      .max(255, t('validate.max_company_name')),
    cellPhoneNumber: yup.string()
      .trim()
      .test('isNotNumberPhone', t('validate.tel_must_be_number'), validatePhoneNumber),
    address: yup
      .string().trim()
      .max(250, t('validate.max_address_max_company')),
    numberOfEmployee: yup
      .number()
      .typeError(t('error_message:validation.required', { key: t('number_employee') }))
      .min(1, t('validate.number_employee_min'))
      .max(10000, t('validate.number_employee_max'))
  }
  if (isSuperAdmin && isVirtualCompany !== 2) {
    yupObject.companyCodeSeraku = yup
      .string()
      .required(t('validate.company_code_seraku_required'))
      .max(18, t('validate.max_company_code_seraku'))
  }
  return yup.object().shape(yupObject)
}
