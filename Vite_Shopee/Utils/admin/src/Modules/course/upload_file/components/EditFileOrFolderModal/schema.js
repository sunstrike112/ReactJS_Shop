import { validateSpecialWord } from 'Utils'
import * as yup from 'yup'

export default (t, isFolder, fileType) => (
  yup.object().shape({
    folderName: yup
      .string()
      .required(t('error_message:validation.required', { key: isFolder ? t('edit.folder_name') : t('edit.file_name') }))
      .max(
        200,
        t('error_message:validation.max_length', { key: isFolder ? t('edit.folder_name') : t('edit.file_name'), max: 200 })
      )
      .test('REMOVE_EXTENSION', t('error_message:validation.remove_extension'), (value) => {
        if (isFolder) {
          return true
        }
        return value.substring(value.lastIndexOf('.') + 1).toUpperCase() === fileType.toUpperCase()
      })
      .test('isValidateSpecialWord', t('error_message:validation.special_word'), validateSpecialWord)
      .trim()
  }))
