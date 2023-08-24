import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    attributeName: yup
      .string()
      .required(t('error_message:validation.required', { key: t('attribute.attribute_name') }))
      .trim()
  }))
