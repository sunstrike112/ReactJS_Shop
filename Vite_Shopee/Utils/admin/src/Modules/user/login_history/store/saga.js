import {
  put, takeEvery
} from 'redux-saga/effects'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  getLoginHistories
} from 'APIs'

import {
  LOGIN_HISTORY
} from './constants'

export function* loadLoginHistoriesSaga({ payload }) {
  try {
    const { data } = yield getLoginHistories(payload)
    const { result: histories, ...pagination } = data
    yield put({
      type: SUCCESS(LOGIN_HISTORY),
      payload: {
        histories,
        pagination,
        filter: payload?.params?.filter
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOGIN_HISTORY),
      error
    })
  }
}

export default function* loginHistorySaga() {
  yield takeEvery(REQUEST(LOGIN_HISTORY), loadLoginHistoriesSaga)
}
