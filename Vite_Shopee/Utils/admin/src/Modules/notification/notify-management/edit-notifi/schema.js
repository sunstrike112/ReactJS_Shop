import * as yup from 'yup'

export default (t) => yup.object().shape({
  newsTitle: yup.string().trim()
    .required(t('error_message:validation.required', { key: t('post.create.title') }))
    .max(100, t('error_message:validation.max_length', { key: t('post.create.title'), max: 100 })),
  newsTextHtml: yup.string().trim()
    .required(t('error_message:validation.required', { key: t('post.create.text') }))
    .max(80000, t('error_message:validation.max_length', { key: t('post.create.text'), max: 8000 })),
  publicationStart: yup.string().nullable().required(
    t('error_message:validation.required', {
      key: t('common:time')
    })
  )
})
