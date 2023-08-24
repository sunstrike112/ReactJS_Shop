import { parseFilter, parseFilterArrayToStringV2, parseParamsToQueryString, parseSort } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function createNotifi({ data }) {
  return AxiosClient.post(END_POINT.ADD_NEW, data)
    .then((res) => res.data)
}

function editNotifi({ data }) {
  return AxiosClient.put(END_POINT.EDIT_NEW, data)
    .then((res) => res.data)
}

function getFindUser({ params }) {
  params = parseFilter(params)
  return AxiosClient.get(END_POINT.LIST_NOTIFICATION, '', { params })
    .then((res) => res.data)
}

function getListUserFind({ params }) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.get(`${END_POINT.GET_FIND_USER}?${q}`)
    .then((res) => res.data)
}

function deleteNotifi({ data }) {
  return AxiosClient.put(END_POINT.DELETE_NOTIFICATION, data)
    .then((res) => res.data)
}

function getNotifi({ newId, params }) {
  params = parseFilter(params)
  return AxiosClient.get(`${END_POINT.GET_NEWS_DETAIL}?newsId=${newId}`, '', { params })
    .then((res) => res.data)
}

function getReceiverEmail({ params }) {
  params = parseFilter(params)
  params = parseSort(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.ISSUE_PERMISSION.GET_LIST_USER}?${q}`)
    .then((res) => res.data)
}

function sendEmailAPI({ data }) {
  return AxiosClient.post(END_POINT.SEND_EMAIL, data)
    .then((res) => res.data)
}

function getEmailDetail({ emailId, params }) {
  params = parseFilter(params)
  return AxiosClient.get(`${END_POINT.EMAIL_DETAIL}?emailId=${emailId}`, '', { params })
    .then((res) => res.data)
}

function getListSendHistory({ params }) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.SEND_HISTORY}?${q}`)
    .then((res) => res.data)
}

function deleteHistory({ data }) {
  return AxiosClient.put(END_POINT.DELETE_HISTORY, data)
    .then((res) => res.data)
}

export {
  createNotifi,
  getFindUser,
  deleteNotifi,
  getNotifi,
  editNotifi,
  getListUserFind,
  getReceiverEmail,
  sendEmailAPI,
  getListSendHistory,
  deleteHistory,
  getEmailDetail
}
