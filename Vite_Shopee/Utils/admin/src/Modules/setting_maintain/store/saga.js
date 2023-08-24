/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects'
import { RoutesName } from 'Modules/course/routes'
import { notification } from 'antd'
import i18next from 'I18n'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  loadSettingMaintenanceStatus,
  updateSettingMaintenanceStatus
} from 'APIs'

import {
  LOAD_SETTING_MAINTENANCE_STATUS,
  UPDATE_SETTING_MAINTENANCE_STATUS
} from './constants'

export function* loadSettingMaintenanceStatusSaga() {
  try {
    const { code, data } = yield loadSettingMaintenanceStatus()
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_SETTING_MAINTENANCE_STATUS),
        payload: data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_SETTING_MAINTENANCE_STATUS),
      error
    })
  }
}

export function* updateSettingMaintenanceStatusSaga({ payload }) {
  try {
    const { code } = yield updateSettingMaintenanceStatus(payload)
    if (code === 200) {
      yield put({
        type: REQUEST(LOAD_SETTING_MAINTENANCE_STATUS)
      })
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(UPDATE_SETTING_MAINTENANCE_STATUS)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_SETTING_MAINTENANCE_STATUS),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(LOAD_SETTING_MAINTENANCE_STATUS), loadSettingMaintenanceStatusSaga)
  yield takeLatest(REQUEST(UPDATE_SETTING_MAINTENANCE_STATUS), updateSettingMaintenanceStatusSaga)
}
