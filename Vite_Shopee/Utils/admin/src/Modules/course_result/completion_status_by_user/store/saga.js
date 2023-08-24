import {
  put, takeLatest
} from 'redux-saga/effects'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  getUserAttribute,
  getUserCourse,
  getUserGroup,
  getUnitListTest,
  getUnitListSurvey,
  getUnitListLesson,
  getUnitListReport,
  getUnitListAll,
  getUnitStatus,
  getUnitDetail,
  getUnitDetailById,
  getVariable
} from 'APIs'

import {
  LOAD_UNIT_STATUS,
  LOAD_COURSE_LIST,
  LOAD_GROUP_LIST,
  LOAD_ATTRIBUTE_LIST,
  LOAD_UNIT_LIST_LESSON,
  LOAD_UNIT_LIST_REPORT,
  LOAD_UNIT_LIST_SURVEY,
  LOAD_UNIT_LIST_TEST,
  LOAD_UNIT_LIST_ALL,
  SAVE_FILTER,
  LOAD_UNIT_DETAIL,
  LOAD_UNIT_DETAIL_BY_ID,
  LOAD_DATE_TIME_HISTORY_VARIABLE
} from './constants'

export function* loadUnitStatusSaga({ payload }) {
  try {
    const { data } = yield getUnitStatus(payload.params)
    const { result: unit, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_UNIT_STATUS),
      payload: {
        unit,
        pagination,
        filter: payload?.params
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_UNIT_STATUS),
      error
    })
  }
}

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

export function* loadGroupList() {
  try {
    const { data } = yield getUserGroup()
    yield put({
      type: SUCCESS(LOAD_GROUP_LIST),
      data
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_GROUP_LIST),
      error
    })
  }
}

export function* loadUnitListLesson() {
  try {
    const { data } = yield getUnitListLesson()
    yield put({
      type: SUCCESS(LOAD_UNIT_LIST_LESSON),
      data
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_UNIT_LIST_LESSON),
      error
    })
  }
}

export function* loadUnitListTest() {
  try {
    const { data } = yield getUnitListTest()
    yield put({
      type: SUCCESS(LOAD_UNIT_LIST_TEST),
      data
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_UNIT_LIST_TEST),
      error
    })
  }
}

export function* loadUnitListSurvey() {
  try {
    const { data } = yield getUnitListSurvey()
    yield put({
      type: SUCCESS(LOAD_UNIT_LIST_SURVEY),
      data
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_UNIT_LIST_SURVEY),
      error
    })
  }
}

export function* loadUnitListReport() {
  try {
    const { data } = yield getUnitListReport()
    yield put({
      type: SUCCESS(LOAD_UNIT_LIST_REPORT),
      data
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_UNIT_LIST_REPORT),
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

export function* loadAttributeList() {
  try {
    const { data } = yield getUserAttribute()
    yield put({
      type: SUCCESS(LOAD_ATTRIBUTE_LIST),
      data: data.result
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_ATTRIBUTE_LIST),
      error
    })
  }
}

export function* saveFilterSaga({ payload }) {
  try {
    yield put({
      type: SUCCESS(SAVE_FILTER),
      payload: {
        filter: payload?.filter
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(SAVE_FILTER),
      error
    })
  }
}

export function* loadUnitDetailSaga({ payload }) {
  try {
    const { data } = yield getUnitDetail(payload.params)
    const { ...pagination } = data.historyViewUnits
    yield put({
      type: SUCCESS(LOAD_UNIT_DETAIL),
      payload: {
        unitDetail: data,
        pagination,
        filter: payload?.params
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_UNIT_DETAIL),
      error
    })
  }
}

export function* loadUnitDetailByIdSaga({ payload }) {
  try {
    const { data } = yield getUnitDetailById(payload.params)
    const { page, limit, total } = data
    yield put({
      type: SUCCESS(LOAD_UNIT_DETAIL_BY_ID),
      payload: {
        unitDetailById: data.result,
        paginationDetail: { page, limit, total },
        filter: payload?.params
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_UNIT_DETAIL_BY_ID),
      error
    })
  }
}

export function* loadDateTimeVariableSaga({ payload }) {
  try {
    const { data } = yield getVariable(payload)
    yield put({
      type: SUCCESS(LOAD_DATE_TIME_HISTORY_VARIABLE),
      payload: {
        dateVariable: data?.value
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_DATE_TIME_HISTORY_VARIABLE),
      error
    })
  }
}

export default function* coureStatusSaga() {
  yield takeLatest(REQUEST(LOAD_UNIT_STATUS), loadUnitStatusSaga)
  yield takeLatest(REQUEST(LOAD_COURSE_LIST), loadCourseList)
  yield takeLatest(REQUEST(LOAD_GROUP_LIST), loadGroupList)
  yield takeLatest(REQUEST(LOAD_UNIT_LIST_LESSON), loadUnitListLesson)
  yield takeLatest(REQUEST(LOAD_UNIT_LIST_TEST), loadUnitListTest)
  yield takeLatest(REQUEST(LOAD_UNIT_LIST_SURVEY), loadUnitListSurvey)
  yield takeLatest(REQUEST(LOAD_UNIT_LIST_REPORT), loadUnitListReport)
  yield takeLatest(REQUEST(LOAD_UNIT_LIST_ALL), loadUnitListAll)
  yield takeLatest(REQUEST(LOAD_ATTRIBUTE_LIST), loadAttributeList)
  yield takeLatest(REQUEST(SAVE_FILTER), saveFilterSaga)
  yield takeLatest(REQUEST(LOAD_UNIT_DETAIL), loadUnitDetailSaga)
  yield takeLatest(REQUEST(LOAD_UNIT_DETAIL_BY_ID), loadUnitDetailByIdSaga)
  yield takeLatest(REQUEST(LOAD_DATE_TIME_HISTORY_VARIABLE), loadDateTimeVariableSaga)
}
