/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  getTag,
  createTag,
  updateTag,
  deleteTag
} from 'APIs'

import {
  GET_LIST_TAG,
  CREATE_TAG,
  UPDATE_TAG,
  DELETE_TAG
} from './constants'

export function* getListTagSaga({ payload }) {
  try {
    const { code, data } = yield getTag(payload)
    const { result, page, pages, total, limit } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_LIST_TAG),
        payload: {
          result,
          pagination: { page, pages, total, limit },
          filter: payload
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_LIST_TAG),
      error
    })
  }
}

export function* createTagSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield createTag(payload)
    if (code === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(CREATE_TAG)
      })
      callback()
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_TAG),
      error
    })
  }
}

export function* updateTagSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield updateTag(payload)
    if (code === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(UPDATE_TAG)
      })
      yield put({
        type: REQUEST(GET_LIST_TAG),
        payload: { page: 1, limit: 100 }
      })
      callback()
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_TAG),
      error
    })
  }
}

export function* deleteTagSaga({ payload }) {
  const { callback, filter } = payload
  try {
    const { code } = yield deleteTag(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_TAG)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      yield put({
        type: REQUEST(GET_LIST_TAG),
        payload: { ...filter }
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_TAG),
      error
    })
  }
}

export default function* workspaceSaga() {
  yield takeLatest(REQUEST(GET_LIST_TAG), getListTagSaga)
  yield takeLatest(REQUEST(CREATE_TAG), createTagSaga)
  yield takeLatest(REQUEST(UPDATE_TAG), updateTagSaga)
  yield takeLatest(REQUEST(DELETE_TAG), deleteTagSaga)
}
