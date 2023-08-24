import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    folderName: yup
      .string()
      .required(t('error_message:validation.required', { key: t('folderName') }))
      .max(
        200,
        t('error_message:validation.max_length', { key: t('folderName'), max: 200 })
      )
      .trim()
  }))
