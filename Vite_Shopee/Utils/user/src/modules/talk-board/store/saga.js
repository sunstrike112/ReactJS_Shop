/* eslint-disable no-undef */
/* eslint-disable no-console */

import { put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from '../../../i18n'
import {
  getListTagAPI,
  getListGroupAPI,
  getListAttributeAPI,
  createTalkBoardAPI,
  getListTalkBoardAPI,
  deleteTalkBoardAPI,
  createCommentAPI,
  uploadFilesCommentAPI,
  getCommentsListApi,
  uploadFilesCreateTalkBoardAPI,
  likeCommentAPI,
  disLikeCommentAPI,
  getUserLikeCommentAPI,
  getUserDisLikeCommentAPI,
  readCommentAPI,
  updateTalkBoardAPI,
  getUnreadTalkBoardAPI,
  likeTalkBoardAPI,
  disLikeTalkBoardAPI,
  checkCompleteTalkBoardAPI,
  loadUserLikeTalkBoardAPI,
  loadUserDisLikeTalkBoardAPI,
  loadUserCheckCompleteTalkBoardAPI,
  readTalkBoardAPI,
  updateTalkBoardCommentAPI,
  deleteTalkBoardCommentAPI,
  getTalkBoardDetailEditAPI,
  getTalkBoardDetailViewAPI
} from '../../../apis'
import {
  loadTagSuccess,
  loadGroupSuccess,
  loadUnreadTalkBoardSuccess,
  loadAttributeSuccess,
  uploadFilesCommentRequest,
  uploadFilesCreateTBSuccess,
  createCommentFailure,
  createCommentSuccess,
  loadCommentsFailed,
  loadCommentsSuccess,
  uploadFilesCreateTBRequest,
  loadTalkBoardSuccess,
  likeCommentSuccess,
  disLikeCommentSuccess,
  likeCommentFailure,
  disLikeCommentFailure,
  loadUserLikeCommentSuccess,
  loadUserLikeCommentFailure,
  loadUserDisLikeCommentSuccess,
  loadUserDisLikeCommentFailure,
  readCommentSuccess,
  readCommentFailure,
  uploadFilesCommentSuccess,
  uploadFilesCommentFailure,
  loadTalkBoardUpdateSuccess,
  repoLoadingError,
  loadTalkBoardDetailSuccess,
  loadTalkBoardDetailFailure,
  changeFilterTalkboard
} from './actions'

import {
  LOAD_TAG,
  LOAD_GROUP,
  LOAD_ATTRIBUTE,
  LOAD_TALK_BOARD,
  LOAD_UNREAD_TALK_BOARD,
  CREATE_TALK_BOARD,
  CREATE_TALK_BOARD_SUCCESS,
  CREATE_TALK_BOARD_ERROR,
  DELETE_TALK_BOARD,
  LOAD_TALK_BOARD_UPDATE,
  UPDATE_TALK_BOARD,
  UPDATE_TALK_BOARD_ERROR,
  LOAD_COMMENT_LIST,
  CREATE_COMMENT_REQUEST,
  UPLOAD_FILES_COMMENT_REQUEST,
  UPLOAD_FILES_CREATE_TB_REQUEST,
  LIKE_COMMENT_REQUEST,
  DISLIKE_COMMENT_REQUEST,
  LOAD_USER_LIKE_COMMENT_REQUEST,
  LOAD_USER_DISLIKE_COMMENT_REQUEST,
  READ_COMMENT_REQUEST,
  UPDATE_TALK_BOARD_SUCCESS,
  LOAD_TALK_BOARD_DETAIL,
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
  LOAD_USERS_ACTIVE_TALK_BOARD,
  LOAD_USERS_ACTIVE_COMMENT
} from './constants'
import { FAILURE, REQUEST, SUCCESS } from '../../../store'
import { getResultWithPaging } from '../../../utils'

export function* loadTagSaga({ payload }) {
  const { lstTagId, callback } = payload || {}
  try {
    const { data } = yield getListTagAPI(payload)
    if (lstTagId && callback) {
      const tagSelected = data.filter((tag) => lstTagId.findIndex((el) => el === tag.id) !== -1)
      callback(tagSelected)
    }
    yield put(loadTagSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadGroupSaga() {
  try {
    const { data } = yield getListGroupAPI()
    yield put(loadGroupSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadAttributeSaga() {
  try {
    const { data } = yield getListAttributeAPI()
    yield put(loadAttributeSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadTalkBoardUpdateSaga({ payload }) {
  try {
    const { data } = yield getTalkBoardDetailEditAPI(payload)
    yield put(loadTalkBoardUpdateSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadUnreadTalkBoardSaga() {
  try {
    const { data } = yield getUnreadTalkBoardAPI()
    yield put(loadUnreadTalkBoardSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* updateTalkBoardSaga({ payload }) {
  const { data, files, createSuccess, uploadSuccess, talkBoardId } = payload
  try {
    const { code } = yield updateTalkBoardAPI({ data, talkBoardId })
    if (code === 200) {
      yield put({
        type: UPDATE_TALK_BOARD_SUCCESS
      })
      if (files.length) {
        yield put(uploadFilesCreateTBRequest({ talkBoardId, files, createSuccess, uploadSuccess }))
      } else {
        createSuccess()
        uploadSuccess()
      }
    }
  } catch (error) {
    createSuccess()
    yield put({
      type: UPDATE_TALK_BOARD_ERROR,
      error
    })
  }
}

export function* createTalkBoardSaga({ payload }) {
  const { data, files, createSuccess, uploadSuccess } = payload
  try {
    const { code, data: datAPI } = yield createTalkBoardAPI(data)
    if (code === 200) {
      yield put({
        type: CREATE_TALK_BOARD_SUCCESS
      })
      if (files.length) {
        yield put(uploadFilesCreateTBRequest({ talkBoardId: datAPI.id, files, createSuccess, uploadSuccess }))
      } else {
        createSuccess()
        uploadSuccess()
      }
    }
  } catch (error) {
    createSuccess()
    yield put({
      type: CREATE_TALK_BOARD_ERROR,
      error
    })
  }
}

export function* deleteTalkBoardSaga({ payload }) {
  const { callback, talkBoardId } = payload
  try {
    const { code } = yield deleteTalkBoardAPI(talkBoardId)
    if (code === 200) {
      notification.success({
        message: i18next.t('common.message.delete_success'),
        duration: 2
      })
      callback.done()
    }
  } catch (error) {
    switch (error.status) {
      case 400:
        notification.error({
          message: i18next.t('talk_board.cannot_delete_talkboard'),
          duration: 2
        })
        break
      default:
        break
    }
  }
}

export function* deleteTalkBoardCommentSaga({ payload }) {
  const { callback, talkBoardId, commentId } = payload
  try {
    const { code, data } = yield deleteTalkBoardCommentAPI({ talkBoardId, commentId })
    yield readCommentAPI({ commentId: data.id })
    if (code === 200) {
      notification.success({
        message: i18next.t('common.message.delete_success'),
        duration: 2
      })
    }
    callback.done()
  } catch (error) {
    switch (error.status) {
      case 400:
        notification.error({
          message: i18next.t('talk_board.cannot_delete_talkboard'),
          duration: 2
        })
        break
      case 404:
        notification.error({
          message: i18next.t('talk_board.talkboard_not_found'),
          duration: 2
        })
        break
      default:
        break
    }
  }
}

export function* loadTalkBoardSaga({ payload }) {
  const { params } = payload
  try {
    const { data } = yield getResultWithPaging({ action: getListTalkBoardAPI, payload })
    yield put(loadTalkBoardSuccess({ data, filter: params.filter }))
  } catch (error) {
    if (error.status === 401) yield put(changeFilterTalkboard())
    yield put(repoLoadingError(error))
  }
}

export function* getCommentsListSaga({ payload }) {
  try {
    const { code, data } = yield getCommentsListApi(payload)

    if (code === 200) {
      yield put(loadCommentsSuccess({
        data: data.result,
        filter: payload?.params?.filter || {},
        pagination: {
          page: data.page,
          pages: data.pages,
          total: data.total,
          limit: data.limit
        }
      }))
    }
  } catch (error) {
    yield put(loadCommentsFailed(error))
  }
}

export function* createCommentSaga({ payload }) {
  const { files, callback } = payload
  try {
    const { code, data } = yield createCommentAPI(payload)
    if (code === 200) {
      yield put(createCommentSuccess(data))
      yield readCommentAPI({ commentId: data.id })
      if (files.length) {
        yield put(uploadFilesCommentRequest({ files, commentId: data.id, callback }))
      } else {
        callback()
      }
    }
  } catch (error) {
    yield put(createCommentFailure(error))
  }
}

export function* uploadFilesCommentSaga({ payload }) {
  const { files, commentId, callback } = payload
  try {
    let response = []
    for (let i = 0; i < files.length; i += 1) {
      const result = yield uploadFilesCommentAPI({
        commentId,
        data: {
          fileName: files[i].name,
          fileSize: `${files[i].size}`,
          fileType: files[i].type,
          id: 0,
          link: files[i].urlS3
        }
      })
      response.push(result)
    }

    if (response.length && response.every((res) => res.code === 200)) {
      yield put(uploadFilesCommentSuccess())
    } else {
      response.forEach((res, index) => {
        if (res.code !== 200) {
          notification.error({
            message: i18next.t('common.error'),
            description: `Upload file ${files[index].name} failure`,
            duration: 2
          })
        }
      })
    }
  } catch (error) {
    yield put(uploadFilesCommentFailure(error))
  } finally {
    callback()
  }
}

export function* uploadFilesCreateTalkBoardSaga({ payload }) {
  const { files, talkBoardId, createSuccess, uploadSuccess } = payload
  try {
    let response = []
    for (let i = 0; i < files.length; i += 1) {
      const result = yield uploadFilesCreateTalkBoardAPI({
        talkBoardId,
        data: {
          fileName: files[i].name,
          fileSize: `${files[i].size}`,
          fileType: files[i].type,
          id: 0,
          link: files[i].urlS3
        }
      })
      response.push(result)
    }

    if (response.length && response.every((res) => res.code === 200)) {
      yield put(uploadFilesCreateTBSuccess())
      createSuccess()
      uploadSuccess()
    } else {
      response.forEach((res, index) => {
        if (res.code !== 200) {
          notification.error({
            message: i18next.t('common.error'),
            description: `Upload file ${files[index].name} failure`,
            duration: 2
          })
        }
      })
    }
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* likeCommentSaga({ payload }) {
  try {
    const { code, data } = yield likeCommentAPI(payload)
    if (code === 200) {
      yield put(likeCommentSuccess(data))
    }
  } catch (error) {
    yield put(likeCommentFailure(error))
  }
}

export function* disLikeCommentSaga({ payload }) {
  try {
    const { code, data } = yield disLikeCommentAPI(payload)
    if (code === 200) {
      yield put(disLikeCommentSuccess(data))
    }
  } catch (error) {
    yield put(disLikeCommentFailure(error))
  }
}

export function* loadUserLikeCommentSaga({ payload }) {
  try {
    const { code, data } = yield getUserLikeCommentAPI(payload)
    if (code === 200) {
      yield put(loadUserLikeCommentSuccess(data))
    }
  } catch (error) {
    yield put(loadUserLikeCommentFailure(error))
  }
}

export function* loadUserDisLikeCommentSaga({ payload }) {
  try {
    const { code, data } = yield getUserDisLikeCommentAPI(payload)
    if (code === 200) {
      yield put(loadUserDisLikeCommentSuccess(data))
    }
  } catch (error) {
    yield put(loadUserDisLikeCommentFailure(error))
  }
}

export function* readCommentSaga({ payload }) {
  try {
    const { code, data } = yield readCommentAPI(payload)
    if (code === 200) {
      yield put(readCommentSuccess(data))
    }
  } catch (error) {
    yield put(readCommentFailure(error))
  }
}

export function* loadTalkBoardDetailSaga({ payload }) {
  try {
    const { code, data } = yield getTalkBoardDetailViewAPI(payload)
    if (code === 200) {
      yield put(loadTalkBoardDetailSuccess(data))
    }
  } catch (error) {
    yield put(loadTalkBoardDetailFailure(error))
  }
}

export function* updateTalkBoardCommentSaga({ payload }) {
  const { data, files, talkBoardId, commentId, callback } = payload

  try {
    const { code } = yield updateTalkBoardCommentAPI({ talkBoardId, commentId, data })
    if (code === 200) {
      yield put({
        type: UPDATE_COMMENT_SUCCESS
      })
      if (files.length) {
        yield put(uploadFilesCommentRequest({ files, commentId, callback }))
      } else {
        callback()
      }
    }
  } catch (error) {
    yield put({
      type: UPDATE_COMMENT_FAILURE,
      error
    })
  }
}

export function* likeTalkBoardSaga({ payload }) {
  try {
    const { code, data } = yield likeTalkBoardAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LIKE_TALK_BOARD),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LIKE_TALK_BOARD),
      error
    })
  }
}

export function* disLikeTalkBoardSaga({ payload }) {
  try {
    const { code, data } = yield disLikeTalkBoardAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(DISLIKE_TALK_BOARD),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(DISLIKE_TALK_BOARD),
      error
    })
  }
}

export function* checkCompleteTalkBoardSaga({ payload }) {
  try {
    const { code, data } = yield checkCompleteTalkBoardAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(CHECK_COMPLETE_TALK_BOARD),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(CHECK_COMPLETE_TALK_BOARD),
      error
    })
  }
}

export function* loadUserLikeTalkBoardSaga({ payload }) {
  try {
    const { code, data } = yield loadUserLikeTalkBoardAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_USER_LIKE_TALK_BOARD),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_USER_LIKE_TALK_BOARD),
      error
    })
  }
}

export function* loadUserDisLikeTalkBoardSaga({ payload }) {
  try {
    const { code, data } = yield loadUserDisLikeTalkBoardAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_USER_DISLIKE_TALK_BOARD),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_USER_DISLIKE_TALK_BOARD),
      error
    })
  }
}

export function* loadUserCheckCompleteTalkBoardSaga({ payload }) {
  try {
    const { code, data } = yield loadUserCheckCompleteTalkBoardAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_USER_CHECK_COMPLETE_TALK_BOARD),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_USER_CHECK_COMPLETE_TALK_BOARD),
      error
    })
  }
}

