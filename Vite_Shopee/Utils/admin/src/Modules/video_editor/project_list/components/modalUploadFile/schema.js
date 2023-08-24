import { validateSpecialWord } from 'Utils'
import * as yup from 'yup'

export default (t) => yup.object().shape({
  projectName: yup
    .string()
    .required(t('video_required_name'))
    .trim()
    .max(100, t('error_message:validation.max_length', { key: t('project_name'), max: 100 }))
    .test('isValidateSpecialWord', t('error_message:validation.special_word'), validateSpecialWord),
  file: yup.mixed().required('A file is invalid')
})
