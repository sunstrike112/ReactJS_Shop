import QueryString from 'qs'
import { SORT_TYPE } from '../constants'
import { parseFilter, parseParamsToQueryString } from '../utils'
import AxiosClient from './api'
import END_POINT from './constants'

// Daily report
function getDailyReportsAPI(data) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.SEARCH

  return axiosClient.post(uri, data)
    .then((res) => res.data)
}

function getDailyReportAPI(dailyReportId) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.GET_DAILY_REPORT(dailyReportId)

  return axiosClient.post(uri)
    .then((res) => res.data)
}

function createDailyReportAPI(data) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.CREATE_DAILY_REPORT

  return axiosClient.post(uri, data)
    .then((res) => res.data)
}

function editDailyReportAPI({ dailyReportId, data }) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.EDIT_DAILY_REPORT(dailyReportId)

  return axiosClient.post(uri, data)
    .then((res) => res.data)
}

function deleteDailyReportAPI(dailyReportId) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.DELETE_DAILY_REPORT(dailyReportId)

  return axiosClient.delete(uri)
    .then((res) => res.data)
}

function likeDailyReportAPI(dailyReportId) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.LIKE_DAILY_REPORT(dailyReportId)

  return axiosClient.post(uri)
    .then((res) => res.data)
}

function dislikeDailyReportAPI(dailyReportId) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.DISLIKE_DAILY_REPORT(dailyReportId)

  return axiosClient.post(uri)
    .then((res) => res.data)
}

function getUsersInteractedDailyReportAPI(action, dailyReportId) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.GET_USERS_INTERACTED_DAILY_REPORT(action, dailyReportId)

  return axiosClient.post(uri)
    .then((res) => res.data)
}

function markReadDailyReportAPI(dailyReportId) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.MARK_READ(dailyReportId)

  return axiosClient.post(uri)
    .then((res) => res.data)
}

function searchCommentsDailyReportAPI(data) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.SEARCH_COMMENTS

  return axiosClient.post(uri, data)
    .then((res) => res.data)
}

function createDailyReportCommentAPI(data) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.CREATE_COMMENT

  return axiosClient.post(uri, data)
    .then((res) => res.data)
}

function editDailyReportCommentAPI(commentId, data) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.EDIT_COMMENT(commentId)

  return axiosClient.post(uri, data)
    .then((res) => res.data)
}

function deleteDailyReportCommentAPI(commentId) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.DELETE_COMMENT(commentId)

  return axiosClient.delete(uri)
    .then((res) => res.data)
}

function likeDailyReportCommentAPI(commentId) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.LIKE_COMMENT(commentId)

  return axiosClient.post(uri)
    .then((res) => res.data)
}

function dislikeDailyReportCommentAPI(commentId) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.DISLIKE_COMMENT(commentId)

  return axiosClient.post(uri)
    .then((res) => res.data)
}

function getUsersInteractedDailyReportCommentAPI(action, commentId) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.GET_USERS_INTERACTED_COMMENT(action, commentId)

  return axiosClient.post(uri)
    .then((res) => res.data)
}

function setCompleteDailyReportAPI(dailyReportId) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.SET_COMPLETE(dailyReportId)

  return axiosClient.post(uri)
    .then((res) => res.data)
}

// Template
function getTemplatesAPI(params) {
  const axiosClient = new AxiosClient()
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  const uri = `${END_POINT.DAILY_REPORT.TEMPLATES}?${q}`

  return axiosClient.get(uri).then((res) => res.data)
}

function getTemplateDetailAPI(templateId) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.TEMPLATE_DETAIL(templateId)

  return axiosClient.get(uri).then((res) => res.data)
}

function editTemplateAPI(templateId, data) {
  const axiosClient = new AxiosClient()

  const uri = END_POINT.DAILY_REPORT.EDIT_TEMPLATE(templateId)

  return axiosClient.put(uri, data)
    .then((res) => res.data)
}

function createTemplateAPI(data) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.CREATE_TEMPLATE

  return axiosClient.post(uri, data)
    .then((res) => res.data)
}

function deleteTemplateAPI(templateId) {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.DELETE_TEMPLATE(templateId)

  return axiosClient.delete(uri)
    .then((res) => res.data)
}

function getUnreadDailyReportAPI() {
  const axiosClient = new AxiosClient()
  const uri = END_POINT.DAILY_REPORT.GET_UNREAD

  return axiosClient.post(uri, { sortType: SORT_TYPE.DESC })
    .then((res) => res.data)
}

function getPrevNextDailyReportAPI({ queriesParam, data }) {
  const axiosClient = new AxiosClient()
  const q = QueryString.stringify(queriesParam)

  const uri = `${END_POINT.DAILY_REPORT.GET_PREV_NEXT}?${q}`

  return axiosClient.post(uri, data)
    .then((res) => res.data)
}

export {
  // Daily report
  getDailyReportsAPI,
  getDailyReportAPI,
  createDailyReportAPI,
  editDailyReportAPI,
  deleteDailyReportAPI,
  getUsersInteractedDailyReportAPI,
  likeDailyReportAPI,
  dislikeDailyReportAPI,
  markReadDailyReportAPI,
  searchCommentsDailyReportAPI,
  createDailyReportCommentAPI,
  editDailyReportCommentAPI,
  deleteDailyReportCommentAPI,
  likeDailyReportCommentAPI,
  dislikeDailyReportCommentAPI,
  getUsersInteractedDailyReportCommentAPI,
  setCompleteDailyReportAPI,
  getUnreadDailyReportAPI,
  getPrevNextDailyReportAPI,

  // Template
  getTemplatesAPI,
  getTemplateDetailAPI,
  deleteTemplateAPI,
  editTemplateAPI,
  createTemplateAPI
}
