import { put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  getListTalkBoardAPI,
  getTalkBoardDetailAPI,
  createTalkBoardAPI,
  updateTalkBoardAPI,
  deleteTalkBoardAPI,
  getGroupAPI,
  getTagAPI,
  getAttributeAPI,
  uploadFilesCreateTalkBoardAPI,
  getListCommentApi,
  hideCommentApi
} from 'APIs'
import RoutesName from 'Routes/constant'
import { push } from 'connected-react-router'
import {
  GET_LIST_TALKBOARD,
  GET_TALKBOARD_DETAIL,
  CREATE_TALKBOARD,
  UPDATE_TALKBOARD,
  DELETE_TALKBOARD,
  GET_TAG,
  GET_GROUP,
  GET_ATTRIBUTE,
  UPLOAD_FILES_CREATE_TALKBOARD,
  GET_LIST_COMMENT,
  HIDE_COMMENT
} from './constants'

export function* getListTalkBoardSaga({ payload }) {
  try {
    const { code, data } = yield getListTalkBoardAPI(payload)
    const { result, page, pages, total, limit } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_LIST_TALKBOARD),
        payload: {
          result,
          pagination: { page, pages, total, limit },
          filter: payload
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_LIST_TALKBOARD),
      error
    })
  }
}

export function* getTalkBoardDetailSaga({ payload }) {
  try {
    const { code, data } = yield getTalkBoardDetailAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_TALKBOARD_DETAIL),
        payload: data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_TALKBOARD_DETAIL),
      error
    })
  }
}

export function* createTalkBoardSaga({ payload }) {
  const { files } = payload
  const resolved = function* () {
    notification.success({
      message: i18next.t('common:success'),
      description: i18next.t('common:message.create_success'),
      duration: 2
    })
    yield put(push(RoutesName.COMMUNITY_MANAGEMENT))
  }
  try {
    const { code, data } = yield createTalkBoardAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(CREATE_TALKBOARD)
      })
      if (files.length) {
        yield put({
          type: REQUEST(UPLOAD_FILES_CREATE_TALKBOARD),
          payload: { talkBoardId: data.id, files, resolved }
        })
      } else {
        yield resolved()
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_TALKBOARD),
      error
    })
  }
}

export function* uploadFilesCreateTalkBoardSaga({ payload }) {
  const { files, talkBoardId, resolved } = payload
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
      yield resolved()
    } else {
      response.forEach((res, index) => {
        if (res.code !== 200) {
          notification.error({
            message: i18next.t('common:error'),
            description: `Upload file ${files[index].name} failure`,
            duration: 2
          })
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPLOAD_FILES_CREATE_TALKBOARD),
      error
    })
  }
}

export function* updateTalkBoardSaga({ payload }) {
  const { files, talkBoardId, data } = payload

  const resolved = function* () {
    notification.success({
      message: i18next.t('common:success'),
      description: i18next.t('common:message.update_success'),
      duration: 2
    })
    yield put(push(RoutesName.COMMUNITY_MANAGEMENT))
  }
  try {
    const { code } = yield updateTalkBoardAPI({ talkBoardId, data })
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_TALKBOARD)
      })
      if (files.length) {
        yield put({
          type: REQUEST(UPLOAD_FILES_CREATE_TALKBOARD),
          payload: { talkBoardId, files, resolved }
        })
      } else {
        yield resolved()
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_TALKBOARD),
      error
    })
  }
}

export function* deleteTalkBoardSaga({ payload }) {
  const { callback, filter } = payload
  try {
    const { code } = yield deleteTalkBoardAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_TALKBOARD)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      yield put({
        type: REQUEST(GET_LIST_TALKBOARD),
        payload: filter
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_TALKBOARD),
      error
    })
  }
}

export function* getAttributeSaga({ payload }) {
  try {
    const { data } = yield getAttributeAPI(payload)
    yield put({
      type: SUCCESS(GET_ATTRIBUTE),
      payload: {
        data
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(GET_ATTRIBUTE),
      error
    })
  }
}

export function* getTagSaga({ payload }) {
  try {
    const { data } = yield getTagAPI(payload)
    yield put({
      type: SUCCESS(GET_TAG),
      payload: {
        data
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(GET_TAG),
      error
    })
  }
}

export function* getGroupSaga({ payload }) {
  try {
    const { data } = yield getGroupAPI(payload)
    yield put({
      type: SUCCESS(GET_GROUP),
      payload: {
        data
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(GET_GROUP),
      error
    })
  }
}

export function* getListCommentSaga({ payload }) {
  try {
    const { code, data } = yield getListCommentApi(payload)
    const { result, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_LIST_COMMENT),
        payload: {
          data,
          pagination,
          filter: payload.filter || {}
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_LIST_COMMENT),
      error
    })
  }
}

export function* hideCommentSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield hideCommentApi(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(HIDE_COMMENT)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put({
        type: REQUEST(GET_LIST_COMMENT),
        payload: {
          params: { ...payload.params },
          filter: payload.filter || {}
        }
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(HIDE_COMMENT),
      error
    })
  }
}

export default function* workspaceSaga() {
  yield takeLatest(REQUEST(GET_LIST_TALKBOARD), getListTalkBoardSaga)
  yield takeLatest(REQUEST(GET_TALKBOARD_DETAIL), getTalkBoardDetailSaga)
  yield takeLatest(REQUEST(CREATE_TALKBOARD), createTalkBoardSaga)
  yield takeLatest(REQUEST(UPDATE_TALKBOARD), updateTalkBoardSaga)
  yield takeLatest(REQUEST(DELETE_TALKBOARD), deleteTalkBoardSaga)
  yield takeLatest(REQUEST(GET_GROUP), getGroupSaga)
  yield takeLatest(REQUEST(GET_ATTRIBUTE), getAttributeSaga)
  yield takeLatest(REQUEST(GET_TAG), getTagSaga)
  yield takeLatest(REQUEST(UPLOAD_FILES_CREATE_TALKBOARD), uploadFilesCreateTalkBoardSaga)
  yield takeLatest(REQUEST(GET_LIST_COMMENT), getListCommentSaga)
  yield takeLatest(REQUEST(HIDE_COMMENT), hideCommentSaga)
}
