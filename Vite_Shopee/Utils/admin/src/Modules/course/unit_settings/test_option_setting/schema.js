import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    timeLimit: yup
      .number()
      .nullable(true)
      .notRequired()
      .max(999, t('validate.limit_time', { time: 999 }))
  }))
