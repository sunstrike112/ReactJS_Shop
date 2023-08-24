import * as yup from 'yup'

export const unitLearnCourse = () => yup.object().shape({
  countViewHistory: yup.number()
    .min(1)
    .integer()
    .default(1)
}, [])
