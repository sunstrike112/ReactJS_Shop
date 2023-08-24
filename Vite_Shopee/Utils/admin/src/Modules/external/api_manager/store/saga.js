import i18next from 'I18n'
import { notification } from 'antd'
import { put, takeLatest } from 'redux-saga/effects'

import { FAILURE, REQUEST, SUCCESS } from 'Stores'

import { addExternalApiManager, deleteExternalApiManager, getExternalApis, getExternalApisManager } from 'APIs'
import { DEFAULT_PAG, getResultWithPaging } from 'Utils'
import {
  ADD_API_MANAGER,
  DELETE_API_MANAGER,
  GET_APIS,
  GET_APIS_MANAGER
} from './constants'

export function* getExternalApisManagerSaga({ payload }) {
  try {
    const { code, data } = yield getResultWithPaging({ action: getExternalApisManager, payload })
    const { result: apisManager, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_APIS_MANAGER),
        payload: {
          apisManager,
          pagination
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_APIS_MANAGER),
      error
    })
  }
}

export function* getExternalApisSaga({ payload }) {
  try {
    const { code, data } = yield getResultWithPaging({ action: getExternalApis, payload })
    const { result: apis } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_APIS),
        payload: { apis }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_APIS),
      error
    })
  }
}

export function* addExternalApiManagerSaga({ payload }) {
  const { data, isEdit, resolved } = payload
  try {
    const { code } = yield addExternalApiManager({ data })
    if (code === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t(isEdit ? 'common:message.update_success' : 'common:message.create_success'),
        duration: 2
      })
      yield put({ type: SUCCESS(ADD_API_MANAGER) })
      yield put({
        type: REQUEST(GET_APIS_MANAGER),
        payload: { params: DEFAULT_PAG }
      })
      resolved()
    }
  } catch (error) {
    yield put({
      type: FAILURE(ADD_API_MANAGER),
      error
    })
  }
}

export function* deleteExternalApiManagerSaga({ payload }) {
  const { pagination: { page, limit }, data } = payload
  try {
    const { code } = yield deleteExternalApiManager({ data })
    if (code === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(DELETE_API_MANAGER)
      })
      yield put({
        type: REQUEST(GET_APIS_MANAGER),
        payload: { params: { page, limit } }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_API_MANAGER),
      error
    })
  }
}

export default function* externalApiManagerSaga() {
  yield takeLatest(REQUEST(GET_APIS_MANAGER), getExternalApisManagerSaga)
  yield takeLatest(REQUEST(GET_APIS), getExternalApisSaga)
  yield takeLatest(REQUEST(ADD_API_MANAGER), addExternalApiManagerSaga)
  yield takeLatest(REQUEST(DELETE_API_MANAGER), deleteExternalApiManagerSaga)
}
