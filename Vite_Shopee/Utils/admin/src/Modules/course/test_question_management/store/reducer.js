/* eslint-disable no-unused-vars */
import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  DELETE_TEST_QUESTIONS,
  LOAD_TEST_QUESTIONS, LOAD_TEST_QUESTION_DETAIL, LOAD_TEST_UNITS, RESET_QUESTIONS
} from './constants'

export const initialState = {
  isLoading: false,
  isLoadingTestUnits: false,
  isSubmitting: false,
  testUnits: [],
  testQuestions: [],
  testQuestionDetail: {},
  filter: {},
  pagination: {},
  error: null
}

function loadTestQuestions(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadTestQuestionsSuccess(state, { payload }) {
  const { testQuestions, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    testQuestions,
    pagination,
    filter
  })
}

function loadTestQuestionsFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function loadTestUnits(state) {
  return updateObject(state, {
    isLoadingTestUnits: true
  })
}

function loadTestUnitsSuccess(state, { testUnits }) {
  return updateObject(state, {
    isLoadingTestUnits: false,
    testUnits
  })
}

function loadTestUnitsFailure(state, { error }) {
  return updateObject(state, {
    isLoadingTestUnits: false,
    error
  })
}

function loadTestQuestionDetail(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadTestQuestionDetailSuccess(state, { testQuestionDetail }) {
  return updateObject(state, {
    isLoading: false,
    testQuestionDetail
  })
}

function loadTestQuestionDetailFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function deleteTestQuestions(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function deleteTestQuestionsSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    isSubmitting: true
  })
}

function deleteTestQuestionsFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function resetQuestions(state) {
  return updateObject(state, {
    testQuestions: [...initialState.testQuestions],
    filter: { ...initialState.filter },
    pagination: { ...initialState.pagination }
  })
}

// createLessonInitial
function resetState(state) {
  return updateObject(state, {
    isSubmitting: false,
    testQuestions: [],
    pagination: {},
    filter: {},
    testQuestionDetail: {}
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_TEST_QUESTIONS)]: loadTestQuestions,
  [SUCCESS(LOAD_TEST_QUESTIONS)]: loadTestQuestionsSuccess,
  [FAILURE(LOAD_TEST_QUESTIONS)]: loadTestQuestionsFailure,

  [REQUEST(LOAD_TEST_UNITS)]: loadTestUnits,
  [SUCCESS(LOAD_TEST_UNITS)]: loadTestUnitsSuccess,
  [FAILURE(LOAD_TEST_UNITS)]: loadTestUnitsFailure,

  [REQUEST(DELETE_TEST_QUESTIONS)]: deleteTestQuestions,
  [SUCCESS(DELETE_TEST_QUESTIONS)]: deleteTestQuestionsSuccess,
  [FAILURE(DELETE_TEST_QUESTIONS)]: deleteTestQuestionsFailure,

  [REQUEST(LOAD_TEST_QUESTION_DETAIL)]: loadTestQuestionDetail,
  [SUCCESS(LOAD_TEST_QUESTION_DETAIL)]: loadTestQuestionDetailSuccess,
  [FAILURE(LOAD_TEST_QUESTION_DETAIL)]: loadTestQuestionDetailFailure,

  [REQUEST(RESET_QUESTIONS)]: resetQuestions,

  [LOCATION_CHANGE]: resetState
})
