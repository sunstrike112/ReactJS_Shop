import {
  LOAD_REPORT,
  LOAD_REPORT_SUCCESS,
  LOAD_REPOS_ERROR,

  UPDATE_ANSWER_REPORT,

  SUBMIT_REPORT,
  SUBMIT_REPORT_SUCCESS
} from './constants'

export function loadReport(payload) {
  return {
    type: LOAD_REPORT,
    payload
  }
}

export function loadReportSuccess(data, reportAnswers) {
  return {
    type: LOAD_REPORT_SUCCESS,
    data,
    reportAnswers
  }
}

export function submitReport(payload) {
  return {
    type: SUBMIT_REPORT,
    payload
  }
}

export function submitReportSuccess(payload) {
  return {
    type: SUBMIT_REPORT_SUCCESS,
    payload
  }
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error
  }
}

export function updateAnswerReport(reportAnswers) {
  return {
    type: UPDATE_ANSWER_REPORT,
    reportAnswers
  }
}
