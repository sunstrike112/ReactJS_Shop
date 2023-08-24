/* eslint-disable operator-linebreak */
import * as yup from 'yup'

const validTel = (value) => {
  if (!value) return true

  const regexNumber = new RegExp(/\d/)
  const regexLen = new RegExp(/^(\d{10}|\d{11})$/)
  const regexFullWidth = new RegExp(/[^０-９]$/)

  return (
    regexNumber.test(value) &&
    regexLen.test(value) &&
    regexFullWidth.test(value)
  )
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

export default yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('register.validate.email_required')
    .email('register.validate.email_invalid'),
  lastRegisterName: yup
    .string()
    .trim()
    .required('register.validate.surname_required'),
  firstRegisterName: yup
    .string()
    .trim()
    .required('register.validate.firstname_required'),
  lastFurigana: yup
    .string()
    .trim()
    .required('register.validate.furigana_surname_required'),
  firstFurigana: yup
    .string()
    .trim()
    .required('register.validate.furigana_firstname_required'),
  companyName: yup
    .string()
    .trim()
    .required('register.validate.company_name_required')
    .max(60, 'register.validate.max_company_name'),
  lastPersonIncharge: yup
    .string()
    .trim()
    .required('register.validate.surname_required'),
  firstPersonIncharge: yup
    .string()
    .trim()
    .required('register.validate.firstname_required'),
  mobilePhone: yup
    .string()
    .trim()
    .required('register.validate.tel_reuiqred')
    .test('isValidTel', 'register.validate.tel_must_be_number', validTel),
  password: yup
    .string()
    .required('register.validate.password_required')
    .test('isValidLetters2', 'register.validate.validate_letter', validLetters2)
    .min(8, 'register.validate.validate_letter')
    .max(20, 'register.validate.pass_max_length')
    .test(
      'isValidLetters',
      'register.validate.pass_invalid_letter',
      validLetters
    ),
  confirmPassword: yup
    .string()
    .required('register.validate.confirm_password_required')
    .oneOf([yup.ref('password'), null], 'register.validate.same_password')
})
