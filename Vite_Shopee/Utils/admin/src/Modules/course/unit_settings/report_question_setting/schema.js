import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    overView: yup
      .string()
      .max(4000, t('error_message:validation.max_length', { key: t('detail.overview'), max: 4000 }))
  }))
