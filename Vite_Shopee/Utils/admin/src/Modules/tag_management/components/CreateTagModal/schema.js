import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    name: yup
      .string()
      .required(t('error_message:validation.required', { key: t('tag_name') }))
      .trim()
  }))
