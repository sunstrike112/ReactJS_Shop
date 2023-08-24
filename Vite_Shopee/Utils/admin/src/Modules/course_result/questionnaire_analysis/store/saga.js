import { put, takeLatest } from 'redux-saga/effects'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  getUnitListAll,
  getUserCourse,
  loadAnalysisTestResultAPI,
  loadAnalysisTestChartAnswerAPI,
  loadAnalysisTestChartPointAPI,
  loadAnalysisTestDescriptionAPI,
  loadAnalysisTestVersionAPI,
  getVersionTestListAPI,

  loadAnalysisSurveyResultAPI,
  loadAnalysisSurveyChartAnswerAPI,
  loadAnalysisSurveyDescriptionAPI,
  loadAnalysisSurveyVersionAPI,
  getVersionSurveyListAPI
} from 'APIs'

import { getResultWithPaging } from 'Utils'
import {
  LOAD_ANALYSIS_TEST_RESULT,
  LOAD_ANALYSIS_TEST_CHART_ANSWER,
  LOAD_ANALYSIS_TEST_CHART_POINT,
  LOAD_ANALYSIS_TEST_DESCRIPTION,
  LOAD_ANALYSIS_TEST_VERSION,
  LOAD_VERSION_TEST_LIST,
  LOAD_ANALYSIS_SURVEY_RESULT,
  LOAD_ANALYSIS_SURVEY_CHART_ANSWER,
  LOAD_ANALYSIS_SURVEY_DESCRIPTION,
  LOAD_ANALYSIS_SURVEY_VERSION,
  LOAD_VERSION_SURVEY_LIST,
  SAVE_FILTER,
  LOAD_COURSE_LIST,
  LOAD_UNIT_LIST_ALL,
  RESET_ALL
} from './constants'

// -----------------------------------------------
// TEST
export function* loadAnalysisTestResultSaga({ payload }) {
  try {
    const { data } = yield loadAnalysisTestResultAPI(payload.params)
    const { result, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_ANALYSIS_TEST_RESULT),
      payload: {
        result,
        pagination,
        filter: payload?.params
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ANALYSIS_TEST_RESULT),
      error
    })
  }
}

export function* loadAnalysisTestChartAnswerSaga({ payload }) {
  try {
    const { data, code } = yield loadAnalysisTestChartAnswerAPI(payload.params)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_ANALYSIS_TEST_CHART_ANSWER),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ANALYSIS_TEST_CHART_ANSWER),
      error
    })
  }
}

export function* loadAnalysisTestChartPointSaga({ payload }) {
  try {
    const { data, code } = yield loadAnalysisTestChartPointAPI(payload.params)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_ANALYSIS_TEST_CHART_POINT),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ANALYSIS_TEST_CHART_POINT),
      error
    })
  }
}

export function* loadAnalysisTestDescriptionSaga({ payload }) {
  try {
    const { data } = yield getResultWithPaging({ action: loadAnalysisTestDescriptionAPI, payload })
    const { result, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_ANALYSIS_TEST_DESCRIPTION),
      payload: {
        result,
        pagination,
        filter: payload?.params
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ANALYSIS_TEST_DESCRIPTION),
      error
    })
  }
}

export function* loadAnalysisTestVersionSaga({ payload }) {
  try {
    const { data, code } = yield loadAnalysisTestVersionAPI(payload.params)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_ANALYSIS_TEST_VERSION),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ANALYSIS_TEST_VERSION),
      error
    })
  }
}

export function* loadVersionListTest({ payload }) {
  try {
    const { data, code } = yield getVersionTestListAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_VERSION_TEST_LIST),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_VERSION_TEST_LIST),
      error
    })
  }
}

// -----------------------------------------------
// SURVEY
export function* loadAnalysisSurveyResultSaga({ payload }) {
  try {
    const { data } = yield loadAnalysisSurveyResultAPI(payload.params)
    const { result, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_ANALYSIS_SURVEY_RESULT),
      payload: {
        result,
        pagination,
        filter: payload?.params
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ANALYSIS_SURVEY_RESULT),
      error
    })
  }
}

