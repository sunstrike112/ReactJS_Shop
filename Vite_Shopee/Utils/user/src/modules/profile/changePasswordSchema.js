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
  currentPassword: yup
    .string()
    .required('profile.password.require_currentPass')
    .test('isValidLetters2', 'register.validate.validate_letter', validLetters2)
    .min(8, 'register.validate.validate_letter')
    .max(20, 'register.validate.pass_max_length')
    .test(
      'isValidLetters',
      'register.validate.pass_invalid_letter',
      validLetters
    ),
  newPassword: yup
    .string()
    .required('profile.password.require_newPass')
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
    .required('profile.password.password_confirm')
    .test('isValidLetters2', 'register.validate.validate_letter', validLetters2)
    .min(8, 'register.validate.validate_letter')
    .max(20, 'register.validate.pass_max_length')
    .test(
      'isValidLetters',
      'register.validate.pass_invalid_letter',
      validLetters
    )
    .oneOf([yup.ref('newPassword'), null], 'profile.password.same_password')
})
