import { put, takeLatest } from 'redux-saga/effects'

import {
  getListReportAPI,
  getReportDetailAPI,
  searchCommentsDailyReportAPI
} from 'APIs'
import { FAILURE, REQUEST, SUCCESS } from 'Stores'
import {
  GET_LIST_REPORT,
  GET_REPORT_DETAIL,
  LOAD_COMMENTS_DAILY_REPORT
} from './constants'

export function* getListReportSaga({ payload }) {
  try {
    const { code, data } = yield getListReportAPI(payload)
    const { data: result, page, pages, total, limit } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_LIST_REPORT),
        payload: {
          result,
          pagination: { page, pages, total, limit },
          filter: payload
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_LIST_REPORT),
      error
    })
  }
}

export function* getReportDetailSaga({ payload }) {
  try {
    const { code, data } = yield getReportDetailAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(GET_REPORT_DETAIL),
        payload: data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_REPORT_DETAIL),
      error
    })
  }
}

export function* loadCommentsDailyReportSaga({ payload }) {
  try {
    const { code, data: { page, limit, pages, total, result } } = yield searchCommentsDailyReportAPI(payload.data)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_COMMENTS_DAILY_REPORT),
        data: result,
        pagination: { page, limit, pages, total },
        filter: payload.data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_COMMENTS_DAILY_REPORT),
      error
    })
  }
}

export default function* workspaceSaga() {
  yield takeLatest(REQUEST(GET_LIST_REPORT), getListReportSaga)
  yield takeLatest(REQUEST(GET_REPORT_DETAIL), getReportDetailSaga)
  yield takeLatest(REQUEST(LOAD_COMMENTS_DAILY_REPORT), loadCommentsDailyReportSaga)
}