export function* loadAnalysisSurveyChartAnswerSaga({ payload }) {
  try {
    const { data, code } = yield loadAnalysisSurveyChartAnswerAPI(payload.params)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_ANALYSIS_SURVEY_CHART_ANSWER),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ANALYSIS_SURVEY_CHART_ANSWER),
      error
    })
  }
}

export function* loadAnalysisSurveyDescriptionSaga({ payload }) {
  try {
    const { data } = yield getResultWithPaging({ action: loadAnalysisSurveyDescriptionAPI, payload })
    const { result, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_ANALYSIS_SURVEY_DESCRIPTION),
      payload: {
        result,
        pagination,
        filter: payload?.params
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ANALYSIS_SURVEY_DESCRIPTION),
      error
    })
  }
}

export function* loadAnalysisSurveyVersionSaga({ payload }) {
  try {
    const { data, code } = yield loadAnalysisSurveyVersionAPI(payload.params)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_ANALYSIS_SURVEY_VERSION),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ANALYSIS_SURVEY_VERSION),
      error
    })
  }
}

export function* loadVersionListSurvey({ payload }) {
  try {
    const { data, code } = yield getVersionSurveyListAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_VERSION_SURVEY_LIST),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_VERSION_SURVEY_LIST),
      error
    })
  }
}

// -----------------------------------------------
// COMMON
export function* loadCourseList({ payload }) {
  try {
    const { data, code } = yield getUserCourse(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_COURSE_LIST),
        data: data.result
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_COURSE_LIST),
      error
    })
  }
}

export function* loadUnitListAll({ payload }) {
  try {
    const { data } = yield getUnitListAll(payload)
    yield put({
      type: SUCCESS(LOAD_UNIT_LIST_ALL),
      data
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_UNIT_LIST_ALL),
      error
    })
  }
}

export function* saveFilterSaga(filter) {
  try {
    yield put({
      type: SUCCESS(SAVE_FILTER),
      filter
    })
  } catch (error) {
    yield put({
      type: FAILURE(SAVE_FILTER),
      error
    })
  }
}

export function* resetAllSaga() {
  try {
    yield put({
      type: SUCCESS(RESET_ALL)
    })
  } catch (error) {
    yield put({
      type: FAILURE(RESET_ALL),
      error
    })
  }
}
export default function* questionAnalysisSaga() {
  yield takeLatest(REQUEST(LOAD_ANALYSIS_TEST_RESULT), loadAnalysisTestResultSaga)
  yield takeLatest(REQUEST(LOAD_ANALYSIS_TEST_CHART_ANSWER), loadAnalysisTestChartAnswerSaga)
  yield takeLatest(REQUEST(LOAD_ANALYSIS_TEST_CHART_POINT), loadAnalysisTestChartPointSaga)
  yield takeLatest(REQUEST(LOAD_ANALYSIS_TEST_DESCRIPTION), loadAnalysisTestDescriptionSaga)
  yield takeLatest(REQUEST(LOAD_ANALYSIS_TEST_VERSION), loadAnalysisTestVersionSaga)
  yield takeLatest(REQUEST(LOAD_VERSION_TEST_LIST), loadVersionListTest)

  yield takeLatest(REQUEST(LOAD_ANALYSIS_SURVEY_RESULT), loadAnalysisSurveyResultSaga)
  yield takeLatest(REQUEST(LOAD_ANALYSIS_SURVEY_CHART_ANSWER), loadAnalysisSurveyChartAnswerSaga)
  yield takeLatest(REQUEST(LOAD_ANALYSIS_SURVEY_DESCRIPTION), loadAnalysisSurveyDescriptionSaga)
  yield takeLatest(REQUEST(LOAD_ANALYSIS_SURVEY_VERSION), loadAnalysisSurveyVersionSaga)
  yield takeLatest(REQUEST(LOAD_VERSION_SURVEY_LIST), loadVersionListSurvey)

  yield takeLatest(REQUEST(LOAD_COURSE_LIST), loadCourseList)
  yield takeLatest(REQUEST(LOAD_UNIT_LIST_ALL), loadUnitListAll)

  yield takeLatest(REQUEST(SAVE_FILTER), saveFilterSaga)
  yield takeLatest(REQUEST(RESET_ALL), resetAllSaga)
}
