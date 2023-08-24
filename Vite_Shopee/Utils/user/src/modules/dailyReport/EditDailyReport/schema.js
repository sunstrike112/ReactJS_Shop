/* eslint-disable no-unused-vars */
import * as yup from 'yup'

export default () => yup.object().shape({
  reportDate: yup
    .string()
    .required('dailyReports.errorMessage.requiredDate')
    .trim(),
  title: yup
    .string()
    .required('dailyReports.errorMessage.requiredDailyReport')
    .trim(),
  content: yup
    .string()
    .required('talk_board.content_required')
    .max(4000, 'talk_board.content_max_length')
    .trim(),
  lstAttributeId: yup
    .array().when(['isChooseAll', 'lstDepartmentId'], {
      is: (isChooseAll, lstDepartmentId) => isChooseAll && lstDepartmentId.length === 0,
      then: yup.array().min(1, 'talk_board.error_message.group_or_attribute_required')
    })
})
