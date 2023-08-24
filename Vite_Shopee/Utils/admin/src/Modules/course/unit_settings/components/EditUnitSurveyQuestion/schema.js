import * as yup from 'yup'

export default (t) => (
  yup.object().shape({
    questionText: yup.string()
      .required(t('error_message:validation.required', { key: t('unit_survey_question.edit.question_text') }))
      .max(4000, t('error_message:validation.max_length', { key: t('unit_survey_question.edit.question_text'), max: 4000 })),
    listAnswer: yup.array()
      .when('questionType', (questionType, schema) => (questionType === 'DESCRIPTION' ? schema : schema.of(
        yup.object().shape({
          answerText: yup.string()
            .nullable()
            .required(t('error_message:validation.required', { key: t('unit_survey_question.edit.choice') }))
            .max(500, t('error_message:validation.max_length', { key: t('unit_survey_question.edit.choice'), max: 500 }))
        })
      )))
  }))
