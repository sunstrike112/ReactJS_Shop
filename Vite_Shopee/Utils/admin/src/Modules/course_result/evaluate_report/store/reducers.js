import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  LOAD_REPORT_DETAIL, LOAD_REPORT_QUESTIONS
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  report: null,
  questions: []
}

function loadReportDetail(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadReportDetailSuccess(state, { payload }) {
  const { report } = payload
  return updateObject(state, {
    isLoading: false,
    report
  })
}

function loadReportDetailFail(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function loadReportQuestions(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadReportQuestionsSuccess(state, { payload }) {
  const { questions } = payload
  return updateObject(state, {
    isLoading: false,
    questions
  })
}

function loadReportQuestionsFail(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_REPORT_DETAIL)]: loadReportDetail,
  [SUCCESS(LOAD_REPORT_DETAIL)]: loadReportDetailSuccess,
  [FAILURE(LOAD_REPORT_DETAIL)]: loadReportDetailFail,
  [REQUEST(LOAD_REPORT_QUESTIONS)]: loadReportQuestions,
  [SUCCESS(LOAD_REPORT_QUESTIONS)]: loadReportQuestionsSuccess,
  [FAILURE(LOAD_REPORT_QUESTIONS)]: loadReportQuestionsFail
})
