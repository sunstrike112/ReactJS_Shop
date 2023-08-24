import { parseFilter, parseParamsToQueryString, getLocalStorage, STORAGE } from '../utils'
import AxiosClient from './api'
import END_POINT from './constants'

async function getListTagAPI(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.TALK_BOARD.GET_TAG}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getUnreadTalkBoardAPI(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.TALK_BOARD.GET_UNREAD_TALK_BOARD}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getListGroupAPI(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.TALK_BOARD.GET_GROUP}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function getListAttributeAPI(params) {
  const axiosClient = new AxiosClient()
  const q = new URLSearchParams({ ...params }).toString()
  const uri = `${END_POINT.TALK_BOARD.GET_ATTRIBUTE}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function createTalkBoardAPI(data) {
  const langCode = getLocalStorage(STORAGE.LANGUAGE)
  const axiosClient = new AxiosClient()
  return axiosClient.post(END_POINT.TALK_BOARD.CREATE_TALK_BOARD, { ...data, langCode })
    .then((res) => res.data)
}

async function getListTalkBoardAPI({ params }) {
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  const axiosClient = new AxiosClient()
  const uri = `${END_POINT.TALK_BOARD.GET_LIST_TALK_BOARD}?${q}`
  return axiosClient.get(uri)
    .then((res) => res.data)
}

async function deleteTalkBoardAPI(talkBoardId) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.delete(END_POINT.TALK_BOARD.DELETE_TALK_BOARD({ talkBoardId }))
  return res.data
}

async function getTalkBoardDetailEditAPI({ talkBoardId }) {
  const axiosClient = new AxiosClient()
  return axiosClient.get(END_POINT.TALK_BOARD.GET_TALK_BOARD_DETAIL_EDIT({ talkBoardId }))
    .then((res) => res.data)
}

async function getTalkBoardDetailViewAPI({ talkBoardId }) {
  const axiosClient = new AxiosClient()
  return axiosClient.get(END_POINT.TALK_BOARD.GET_TALK_BOARD_DETAIL_VIEW({ talkBoardId }))
    .then((res) => res.data)
}

async function updateTalkBoardAPI({ talkBoardId, data }) {
  const langCode = getLocalStorage(STORAGE.LANGUAGE)
  const axiosClient = new AxiosClient()
  return axiosClient.put(END_POINT.TALK_BOARD.UPDATE_TALK_BOARD({ talkBoardId }), { ...data, langCode })
    .then((res) => res.data)
}

export {
  getListTagAPI,
  getListGroupAPI,
  getListAttributeAPI,
  createTalkBoardAPI,
  getListTalkBoardAPI,
  deleteTalkBoardAPI,
  updateTalkBoardAPI,
  getTalkBoardDetailViewAPI,
  getUnreadTalkBoardAPI,
  getTalkBoardDetailEditAPI
}
