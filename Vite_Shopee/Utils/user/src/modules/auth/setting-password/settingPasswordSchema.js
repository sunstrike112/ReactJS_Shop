/* eslint-disable operator-linebreak */
import * as yup from 'yup'

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
  newPassWord: yup
    .string()
    .required('reset_password.required_newPass')
    .test('isValidLetters2', 'register.validate.validate_letter', validLetters2)
    .min(8, 'register.validate.pass_min_length')
    .max(20, 'register.validate.pass_max_length')
    .test(
      'isValidLetters',
      'register.validate.pass_invalid_letter',
      validLetters
    ),
  confirmPassWord: yup
    .string()
    .required('reset_password.required_confirmPass')
    .oneOf([yup.ref('newPassWord'), null], 'register.validate.same_password')
})
