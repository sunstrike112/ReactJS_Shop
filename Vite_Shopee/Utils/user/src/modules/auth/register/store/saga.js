/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import { put, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { notification } from 'antd'
import i18next from 'i18next'

import { registerEmail as registerEmailAPI, registerCompanyInfo, checkEmailCompanyExist } from '../../../../apis'

import {
  registerEmailError,
  registerEmailSuccess,
  checkEmailExistSuccess,
  checkEmailExistError,
  registerCompanySuccess,
  registerCompanyError
} from './actions'

import { REGISTER_COMPANY, REGISTER_EMAIL, CHECK_EMAIL_EXIST } from './constants'

export function* registerEmailSaga({ payload }) {
  try {
    yield registerEmailAPI(payload)
    yield put(registerEmailSuccess(true))
  } catch (error) {
    yield put(registerEmailError(error))
  }
}

export function* registerCompanySaga({ payload }) {
  const { statusExist, ...formData } = payload
  try {
    const dataAPI = yield registerCompanyInfo(formData)
    const { code } = dataAPI
    if (code === 200) {
      yield put(registerCompanySuccess())
      if (statusExist === 'EMAIL_NOT_EXIST') {
        yield put(push('/auth/register-success'))
      } else {
        notification.success({
          message: i18next.t('common.success'),
          description: i18next.t('common.message.create_success'),
          duration: 2
        })
        yield put(push('/auth/login'))
      }
    }
    if (code === 401) {
      yield put(registerCompanyError({ type: dataAPI.message }))
    }
  } catch (error) {
    yield put(registerCompanyError(error))
  }
}

export function* checkEmailExistSaga({ payload }) {
  try {
    const dataAPI = yield checkEmailCompanyExist(payload)
    const { data, code } = dataAPI
    if (code === 200) {
      yield put(checkEmailExistSuccess(data))
    }
    if (code === 401) {
      yield put(checkEmailExistError({
        type: dataAPI.message
      }))
    }
  } catch (error) {
    yield put(checkEmailExistError(error))
  }
}

export default function* registerSaga() {
  yield takeLatest(REGISTER_EMAIL, registerEmailSaga)
  yield takeLatest(REGISTER_COMPANY, registerCompanySaga)
  yield takeLatest(CHECK_EMAIL_EXIST, checkEmailExistSaga)
}
