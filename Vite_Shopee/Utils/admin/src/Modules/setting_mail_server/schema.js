/* eslint-disable no-useless-escape */
import * as yup from 'yup'

export default (t) => yup.object().shape({
  host: yup
    .string()
    .required(t('error_message:validation.required', { key: t('host') }))
    .max(100, t('error_message:validation.max_length', { key: t('host'), max: 100 }))
    .trim(),
  senderName: yup
    .string()
    .required(t('error_message:validation.required', { key: t('fromName') }))
    .max(255, t('error_message:validation.max_length', { key: t('fromName'), max: 255 }))
    .trim(),
  userName: yup
    .string()
    .max(50, t('error_message:validation.email_max_length'))
    .email(t('error_message:validation.email_invalid'))
    .trim(),
  password: yup
    .string()
    .required(t('error_message:validation.required', { key: t('password') }))
    .max(255, t('error_message:validation.max_length', { key: t('password'), max: 255 }))
    .trim(),
  port: yup
    .number()
    .typeError(t('error_message:validation.required', { key: t('port') }))
    .required(t('error_message:validation.required', { key: t('port') }))
    .max(999, t('error_message:validation.max_length', { key: t('port'), max: 3 })),
  protocol: yup
    .string()
    .required(t('error_message:validation.required', { key: t('protocol') }))
    .max(45, t('error_message:validation.max_length', { key: t('protocol'), max: 45 }))
    .trim()
})
