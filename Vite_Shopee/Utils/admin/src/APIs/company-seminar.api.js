import { parseFilterArrayToString } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function getListSeminar(params) {
  const q = parseFilterArrayToString(params)
  return AxiosClient.get(`${END_POINT.COMPANY_SEMINAR.GET_LIST_SEMINAR}?${q}`)
    .then((res) => res.data)
}

function createSeminar(data) {
  return AxiosClient.post(`${END_POINT.COMPANY_SEMINAR.CREATE_SEMINAR}`, data)
    .then((res) => res.data)
}

function updateSeminar(data) {
  return AxiosClient.put(`${END_POINT.COMPANY_SEMINAR.UPDATE_SEMINAR}`, data)
    .then((res) => res.data)
}

function getDetailSeminar({ seminarId, data }) {
  const q = parseFilterArrayToString(data)
  return AxiosClient.get(`${END_POINT.COMPANY_SEMINAR.GET_DETAIL_SEMINAR(seminarId)}?${q}`)
    .then((res) => res.data)
}

function deleteSeminar({ data }) {
  return AxiosClient.put(END_POINT.COMPANY_SEMINAR.DELETE_SEMINAR, data)
    .then((res) => res.data)
}

export {
  getListSeminar,
  updateSeminar,
  deleteSeminar,
  createSeminar,

  getDetailSeminar
}
