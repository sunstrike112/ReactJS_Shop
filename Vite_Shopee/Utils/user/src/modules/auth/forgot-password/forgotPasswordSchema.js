/* eslint-disable operator-linebreak */
import * as yup from 'yup'

export default yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('forgot_password.required_email')
    .email('login.required_email_type')
})
