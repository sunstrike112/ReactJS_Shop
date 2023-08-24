import {
  put, takeLatest
} from 'redux-saga/effects'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import { getReportHistories } from 'APIs'
import { getResultWithPaging } from 'Utils'
import {
  LOAD_REPORT_RESULT
} from './constants'

export function* loadReportResultsSaga({ payload }) {
  try {
    const { data } = yield getResultWithPaging({
      action: getReportHistories,
      payload
    })
    const { result: results, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_REPORT_RESULT),
      payload: {
        results,
        pagination,
        filter: payload?.params
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_REPORT_RESULT),
      error
    })
  }
}

export default function* coureStatusSaga() {
  yield takeLatest(REQUEST(LOAD_REPORT_RESULT), loadReportResultsSaga)
}
