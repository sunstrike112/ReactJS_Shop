import { REQUEST } from '../../../store'
import {
  LOAD_TAG,
  LOAD_TAG_SUCCESS,
  LOAD_GROUP,
  LOAD_GROUP_SUCCESS,
  LOAD_ATTRIBUTE,
  LOAD_ATTRIBUTE_SUCCESS,
  LOAD_REPOS_ERROR,
  CREATE_TALK_BOARD,
  CREATE_TALK_BOARD_SUCCESS,
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  LOAD_COMMENT_LIST,
  LOAD_COMMENT_LIST_FAILURE,
  LOAD_COMMENT_LIST_SUCCESS,
  UPLOAD_FILES_COMMENT_FAILURE,
  UPLOAD_FILES_COMMENT_REQUEST,
  UPLOAD_FILES_COMMENT_SUCCESS,
  UPLOAD_FILES_CREATE_TB_REQUEST,
  UPLOAD_FILES_CREATE_TB_SUCCESS,
  LOAD_TALK_BOARD,
  LOAD_TALK_BOARD_SUCCESS,
  DELETE_TALK_BOARD,
  DELETE_TALK_BOARD_SUCCESS,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE,
  DISLIKE_COMMENT_REQUEST,
  DISLIKE_COMMENT_SUCCESS,
  DISLIKE_COMMENT_FAILURE,
  LOAD_USER_LIKE_COMMENT_REQUEST,
  LOAD_USER_LIKE_COMMENT_SUCCESS,
  LOAD_USER_LIKE_COMMENT_FAILURE,
  LOAD_USER_DISLIKE_COMMENT_REQUEST,
  LOAD_USER_DISLIKE_COMMENT_SUCCESS,
  LOAD_USER_DISLIKE_COMMENT_FAILURE,
  READ_COMMENT_REQUEST,
  READ_COMMENT_SUCCESS,
  READ_COMMENT_FAILURE,
  LOAD_TALK_BOARD_UPDATE,
  LOAD_TALK_BOARD_UPDATE_SUCCESS,
  UPDATE_TALK_BOARD,
  UPDATE_TALK_BOARD_SUCCESS,
  LOAD_UNREAD_TALK_BOARD,
  LOAD_UNREAD_TALK_BOARD_SUCCESS,
  LOAD_TALK_BOARD_DETAIL,
  LOAD_TALK_BOARD_DETAIL_SUCCESS,
  LOAD_TALK_BOARD_DETAIL_FAILURE,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  LIKE_TALK_BOARD,
  DISLIKE_TALK_BOARD,
  CHECK_COMPLETE_TALK_BOARD,
  LOAD_USER_LIKE_TALK_BOARD,
  LOAD_USER_DISLIKE_TALK_BOARD,
  LOAD_USER_CHECK_COMPLETE_TALK_BOARD,
  READ_TALK_BOARD,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  LOAD_USERS_ACTIVE_TALK_BOARD,
  LOAD_USERS_ACTIVE_COMMENT,
  CHANGE_FILTER_TALKBOARD
} from './constants'

export function loadTag(payload) {
  return {
    type: LOAD_TAG,
    payload
  }
}

export function loadTagSuccess(data) {
  return {
    type: LOAD_TAG_SUCCESS,
    data
  }
}

export function loadGroup(payload) {
  return {
    type: LOAD_GROUP,
    payload
  }
}

export function loadGroupSuccess(data) {
  return {
    type: LOAD_GROUP_SUCCESS,
    data
  }
}
export function loadAttribute(payload) {
  return {
    type: LOAD_ATTRIBUTE,
    payload
  }
}

export function loadAttributeSuccess(data) {
  return {
    type: LOAD_ATTRIBUTE_SUCCESS,
    data
  }
}

export function loadTalkBoard(payload) {
  return {
    type: LOAD_TALK_BOARD,
    payload
  }
}

