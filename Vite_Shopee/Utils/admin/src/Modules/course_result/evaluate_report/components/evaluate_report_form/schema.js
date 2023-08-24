import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    feedBack: yup
      .string()
      .max(4000, t('error_message:validation.max_length', { key: t('feedBack'), max: 4000 })).nullable()
  })
)
