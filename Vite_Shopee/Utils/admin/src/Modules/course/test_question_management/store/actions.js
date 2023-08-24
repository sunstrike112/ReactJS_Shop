import { REQUEST } from 'Stores'
import {
  DELETE_TEST_QUESTIONS,
  LOAD_TEST_QUESTIONS,
  LOAD_TEST_QUESTION_DETAIL,
  LOAD_TEST_UNITS,
  RESET_QUESTIONS
} from './constants'

export function loadTestUnits(payload) {
  return {
    type: REQUEST(LOAD_TEST_UNITS),
    payload
  }
}

export function loadTestQuestions(payload) {
  return {
    type: REQUEST(LOAD_TEST_QUESTIONS),
    payload
  }
}

export function loadTestQuestionDetail(payload) {
  return {
    type: REQUEST(LOAD_TEST_QUESTION_DETAIL),
    payload
  }
}

export function deleteTestQuestions(payload) {
  return {
    type: REQUEST(DELETE_TEST_QUESTIONS),
    payload
  }
}

export function resetQuestions() {
  return {
    type: REQUEST(RESET_QUESTIONS)
  }
}
