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

export const useEmailSchema = () => yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('register.validate.email_required')
    .email('register.validate.email_invalid')
    .nullable()
})

export default yup.object().shape({
  fullName: yup.string()
    .required('register.validate.surname_required')
    .test('isValidFullName', 'register.validate.fullname_space_required_register', validFullName)
    .trim(),
  fullFurigana: yup
    .string()
    .required('register.validate.furigana_surename_letters')
    .trim()
    .test(
      'isNotNumber',
      'register.validate.furigana_fullname_invalid',
      validateFuriganaLetters
    ),
  companyName: yup
    .string()
    .trim()
    .required('register.validate.company_name_required'),
  cellPhoneNumber: yup
    .string()
    .trim()
    .required('profile.edit.require_phoneNumber')
    .test('isNotNumberPhone', 'profile.edit.require_phoneNumber_maxLength', validatePhoneNumber),
  careerName: yup
    .string()
    .trim(),
  address: yup
    .string()
    .trim()
    .max(250, 'register.validate.max_address_max_company')
    .required('register.validate.address_required'),
  numberOfEmployee: yup
    .number()
    .typeError('register.validate.number_employee_required')
    .min(1, 'register.validate.number_employee_min')
    .max(10000, 'register.validate.number_employee_max')
})
