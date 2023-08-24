/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects'
import { RoutesName } from 'Modules/course/routes'
import { notification } from 'antd'
import i18next from 'I18n'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  deleteTestQuestionsAPI,
  loadTestQuestionDetailAPI,
  loadTestQuestionsAPI,
  loadTestUnitsAPI
} from 'APIs'

import {
  DELETE_TEST_QUESTIONS,
  LOAD_TEST_QUESTIONS,
  LOAD_TEST_QUESTION_DETAIL,
  LOAD_TEST_UNITS
} from './constants'
import { loadTestQuestions } from './actions'

export function* loadTestUnitsSaga({ payload }) {
  try {
    const { code, data: testUnits } = yield loadTestUnitsAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_TEST_UNITS),
        testUnits
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_TEST_UNITS),
      error
    })
  }
}

export function* loadTestQuestionsSaga({ payload }) {
  try {
    const { code, data } = yield loadTestQuestionsAPI(payload)
    const { result: testQuestions, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_TEST_QUESTIONS),
        payload: {
          testQuestions,
          pagination,
          filter: payload?.params?.filter
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_TEST_QUESTIONS),
      error
    })
  }
}

export function* loadTestQuestionDetailSaga({ payload }) {
  try {
    const { code, data: testQuestionDetail } = yield loadTestQuestionDetailAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_TEST_QUESTION_DETAIL),
        testQuestionDetail
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_TEST_QUESTION_DETAIL),
      error
    })
  }
}

export function* deleteTestQuestionsSaga({ payload }) {
  try {
    const { params, data } = payload
    const { code } = yield deleteTestQuestionsAPI({ data })
    if (code === 200) {
      yield put(loadTestQuestions({ params }))
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(DELETE_TEST_QUESTIONS)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_TEST_QUESTIONS),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(LOAD_TEST_UNITS), loadTestUnitsSaga)
  yield takeLatest(REQUEST(LOAD_TEST_QUESTIONS), loadTestQuestionsSaga)
  yield takeLatest(REQUEST(LOAD_TEST_QUESTION_DETAIL), loadTestQuestionDetailSaga)
  yield takeLatest(REQUEST(DELETE_TEST_QUESTIONS), deleteTestQuestionsSaga)
}
