import { stringify } from 'qs'
import AxiosClient from './api'
import END_POINT from './constants'

// External Api
function getExternalApis({ params }) {
  const q = stringify(params)
  const url = `${END_POINT.EXTERNAL.GET_APIS}?${q}`
  return AxiosClient.get(url).then((res) => res.data)
}

function addExternalApi({ data }) {
  const url = END_POINT.EXTERNAL.GET_APIS
  return AxiosClient.post(url, data).then((res) => res.data)
}

function deleteExternalApi({ id }) {
  const url = END_POINT.EXTERNAL.DELETE_API(id)
  return AxiosClient.delete(url).then((res) => res.data)
}

// Ip configuration
function getExternalIps({ params }) {
  const q = stringify(params)
  const url = `${END_POINT.EXTERNAL.GET_IPS}?${q}`
  return AxiosClient.get(url).then((res) => res.data)
}

function addExternalIp({ data }) {
  const url = END_POINT.EXTERNAL.GET_IPS
  return AxiosClient.post(url, data).then((res) => res.data)
}

function deleteExternalIp({ id }) {
  const url = END_POINT.EXTERNAL.DELETE_IP(id)
  return AxiosClient.delete(url).then((res) => res.data)
}

// Api manager
function getExternalApisManager({ params }) {
  const q = stringify(params)
  const url = `${END_POINT.EXTERNAL.GET_APIS_MANAGER}?${q}`
  return AxiosClient.get(url).then((res) => res.data)
}

function addExternalApiManager({ data }) {
  const url = END_POINT.EXTERNAL.GET_APIS_MANAGER
  return AxiosClient.post(url, data).then((res) => res.data)
}

function deleteExternalApiManager({ data }) {
  const url = END_POINT.EXTERNAL.GET_APIS_MANAGER
  return AxiosClient.delete(url, data).then((res) => res.data)
}

export {
  getExternalApis,
  addExternalApi,
  deleteExternalApi,
  getExternalIps,
  addExternalIp,
  deleteExternalIp,
  getExternalApisManager,
  addExternalApiManager,
  deleteExternalApiManager
}
