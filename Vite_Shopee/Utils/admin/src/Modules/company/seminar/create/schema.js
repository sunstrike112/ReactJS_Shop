/* eslint-disable no-unused-vars */
import * as yup from 'yup'

export default (t, isSuperAdmin, isAdmin) => ((isSuperAdmin || isAdmin) ? yup.object().shape({
  title: yup.string().trim()
    .required(t('error_message:validation.required', { key: t('common.seminar_title_input') }))
    .max(50, t('error_message:validation.max_length', { key: t('common.seminar_title_input'), max: 50 })),
  description: yup.string().trim()
    .max(250, t('error_message:validation.max_length', { key: t('common.description'), max: 250 })),
  link: yup.string().trim()
    .required(t('error_message:validation.required', { key: t('common.live_link') })),
  password: yup.string().trim()
    .max(50, t('error_message:validation.max_length', { key: t('common.description'), max: 50 })),
  companyId: yup.object().shape()
    .nullable()
    .required(t('error_message:validation.required', { key: t('common.company_name') })),
  startTime: yup.string().trim()
    .required(t('error_message:validation.required', { key: t('common.start_date') })),
  endTime: yup.string().trim()
    .required(t('error_message:validation.required', { key: t('common.end_date') }))
})
  : yup.object().shape({
    title: yup.string().trim()
      .required(t('error_message:validation.required', { key: t('common.seminar_title_input') }))
      .max(50, t('error_message:validation.max_length', { key: t('common.seminar_title_input'), max: 50 })),
    description: yup.string().trim()
      .max(250, t('error_message:validation.max_length', { key: t('common.description'), max: 250 })),
    link: yup.string().trim()
      .required(t('error_message:validation.required', { key: t('common.live_link') })),
    password: yup.string().trim()
      .max(50, t('error_message:validation.max_length', { key: t('common.description'), max: 50 })),
    startTime: yup.string().trim()
      .required(t('error_message:validation.required', { key: t('common.start_date') })),
    endTime: yup.string().trim()
      .required(t('error_message:validation.required', { key: t('common.end_date') }))
  }))
