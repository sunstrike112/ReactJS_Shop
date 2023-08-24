import {
  put, takeLatest
} from 'redux-saga/effects'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  getUserAttribute,
  getUserCourse,
  getUserGroup,
  getUnitListTest,
  getCourseStatus
} from 'APIs'

import {
  LOAD_COURSE_STATUS,
  LOAD_COURSE_LIST,
  LOAD_GROUP_LIST,
  LOAD_ATTRIBUTE_LIST,
  LOAD_UNIT_LIST,
  SAVE_FILTER
} from './constants'

export function* loadCourseStatusSaga({ payload }) {
  try {
    const { data } = yield getCourseStatus(payload.params)
    const { result: courses, ...pagination } = data
    yield put({
      type: SUCCESS(LOAD_COURSE_STATUS),
      payload: {
        courses,
        pagination,
        filter: payload?.params
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_COURSE_STATUS),
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

export function* loadUnitList() {
  try {
    const { data } = yield getUnitListTest()
    yield put({
      type: SUCCESS(LOAD_UNIT_LIST),
      data
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_UNIT_LIST),
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

export default function* coureStatusSaga() {
  yield takeLatest(REQUEST(LOAD_COURSE_STATUS), loadCourseStatusSaga)
  yield takeLatest(REQUEST(LOAD_COURSE_LIST), loadCourseList)
  yield takeLatest(REQUEST(LOAD_GROUP_LIST), loadGroupList)
  yield takeLatest(REQUEST(LOAD_UNIT_LIST), loadUnitList)
  yield takeLatest(REQUEST(LOAD_ATTRIBUTE_LIST), loadAttributeList)
  yield takeLatest(REQUEST(SAVE_FILTER), saveFilterSaga)
}
