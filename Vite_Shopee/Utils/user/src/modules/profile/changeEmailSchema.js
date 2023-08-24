import * as yup from 'yup'

export const emailSchema = yup.object().shape({
  email: yup.string()
    .email('profile.email.not_valid_email')
    .max(50, 'login.required_email_max')
    .when('isRequiredVerifyEmail', {
      is: (isRequiredVerifyEmail) => isRequiredVerifyEmail,
      then: yup.string().required('profile.email.email_required')
    })
})

export const verifyCodeSchema = yup.object().shape({
  verifyCode: yup.string().required('profile.email.incorrect_confirmation_code')
})