export function* readTalkBoardSaga({ payload }) {
  const { callback } = payload
  try {
    const { code, data } = yield readTalkBoardAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(READ_TALK_BOARD),
        data
      })
    }
    callback.done()
  } catch (error) {
    yield put({
      type: FAILURE(READ_TALK_BOARD),
      error
    })
  }
}

export function* loadUsersActiveTalkBoardSaga({ payload }) {
  try {
    const response = yield Promise.all([
      loadUserLikeTalkBoardAPI(payload),
      loadUserDisLikeTalkBoardAPI(payload),
      loadUserCheckCompleteTalkBoardAPI(payload)
    ])
    yield put({
      type: SUCCESS(LOAD_USERS_ACTIVE_TALK_BOARD),
      data: {
        usersLike: response[0].data,
        userDisLike: response[1].data,
        usersCheckComplete: response[2].data
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_USERS_ACTIVE_TALK_BOARD),
      error
    })
  }
}

export function* loadUsersActiveCommentSaga({ payload }) {
  try {
    const response = yield Promise.all([
      getUserLikeCommentAPI(payload),
      getUserDisLikeCommentAPI(payload)
    ])
    yield put({
      type: SUCCESS(LOAD_USERS_ACTIVE_COMMENT),
      data: {
        usersLike: response[0].data,
        userDisLike: response[1].data
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_USERS_ACTIVE_COMMENT),
      error
    })
  }
}

