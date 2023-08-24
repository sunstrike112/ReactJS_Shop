import moment from 'moment'
import * as yup from 'yup'
import { LIMIT_TIME_TYPE } from 'Constants/survey'

export default (t) => (
  yup.object().shape({
    unitSurveyName: yup
      .string()
      .max(200, t('error_message:validation.max_length', { key: t('create_survey.unit_survey_name'), max: 200 }))
      .required(t('error_message:validation.required', { key: t('create_survey.unit_survey_name') }))
      .trim(),
    unitSurveyDetail: yup
      .string()
      .max(4000, t('error_message:validation.max_length', { key: t('create_survey.unit_survey_detail'), max: 4000 }))
      .trim(),
    messageCompleted: yup
      .string()
      .max(100, t('error_message:validation.max_length', { key: t('message_complete'), max: 100 }))
      .trim(),
    listQuestionId: yup.array().min(1, t('error_message:validation.required', { key: t('create_survey.question_setting') })),
    startDate: yup.string().when('unitSurrveyStartType', {
      is: (unitSurrveyStartType) => unitSurrveyStartType === LIMIT_TIME_TYPE.SET,
      then: yup.string().nullable().required(t('validate.required_limitDate'))
    }),
    endDate: yup.string().when('unitSurrveyEndType', {
      is: (unitSurrveyEndType) => unitSurrveyEndType === LIMIT_TIME_TYPE.SET,
      then: yup.string().nullable().required(t('validate.required_limitDate'))
    }),
    unitSurrveyEndTime: yup.number()
      .when('unitSurrveyStartTime', (unitSurrveyStartTime, schema) => {
        if (unitSurrveyStartTime) {
          // This can be calculated in many ways. Just be sure that its type is `Date` object
          const startDate = moment(new Date(unitSurrveyStartTime)).add(1, 'minutes')
          return schema.nullable().min(startDate, t('validate.wrong_limitEndDate'))
        }
        return schema.nullable()
      })
  }))
