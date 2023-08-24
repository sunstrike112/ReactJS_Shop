import { parseFilter, parseParamsToQueryString } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function loadReportsAPI({ params }) {
  params = parseFilter(params)
  return AxiosClient.get(END_POINT.UNIT_SETTING.LOAD_REPORTS, '', { params })
    .then((res) => res.data)
}

function registerReportAPI({ courseId, data, langCode }) {
  const q = parseParamsToQueryString({ langCode })
  return AxiosClient.post(`${END_POINT.UNIT_SETTING.REGISTER_REPORT}${courseId}?${q}`, data)
    .then((res) => res.data)
}

function loadReportDetailAPI({ reportId }) {
  return AxiosClient.get(`${END_POINT.UNIT_SETTING.LOAD_DETAIL_REPORT}${reportId}`)
    .then((res) => res.data)
}

function loadQuestionReportAPI({ reportId }) {
  return AxiosClient.get(`${END_POINT.UNIT_SETTING.LOAD_QUESTION_REPORT}${reportId}`)
    .then((res) => res.data)
}

function updateBasicReportAPI({ courseId, reportId, data }) {
  return AxiosClient.put(`${END_POINT.COURSE}${courseId}/unit-report/${reportId}`, data)
    .then((res) => res.data)
}

function settingQuestionReportAPI({ reportId, data }) {
  return AxiosClient.put(`${END_POINT.UNIT_SETTING.QUESTION_SETTING_REPORT}${reportId}`, data)
    .then((res) => res.data)
}

function deleteQuestionReportAPI({ reportId, data }) {
  return AxiosClient.delete(`${END_POINT.UNIT_SETTING.DELETE_QUESTION_REPORT({ reportId })}`, data)
    .then((res) => res.data)
}

function createQuestionReportAPI({ reportId, data }) {
  return AxiosClient.post(`${END_POINT.UNIT_SETTING.CREATE_QUESTION_REPORT({ reportId })}`, data)
    .then((res) => res.data)
}

function loadDetailQuestionReportAPI({ reportId, questionId }) {
  return AxiosClient.get(`${END_POINT.UNIT_SETTING.LOAD_DETAIL_QUESTION_REPORT({ reportId, questionId })}`)
    .then((res) => res.data)
}

function editQuestionReportAPI({ reportId, questionId, data }) {
  return AxiosClient.put(`${END_POINT.UNIT_SETTING.EDIT_QUESTION_REPORT({ reportId, questionId })}`, data)
    .then((res) => res.data)
}

function loadDetailPublishReportAPI({ reportId }) {
  return AxiosClient.get(`${END_POINT.UNIT_SETTING.LOAD_DETAIL_PUBLISH_REPORT({ reportId })}`)
    .then((res) => res.data)
}

function updateDetailPublishReportAPI({ reportId, data }) {
  return AxiosClient.put(`${END_POINT.UNIT_SETTING.UPDATE_DETAIL_PUBLISH_REPORT({ reportId })}`, data)
    .then((res) => res.data)
}

export {
  loadReportsAPI,
  loadReportDetailAPI,
  registerReportAPI,
  loadQuestionReportAPI,
  updateBasicReportAPI,
  settingQuestionReportAPI,
  deleteQuestionReportAPI,
  createQuestionReportAPI,
  loadDetailQuestionReportAPI,
  editQuestionReportAPI,
  loadDetailPublishReportAPI,
  updateDetailPublishReportAPI
}
