/* eslint-disable no-unused-vars */
import * as yup from 'yup'

export default () => yup.object().shape({
  title: yup
    .string()
    .required('dailyReports.template.templateRequired')
    .trim(),
  description: yup
    .string()
    .required('dailyReports.template.descriptionRequired')
    .max(2000, 'talk_board.description_max_length')
    .trim()
})
