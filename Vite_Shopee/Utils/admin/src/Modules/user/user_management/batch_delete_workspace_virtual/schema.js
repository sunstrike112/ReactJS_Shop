/* eslint-disable no-unused-vars */
import * as yup from 'yup'
import { validLoginId } from '../register_user/schema'

const userSchema = ({ t }) => yup.object().shape({
  email: yup.string()
    .when('signinId', {
      is: (signinId) => !signinId || signinId.length === 0,
      then: yup.string().required('user:register_user.email_required')
        .trim()
    })
    .max(50, ('error_message:validation.email_max_length'))
    .email(('error_message:validation.email_invalid'))
    .trim(),
  signinId: yup.string()
    .max(255, ('error_message:validation.signinId_max_length'))
    .test(
      'isNotValidLoginId',
      ('error_message:validation.incorrectLoginId'),
      validLoginId
    )
    .trim()
}, ['email'])
export default userSchema
