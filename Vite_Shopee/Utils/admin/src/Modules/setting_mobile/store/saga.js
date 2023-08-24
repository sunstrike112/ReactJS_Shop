import { put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  getSettingMobileDetailApi,
  updateSettingMobileApi
} from 'APIs'

import {
  GET_DETAIL,
  UPDATE
} from './constants'

export function* getSettingMobileDetailSaga() {
  try {
    const { code, data } = yield getSettingMobileDetailApi()
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_DETAIL),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_DETAIL),
      error
    })
  }
}

export function* updateSettingMobileDetailSaga({ payload }) {
  try {
    const { code, data } = yield updateSettingMobileApi(payload.data)
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE),
        data
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(GET_DETAIL), getSettingMobileDetailSaga)
  yield takeLatest(REQUEST(UPDATE), updateSettingMobileDetailSaga)
}
