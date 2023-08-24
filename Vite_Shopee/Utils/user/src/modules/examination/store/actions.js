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

export function loadUnitQuestions(payload) {
  return {
    type: LOAD_LIST_UNIT_QUESTION,
    payload
  }
}

export function loadUnitQuestionsSuccess(data, unitAnswerTesting) {
  return {
    type: LOAD_LIST_UNIT_QUESTION_SUCCESS,
    data,
    unitAnswerTesting
  }
}

export function loadTestResult(payload) {
  return {
    type: LOAD_TEST_RESULT,
    payload
  }
}

export function submitTest(payload) {
  return {
    type: SUBMIT_TEST,
    payload
  }
}

export function submitTestSuccess() {
  return {
    type: SUBMIT_TEST_SUCCESS
  }
}

export function loadTestResultSuccess(data) {
  return {
    type: LOAD_TEST_RESULT_SUCCESS,
    data
  }
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error
  }
}

export function updateAnswerTesting(unitAnswerTesting) {
  return {
    type: UPDATE_ANSWER_TESTING,
    unitAnswerTesting
  }
}
