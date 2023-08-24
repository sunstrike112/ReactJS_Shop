import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    testName: yup
      .string()
      .required(t('error_message:validation.required', { key: t('common:unit') }))
      .max(
        200,
        t('error_message:validation.max_length', { key: t('common:unit'), max: 200 })
      )
      .trim()
  }))
