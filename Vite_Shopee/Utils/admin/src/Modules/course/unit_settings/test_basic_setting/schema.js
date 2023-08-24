import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    unitName: yup
      .string()
      .max(200, t('error_message:validation.max_length', { key: t('unit'), max: 200 }))
      .required(t('error_message:validation.required', { key: t('unit') }))
      .trim(),
    unitDetails: yup
      .string()
      .max(4000, t('error_message:validation.max_length', { key: t('unit_detail'), max: 4000 })),
    endDate: yup.string().when('isLimitEndTrue', {
      is: (isLimitEndTrue) => isLimitEndTrue === 1,
      then: yup.string().required(null)
    }),
    startDate: yup.string().when('isLimitStartTrue', {
      is: (isLimitStartTrue) => isLimitStartTrue === 1,
      then: yup.string().required(null)
    }),
    completionMessage: yup
      .string()
      .max(100, t('error_message:validation.max_length', { key: t('message_complete'), max: 100 }))
  })
)
