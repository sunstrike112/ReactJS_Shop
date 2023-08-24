/* eslint-disable no-console */

import {
  put, takeLatest
} from 'redux-saga/effects'
import {
  getLessonById,
  getCourseDetail,
  submitLessonById,
  getCourseDetailUnregistered,
  voteLikeUnit,
  countViewUnit,
  submitAndViewLessonAtOnce
} from '../../../apis'
import { LESSON_TYPE } from '../../../constants'
import {
  loadLessonByIdSuccess,
  loadCouresDetailSuccess,
  submitLessonByIdSuccess,
  loadCouresDetail,
  loadCouresDetailUnregisteredSuccess,
  repoLoadingError,
  voteLikeUnitSuccess,
  countViewUnitSuccess
} from './actions'

import {
  LOAD_LESSON_BY_ID,
  LOAD_COURSE_DETAIL,
  SUBMIT_LESSON_BY_ID,
  LOAD_COURSE_DETAIL_UNREGISRTERED,
  VOTE_LIKE_UNIT,
  COUNT_VIEW_UNIT
} from './constants'

export function* lessonByIdSaga({ payload }) {
  try {
    const { data } = yield getLessonById(payload)
    yield put(loadLessonByIdSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* submitLessonByIdSaga({ payload }) {
  const { isSubmitAndViewLessonAtOnce, callback } = payload
  try {
    yield isSubmitAndViewLessonAtOnce
      ? submitAndViewLessonAtOnce({ ...payload, typeUnit: LESSON_TYPE.LESSON })
      : submitLessonById(payload)
    yield put(submitLessonByIdSuccess())
    yield put(loadCouresDetail({
      userId: payload.userId,
      courseId: payload.courseId
    }))
    callback?.done()
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* courseDetailSaga({ payload }) {
  try {
    const { data } = yield getCourseDetail(payload)
    yield put(loadCouresDetailSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* courseDetailUnresiteredSaga({ payload }) {
  try {
    const { data } = yield getCourseDetailUnregistered(payload)
    yield put(loadCouresDetailUnregisteredSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* voteLikeUnitSaga({ payload }) {
  const { courseId, courseUnitId, typeUnit, item } = payload
  try {
    const { code, data } = yield voteLikeUnit(courseId, courseUnitId, typeUnit)
    if (code === 200) yield put(voteLikeUnitSuccess({ data, item }))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* countViewUnitSaga({ payload }) {
  const { courseId, lessonId, typeUnit, isVideo, callback } = payload
  try {
    const { code, data } = yield countViewUnit(courseId, lessonId, typeUnit, isVideo)
    if (code === 200) {
      yield put(countViewUnitSuccess(data))
    }
    callback?.done(data)
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export default function* courseSaga() {
  yield takeLatest(LOAD_LESSON_BY_ID, lessonByIdSaga)
  yield takeLatest(SUBMIT_LESSON_BY_ID, submitLessonByIdSaga)
  yield takeLatest(LOAD_COURSE_DETAIL, courseDetailSaga)
  yield takeLatest(LOAD_COURSE_DETAIL_UNREGISRTERED, courseDetailUnresiteredSaga)
  yield takeLatest(VOTE_LIKE_UNIT, voteLikeUnitSaga)
  yield takeLatest(COUNT_VIEW_UNIT, countViewUnitSaga)
}
