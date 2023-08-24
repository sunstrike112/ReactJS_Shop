/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  addDomainAPI,
  getEmailServerAPI,
  updateEmailServerAPI
} from 'APIs'

import {
  ADD_DOMAIN,
  GET_EMAIL_SERVER,
  UPDATE_EMAIL_SERVER
} from './constants'

export function* getEmailServerSaga({ payload }) {
  const { handleHideEdit } = payload
  try {
    const { code, data } = yield getEmailServerAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_EMAIL_SERVER),
        data
      })

      if (handleHideEdit) {
        handleHideEdit()
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_EMAIL_SERVER),
      error
    })
  }
}

export function* updateEmailServerSaga({ payload }) {
  const { handleHideEdit, companyId } = payload
  try {
    const { code } = yield updateEmailServerAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_EMAIL_SERVER)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })

      yield put({
        type: REQUEST(GET_EMAIL_SERVER),
        payload: { companyId, handleHideEdit }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_EMAIL_SERVER),
      error
    })
  }
}

export default function* settingDomainSaga() {
  yield takeLatest(REQUEST(GET_EMAIL_SERVER), getEmailServerSaga)
  yield takeLatest(REQUEST(UPDATE_EMAIL_SERVER), updateEmailServerSaga)
}
