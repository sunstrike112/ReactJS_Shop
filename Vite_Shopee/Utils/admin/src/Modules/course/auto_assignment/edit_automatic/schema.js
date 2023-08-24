import * as yup from 'yup'

export default (t) => yup.object().shape({
  assignName: yup
    .string()
    .max(200, t('error_message:validation.max_length', { key: t('auto_assignment_settings'), max: 200 }))
    .required(
      t('error_message:validation.required', {
        key: t('auto_assignment_settings')
      })
    )
    .trim(),
  courseStartDate: yup.string().nullable().required(
    t('error_message:validation.required', {
      key: t('common:date')
    })
  ),
  courseStartTime: yup.string().nullable().required(
    t('error_message:validation.required', {
      key: t('common:time')
    })
  ),
  // targetGroups: yup.array().when(['isAll', 'clearValidateTarget'], {
  //   is: (isAll, clearValidateTarget) => !isAll && !clearValidateTarget,
  //   then: yup.array().min(
  //     1,
  //     t('error_message:validation.required', {
  //       key: t('target_group')
  //     })
  //   )
  // }),
  // targetAttributes: yup.array().when(['isAll', 'clearValidateTarget'], {
  //   is: (isAll, clearValidateTarget) => !isAll && !clearValidateTarget,
  //   then: yup.array().min(
  //     1,
  //     t('error_message:validation.required', {
  //       key: t('target_attribute')
  //     })
  //   )
  // }),
  targetGroups: yup.array().nullable(),
  targetAttributes: yup.array().nullable(),
  courseSelect: yup.array().min(
    1,
    t('error_message:validation.required', {
      key: t('common:course')
    })
  )
})
