import * as yup from 'yup'

// const FILE_SIZE = 10 // 10mb
// const FILE_FORMATS = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']

export default (t) => yup.object().shape({
  course_start_date: yup.string().trim()
    .required(t('error_message:validation.required', { key: t('common.course_start_date') }))
    .nullable(),
  listCourseIds: yup.array()
    .ensure()
    .min(1, t('error_message:validation.required', { key: t('common.course') }))
})
