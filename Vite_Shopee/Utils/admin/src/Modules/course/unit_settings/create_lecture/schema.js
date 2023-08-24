import * as yup from 'yup'
import { OPTIONS_PATH_LESSON, OPTIONS_TYPE_LESSON } from 'Constants/course'
import { isExternal, validateIsYoutubeLink, validateLinkSystem } from 'Utils'

// const FILE_SIZE = 10 // 10mb
// const FILE_FORMATS = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']

export default (t) => yup.object().shape({
  unitName: yup.string().trim().required(
    t('error_message:validation.required', {
      key: t('create_lecture:unit')
    })
  ).max(
    200,
    t('error_message:validation.max_length', {
      key: t('create_lecture:unit'),
      max: 200
    })
  ),
  unitDetails: yup.string().trim().max(
    4000,
    t('error_message:validation.max_length', {
      key: t('create_lecture:unit_details'),
      max: 4000
    })
  ),
  path: yup.mixed()
    .when(['typeFile'], {
      is: (typeFile) => typeFile === OPTIONS_TYPE_LESSON[0].value,
      then: yup.string().when(['typePath'], {
        is: (typePath) => typePath === OPTIONS_PATH_LESSON[0].value,
        then: yup.string().test('isYoutube', t('create_lecture:is_not_system_link'), validateLinkSystem)
      })
        .when(['typePath'], {
          is: (typePath) => typePath === OPTIONS_PATH_LESSON[1].value,
          then: yup.string().test('isNotYoutube', t('create_lecture:is_not_youtube_link'), validateIsYoutubeLink)
        })
        .when(['typePath'], {
          is: (typePath) => typePath === OPTIONS_PATH_LESSON[2].value,
          then: yup.string().test('isNotYoutube', t('create_lecture:is_not_upload_file_link'), isExternal)
        })
        .trim()
        .required(t('error_message:validation.required', { key: t('create_lecture:path') }))
        .max(255, t('error_message:validation.max_length', { key: t('create_lecture:path'), max: 255 }))
    }),
  limitStartDate: yup.string().when('isLimitStartTrue', {
    is: (isLimitStartTrue) => isLimitStartTrue === 1,
    then: yup.string().required(t('create_lecture:validation.date_required'))
  }),
  limitEndDate: yup.string().when('isLimitEndTrue', {
    is: (isLimitEndTrue) => isLimitEndTrue === 1,
    then: yup.string().required(t('create_lecture:validation.date_required'))
  }),
  messageCompleted: yup.string().max(100, t('error_message:validation.max_length', {
    key: t('create_lecture:messageCompleted'),
    max: 100
  }))
})
