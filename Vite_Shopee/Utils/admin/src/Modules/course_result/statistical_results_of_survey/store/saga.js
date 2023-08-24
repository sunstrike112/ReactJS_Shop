import {
  put, takeLatest
} from 'redux-saga/effects'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import { getResultOfSurvey, getSurveyQuestion } from 'APIs'
import { getResultWithPaging } from 'Utils'
import {
  LOAD_STATISTIC_RESULTS_OF_SURVEY, LOAD_SURVEY_QUESTIONS
} from './constants'

export function* loadStatisticResultsOfSurveySaga({ payload }) {
  try {
    const { data } = yield getResultOfSurvey(payload.params)
    const { result: results, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_STATISTIC_RESULTS_OF_SURVEY),
      payload: {
        results,
        pagination: {
          ...pagination,
          limit: payload?.params?.limit
        },
        filter: payload?.params?.filter
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_STATISTIC_RESULTS_OF_SURVEY),
      error
    })
  }
}

export function* loadSurveyQuestionsSaga({ payload }) {
  try {
    const { data } = yield getResultWithPaging({
      action: getSurveyQuestion,
      payload,
      condition: (res) => res.pageQuestion.result.length
    })
    const { result: questions, ...pagination } = data.pageQuestion
    yield put({
      type: SUCCESS(LOAD_SURVEY_QUESTIONS),
      payload: {
        questions,
        pagination
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_SURVEY_QUESTIONS),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(LOAD_STATISTIC_RESULTS_OF_SURVEY), loadStatisticResultsOfSurveySaga)
  yield takeLatest(REQUEST(LOAD_SURVEY_QUESTIONS), loadSurveyQuestionsSaga)
}
