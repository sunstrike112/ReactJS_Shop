import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    trialEndDate: yup
      .string()
      .required(t('error_message:validation.required', { key: t('trial_end_date') }))
  })
)
