import * as yup from 'yup'

export default (t) => yup.object().shape({
  attribute: yup
    .array()
    .min(1, t('validate.attribute_required'))
})
