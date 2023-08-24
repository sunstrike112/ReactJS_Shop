import * as yup from 'yup'

const validateFuriganaLetters = (value) => {
  const pattern = /^(([ァ-ヶ]|ー)+((　)([ァ-ヶ]|ー)+))$/
  return pattern.test(value)
}

const validFullName = (value) => {
  const regxOnlySpaceName = /^\S+(　)\S+$/
  return regxOnlySpaceName.test(value)
}

export default yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('register.validate.email_required')
    .email('register.validate.email_invalid'),
  fullName: yup.string().trim().required('register.validate.surname_required')
    .max(60, 'register.validate.max_surname')
    .test('isValidFullName', 'register.validate.fullname_space_required', validFullName),
  fullFurigana: yup
    .string()
    .trim()
    .required('register.validate.furigana_surename_letters')
    .max(60, 'register.validate.max_furigana_surename')
    .test(
      'isNotNumber',
      'register.validate.furigana_surename_letters',
      validateFuriganaLetters
    ),
  companyName: yup
    .string()
    .trim()
    .required('register.validate.company_name_required')
    .max(60, 'register.validate.max_company_name')
})
