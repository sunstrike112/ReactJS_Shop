import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    senderName: yup
      .string()
      .required(t('error_message:validation.required', { key: t('send_email.sender_name') }))
      .max(100, t('error_message:validation.max_length', { key: t('send_email.sender_name'), max: 100 }))
      .nullable(),
    senderEmailAddress: yup
      .string()
      .email(t('error_message:validation.email_invalid'))
      .required(t('error_message:validation.required', { key: t('send_email.sender_email_address') })),
    subject: yup
      .string()
      .required(t('error_message:validation.required', { key: t('send_email.subject') }))
      .max(200, t('error_message:validation.max_length', { key: t('send_email.subject'), max: 200 })),
    text: yup
      .string()
      .max(4000, t('error_message:validation.max_length', { key: t('send_email.body'), max: 4000 }))
      .required(t('error_message:validation.required', { key: t('send_email.body') }))
  })
)
