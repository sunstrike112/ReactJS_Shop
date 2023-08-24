import { validAvoidCharacter, validLoginId, validPassword } from 'Modules/user/user_management/register_user/schema'
import * as yup from 'yup'

export default (t) => yup.object().shape({
  email: yup.string()
    .max(50, t('error_message:validation.email_max_length'))
    .email(t('error_message:validation.email_invalid'))
    .trim(),
  signinId: yup
    .string()
    .required(t('error_message:validation.required', { key: t('common:loginId') }))
    .max(255, t('error_message:validation.max_length', { key: t('common:loginId'), max: 255 }))
    .test(
      'isNotValidLoginId',
      t('error_message:validation.incorrectLoginId'),
      validLoginId
    )
    .trim(),
  newPassword: yup.string()
    .test('isValidLetters2', t('user:register_user.validate_letter_new_password'), validPassword)
    .when('isSetPassword', {
      is: (isSetPassword) => isSetPassword,
      then: yup.string().required(t('error_message:validation.required', { key: t('common:newPassword') })).min(8, t('user:register_user.new_pass_min_length'))
    })
    .max(20, t('user:register_user.new_pass_max_length'))
    .test(
      'isValidLetters',
      t('user:register_user.new_pass_invalid_letter'),
      validAvoidCharacter
    )
    .trim(),
  confirmPassword: yup.string()
    .when('isSetPassword', {
      is: (isSetPassword) => isSetPassword,
      then: yup.string().required(t('error_message:validation.required', { key: t('common:confirmPassword') }))
    })
    .oneOf([yup.ref('newPassword'), null], t('user:register_user.confirm_password_not_match'))
})
