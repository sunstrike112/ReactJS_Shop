import * as yup from 'yup'

export default (t) => yup.object().shape({
  group: yup
    .array()
    .min(1, t('validate.group_required'))
})
