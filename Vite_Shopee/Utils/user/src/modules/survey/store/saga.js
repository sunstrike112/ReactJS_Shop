/* eslint-disable no-console */

import {
  put, takeLatest
} from 'redux-saga/effects'
import { getSurvey, getSurveyResult, submitSurvey, countSurvey } from '../../../apis'
import {
  loadSurveySuccess,
  loadSurverResultSuccess,
  submitSurveySuccess,
  updateAnswerSurvey,
  repoLoadingError,
  loadSurverResult
} from './actions'

import {
  LOAD_SURVEY,
  LOAD_SURVEY_RESULT,
  SUBMIT_SURVEY
} from './constants'

export function* getSurveySaga({ payload }) {
  try {
    const { data } = yield getSurvey(payload)
    yield countSurvey(payload)
    const { listQuestions } = data
    const transformQuestionToAnswer = yield (listQuestions || []).map((question) => ({
      questionId: question.id,
      questionType: question.questionType,
      isRequired: question.required,
      answerId: [],
      selectedAnswer: '',
      version: question.version
    }))
    yield put(loadSurveySuccess(data, transformQuestionToAnswer))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* surveyResultSaga({ payload }) {
  try {
    const { data } = yield getSurveyResult(payload)
    const { listQuestions } = data
    const transformQuestionToAnswer = yield (listQuestions || []).map((question) => ({
      questionId: question.id,
      questionType: question.questionType,
      isRequired: question.required,
      answerId: question.listAnswer.filter((item) => item.selectedAnswer).map((t) => t.answerId),
      selectedAnswer: question.answerText,
      version: question.version
    }))
    yield put(updateAnswerSurvey(transformQuestionToAnswer))
    yield put(loadSurverResultSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* submitSaga({ payload }) {
  try {
    yield submitSurvey(payload)
    yield put(submitSurveySuccess(true))
    yield put(loadSurverResult({
      userId: payload.userId,
      courseId: payload.courseId,
      surveyId: payload.surveyId
    }))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export default function* surveySaga() {
  yield takeLatest(LOAD_SURVEY, getSurveySaga)
  yield takeLatest(LOAD_SURVEY_RESULT, surveyResultSaga)
  yield takeLatest(SUBMIT_SURVEY, submitSaga)
}
