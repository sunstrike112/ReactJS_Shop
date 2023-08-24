/* eslint-disable no-console */
import { put, takeLatest } from 'redux-saga/effects'
import {
  verifyPassword as verifyPasswordAPI,
  settingPassword as settingPasswordAPI
} from '../../../../apis'

import {
  verifyPasswordError,
  verifyPasswordSuccess,
  settingPasswordSuccess,
  settingPasswordError
} from './actions'

import { SETTING_PASSWORD, VERIFY_PASSWORD } from './constants'

export function* verifyPasswordSaga({ payload }) {
  try {
    const verifiedData = yield verifyPasswordAPI(payload)
    yield put(verifyPasswordSuccess(true, verifiedData.data))
  } catch (error) {
    yield put(verifyPasswordError(error))
  }
}

export function* settingPasswordSaga({ payload }) {
  try {
    yield settingPasswordAPI(payload)
    yield put(settingPasswordSuccess(true))
  } catch (error) {
    yield put(settingPasswordError(error))
  }
}

export default function* verifyPassword() {
  yield takeLatest(VERIFY_PASSWORD, verifyPasswordSaga)
  yield takeLatest(SETTING_PASSWORD, settingPasswordSaga)
}
