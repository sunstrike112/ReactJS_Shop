import AxiosClient from './api'
import END_POINT from './constants'

function registerByCsv(data) {
  return AxiosClient.post(END_POINT.USER.REGISTER_BY_CSV, data)
    .then((res) => res.data)
}

function registerWorkspaceByCsv(data) {
  return AxiosClient.post(END_POINT.USER.REGISTER_WORKSPACE_BY_CSV, data)
    .then((res) => res.data)
}

function registerWorkspaceCsvWsAPI(data) {
  return AxiosClient.post(END_POINT.USER.REGISTER_BY_CSV_WS, data)
    .then((res) => res.data)
}

function formatCSVToUTF8(file) {
  const formData = new FormData()
  formData.append(
    'file',
    file,
    file.name
  )
  return AxiosClient.post(END_POINT.USER.FORMAT_CSV_TO_UTF8, formData)
    .then((res) => res.data)
}

function formatCSVToUTF8WsAPI(file) {
  const formData = new FormData()
  formData.append(
    'file',
    file,
    file.name
  )
  return AxiosClient.post(END_POINT.USER.FORMAT_CSV_TO_UTF8_WS, formData)
    .then((res) => res.data)
}

function formatCSVToUTF8WsVirtualAPI(file) {
  const formData = new FormData()
  formData.append(
    'file',
    file,
    file.name
  )
  return AxiosClient.post(END_POINT.USER.FORMAT_CSV_TO_UTF8_WS_VIRTUAL, formData)
    .then((res) => res.data)
}

export {
  registerByCsv,
  registerWorkspaceByCsv,
  registerWorkspaceCsvWsAPI,
  formatCSVToUTF8,
  formatCSVToUTF8WsAPI,
  formatCSVToUTF8WsVirtualAPI
}
