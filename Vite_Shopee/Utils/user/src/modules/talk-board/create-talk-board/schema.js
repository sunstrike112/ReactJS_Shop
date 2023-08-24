/* eslint-disable no-unused-vars */
import * as yup from 'yup'

export default () => yup.object().shape({
  title: yup
    .string()
    .required('talk_board.error_message.talk_theme')
    .trim(),
  description: yup
    .string()
    .required('talk_board.error_message.theme_overview')
    .max(2000, 'talk_board.description_max_length')
    .trim(),
  lstAttributeId: yup
    .array().when(['isChooseAll', 'lstDepartmentId'], {
      is: (isChooseAll, lstDepartmentId) => isChooseAll && lstDepartmentId.length === 0,
      then: yup.array().min(1, 'talk_board.error_message.group_or_attribute_required')
    })
})
