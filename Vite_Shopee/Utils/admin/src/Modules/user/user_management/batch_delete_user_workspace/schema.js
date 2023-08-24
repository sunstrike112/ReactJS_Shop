/* eslint-disable no-unused-vars */
import * as yup from 'yup'
import { validLoginId } from '../register_user/schema'

const userSchema = ({ t }) => yup.object().shape({
  email: yup.string()
    .when(['signinId', 'companyCode'], {
      is: (signinId, companyCode) => (!signinId || signinId.length === 0) && (!companyCode || companyCode.length === 0),
      then: yup.string().required('user:register_user.email_required')
        .trim()
    })
    .max(50, ('error_message:validation.email_max_length'))
    .email(('error_message:validation.email_invalid'))
    .trim(),
  companyCode: yup.string()
    .when('signinId', {
      is: (signinId) => signinId,
      then: yup.string().required(('error_message:validation.company_code_not_blank'))
    })
    .trim(),
  signinId: yup.string()
    .when('companyCode', {
      is: (companyCode) => companyCode,
      then: yup.string().required(('error_message:validation.signinId_not_blank'))
    })
    .max(255, ('error_message:validation.signinId_max_length'))
    .test(
      'isNotValidLoginId',
      ('error_message:validation.incorrectLoginId'),
      validLoginId
    )
    .trim()
}, [['signinId', 'companyCode'], ['email']])
export default userSchema
