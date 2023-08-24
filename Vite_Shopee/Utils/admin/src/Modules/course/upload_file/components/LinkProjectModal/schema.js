import * as yup from 'yup'
import { checkExistProjectName } from 'APIs'
import { validateSpecialWord } from 'Utils'

export const checkExistName = async (name, fileId) => {
  try {
    if (!name) return true
    if (validateSpecialWord(name)) {
      const { data } = await checkExistProjectName({ projectName: name, fileId })
      return !data
    }
  } catch (error) {
    return true
  }
  return true
}

export default (t) => yup.object().shape({
  projectName: yup.string()
    .required(t('project:video_required_name'))
    .trim()
    .test('isValidateSpecialWord', t('error_message:validation.special_word'), validateSpecialWord)
})
