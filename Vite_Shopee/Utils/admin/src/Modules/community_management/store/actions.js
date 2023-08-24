import { REQUEST } from 'Stores'
import {
  GET_LIST_TALKBOARD,
  CREATE_TALKBOARD,
  UPDATE_TALKBOARD,
  DELETE_TALKBOARD,
  GET_GROUP,
  GET_ATTRIBUTE,
  GET_TAG,
  UPLOAD_FILES_CREATE_TALKBOARD,
  GET_TALKBOARD_DETAIL,
  GET_LIST_COMMENT,
  UPLOAD_FILES_UPDATE_TALKBOARD,
  HIDE_COMMENT,
  RESET_TALKBOARD,
  RESET_COMMENT
} from './constants'

function getListTalkBoard(payload) {
  return {
    type: REQUEST(GET_LIST_TALKBOARD),
    payload
  }
}

function getTalkBoardDetail(payload) {
  return {
    type: REQUEST(GET_TALKBOARD_DETAIL),
    payload
  }
}

function createTalkBoard(payload) {
  return {
    type: REQUEST(CREATE_TALKBOARD),
    payload
  }
}

function updateTalkBoard(payload) {
  return {
    type: REQUEST(UPDATE_TALKBOARD),
    payload
  }
}

function deleteTalkBoard(payload) {
  return {
    type: REQUEST(DELETE_TALKBOARD),
    payload
  }
}

function getGroup(payload) {
  return {
    type: REQUEST(GET_GROUP),
    payload
  }
}

function getAttribute(payload) {
  return {
    type: REQUEST(GET_ATTRIBUTE),
    payload
  }
}

function getTag(payload) {
  return {
    type: REQUEST(GET_TAG),
    payload
  }
}

function uploadFilesCreateTalkboard(payload) {
  return {
    type: REQUEST(UPLOAD_FILES_CREATE_TALKBOARD),
    payload
  }
}

function uploadFilesUpdateTalkBoard(payload) {
  return {
    type: REQUEST(UPLOAD_FILES_UPDATE_TALKBOARD),
    payload
  }
}

function getListComment(payload) {
  return {
    type: REQUEST(GET_LIST_COMMENT),
    payload
  }
}

function hideComment(payload) {
  return {
    type: REQUEST(HIDE_COMMENT),
    payload
  }
}

function resetComment() {
  return {
    type: REQUEST(RESET_COMMENT)
  }
}

function resetTalkboard() {
  return {
    type: REQUEST(RESET_TALKBOARD)
  }
}

export {
  getListTalkBoard,
  getTalkBoardDetail,
  createTalkBoard,
  updateTalkBoard,
  deleteTalkBoard,
  getGroup,
  getAttribute,
  getTag,
  uploadFilesCreateTalkboard,
  uploadFilesUpdateTalkBoard,
  getListComment,
  hideComment,
  resetComment,
  resetTalkboard
}
