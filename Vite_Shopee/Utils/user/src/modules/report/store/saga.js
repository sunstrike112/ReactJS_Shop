/* eslint-disable no-console */

import {
  put, takeLatest
} from 'redux-saga/effects'
import { getReport, submitReport, countReport } from '../../../apis'
import {
  loadReportSuccess,
  submitReportSuccess,
  repoLoadingError
} from './actions'

import {
  LOAD_REPORT,
  SUBMIT_REPORT
} from './constants'

function* loadReport(payload) {
  const { data } = yield getReport(payload)
  const { listQuestion } = data
  const transformQuestionToAnswer = yield (listQuestion || []).map((question) => ({
    questionId: question.id,
    questionType: question.questionType,
    isRequired: question.isRequired,
    answerId: (question?.listAnswer || []).filter((answer) => answer.selectedAnswer === true).map((t) => t.answerId),
    selectedAnswer: question?.answerTextDescription || '',
    version: question.version,
    textDraft: question.textDraft
  }))

  return {
    transformQuestionToAnswer,
    data
  }
}

export function* getReportSaga({ payload }) {
  try {
    const { data, transformQuestionToAnswer } = yield loadReport(payload)
    yield countReport(payload)

    yield put(loadReportSuccess(data, transformQuestionToAnswer))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* submitReportSaga({ payload }) {
  try {
    yield submitReport(payload)
    yield put(submitReportSuccess(payload))
    const { data, transformQuestionToAnswer } = yield loadReport({
      userId: payload.userId,
      courseId: payload.courseId,
      reportId: payload.reportId
    })
    yield put(loadReportSuccess(data, transformQuestionToAnswer))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export default function* reportSaga() {
  yield takeLatest(LOAD_REPORT, getReportSaga)
  yield takeLatest(SUBMIT_REPORT, submitReportSaga)
}
