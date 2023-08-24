import {
  put, takeLatest
} from 'redux-saga/effects'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import { getReportDetail, getReportQuestions } from 'APIs'
import {
  LOAD_REPORT_DETAIL, LOAD_REPORT_QUESTIONS
} from './constants'

export function* loadReportDetailSaga({ payload }) {
  try {
    const { data } = yield getReportDetail({ params: payload })
    yield put({
      type: SUCCESS(LOAD_REPORT_DETAIL),
      payload: {
        report: data
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_REPORT_DETAIL),
      error
    })
  }
}

export function* loadReportQuestionsSaga({ payload }) {
  try {
    const { data } = yield getReportQuestions({ params: payload })
    const { result: questions } = data
    yield put({
      type: SUCCESS(LOAD_REPORT_QUESTIONS),
      payload: {
        questions
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_REPORT_QUESTIONS),
      error
    })
  }
}

export default function* reportDetailSaga() {
  yield takeLatest(REQUEST(LOAD_REPORT_DETAIL), loadReportDetailSaga)
  yield takeLatest(REQUEST(LOAD_REPORT_QUESTIONS), loadReportQuestionsSaga)
}
