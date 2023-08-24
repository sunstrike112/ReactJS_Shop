import { parseFilterArrayToString, parseParamsToQueryString, parseFilter } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function getListCategory(params) {
  const q = new URLSearchParams({ ...params }).toString()
  return AxiosClient.get(`${END_POINT.ISSUE_PERMISSION.GET_LIST_CATEGORY}?${q}`)
    .then((res) => res.data)
}

function getListUser(params) {
  const q = parseFilterArrayToString(params)
  return AxiosClient.get(`${END_POINT.ISSUE_PERMISSION.GET_LIST_USER}?${q}`)
    .then((res) => res.data)
}

function getListUserSelectedAPI({ params, data }) {
  const q = parseFilterArrayToString(params)
  return AxiosClient.post(`${END_POINT.ISSUE_PERMISSION.GET_LIST_USER_SELECTED}?${q}`, data)
    .then((res) => res.data)
}

function getListAttribute(params) {
  const q = parseFilterArrayToString(params)
  return AxiosClient.get(`${END_POINT.ISSUE_PERMISSION.GET_LIST_ATTRIBUTE}?${q}`)
    .then((res) => res.data)
}

function getListGroup(params) {
  const q = parseFilterArrayToString(params)
  return AxiosClient.get(`${END_POINT.ISSUE_PERMISSION.GET_LIST_GROUP}?${q}`)
    .then((res) => res.data)
}

function getListCourse({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.ISSUE_PERMISSION.GET_LIST_COURSE}?${q}`)
    .then((res) => res.data)
}

function getListIssuePermission(params) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.ISSUE_PERMISSION.GET_LIST_ISSUE_PERMISSION}?${q}`)
    .then((res) => res.data)
}

function createIssuePermission({ data, langCode }) {
  const q = parseParamsToQueryString({ langCode })
  return AxiosClient.post(`${END_POINT.ISSUE_PERMISSION.CREATE_ISSUE_PERMISSION}?${q}`, data)
    .then((res) => res.data)
}

function updateIssuePermission(data) {
  return AxiosClient.put(`${END_POINT.ISSUE_PERMISSION.UPDATE_ISSUE_PERMISSION}`, data)
    .then((res) => res.data)
}

function getListUpdateIssuePermission(data) {
  const q = parseFilterArrayToString(data)
  return AxiosClient.get(`${END_POINT.ISSUE_PERMISSION.GET_LIST_UPDATE_ISSUE_PERMISSION}?${q}`)
    .then((res) => res.data)
}

function deleteIssuePermission({ data }) {
  return AxiosClient.put(END_POINT.ISSUE_PERMISSION.DELETE_ISSUE_PERMISSION, data)
    .then((res) => res.data)
}

export {
  getListCategory,
  getListUser,
  getListUserSelectedAPI,

  getListAttribute,
  getListGroup,
  getListCourse,

  getListIssuePermission,
  updateIssuePermission,
  deleteIssuePermission,
  createIssuePermission,

  getListUpdateIssuePermission
}
