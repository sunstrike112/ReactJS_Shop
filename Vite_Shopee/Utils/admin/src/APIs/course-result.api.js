import { parseFilterArrayToStringV2, parseParamsToQueryString, parseFilter, openDownloadLink } from 'Utils'

import AxiosClient from './api'
import END_POINT from './constants'

function getUserAttribute() {
  return AxiosClient.get(END_POINT.USER_ATTRIBUTE)
    .then((res) => res.data)
}

function getUserCourse({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.GET_COURSE}?${q}`)
    .then((res) => res.data)
}

function getVersionTestListAPI({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.ANALYSIS_TEST_ALL_VERSION}?${q}`)
    .then((res) => res.data)
}

function getVersionSurveyListAPI({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.ANALYSIS_SURVEY_ALL_VERSION}?${q}`)
    .then((res) => res.data)
}

function getUserGroup() {
  return AxiosClient.get(END_POINT.USER_GROUP)
    .then((res) => res.data)
}

function getUserUnit() {
  return AxiosClient.get(END_POINT.USER_UNIT)
    .then((res) => res.data)
}

function getCourseStatus(params) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.COMPLETE_STATUS}?${q}`)
    .then((res) => res.data)
}

function getUnitStatus(params, isUnitLearnCourse = false) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  if (isUnitLearnCourse) {
    return AxiosClient.get(`${END_POINT.COURSE_RESULT.UNIT_LEARN_COURSE_STATUS}?${q}`)
      .then((res) => res.data)
  }
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.UNIT_STATUS}?${q}`)
    .then((res) => res.data)
}

function getUnitListTest() {
  return AxiosClient.get(END_POINT.COURSE_RESULT.UNIT_LIST_TEST)
    .then((res) => res.data)
}

function getUnitListSurvey() {
  return AxiosClient.get(END_POINT.COURSE_RESULT.UNIT_LIST_SURVEY)
    .then((res) => res.data)
}

function getUnitListLesson() {
  return AxiosClient.get(END_POINT.COURSE_RESULT.UNIT_LIST_LESSON)
    .then((res) => res.data)
}

function getUnitListReport() {
  return AxiosClient.get(END_POINT.COURSE_RESULT.UNIT_LIST_REPORT)
    .then((res) => res.data)
}

function getUnitListAll(params) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.UNIT_LIST_ALL}?${q}`)
    .then((res) => res.data)
}

function getTestResult(params) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.TEST_RESULT}?${q}`)
    .then((res) => res.data)
}

function getSurveyAnswer(params) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.SURVEY_ANSWER}?${q}`)
    .then((res) => res.data)
}

function getSurveyAnswerDetail({ userId, courseId, surveyId, params }) {
  const q = new URLSearchParams({ ...params }).toString()
  const uri = END_POINT.COURSE_RESULT.SURVEY_ANSWER_DETAIL({ userId, courseId, surveyId })
  return AxiosClient.get(`${uri}?${q}`)
    .then((res) => res.data)
}

function getResultOfSurvey(params) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.SURVEY_RESULTS}?${q}`)
    .then((res) => res.data)
}

function getSurveyQuestion({ courseId, surveyId, page = 1, limit = 100 }) {
  let uri = `${END_POINT.COURSE_RESULT.SURVEY_QUESTION}/${courseId}/survey/${surveyId}/question-list?page=${page}&limit=${limit}`
  return AxiosClient.get(uri)
    .then((res) => res.data)
}

function getUnitsByCourseIds({ courseIds, unitType }) {
  let uri = `${END_POINT.COURSE_RESULT.GET_UNIT}`
  let query = ''
  if (courseIds.length) {
    courseIds.forEach((id) => {
      if (!query) {
        query += `?lstCourse=${id}`
      } else {
        query += `&lstCourse=${id}`
      }
    })
  }

  if (unitType) {
    if (!query) {
      query += `?unitType=${unitType}`
    } else {
      query += `&unitType=${unitType}`
    }
  }

  return AxiosClient.get(`${uri}${query}`)
    .then((res) => res.data)
}

function getUnitDetail(params, isUnitLearnCourse = false) {
  const q = parseFilterArrayToStringV2(params)
  if (isUnitLearnCourse) {
    return AxiosClient.get(`${END_POINT.COURSE_RESULT.UNIT_LEARN_COURSE_DETAIL}?${q}`)
  }
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.UNIT_DETAIL}?${q}`)
    .then((res) => res.data)
}

function getUnitDetailById(params) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.UNIT_DETAIL_BY_ID}?${q}`)
    .then((res) => res.data)
}

function getReportHistories({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.GET_REPORT_HISTORIES}?${q}`)
    .then((res) => res.data)
}

function getReportDetail({ params }) {
  return AxiosClient.get(END_POINT.COURSE_RESULT.GET_REPORT_DETAIL(params))
    .then((res) => res.data)
}

function evaluateReport({ params }) {
  return AxiosClient.put(END_POINT.COURSE_RESULT.EVALUATE_REPORT, params)
    .then((res) => res.data)
}

function getReportQuestions({ params }) {
  return AxiosClient.get(END_POINT.COURSE_RESULT.GET_REPORT_QUESTIONS(params))
    .then((res) => res.data)
}

