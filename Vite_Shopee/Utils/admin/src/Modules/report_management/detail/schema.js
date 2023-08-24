import * as yup from 'yup'

export default () => yup.object().shape({
  title: yup
    .string()
    .required('talk_theme_required')
    .trim(),
  description: yup
    .string()
    .required('theme_overview_required')
    .max(4000, 'description_max_length')
    .trim(),
  lstAttributeId: yup
    .array().when(['isAll', 'lstDepartmentId'], {
      is: (isAll, lstDepartmentId) => !isAll && lstDepartmentId.length === 0,
      then: yup.array().min(1, 'group_or_attribute_required')
    })
})