export function loadTalkBoardSuccess(payload) {
  return {
    type: LOAD_TALK_BOARD_SUCCESS,
    payload
  }
}

export function loadUnreadTalkBoard() {
  return {
    type: LOAD_UNREAD_TALK_BOARD
  }
}

export function loadUnreadTalkBoardSuccess(data) {
  return {
    type: LOAD_UNREAD_TALK_BOARD_SUCCESS,
    data
  }
}

export function deleteTalkBoard(payload) {
  return {
    type: DELETE_TALK_BOARD,
    payload
  }
}

export function deleteTalkBoardSuccess(payload) {
  return {
    type: DELETE_TALK_BOARD_SUCCESS,
    payload
  }
}

export function createTalkBoard(payload) {
  return {
    type: CREATE_TALK_BOARD,
    payload
  }
}

export function createTalkBoardSuccess(data) {
  return {
    type: CREATE_TALK_BOARD_SUCCESS,
    data
  }
}

export function loadTalkBoardUpdate(payload) {
  return {
    type: LOAD_TALK_BOARD_UPDATE,
    payload
  }
}

export function loadTalkBoardUpdateSuccess(data) {
  return {
    type: LOAD_TALK_BOARD_UPDATE_SUCCESS,
    data
  }
}

export function updateTalkBoard(payload) {
  return {
    type: UPDATE_TALK_BOARD,
    payload
  }
}

export function updateTalkBoardSuccess(data) {
  return {
    type: UPDATE_TALK_BOARD_SUCCESS,
    data
  }
}

export function getCommentsList(payload) {
  return {
    type: LOAD_COMMENT_LIST,
    payload
  }
}

export function loadCommentsSuccess(payload) {
  return {
    type: LOAD_COMMENT_LIST_SUCCESS,
    payload
  }
}

export function loadCommentsFailed(payload) {
  return {
    type: LOAD_COMMENT_LIST_FAILURE,
    payload
  }
}

export function uploadFilesCommentRequest(payload) {
  return {
    type: UPLOAD_FILES_COMMENT_REQUEST,
    payload
  }
}

export function uploadFilesCommentSuccess() {
  return {
    type: UPLOAD_FILES_COMMENT_SUCCESS
  }
}

export function uploadFilesCommentFailure(error) {
  return {
    type: UPLOAD_FILES_COMMENT_FAILURE,
    error
  }
}

export function uploadFilesCreateTBRequest(payload) {
  return {
    type: UPLOAD_FILES_CREATE_TB_REQUEST,
    payload
  }
}

export function uploadFilesCreateTBSuccess() {
  return {
    type: UPLOAD_FILES_CREATE_TB_SUCCESS
  }
}

export function createCommentRequest(payload) {
  return {
    type: CREATE_COMMENT_REQUEST,
    payload
  }
}

export function createCommentSuccess(data) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    data
  }
}

export function createCommentFailure(error) {
  return {
    type: CREATE_COMMENT_FAILURE,
    error
  }
}

export function likeCommentRequest(payload) {
  return {
    type: LIKE_COMMENT_REQUEST,
    payload
  }
}

export function likeCommentSuccess(data) {
  return {
    type: LIKE_COMMENT_SUCCESS,
    data
  }
}

export function likeCommentFailure(error) {
  return {
    type: LIKE_COMMENT_FAILURE,
    error
  }
}

export function disLikeCommentRequest(payload) {
  return {
    type: DISLIKE_COMMENT_REQUEST,
    payload
  }
}

export function disLikeCommentSuccess(data) {
  return {
    type: DISLIKE_COMMENT_SUCCESS,
    data
  }
}

export function disLikeCommentFailure(error) {
  return {
    type: DISLIKE_COMMENT_FAILURE,
    error
  }
}

export function loadUserLikeCommentRequest(payload) {
  return {
    type: LOAD_USER_LIKE_COMMENT_REQUEST,
    payload
  }
}

