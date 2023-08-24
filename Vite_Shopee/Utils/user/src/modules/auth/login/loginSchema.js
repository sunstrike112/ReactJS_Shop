import * as yup from 'yup'
import { LOGIN_WITH_ACCOUNTS } from '../../../constants'

export default yup.object().shape({
  account: yup
    .string()
    .when('accountType', {
      is: (accountType) => accountType === LOGIN_WITH_ACCOUNTS.EMAIL,
      then: yup.string()
        .required('login.required_email')
        .max(50, 'login.required_email_max')
        .email('login.required_email_type'),
      otherwise: yup.string()
        .required('login.required_loginId')
        .max(255, 'login.required_loginId_max')
    })
    .trim(),
  companyCode: yup
    .string()
    .when('accountType', {
      is: (accountType) => accountType === LOGIN_WITH_ACCOUNTS.LOGIN_ID,
      then: yup.string().required('login.required_loginId')
    })
    .trim(),
  password: yup
    .string()
    .required('login.required_pass')
    .max(20, 'login.required_pass_max')
}, ['account', 'companyCode'])