export default function* talkBoardSaga() {
  yield takeLatest(LOAD_TAG, loadTagSaga)
  yield takeLatest(LOAD_GROUP, loadGroupSaga)
  yield takeLatest(LOAD_ATTRIBUTE, loadAttributeSaga)
  yield takeLatest(CREATE_TALK_BOARD, createTalkBoardSaga)
  yield takeLatest(DELETE_TALK_BOARD, deleteTalkBoardSaga)
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteTalkBoardCommentSaga)
  yield takeLatest(UPDATE_TALK_BOARD, updateTalkBoardSaga)
  yield takeLatest(LOAD_TALK_BOARD, loadTalkBoardSaga)
  yield takeLatest(LOAD_TALK_BOARD_UPDATE, loadTalkBoardUpdateSaga)
  yield takeLatest(LOAD_UNREAD_TALK_BOARD, loadUnreadTalkBoardSaga)
  yield takeLatest(LOAD_COMMENT_LIST, getCommentsListSaga)
  yield takeLatest(CREATE_COMMENT_REQUEST, createCommentSaga)
  yield takeLatest(UPLOAD_FILES_COMMENT_REQUEST, uploadFilesCommentSaga)
  yield takeLatest(UPLOAD_FILES_CREATE_TB_REQUEST, uploadFilesCreateTalkBoardSaga)
  yield takeLatest(LIKE_COMMENT_REQUEST, likeCommentSaga)
  yield takeLatest(DISLIKE_COMMENT_REQUEST, disLikeCommentSaga)
  yield takeLatest(LOAD_USER_LIKE_COMMENT_REQUEST, loadUserLikeCommentSaga)
  yield takeLatest(LOAD_USER_DISLIKE_COMMENT_REQUEST, loadUserDisLikeCommentSaga)
  yield takeLatest(READ_COMMENT_REQUEST, readCommentSaga)
  yield takeLatest(LOAD_TALK_BOARD_DETAIL, loadTalkBoardDetailSaga)
  yield takeLatest(UPDATE_COMMENT_REQUEST, updateTalkBoardCommentSaga)
  yield takeLatest(REQUEST(LIKE_TALK_BOARD), likeTalkBoardSaga)
  yield takeLatest(REQUEST(DISLIKE_TALK_BOARD), disLikeTalkBoardSaga)
  yield takeLatest(REQUEST(CHECK_COMPLETE_TALK_BOARD), checkCompleteTalkBoardSaga)
  yield takeLatest(REQUEST(LOAD_USER_LIKE_TALK_BOARD), loadUserLikeTalkBoardSaga)
  yield takeLatest(REQUEST(LOAD_USER_DISLIKE_TALK_BOARD), loadUserDisLikeTalkBoardSaga)
  yield takeLatest(REQUEST(LOAD_USER_CHECK_COMPLETE_TALK_BOARD), loadUserCheckCompleteTalkBoardSaga)
  yield takeLatest(REQUEST(READ_TALK_BOARD), readTalkBoardSaga)
  yield takeLatest(REQUEST(LOAD_USERS_ACTIVE_TALK_BOARD), loadUsersActiveTalkBoardSaga)
  yield takeLatest(REQUEST(LOAD_USERS_ACTIVE_COMMENT), loadUsersActiveCommentSaga)
}
