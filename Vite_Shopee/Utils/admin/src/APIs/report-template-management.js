import { parseParamsToQueryStringV3 } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function getListTemplateAPI(params) {
  const q = parseParamsToQueryStringV3(params)
  return AxiosClient.get(`${END_POINT.REPORT_TEMPLATE_MANAGEMENT.GET_LIST_TEMPLATE}?${q}`)
    .then((res) => res.data)
}

function getTemplateDetailAPI({ templateId, data }) {
  return AxiosClient.get(`${END_POINT.REPORT_TEMPLATE_MANAGEMENT.GET_DETAIL_TEMPLATE({ templateId })}`, data)
    .then((res) => res.data)
}

function getListReportAPI(params) {
  const q = parseParamsToQueryStringV3(params)
  return AxiosClient.get(`${END_POINT.REPORT_TEMPLATE_MANAGEMENT.GET_LIST_REPORT}?${q}`)
    .then((res) => res.data)
}

function getReportDetailAPI({ reportId, data }) {
  return AxiosClient.get(`${END_POINT.REPORT_TEMPLATE_MANAGEMENT.GET_DETAIL_REPORT({ reportId })}`, data)
    .then((res) => res.data)
}

function searchCommentsDailyReportAPI(data) {
  const uri = END_POINT.REPORT_TEMPLATE_MANAGEMENT.SEARCH_COMMENTS
  return AxiosClient.post(uri, data)
    .then((res) => res.data)
}

export {
  getListTemplateAPI,
  getTemplateDetailAPI,
  getListReportAPI,
  getReportDetailAPI,
  searchCommentsDailyReportAPI
}
