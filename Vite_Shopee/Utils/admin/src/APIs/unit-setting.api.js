import { parseFilter, openDownloadLink, parseParamsToQueryString } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function getListUnitLesson({ courseId, params }) {
  params = parseFilter(params)
  return AxiosClient.get(END_POINT.UNIT_SETTING.LIST, `${courseId}`, {
    params
  }).then((res) => res.data)
}

function getListOrderUnitLesson({ courseId }) {
  return AxiosClient.get(END_POINT.UNIT_SETTING.LIST_ORDER, `${courseId}`).then(
    (res) => res.data
  )
}

function deleteListUnitLesson({ courseId, data }) {
  return AxiosClient.delete(`${END_POINT.UNIT_SETTING.DELETE}/${courseId}`, {
    ids: data.ids
  }).then((res) => res.data)
}

function updateOrderUnitLesson({ data }) {
  return AxiosClient.put(END_POINT.UNIT_SETTING.UPDATE_ORDER, data).then(
    (res) => res.data
  )
}

function createUnitLesson({ courseId, payload, langCode }) {
  const q = parseParamsToQueryString({ langCode })
  return AxiosClient.post(`${END_POINT.UNIT_SETTING.CREATE_LECTURE}/${courseId}?${q}`, payload).then(
    (res) => res.data
  )
}

function createUnitLessonImage({ courseId, data, langCode }) {
  const q = parseParamsToQueryString({ langCode })
  return AxiosClient.post(`${END_POINT.UNIT_SETTING.CREATE_LECTURE_IMAGE}/${courseId}?${q}&isUpload=true`, data).then(
    (res) => res.data
  )
}

function getUnitLessonImage({ courseId }) {
  return AxiosClient.get(`${END_POINT.UNIT_SETTING.CREATE_LECTURE_IMAGE}/${courseId}`).then(
    (res) => res.data
  )
}

function createQuestion({ testId, payload }) {
  return AxiosClient.post(`${END_POINT.UNIT_SETTING.CREATE_QUESTION}/${testId}`, payload).then(
    (res) => res.data
  )
}
function getDetailQuestion({ questionId }) {
  return AxiosClient.get(`${END_POINT.UNIT_SETTING.GET_DETAIL_QUESTION}/${questionId}`).then((res) => res.data)
}

function editQuestion({ testId, questionId, payload }) {
  return AxiosClient.put(`${END_POINT.UNIT_SETTING.UPDATE_QUESTION({ testId, questionId })}`, payload).then(
    (res) => res.data
  )
}

function basicInfoSetting({ courseId, testId, data }) {
  return AxiosClient.put(`${END_POINT.UNIT_SETTING.PARENT}${courseId}/test-detail/${testId}`, data)
    .then((res) => res.data)
}

function registerTest({ data, courseId, langCode }) {
  const q = parseParamsToQueryString({ langCode })
  return AxiosClient.post(`${END_POINT.UNIT_SETTING.REGISTER_TEST}${courseId}?${q}`, data)
    .then((res) => res.data)
}

function getDetailTestAPI({ courseId, unitId }) {
  return AxiosClient.get(`${END_POINT.UNIT_SETTING.GET_DETAIL_TEST}${courseId}/${unitId}`)
    .then((res) => res.data)
}

function optionSettingTest({ unitId, data }) {
  return AxiosClient.put(`${END_POINT.UNIT_SETTING.OPTION_SETTING}${unitId}`, data)
    .then((res) => res.data)
}

function getDetailLecture({ unitId }) {
  return AxiosClient.get(`${END_POINT.UNIT_SETTING.GET_DETAIL_LECTURE}/${unitId}`).then((res) => res.data)
}

function editUnitLesson({ courseId, unitId, payload }) {
  return AxiosClient.put(`${END_POINT.UNIT_SETTING.UPDATE_LECTURE({ courseId, unitId })}`, payload).then(
    (res) => res.data
  )
}

function updatePassScore({ unitId, data }) {
  return AxiosClient.put(`${END_POINT.UNIT_SETTING.UPDATE_PASS_SCORE}${unitId}`, data)
    .then((res) => res.data)
}

function getQuestionsCategory() {
  return AxiosClient.get(END_POINT.UNIT_SETTING.GET_QUESTIONS_CATEGORY)
    .then((res) => res.data)
}

function getQuestionListAPI({ unitId, params }) {
  params = parseFilter(params)
  return AxiosClient.get(END_POINT.UNIT_SETTING.GET_QUESTIONS_LIST, `${unitId}`, { params })
    .then((res) => res.data)
}

