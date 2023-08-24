import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  LOAD_STATISTIC_RESULTS_OF_SURVEY, LOAD_SURVEY_QUESTIONS, RESET_SURVEY_QUESTIONS
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  results: [],
  pagination: {
    limit: 100,
    page: 1,
    total: 0
  },
  filter: {},
  questions: {
    questions: [],
    error: null,
    pagination: {}
  },
  isSubmitting: false
}

function loadStatisticResultsOfSurvey(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadStatisticResultsOfSurveySuccess(state, { payload }) {
  const { results, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    results,
    pagination,
    filter
  })
}

function loadStatisticResultsOfSurveyFail(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function loadSurveyQuestion(state) {
  return updateObject(state, {
    questions: {
      ...state.questions,
      isLoading: true
    }
  })
}

function loadSurveyQuestionSuccess(state, { payload }) {
  const { questions, pagination } = payload
  return updateObject(state, {
    questions: {
      ...state.questions,
      isLoading: false,
      questions,
      pagination
    }
  })
}

function loadSurveyQuestionFail(state, { error }) {
  return updateObject(state, {
    questions: {
      ...state.questions,
      isLoading: false,
      error
    }
  })
}

function resetSurveyQuestion(state) {
  return updateObject(state, {
    questions: {
      ...initialState.questions
    }
  })
}

function resetState(state) {
  return updateObject(state, { ...initialState })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_STATISTIC_RESULTS_OF_SURVEY)]: loadStatisticResultsOfSurvey,
  [SUCCESS(LOAD_STATISTIC_RESULTS_OF_SURVEY)]: loadStatisticResultsOfSurveySuccess,
  [FAILURE(LOAD_STATISTIC_RESULTS_OF_SURVEY)]: loadStatisticResultsOfSurveyFail,
  [REQUEST(LOAD_SURVEY_QUESTIONS)]: loadSurveyQuestion,
  [SUCCESS(LOAD_SURVEY_QUESTIONS)]: loadSurveyQuestionSuccess,
  [FAILURE(LOAD_SURVEY_QUESTIONS)]: loadSurveyQuestionFail,
  [REQUEST(RESET_SURVEY_QUESTIONS)]: resetSurveyQuestion,
  [LOCATION_CHANGE]: resetState
})
