import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject } from '../../../store'
import {
  LOAD_SURVEY,
  LOAD_SURVEY_SUCCESS,
  LOAD_REPOS_ERROR,

  LOAD_SURVEY_RESULT,
  LOAD_SURVEY_RESULT_SUCCESS,

  UPDATE_ANSWER_SURVEY,

  SUBMIT_SURVEY,
  SUBMIT_SURVEY_SUCCESS
} from './constants'

const surveyInitial = {
  numberOfQuestions: 0,
  listQuestions: [],
  surveyDetail: '',
  surveyId: 0,
  surveyName: ''
}

export const initialState = {
  error: null,
  survey: {
    isLoading: false,
    data: surveyInitial,
    error: null,
    isLoadSurveyDone: false
  },
  surveyResult: {
    data: null,
    isLoading: false,
    error: null
  },
  surveyAnswers: [],
  submitSurvey: {
    isLoading: false,
    isSuccess: false,
    error: null
  },
  isLoadingBothTestAndResult: false
}

function loadSurvey(state) {
  return updateObject(state, {
    survey: {
      ...state.survey,
      isLoading: true,
      isLoadSurveyDone: false
    },
    isLoadingBothTestAndResult: true
  })
}

function loadSurveySuccess(state, { data, surveyAnswers }) {
  return updateObject(state, {
    survey: {
      isLoading: false,
      error: null,
      data: data || state.data,
      isLoadSurveyDone: true
    },
    surveyAnswers
  })
}

function loadSurverResult(state) {
  return updateObject(state, {
    surveyResult: {
      ...state.surveyResult,
      isLoading: true
    }
  })
}

function loadSurverResultSuccess(state, { data }) {
  return updateObject(state, {
    isLoading: true,
    isLoadingBothTestAndResult: false,
    surveyResult: {
      isLoading: false,
      error: null,
      data
    }
  })
}

function submitSurvey(state) {
  return updateObject(state, {
    submitSurvey: {
      ...state.submitSurvey,
      isLoading: true,
      isSuccess: false
    }
  })
}

function submitSurveySuccess(state, { isSuccess }) {
  return updateObject(state, {
    submitSurvey: {
      isLoading: false,
      error: null,
      isSuccess
    }
  })
}

function repoLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false,
    isLoadingBothTestAndResult: false
  })
}

export function updateAnswerSurvey(state, { surveyAnswers }) {
  return updateObject(state, {
    surveyAnswers
  })
}

function resetState(state) {
  return updateObject(state, initialState)
}

export default createReducer(initialState, {
  [LOAD_SURVEY]: loadSurvey,
  [LOAD_SURVEY_SUCCESS]: loadSurveySuccess,

  [LOAD_SURVEY_RESULT]: loadSurverResult,
  [LOAD_SURVEY_RESULT_SUCCESS]: loadSurverResultSuccess,

  [SUBMIT_SURVEY]: submitSurvey,
  [SUBMIT_SURVEY_SUCCESS]: submitSurveySuccess,

  [UPDATE_ANSWER_SURVEY]: updateAnswerSurvey,

  [LOAD_REPOS_ERROR]: repoLoadingError,

  [LOCATION_CHANGE]: resetState
})