function deleteQuestion({ unitId, data }) {
  return AxiosClient.delete(`${END_POINT.UNIT_SETTING.DELETE_QUESTION}${unitId}`, data)
    .then((res) => res.data)
}

function loadOrderQuestionAPI({ unitId }) {
  return AxiosClient.get(`${END_POINT.UNIT_SETTING.LOAD_ORDER_QUESTIONS}${unitId}`)
    .then((res) => res.data)
}

function updateSortQuestionAPI({ data }) {
  return AxiosClient.put(END_POINT.UNIT_SETTING.UPDATE_SORT_QUESTION, data)
    .then((res) => res.data)
}

function createUnitSurvey({ courseId, data, langCode }) {
  const q = parseParamsToQueryString({ langCode })
  return AxiosClient.post(`${END_POINT.UNIT_SETTING.CREATE_UNIT_SURVEY}/${courseId}?${q}`, data)
    .then((res) => res.data)
}

function getUnitSurvey({ params }) {
  return AxiosClient.get(END_POINT.UNIT_SETTING.GET_UNIT_SURVEY, '', { params })
    .then((res) => res.data)
}

function updateUnitSurvey({ courseId, surveyId, data }) {
  return AxiosClient.put(`${END_POINT.UNIT_SETTING.UPDATE_UNIT_SURVEY}/${courseId}/unit-survey/${surveyId}`, data)
    .then((res) => res.data)
}

function getUnitSurveyQuestions({ params }) {
  return AxiosClient.get(END_POINT.UNIT_SETTING.GET_UNIT_SURVEY_QUESTIONS, '', { params })
    .then((res) => res.data)
}

function deleteUnitSurveyQuestions({ data }) {
  return AxiosClient.delete(END_POINT.UNIT_SETTING.DELETE_UNIT_SURVEY_QUESTIONS, data)
    .then((res) => res.data)
}

function getUnitSurveyQuestionsCreate({ data }) {
  return AxiosClient.post(END_POINT.UNIT_SETTING.GET_UNIT_SURVEY_QUESTIONS_CREATE, data)
    .then((res) => res.data)
}

function createUnitSurveyQuestion({ data }) {
  return AxiosClient.post(END_POINT.UNIT_SETTING.CREATE_UNIT_SURVEY_QUESTION, data)
    .then((res) => res.data)
}

function getUnitSurveyQuestion({ params }) {
  return AxiosClient.get(END_POINT.UNIT_SETTING.GET_UNIT_SURVEY_QUESTION, '', { params })
    .then((res) => res.data)
}

function getUnitSurveyQuestionsEdit({ params }) {
  return AxiosClient.get(END_POINT.UNIT_SETTING.GET_UNIT_SURVEY_QUESTIONS_EDIT, '', { params })
    .then((res) => res.data)
}

function updateUnitSurveyQuestion({ params, data }) {
  return AxiosClient.put(END_POINT.UNIT_SETTING.UPDATE_UNIT_SURVEY_QUESTION, data, { params })
    .then((res) => res.data)
}

function updateOrderUnitSurveyQuestion({ data }) {
  return AxiosClient.put(END_POINT.UNIT_SETTING.UPDATE_ORDER_UNIT_SURVEY_QUESTION, data)
    .then((res) => res.data)
}

function downloadUnitSettingsCSV(filter) {
  return AxiosClient.download(`${END_POINT.UNIT_SETTING.DOWNLOAD_UNIT_SETTING_CSV(filter?.courseId)}`, { method: 'POST' }, filter?.data)
    .then(async (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      openDownloadLink({
        url, filename: 'unit-settings-info.csv'
      })
    })
}

export {
  getListUnitLesson,
  deleteListUnitLesson,
  getListOrderUnitLesson,
  updateOrderUnitLesson,
  createUnitLesson,
  basicInfoSetting,
  registerTest,
  getDetailTestAPI,
  optionSettingTest,
  getDetailLecture,
  editUnitLesson,
  updatePassScore,
  getQuestionsCategory,
  getQuestionListAPI,
  deleteQuestion,
  loadOrderQuestionAPI,
  updateSortQuestionAPI,
  createUnitSurvey,
  getUnitSurvey,
  updateUnitSurvey,
  getUnitSurveyQuestions,
  deleteUnitSurveyQuestions,
  getUnitSurveyQuestionsCreate,
  createUnitSurveyQuestion,
  getUnitSurveyQuestion,
  getUnitSurveyQuestionsEdit,
  updateUnitSurveyQuestion,
  updateOrderUnitSurveyQuestion,
  createQuestion,
  getDetailQuestion,
  editQuestion,
  downloadUnitSettingsCSV,
  createUnitLessonImage,
  getUnitLessonImage
}
