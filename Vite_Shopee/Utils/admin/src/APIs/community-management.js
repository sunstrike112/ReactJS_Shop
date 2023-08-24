import { parseParamsToQueryStringV3, parseFilterArrayToString, openDownloadLink, getLocalStorage, STORAGE, parseParamsToQueryString } from 'Utils'
import AxiosClient from './api'
import END_POINT from './constants'

function getListTalkBoardAPI(payload) {
  const q = parseParamsToQueryStringV3(payload)
  return AxiosClient.get(`${END_POINT.COMMUNITY_MANAGEMENT.GET_LIST_TALKBOARD}?${q}`)
    .then((res) => res.data)
}

function getTalkBoardDetailAPI({ talkBoardId }) {
  return AxiosClient.get(`${END_POINT.COMMUNITY_MANAGEMENT.GET_TALKBOARD_DETAIL}/${talkBoardId}`)
    .then((res) => res.data)
}

function createTalkBoardAPI({ data }) {
  const langCode = getLocalStorage(STORAGE.LANGUAGE)
  return AxiosClient.post(END_POINT.COMMUNITY_MANAGEMENT.CREATE_TALKBOARD, { ...data, langCode })
    .then((res) => res.data)
}

function updateTalkBoardAPI({ talkBoardId, data }) {
  const langCode = getLocalStorage(STORAGE.LANGUAGE)
  return AxiosClient.put(`${END_POINT.COMMUNITY_MANAGEMENT.UPDATE_TALKBOARD(talkBoardId)}`, { ...data, langCode })
    .then((res) => res.data)
}

function deleteTalkBoardAPI({ data }) {
  return AxiosClient.delete(END_POINT.COMMUNITY_MANAGEMENT.DELETE_TALKBOARD, data)
    .then((res) => res.data)
}

function getAttributeAPI(params) {
  const q = parseFilterArrayToString(params)
  return AxiosClient.get(`${END_POINT.COMMUNITY_MANAGEMENT.GET_ATTRIBUTE}?${q}`)
    .then((res) => res.data)
}

function getGroupAPI(params) {
  const q = parseFilterArrayToString(params)
  return AxiosClient.get(`${END_POINT.COMMUNITY_MANAGEMENT.GET_GROUP}?${q}`)
    .then((res) => res.data)
}

function getTagAPI(params) {
  const q = parseParamsToQueryString(params)
  return AxiosClient.get(`${END_POINT.COMMUNITY_MANAGEMENT.GET_TAG}?${q}`)
    .then((res) => res.data)
}

function downloadTalkBoardCSV({ data, params }) {
  const q = parseParamsToQueryStringV3(params)
  return AxiosClient.download(`${END_POINT.COMMUNITY_MANAGEMENT.DOWNLOAD_TALKBOARD_CSV}?${q}`, { method: 'POST' }, data)
    .then(async (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      openDownloadLink({
        url, filename: 'community-management.csv'
      })
    })
}

function downloadCommentTalkBoardCSV({ params }) {
  const q = parseParamsToQueryStringV3(params)
  return AxiosClient.download(`${END_POINT.COMMUNITY_MANAGEMENT.DOWNLOAD_COMMENT_CSV}?${q}`, { method: 'POST' })
    .then(async (response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      openDownloadLink({
        url, filename: 'comment-talkBoard.csv'
      })
    })
}

async function checkOverSizeAPI({ totalSize }) {
  const uri = END_POINT.COMMUNITY_MANAGEMENT.CHECK_OVERSIZE({ totalSize })
  return AxiosClient.put(uri).then((res) => res.data)
}

async function uploadFilesCreateTalkBoardAPI({ talkBoardId, data }) {
  const res = await AxiosClient.post(END_POINT.COMMUNITY_MANAGEMENT.UPLOAD_FILE(talkBoardId), data)
  return res.data
}

async function deleteTalkBoardFileAPI({ data }) {
  const res = await AxiosClient.delete(END_POINT.COMMUNITY_MANAGEMENT.DELETE_TALKBOARD_FILE, data)
  return res.data
}

function getListCommentApi({ params }) {
  const q = parseParamsToQueryStringV3(params)
  return AxiosClient.get(`${END_POINT.COMMUNITY_MANAGEMENT.GET_LIST_COMMENT}?${q}`)
    .then((res) => res.data)
}

function hideCommentApi({ data }) {
  return AxiosClient.post(END_POINT.COMMUNITY_MANAGEMENT.HIDE_COMMENT, data)
    .then((res) => res.data)
}

export {
  getListTalkBoardAPI,
  createTalkBoardAPI,
  updateTalkBoardAPI,
  deleteTalkBoardAPI,
  getAttributeAPI,
  getTagAPI,
  getGroupAPI,
  downloadTalkBoardCSV,
  checkOverSizeAPI,
  uploadFilesCreateTalkBoardAPI,
  getTalkBoardDetailAPI,
  deleteTalkBoardFileAPI,
  getListCommentApi,
  downloadCommentTalkBoardCSV,
  hideCommentApi
}
