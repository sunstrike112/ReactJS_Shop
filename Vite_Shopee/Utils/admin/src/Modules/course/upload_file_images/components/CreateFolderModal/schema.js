/* eslint-disable no-unused-vars */
import { validateSpecialWord } from 'Utils'
import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    folderName: yup
      .string()
      .required(t('error_message:validation.required', { key: t('create.folder_name') }))
      .max(
        200,
        t('error_message:validation.max_length', { key: t('create.folder_name'), max: 200 })
      )
      .trim()
      .test('isValidateSpecialWord', t('error_message:validation.special_word'), validateSpecialWord)
  }))
