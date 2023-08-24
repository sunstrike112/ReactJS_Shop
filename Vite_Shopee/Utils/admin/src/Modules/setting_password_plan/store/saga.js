/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'
import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  addPasswordAPI,
  applyPlanZzAPI,
  changeStatusPlanZzAPI,
  deletePasswordAPI,
  getPasswordsAPI
} from 'APIs'

import { getResultWithPaging } from 'Utils'
import {
  ADD_PASSWORD,
  APPLY_PLAN_ZZ,
  CHANGE_STATUS_PLAN_ZZ,
  DELETE_PASSWORD,
  GET_PASSWORDS
} from './constants'
import { getPasswords } from './actions'

export function* getPassWordsSaga({ payload }) {
  try {
    const { data, code } = yield getResultWithPaging({ action: getPasswordsAPI, payload })
    const { result: passwordsPlan, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_PASSWORDS),
        payload: {
          passwordsPlan,
          pagination,
          filter: payload?.params?.filter || {}
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_PASSWORDS),
      error
    })
  }
}

export function* addPasswordSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield addPasswordAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(ADD_PASSWORD)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(ADD_PASSWORD),
      error
    })
  }
}

export function* deletePasswordSaga({ payload }) {
  const { callback, pagination: { page, limit }, filter } = payload
  try {
    const { code } = yield deletePasswordAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(DELETE_PASSWORD)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      yield put(getPasswords({ params: { page, limit, filter } }))
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_PASSWORD),
      error
    })
  }
}

export function* changeStatusPlanZZSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield changeStatusPlanZzAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(CHANGE_STATUS_PLAN_ZZ)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      callback()
    }
  } catch (error) {
    yield put({
      type: FAILURE(CHANGE_STATUS_PLAN_ZZ),
      error
    })
  }
}

export function* applyPlanZZSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield applyPlanZzAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(APPLY_PLAN_ZZ)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      callback()
    }
  } catch (error) {
    yield put({
      type: FAILURE(APPLY_PLAN_ZZ),
      error
    })
  }
}

export default function* settingPasswordPlanSaga() {
  yield takeLatest(REQUEST(GET_PASSWORDS), getPassWordsSaga)
  yield takeLatest(REQUEST(ADD_PASSWORD), addPasswordSaga)
  yield takeLatest(REQUEST(DELETE_PASSWORD), deletePasswordSaga)
  yield takeLatest(REQUEST(CHANGE_STATUS_PLAN_ZZ), changeStatusPlanZZSaga)
  yield takeLatest(REQUEST(APPLY_PLAN_ZZ), applyPlanZZSaga)
}
