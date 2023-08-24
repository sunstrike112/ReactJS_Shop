import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject } from '../../../store'
import {
  LOAD_REPORT,
  LOAD_REPORT_SUCCESS,
  LOAD_REPOS_ERROR,

  UPDATE_ANSWER_REPORT,

  SUBMIT_REPORT,
  SUBMIT_REPORT_SUCCESS
} from './constants'

const reportInitial = {
  dateSubmit: 0,
  feedback: '',
  fileAttachOverview: '',
  fileAttachOverviewFirst: '',
  fileAttachOverviewFour: '',
  fileAttachOverviewSecond: '',
  fileAttachOverviewThree: '',
  id: 0,
  imageOverview: '',
  listQuestion: [],
  nameReport: '',
  numberQuestion: 0,
  overview: '',
  status: '',
  textDraft: ''
}

export const initialState = {
  error: null,
  report: {
    isLoading: false,
    data: reportInitial,
    error: null,
    isLoadReportSuccess: false
  },
  reportAnswers: [],
  submitReport: {
    isLoading: false,
    isSuccess: false,
    isDraftSuccess: false,
    error: null,
    textDraft: null
  }
}

function loadReport(state) {
  return updateObject(state, {
    report: {
      ...state.report,
      isLoading: true,
      isLoadReportSuccess: false
    }
  })
}

function loadReportSuccess(state, { data, reportAnswers }) {
  return updateObject(state, {
    report: {
      isLoading: false,
      error: null,
      data: data || state.data,
      isLoadReportSuccess: true
    },
    reportAnswers
  })
}

function submitSurvey(state) {
  return updateObject(state, {
    submitReport: {
      ...state.submitReport,
      isLoading: true,
      isSuccess: false,
      isDraftSuccess: false
    }
  })
}

function submitSurveySuccess(state, { payload }) {
  return updateObject(state, {
    submitReport: {
      isLoading: false,
      error: null,
      isSuccess: !payload.isDraft,
      isDraftSuccess: payload.isDraft
    }
  })
}

function repoLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

export function updateAnswerSurvey(state, { reportAnswers }) {
  return updateObject(state, {
    reportAnswers
  })
}

function resetState(state) {
  return updateObject(state, initialState)
}

export default createReducer(initialState, {
  [LOAD_REPORT]: loadReport,
  [LOAD_REPORT_SUCCESS]: loadReportSuccess,

  [SUBMIT_REPORT]: submitSurvey,
  [SUBMIT_REPORT_SUCCESS]: submitSurveySuccess,

  [UPDATE_ANSWER_REPORT]: updateAnswerSurvey,

  [LOAD_REPOS_ERROR]: repoLoadingError,

  [LOCATION_CHANGE]: resetState
})
