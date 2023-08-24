import {
  put, takeLatest
} from 'redux-saga/effects'
import { getListPaymentHistory } from 'APIs'
import { REQUEST, SUCCESS, FAILURE } from 'Stores'

import { LOAD_LIST_PAYMENT } from './constants'

export function* loadPaymentHistoryListSaga({ payload }) {
  try {
    const { data } = yield getListPaymentHistory(payload)
    const { result: listPaymentHistory, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_LIST_PAYMENT),
      payload: {
        listPaymentHistory,
        pagination,
        filter: payload?.params?.filter
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_LIST_PAYMENT),
      error
    })
  }
}

export default function* listPaymentManagerSaga() {
  yield takeLatest(REQUEST(LOAD_LIST_PAYMENT), loadPaymentHistoryListSaga)
}
