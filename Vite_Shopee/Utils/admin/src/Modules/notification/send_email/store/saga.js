import { put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'
import { getListUserSelectedAPI, getReceiverEmail, loadTargetAttributeAPI, loadTargetGroupAPI, sendEmailAPI } from 'APIs'
import { REQUEST, SUCCESS, FAILURE } from 'Stores'

import { LOAD_ATTRIBUTES, LOAD_GROUPS, LOAD_RECEIVER_EMAIL, LOAD_RECEIVER_EMAIL_SELECTED, SEND_EMAIL } from './constants'

export function* loadGroupsSaga() {
  try {
    const { data } = yield loadTargetGroupAPI()
    yield put({
      type: SUCCESS(LOAD_GROUPS),
      data
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_GROUPS),
      error
    })
  }
}

export function* loadAttributesSaga({ payload }) {
  try {
    const { data: dataAPI } = yield loadTargetAttributeAPI(payload)
    const { result: data } = dataAPI
    yield put({
      type: SUCCESS(LOAD_ATTRIBUTES),
      data
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ATTRIBUTES),
      error
    })
  }
}

export function* loadReceiverEmailSaga({ payload }) {
  const { params } = payload
  try {
    const { data } = yield getReceiverEmail({ params })
    const { result, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_RECEIVER_EMAIL),
      payload: {
        data: result,
        pagination,
        sort: payload?.params?.sort || {},
        filter: payload?.params?.filter || {}
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_RECEIVER_EMAIL),
      error
    })
  }
}

export function* loadReceiverEmailSelectedSaga({ payload }) {
  const { callback } = payload
  try {
    const { data, code } = yield getListUserSelectedAPI(payload)
    const { result, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_RECEIVER_EMAIL_SELECTED),
        payload: {
          data: result,
          pagination
        }
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_RECEIVER_EMAIL_SELECTED),
      error
    })
  }
}

export function* sendEmailSaga({ payload }) {
  const { data, history } = payload
  try {
    const { code } = yield sendEmailAPI({ data })
    if (code === 200) {
      yield put({
        type: SUCCESS(SEND_EMAIL)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      yield history.push('/contact-management/email-histories-management')
    }
  } catch (error) {
    yield put({
      type: FAILURE(SEND_EMAIL),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(LOAD_GROUPS), loadGroupsSaga)
  yield takeLatest(REQUEST(LOAD_ATTRIBUTES), loadAttributesSaga)
  yield takeLatest(REQUEST(LOAD_RECEIVER_EMAIL), loadReceiverEmailSaga)
  yield takeLatest(REQUEST(LOAD_RECEIVER_EMAIL_SELECTED), loadReceiverEmailSelectedSaga)
  yield takeLatest(REQUEST(SEND_EMAIL), sendEmailSaga)
}
