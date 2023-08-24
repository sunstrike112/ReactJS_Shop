import { QUESTION_TYPE } from 'Constants/course'
import { testYupCKEditor, yupCKEditorErrorMessageMaxLength } from 'Utils/testYupCKEditor'
import * as yup from 'yup'

// const FILE_SIZE = 10 // 10mb
// const FILE_FORMATS = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']

const ListChoiceSchemma = (t) => ({
  contentAnswer: yup.string().trim()
    .required(t('error_message:validation.required', { key: t('create.choice_number') }))
    .max(2000, t('error_message:validation.max_length', { key: t('create.choice_number'), max: 2000 }))
})

export default (t) => yup.object().shape({
  optionAnswer: yup.string().trim()
    .required(t('error_message:validation.required', { key: t('create.optional_or_required_answer') })),
  questionType: yup.string().trim()
    .required(t('error_message:validation.required', { key: t('create.question_type') })),
  contentQuestionHtml: yup.string().trim()
    .required(t('error_message:validation.required', { key: t('create.question_text') }))
    .test(
      'max',
      yupCKEditorErrorMessageMaxLength(t, t('create.question_text'), 5000),
      (value) => testYupCKEditor(value, 5000)
    ),
  listChoice: yup.array().when('questionType', {
    is: (questionType) => questionType !== QUESTION_TYPE[2].value,
    then: yup.array().of(
      yup.object().shape(ListChoiceSchemma(t))
    )
  }),
  isCorrect: yup.number().when('questionType', {
    is: (questionType) => questionType === QUESTION_TYPE[0].value,
    then: yup.number().required(t('error_message:validation.required', { key: t('create.correct_answer') }))
  }),
  isCorrects: yup.array().when('questionType', {
    is: (questionType) => questionType === QUESTION_TYPE[1].value,
    then: yup.array().nullable()
      .test('is-correct-required', t('error_message:validation.required', { key: t('create.correct_answer') }), (value) => value.length >= 1)
  }),
  answerDescriptions: yup.array().when('questionType', {
    is: (questionType) => questionType === QUESTION_TYPE[2].value,
    then: yup.array().nullable()
      .test('is-answerDescriptions-required', '', function (value) {
        if (value[0].value.trim().length <= 0) return this.createError({ path: `${this.path}.0.value`, message: t('error_message:validation.required', { key: t('create.correct_answer') }) })
        return true
      })
      .test('is-answerDescriptions-maximum', '', function (value) {
        if (value[0].value.trim().length > 500) {
          return this.createError({ path: `${this.path}.0.value`, message: t('error_message:validation.max_length', { key: t('create.question_text'), max: 500 }) })
        }
        return true
      })
  }),
  remarks: yup.string().trim()
    .max(1000, t('error_message:validation.max_length', { key: t('create.remark'), max: 1000 })),
  description: yup.string().trim()
    .test(
      'max',
      yupCKEditorErrorMessageMaxLength(t, t('create.explanation'), 10000),
      (value) => testYupCKEditor(value, 10000)
    )
  // imagePath: yup.mixed()
  //   .test('fileSize', 'error_message:fileSizeTooLarge', (value) => (value ? value.size <= FILE_SIZE * 100 * 1024 : true))
  //   .test('fileType', 'error_message:fileFormatInvalid', (value) => (value ? FILE_FORMATS.includes(value.type) : true))
})