export function loadUserLikeCommentSuccess(data) {
  return {
    type: LOAD_USER_LIKE_COMMENT_SUCCESS,
    data
  }
}

export function loadUserLikeCommentFailure(error) {
  return {
    type: LOAD_USER_LIKE_COMMENT_FAILURE,
    error
  }
}

export function loadUserDisLikeCommentRequest(payload) {
  return {
    type: LOAD_USER_DISLIKE_COMMENT_REQUEST,
    payload
  }
}

export function loadUserDisLikeCommentSuccess(data) {
  return {
    type: LOAD_USER_DISLIKE_COMMENT_SUCCESS,
    data
  }
}

export function loadUserDisLikeCommentFailure(error) {
  return {
    type: LOAD_USER_DISLIKE_COMMENT_FAILURE,
    error
  }
}

export function readCommentRequest(payload) {
  return {
    type: READ_COMMENT_REQUEST,
    payload
  }
}

export function readCommentSuccess(data) {
  return {
    type: READ_COMMENT_SUCCESS,
    data
  }
}

export function readCommentFailure(error) {
  return {
    type: READ_COMMENT_FAILURE,
    error
  }
}

export function updateCommentRequest(payload) {
  return {
    type: UPDATE_COMMENT_REQUEST,
    payload
  }
}

export function updateCommentSuccess(data) {
  return {
    type: UPDATE_COMMENT_SUCCESS,
    data
  }
}

export function updateCommentFailure(error) {
  return {
    type: UPDATE_COMMENT_FAILURE,
    error
  }
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error
  }
}

export function loadTalkBoardDetail(payload) {
  return {
    type: LOAD_TALK_BOARD_DETAIL,
    payload
  }
}

export function loadTalkBoardDetailSuccess(data) {
  return {
    type: LOAD_TALK_BOARD_DETAIL_SUCCESS,
    data
  }
}

export function loadTalkBoardDetailFailure(error) {
  return {
    type: LOAD_TALK_BOARD_DETAIL_FAILURE,
    error
  }
}

export function likeTalkBoardRequest(payload) {
  return {
    type: REQUEST(LIKE_TALK_BOARD),
    payload
  }
}

export function disLikeTalkBoardRequest(payload) {
  return {
    type: REQUEST(DISLIKE_TALK_BOARD),
    payload
  }
}

export function checkCompleteTalkBoardRequest(payload) {
  return {
    type: REQUEST(CHECK_COMPLETE_TALK_BOARD),
    payload
  }
}

export function loadUserLikeTalkBoardRequest(payload) {
  return {
    type: REQUEST(LOAD_USER_LIKE_TALK_BOARD),
    payload
  }
}

export function loadUserDisLikeTalkBoardRequest(payload) {
  return {
    type: REQUEST(LOAD_USER_DISLIKE_TALK_BOARD),
    payload
  }
}

export function loadUserCheckCompleteTalkBoardRequest(payload) {
  return {
    type: REQUEST(LOAD_USER_CHECK_COMPLETE_TALK_BOARD),
    payload
  }
}

export function readTalkBoardRequest(payload) {
  return {
    type: REQUEST(READ_TALK_BOARD),
    payload
  }
}

export function deleteTalkBoardComment(payload) {
  return {
    type: DELETE_COMMENT_REQUEST,
    payload
  }
}

export function deleteTalkBoardCommentSuccess(payload) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload
  }
}

export function loadUsersActiveTalkBoard(payload) {
  return {
    type: REQUEST(LOAD_USERS_ACTIVE_TALK_BOARD),
    payload
  }
}

export function loadUsersActiveComment(payload) {
  return {
    type: REQUEST(LOAD_USERS_ACTIVE_COMMENT),
    payload
  }
}

export function changeFilterTalkboard(payload) {
  return {
    type: CHANGE_FILTER_TALKBOARD,
    payload
  }
}
