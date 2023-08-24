import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject } from '../../../store'
import {
  LOAD_LIST_UNIT_QUESTION,
  LOAD_LIST_UNIT_QUESTION_SUCCESS,
  LOAD_REPOS_ERROR,

  LOAD_TEST_RESULT,
  LOAD_TEST_RESULT_SUCCESS,

  UPDATE_ANSWER_TESTING,

  SUBMIT_TEST,
  SUBMIT_TEST_SUCCESS
} from './constants'

const unitQuestionsInitial = {
  benchmark: 0,
  countLimit: 0,
  listQuestion: [],
  numberTimesStudied: 0,
  testId: 0,
  timeLimit: 0,
  testName: ''
}

export const initialState = {
  error: null,
  unitQuestions: {
    isLoading: false,
    data: unitQuestionsInitial,
    error: null,
    loadingSucess: false
  },
  testResult: {
    data: null,
    isLoading: false,
    error: null
  },
  unitAnswerTesting: [],
  submitTest: {
    isLoading: false,
    isSuccess: false,
    error: null
  }
}

function loadUnitQuestions(state) {
  return updateObject(state, {
    unitQuestions: {
      ...state.unitQuestions,
      isLoading: true,
      loadingSucess: false
    }
  })
}

function loadUnitQuestionsSuccess(state, { data, unitAnswerTesting }) {
  return updateObject(state, {
    unitQuestions: {
      isLoading: false,
      error: null,
      data: data || state.data,
      loadingSucess: true
    },
    unitAnswerTesting
  })
}

function loadTestResult(state) {
  return updateObject(state, {
    testResult: {
      ...state.testResult,
      isLoading: true,
      data: null
    }
  })
}

function loadTestResultSuccess(state, { data }) {
  return updateObject(state, {
    isLoading: true,
    testResult: {
      isLoading: false,
      error: null,
      data
    }
  })
}

function submitTest(state) {
  return updateObject(state, {
    submitTest: {
      ...state.submitTest,
      isLoading: true,
      isSuccess: false
    }
  })
}

function submitTestSuccess(state) {
  return updateObject(state, {
    isLoading: true,
    submitTest: {
      isLoading: false,
      error: null,
      isSuccess: true
    }
  })
}

function repoLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

export function updateAnswerTesting(state, { unitAnswerTesting }) {
  return updateObject(state, {
    unitAnswerTesting
  })
}

function resetState(state) {
  return updateObject(state, { ...initialState })
}

export default createReducer(initialState, {
  [LOAD_LIST_UNIT_QUESTION]: loadUnitQuestions,
  [LOAD_LIST_UNIT_QUESTION_SUCCESS]: loadUnitQuestionsSuccess,

  [LOAD_TEST_RESULT]: loadTestResult,
  [LOAD_TEST_RESULT_SUCCESS]: loadTestResultSuccess,

  [SUBMIT_TEST]: submitTest,
  [SUBMIT_TEST_SUCCESS]: submitTestSuccess,

  [UPDATE_ANSWER_TESTING]: updateAnswerTesting,

  [LOAD_REPOS_ERROR]: repoLoadingError,

  [LOCATION_CHANGE]: resetState
})
