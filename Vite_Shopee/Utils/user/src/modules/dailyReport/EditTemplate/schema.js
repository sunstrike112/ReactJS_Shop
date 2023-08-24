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
    .max(4000, 'talk_board.content_max_length')
    .trim()
})