function publicReport({ params }) {
  return AxiosClient.put(END_POINT.COURSE_RESULT.PUBLIC_REPORT(params))
    .then((res) => res.data)
}

function downloadCourseResultCSV({ data, params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.download(`${END_POINT.COURSE_RESULT.DOWNLOAD_COURSE_RESULT_CSV}?${q}`, { method: 'POST' }, data)
    .then(async (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      openDownloadLink({
        url, filename: 'course-result.csv'
      })
    })
}

function downloadUnitResultCSV({ data, params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.download(`${END_POINT.COURSE_RESULT.DOWNLOAD_UNIT_RESULT_CSV}?${q}`, { method: 'POST' }, data)
    .then(async (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      openDownloadLink({
        url, filename: 'unit-result.csv'
      })
    })
}

function downloadTestResultCSV({ data, params }) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.download(`${END_POINT.COURSE_RESULT.DOWNLOAD_TEST_RESULT_CSV}?${q}`, { method: 'POST' }, data)
    .then(async (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      openDownloadLink({
        url, filename: 'test-result.csv'
      })
    })
}

function downloadSurveyResultCSV({ data, params }) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.download(`${END_POINT.COURSE_RESULT.DOWNLOAD_SURVEY_RESULT_CSV}?${q}`, { method: 'POST' }, data)
    .then(async (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      openDownloadLink({
        url, filename: 'survey-result.csv'
      })
    })
}

// Analysis test result
function loadAnalysisTestResultAPI(params) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.ANALYSIS_TEST_RESULT}?${q}`)
    .then((res) => res.data)
}

function loadAnalysisTestChartAnswerAPI(params) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.ANALYSIS_TEST_CHART_ANSWER}?${q}`)
    .then((res) => res.data)
}

function loadAnalysisTestChartPointAPI(params) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.ANALYSIS_TEST_CHART_POINT}?${q}`)
    .then((res) => res.data)
}

function loadAnalysisTestDescriptionAPI({ params }) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.ANALYSIS_TEST_DESCRIPTION}?${q}`)
    .then((res) => res.data)
}

function loadAnalysisTestVersionAPI(params) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.ANALYSIS_TEST_VERSION}?${q}`)
    .then((res) => res.data)
}

function loadAnalysisSurveyVersionAPI(params) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.ANALYSIS_SURVEY_VERSION}?${q}`)
    .then((res) => res.data)
}

function downloadAnalysisTestResultCSV({ params }) {
  const { name } = params
  delete params.name
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.download(`${END_POINT.COURSE_RESULT.DOWNLOAD_ANALYSIS_TEST_RESULT_CSV}?${q}`)
    .then(async (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      openDownloadLink({
        url, filename: `Test-${name}.csv`
      })
    })
}

// Analysis survey result
function loadAnalysisSurveyResultAPI(params) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.ANALYSIS_SURVEY_RESULT}?${q}`)
    .then((res) => res.data)
}

function loadAnalysisSurveyChartAnswerAPI(params) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.ANALYSIS_SURVEY_CHART_ANSWER}?${q}`)
    .then((res) => res.data)
}

function loadAnalysisSurveyDescriptionAPI({ params }) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.COURSE_RESULT.ANALYSIS_SURVEY_TEST_DESCRIPTION}?${q}`)
    .then((res) => res.data)
}

function downloadAnalysisSurveyResultCSV({ params }) {
  const { name } = params
  delete params.name
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.download(`${END_POINT.COURSE_RESULT.DOWNLOAD_ANALYSIS_SURVEY_RESULT_CSV}?${q}`)
    .then(async (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      openDownloadLink({
        url, filename: `Survey-${name}.csv`
      })
    })
}

function getVariable(variable) {
  return AxiosClient.get(`${END_POINT.SYSTEM_VARIABLE({ variable })}`)
    .then((res) => res.data)
}

export {
  getUserAttribute,
  getUserCourse,

  getUserGroup,
  getUserUnit,
  getCourseStatus,
  getUnitStatus,
  getUnitListTest,
  getUnitListSurvey,
  getUnitListLesson,
  getUnitListReport,
  getUnitListAll,
  getTestResult,
  getSurveyAnswer,
  getResultOfSurvey,
  getSurveyQuestion,
  getUnitsByCourseIds,
  getReportHistories,
  getSurveyAnswerDetail,
  getReportDetail,
  evaluateReport,
  getReportQuestions,
  publicReport,
  downloadCourseResultCSV,
  downloadTestResultCSV,
  downloadUnitResultCSV,
  downloadSurveyResultCSV,
  getUnitDetail,
  getUnitDetailById,
  getVariable,

  // Analysis test result
  loadAnalysisTestResultAPI,
  loadAnalysisTestChartAnswerAPI,
  loadAnalysisTestChartPointAPI,
  loadAnalysisTestDescriptionAPI,
  loadAnalysisTestVersionAPI,
  getVersionTestListAPI,
  downloadAnalysisTestResultCSV,

  loadAnalysisSurveyResultAPI,
  loadAnalysisSurveyChartAnswerAPI,
  loadAnalysisSurveyDescriptionAPI,
  loadAnalysisSurveyVersionAPI,
  getVersionSurveyListAPI,
  downloadAnalysisSurveyResultCSV
}
