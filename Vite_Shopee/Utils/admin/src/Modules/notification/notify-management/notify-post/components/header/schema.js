import * as yup from 'yup'

export default (t) => yup.object().shape({
  title: yup.string().trim()
    .required(t('error_message:validation.required', { key: t('post.create.title') }))
    .max(100, t('error_message:validation.max_length', { key: t('post.create.title'), max: 100 })),
  textHtml: yup.string()
    .required(t('error_message:validation.required', { key: t('post.create.text') }))
    .max(8000, t('error_message:validation.max_length_notifi', { key: t('post.create.text'), max: 8000 })),
  publicationStart: yup.string().nullable().required(
    t('error_message:validation.required', {
      key: t('common:time')
    })
  )
})
