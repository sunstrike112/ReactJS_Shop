/* eslint-disable operator-linebreak */
import * as yup from 'yup'

// const validTel = (value) => {
//   if (!value) return true

//   const regexNumber = new RegExp(/\d/)
//   const regexLen = new RegExp(/^(\d{10}|\d{11})$/)
//   const regexFullWidth = new RegExp(/[^０-９]$/)

//   return (
//     regexNumber.test(value) &&
//     regexLen.test(value) &&
//     regexFullWidth.test(value)
//   )
// }

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
  // lastName: yup.string().trim().required('register.validate.surname_required'),
  // firstName: yup
  //   .string()
  //   .trim()
  //   .required('register.validate.firstname_required'),
  // companyName: yup
  //   .string()
  //   .trim()
  //   .required('register.validate.company_name_required')
  //   .max(60, 'register.validate.max_company_name'),
  // address: yup.string().trim().max(60, ''),
  // mobilePhone: yup
  //   .string()
  //   .trim()
  //   .test('isValidTel', 'register.validate.mobile_must_be_number', validTel),
  password: yup
    .string()
    .required('register.validate.password_required')
    .test(
      'isValidLetters',
      'register.validate.pass_invalid_letter',
      validLetters
    )
    .min(8, 'register.validate.validate_letter')
    .max(20, 'register.validate.pass_max_length')
    .test(
      'isValidLetters2',
      'register.validate.validate_letter',
      validLetters2
    ),
  confirmPassword: yup
    .string()
    .required('register.validate.confirm_password_required')
    .oneOf([yup.ref('password'), null], 'register.validate.same_password')
})
