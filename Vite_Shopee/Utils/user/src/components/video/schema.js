import * as yup from 'yup'

export default () => yup.object().shape({
  confirmPassword: yup
    .string()
    .required('profile.password.required_newPass_confirm')
    .oneOf([yup.ref('password')], 'profile.password.incorrect_confirm_password')
})
