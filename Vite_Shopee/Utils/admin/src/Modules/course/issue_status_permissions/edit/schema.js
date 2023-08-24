import * as yup from 'yup'

export default (t) => yup.object().shape({
  course_start_date: yup.string().when('isLimitStartTrue', {
    is: (isLimitStartTrue) => isLimitStartTrue === 1,
    then: yup.string().required(t('error_message:validation.required', { key: t('common.course_start_date') }))
  })
})
