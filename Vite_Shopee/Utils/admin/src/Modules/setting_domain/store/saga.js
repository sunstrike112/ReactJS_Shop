import { put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'
import { getResultWithPaging } from 'Utils'
import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  addDomainAPI,
  deleteDomainAPI,
  loadDomainsAPI
} from 'APIs'
import { loadDomains } from './actions'

import {
  DELETE_DOMAIN,
  LOAD_DOMAINS,
  ADD_DOMAIN
} from './constants'

export function* loadDomainsSaga({ payload }) {
  try {
    const { data, code } = yield getResultWithPaging({
      action: loadDomainsAPI,
      payload
    })
    const { result: domains, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_DOMAINS),
        payload: {
          domains,
          pagination
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_DOMAINS),
      error
    })
  }
}

export function* addDomainSaga({ payload }) {
  const { callback } = payload
  try {
    const { code } = yield addDomainAPI(payload)
    if (code === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(ADD_DOMAIN)
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(ADD_DOMAIN),
      error
    })
  }
}

export function* deleteDomainSaga({ payload }) {
  const { data, pagination: { page, limit } } = payload
  try {
    const { code } = yield deleteDomainAPI({ data })
    if (code === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(DELETE_DOMAIN)
      })
      yield put(loadDomains({ params: { page, limit } }))
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_DOMAIN),
      error
    })
  }
}

export default function* settingDomainSaga() {
  yield takeLatest(REQUEST(LOAD_DOMAINS), loadDomainsSaga)
  yield takeLatest(REQUEST(ADD_DOMAIN), addDomainSaga)
  yield takeLatest(REQUEST(DELETE_DOMAIN), deleteDomainSaga)
}
