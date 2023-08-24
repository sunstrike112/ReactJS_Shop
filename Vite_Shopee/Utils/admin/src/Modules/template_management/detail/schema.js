import * as yup from 'yup'

export default (t) => yup.object().shape({
  title: yup
    .string()
    .required(t('error_message:validation.required', { key: t('title') }))
    .trim(),
  description: yup
    .string()
    .required(t('error_message:validation.required', { key: t('description') }))
    .max(4000, t('error_message:validation.max_length', { key: t('description'), max: 4000 }))
    .trim()
})
