import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    companyCodeSeraku: yup
      .string()
      .when('isApproved', {
        is: (isApproved) => isApproved,
        then: yup.string().required(t('error_message:validation.required', { key: t('waiting.companyCodeSeraku') }))
      })
      .trim(),
    memo: yup
      .string()
      .max(1000, t('error_message:validation.max_length', { key: t('user:register_user.note'), max: 1000 }))
      .trim()
  }))
