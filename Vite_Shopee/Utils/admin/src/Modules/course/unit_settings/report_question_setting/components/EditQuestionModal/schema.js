import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    contentQuestion: yup
      .string()
      .required(t('error_message:validation.required', { key: t('create.question_text') }))
      .max(4000, t('error_message:validation.max_length', { key: t('create.question_text'), max: 4000 }))
  })
)
