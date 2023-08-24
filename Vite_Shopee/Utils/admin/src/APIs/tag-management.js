import { parseParamsToQueryString } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function getTag(payload) {
  const q = parseParamsToQueryString(payload)
  return AxiosClient.get(`${END_POINT.TAG_MANAGEMENT}?${q}`)
    .then((res) => res.data)
}

function createTag({ data }) {
  return AxiosClient.post(END_POINT.TAG_MANAGEMENT, data)
    .then((res) => res.data)
}

function updateTag({ tagId, data }) {
  return AxiosClient.put(`${END_POINT.TAG_MANAGEMENT}/${tagId}`, data)
    .then((res) => res.data)
}

function deleteTag({ data }) {
  return AxiosClient.delete(END_POINT.TAG_MANAGEMENT, data)
    .then((res) => res.data)
}

export {
  getTag,
  createTag,
  updateTag,
  deleteTag
}
