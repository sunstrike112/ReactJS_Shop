import * as yup from 'yup'

const validLetters = (value) => {
  if (!value) return true
  const regxLetters = new RegExp(/^[a-zA-Z0-9`~!@#$%^&*()_+\-=[\]{};':;“"\\|,.<>/?]*$/)
  return regxLetters.test(value)
}

export default (t) => (
  yup.object().shape({
    password: yup
      .string()
      .when('isAuto', {
        is: false,
        then: yup
          .string()
          .required(t('error_message:validation.required', { key: t('common:password') }))
          .max(20, t('error_message:validation.max_length', { key: t('common:password'), max: 20 }))
          .min(6, t('error_message:validation.min_length', { key: t('common:password'), min: 6 }))
          .trim()
      })
      .test('isValidatePassword', t('validation.password_planZz_invalid'), validLetters),
    numberOfPassword: yup
      .number()
      .when('isAuto', {
        is: true,
        then: yup
          .number()
          .typeError(t('error_message:validation.required', { key: t('create_password.numbers') }))
          .min(1, t('error_message:validation.scope_number', { key: t('create_password.numbers'), min: 1, max: 20 }))
          .max(20, t('error_message:validation.scope_number', { key: t('create_password.numbers'), min: 1, max: 20 }))
      })
  }))
