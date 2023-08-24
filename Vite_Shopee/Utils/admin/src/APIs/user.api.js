import { openDownloadLink, parseFilter, parseFilterArrayToStringV2, parseParamsToQueryString, parseParamsToQueryStringV2, parseSort } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function batchRegisterUser({ data, config }) {
  return AxiosClient.post(END_POINT.USER.IMPORT_MULTI_USER_CSV, data, config)
    .then((res) => res.data)
}

function downloadCSVTemplate({ params }) {
  return AxiosClient.get(END_POINT.USER.DOWNLOAD_CSV_TEMPLATE, '', { params })
    .then((res) => res.data)
}

function downloadUserCSV({ data, params }) {
  const q = parseFilterArrayToStringV2(params)
  return AxiosClient.download(`${END_POINT.USER.DOWNLOAD_CSV_USER_LIST}?${q}`, { method: 'POST' }, data)
    .then(async (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      openDownloadLink({
        url, filename: 'user-info.csv'
      })
    })
}

function getImportUserResults({ params }) {
  return AxiosClient.get(END_POINT.USER.GET_IMPORT_USER_RESULT, '', { params })
    .then((res) => res.data)
}

function getUsers({ params }) {
  params = parseFilter(params)
  params = parseSort(params)
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.USER.GET_USERS}?${q}`)
    .then((res) => res.data)
}

function getUser({ params }) {
  return AxiosClient.get(END_POINT.USER.GET_USER, '', { params })
    .then((res) => res.data)
}

function deleteUsers({ data }) {
  return AxiosClient.put(END_POINT.USER.DELETE_USERS, data)
    .then((res) => res.data)
}

function createUser({ data, params }) {
  return AxiosClient.post(END_POINT.USER.CREATE_USER, data, { params })
    .then((res) => res.data)
}

function updateUserWorkspace(data) {
  return AxiosClient.put(END_POINT.USER.UPDATE_USER_WORKSPACE, data)
    .then((res) => res.data)
}

function updateUser(data) {
  return AxiosClient.put(END_POINT.USER.UPDATE_USER, data)
    .then((res) => res.data)
}

function assignRemoveGroup({ data, params }) {
  return AxiosClient.post(END_POINT.USER.ASSIGN_REMOVE_GROUP, data, { params })
    .then((res) => res.data)
}

function assignRemoveAttribute({ data, params }) {
  return AxiosClient.post(END_POINT.USER.ASSIGN_REMOVE_ATTRIBUTE, data, { params })
    .then((res) => res.data)
}

function updateLoginStatus({ data, params }) {
  return AxiosClient.put(END_POINT.USER.UPDATE_LOGIN_STATUS, data, { params })
    .then((res) => res.data)
}

function getUserLearnStatus({ userId, params }) {
  return AxiosClient.get(END_POINT.USER.USER_LEARN_STATUS, userId, { params })
    .then((res) => res.data)
}

function getUserTestResults({ userId, params }) {
  return AxiosClient.get(END_POINT.USER.USER_TEST_RESULT, userId, { params })
    .then((res) => res.data)
}

function getUserLearnHistories({ userId, params }) {
  return AxiosClient.get(END_POINT.USER.USER_LEARN_HISTORY, userId, { params })
    .then((res) => res.data)
}

function getLoginHistories({ params }) {
  params = parseFilter(params)
  return AxiosClient.get(END_POINT.USER.LOGIN_HISTORY, '', { params })
    .then((res) => res.data)
}

function getGroups({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.USER.GET_GROUPS}?${q}`)
    .then((res) => res.data)
}

function getGroup({ data }) {
  return AxiosClient.post(END_POINT.USER.GET_GROUP, data)
    .then((res) => res.data)
}

function createGroup({ data }) {
  return AxiosClient.post(END_POINT.USER.CREATE_GROUP, data)
    .then((res) => res.data)
}

function createNissokenUser(data) {
  return AxiosClient.post(END_POINT.USER.CREATE_NISSOKEN_USER, data)
    .then((res) => res.data)
}

function updateGroup({ data }) {
  return AxiosClient.put(END_POINT.USER.UPDATE_GROUP, data)
    .then((res) => res.data)
}

function deleteGroups({ data }) {
  return AxiosClient.put(END_POINT.USER.DELETE_GROUPS, data)
    .then((res) => res.data)
}

function getAttributes({ params }) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.USER.GET_ATTRIBUTES}?${q}`)
    .then((res) => res.data)
}

function getAttribute({ data }) {
  return AxiosClient.post(END_POINT.USER.GET_ATTRIBUTE, data)
    .then((res) => res.data)
}

function createAttribute({ data }) {
  return AxiosClient.post(END_POINT.USER.CREATE_ATTRIBUTE, data)
    .then((res) => res.data)
}

function updateAttribute({ attributeId, data }) {
  return AxiosClient.put(`${END_POINT.USER.UPDATE_ATTRIBUTE}/${attributeId}`, data)
    .then((res) => res.data)
}

function deleteAttributes({ data }) {
  return AxiosClient.delete(END_POINT.USER.DELETE_ATTRIBUTES, data)
    .then((res) => res.data)
}

function getCompanies({ params }) {
  const q = parseParamsToQueryStringV2(params)
  return AxiosClient.get(`${END_POINT.USER.GET_COMPANIES}?${q}`)
    .then((res) => res.data)
}

function checkEmailExist(data) {
  return AxiosClient.post(END_POINT.USER.CHECK_EXIST_EMAIL, data)
    .then((res) => res.data)
}

export {
  batchRegisterUser,
  downloadCSVTemplate,
  getImportUserResults,
  getUsers,
  getUser,
  createUser,
  deleteUsers,
  assignRemoveGroup,
  assignRemoveAttribute,
  updateLoginStatus,
  getUserLearnStatus,
  getUserTestResults,
  getUserLearnHistories,
  getLoginHistories,
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroups,
  getAttributes,
  getAttribute,
  createAttribute,
  updateAttribute,
  deleteAttributes,
  updateUser,
  updateUserWorkspace,
  getCompanies,
  createNissokenUser,
  checkEmailExist,
  downloadUserCSV
}
