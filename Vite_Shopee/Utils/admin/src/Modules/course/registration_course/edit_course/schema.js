import * as yup from 'yup'

const FILE_SIZE = 10 // 10mb
const FILE_FORMATS = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']

export default (t) => yup.object().shape({
  courseName: yup.string().trim()
    .required(t('error_message:validation.required', { key: t('registration_course.edit.course_name') }))
    .max(200, t('error_message:validation.max_length', { key: t('registration_course.edit.course_name'), max: 200 })),
  overview: yup.string().max(4000, t('error_message:validation.max_length', { key: t('registration_course.edit.overview'), max: 4000 })),
  // price: yup.number().nullable().required(t('error_message:validation.required', { key: t('registration_course.edit.price') }))
  //   .when('coursePaidSetting', (coursePaidSetting, schema) => (coursePaidSetting ? schema.min(1, t('error_message:validation.price_min_value', { min: 0 })) : schema)),
  file: yup.mixed()
    .test('fileSize', '', function (value) {
      if (value && (value.size / 1024 > FILE_SIZE * 1024)) {
        return this.createError({ message: t('error_message:validation.max_file_size', { fileName: value.name, size: value.size / 1024, sizeRequired: '10240 KB' }) })
      }
      return true
    })
    .test('fileType', '', function (value) {
      if (value && !FILE_FORMATS.includes(value.type)) {
        return this.createError({ message: t('error_message:validation.incorrect_file_type', { fileName: value.name }) })
      }
      return true
    }),
  accessCourse: yup.array().min(1, t('error_message:validation.required', { key: t('company:access_company') }))
})
