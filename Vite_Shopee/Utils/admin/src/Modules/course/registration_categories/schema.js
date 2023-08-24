import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    courseCategoryName: yup
      .string()
      .max(100, t('error_message:validation.max_length', { key: t('course_category_name'), max: 100 }))
      .required(t('error_message:validation.required', { key: t('course_category_name') }))
      .trim()
  }))
