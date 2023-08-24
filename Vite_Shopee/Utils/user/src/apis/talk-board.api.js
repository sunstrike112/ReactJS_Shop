import { parseFilter, parseParamsToQueryString, getLocalStorage, STORAGE } from '../utils'
import AxiosClient from './api'
import END_POINT from './constants'

async function getCommentsListApi({ talkBoardId, params }) {
  const axiosClient = new AxiosClient()
  params = parseFilter(params)
  const q = parseParamsToQueryString(params)
  const res = await axiosClient.get(`${END_POINT.TALK_BOARD.COMMENT_LIST(talkBoardId)}?${q}`)
  return res.data
}

async function uploadFilesCommentAPI({ commentId, data }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.post(END_POINT.TALK_BOARD.UPLOAD_FILE_COMMENT({ commentId }), data)
  return res.data
}

async function uploadFilesCreateTalkBoardAPI({ talkBoardId, data }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.post(END_POINT.TALK_BOARD.UPLOAD_FILE_CREATE_TALK_BOARD({ talkBoardId }), data)
  return res.data
}

async function createCommentAPI({ talkBoardId, data }) {
  const langCode = getLocalStorage(STORAGE.LANGUAGE)
  const axiosClient = new AxiosClient()
  const res = await axiosClient.post(END_POINT.TALK_BOARD.CREATE_COMMENT({ talkBoardId }), { ...data, langCode })
  return res.data
}

async function likeCommentAPI({ commentId }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.post(END_POINT.TALK_BOARD.LIKE_COMMENT({ commentId }))
  return res.data
}

async function disLikeCommentAPI({ commentId }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.post(END_POINT.TALK_BOARD.DISLIKE_COMMENT({ commentId }))
  return res.data
}

async function getUserLikeCommentAPI({ commentId }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.get(END_POINT.TALK_BOARD.GET_USER_LIKE_COMMENT({ commentId }))
  return res.data
}

async function getUserDisLikeCommentAPI({ commentId }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.get(END_POINT.TALK_BOARD.GET_USER_DISLIKE_COMMENT({ commentId }))
  return res.data
}

async function readCommentAPI({ commentId }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.post(END_POINT.TALK_BOARD.READ_COMMENT({ commentId }))
  return res.data
}

async function deleteTalkBoardFileAPI({ data }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.delete(END_POINT.TALK_BOARD.DELETE_TALK_BOARD_FILE, data)
  return res.data
}

async function deleteTalkBoardCommentFileAPI({ data }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.delete(END_POINT.TALK_BOARD.DELETE_COMMENT_FILE, data)
  return res.data
}

async function likeTalkBoardAPI({ talkBoardId }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.post(END_POINT.TALK_BOARD.LIKE_TALK_BOARD({ talkBoardId }))
  return res.data
}

async function disLikeTalkBoardAPI({ talkBoardId }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.post(END_POINT.TALK_BOARD.DISLIKE_TALK_BOARD({ talkBoardId }))
  return res.data
}

async function checkCompleteTalkBoardAPI({ talkBoardId }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.post(END_POINT.TALK_BOARD.CHECK_COMPLETE_TALK_BOARD({ talkBoardId }))
  return res.data
}

async function loadUserLikeTalkBoardAPI({ talkBoardId }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.get(END_POINT.TALK_BOARD.GET_USER_LIKE_TALK_BOARD({ talkBoardId }))
  return res.data
}

async function loadUserDisLikeTalkBoardAPI({ talkBoardId }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.get(END_POINT.TALK_BOARD.GET_USER_DISLIKE_TALK_BOARD({ talkBoardId }))
  return res.data
}

async function loadUserCheckCompleteTalkBoardAPI({ talkBoardId }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.get(END_POINT.TALK_BOARD.GET_USER_CHECK_COMPLETE_TALK_BOARD({ talkBoardId }))
  return res.data
}

async function readTalkBoardAPI({ talkBoardId }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.post(END_POINT.TALK_BOARD.READ_TALK_BOARD({ talkBoardId }))
  return res.data
}

async function updateTalkBoardCommentAPI({ talkBoardId, commentId, data }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.put(END_POINT.TALK_BOARD.UPDATE_COMMENT({ talkBoardId, commentId }), data)
  return res.data
}

async function deleteTalkBoardCommentAPI({ talkBoardId, commentId }) {
  const axiosClient = new AxiosClient()
  const res = await axiosClient.delete(END_POINT.TALK_BOARD.DELETE_COMMENT({ talkBoardId, commentId }))
  return res.data
}

export {
  getCommentsListApi,
  uploadFilesCommentAPI,
  uploadFilesCreateTalkBoardAPI,
  createCommentAPI,
  likeCommentAPI,
  disLikeCommentAPI,
  checkCompleteTalkBoardAPI,
  getUserLikeCommentAPI,
  getUserDisLikeCommentAPI,
  readCommentAPI,
  deleteTalkBoardFileAPI,
  deleteTalkBoardCommentFileAPI,
  updateTalkBoardCommentAPI,
  likeTalkBoardAPI,
  disLikeTalkBoardAPI,
  loadUserLikeTalkBoardAPI,
  loadUserDisLikeTalkBoardAPI,
  loadUserCheckCompleteTalkBoardAPI,
  readTalkBoardAPI,
  deleteTalkBoardCommentAPI
}
