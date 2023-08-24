/* eslint-disable no-console */

import {
  put, takeLatest
} from 'redux-saga/effects'
import { getUnitQuestions, getTestResult, submitTest, countTestUnit } from '../../../apis'
import {
  loadUnitQuestionsSuccess,
  loadTestResultSuccess,
  submitTestSuccess,
  repoLoadingError
} from './actions'

import {
  LOAD_LIST_UNIT_QUESTION,
  LOAD_TEST_RESULT,
  SUBMIT_TEST
} from './constants'

export function* unitQuestionSaga({ payload }) {
  try {
    const { data } = yield getUnitQuestions(payload)
    yield countTestUnit(payload)
    const { listQuestion } = data
    const transformQuestionToAnswer = (listQuestion || []).map((question) => ({
      questionId: question.id,
      questionType: question.questionType,
      isRequired: question.isRequired,
      answerId: [],
      selectedAnswer: '',
      version: question.version
    }))
    yield put(loadUnitQuestionsSuccess(data, transformQuestionToAnswer))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* testResultSaga({ payload }) {
  try {
    const { data } = yield getTestResult(payload)
    if (data) {
      const { listQuestion } = data
      yield put(loadTestResultSuccess({
        ...data,
        listQuestion: listQuestion.map((item, index) => ({ ...item, numberIndex: index }))
      }))
    }
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* submitTestSaga({ payload }) {
  try {
    yield submitTest(payload)
    yield put(submitTestSuccess())
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export default function* unitTestSaga() {
  yield takeLatest(LOAD_LIST_UNIT_QUESTION, unitQuestionSaga)
  yield takeLatest(LOAD_TEST_RESULT, testResultSaga)
  yield takeLatest(SUBMIT_TEST, submitTestSaga)
}
