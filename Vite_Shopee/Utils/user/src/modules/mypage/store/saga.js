import {
  put, takeEvery, takeLatest
} from 'redux-saga/effects'
import {
  changeOrderCourseApi,
  getCourseBookMarkedApi,
  getCourseCostIndividual,
  getCourseRequiredCompany,
  getCourseStudyingIndividual,
  hiddenCourseAPI,
  voteLikeCourse
} from '../../../apis'
import {
  loadCourseCostsIndividualSuccess,
  loadCourseProgressSuccess,
  loadCourseRequiredCompanySuccess,
  loadCourseStudyingCompanySuccess,
  loadCourseStudyingIndividualSuccess,
  loadCourseStudyingNissokenSuccess,
  repoLoadingError,
  voteLikeCourseSuccess
} from './actions'

import {
  HIDE_COURSE,
  LOAD_COSTS_INDIVIDUAL,
  LOAD_COURSE_PROGRESS,
  LOAD_REQUIRED_COMPANY,
  LOAD_STUDYING_COMPANY,
  LOAD_STUDYING_INDIVIDUAL,
  LOAD_STUDYING_NISSOKEN,
  UPDATE_ORDER_COURSES,
  VOTE_LIKE_COURSE
} from './constants'
import { REQUEST, SUCCESS } from '../../../store'
import { getResultWithPaging } from '../../../utils'

export function* loadCourseStudyingIndividualSaga({ params }) {
  try {
    const { data } = yield getCourseStudyingIndividual(params)
    yield put(loadCourseStudyingIndividualSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadCourseStudyingCompanySaga({ payload }) {
  const { courseSearch } = payload
  try {
    const { data } = yield getResultWithPaging({
      action: getCourseBookMarkedApi,
      payload,
      condition: (res) => res.myPageCourseCompanyStudying.pageCourse.result.length
    })
    yield put(loadCourseStudyingCompanySuccess({ data, savedFilter: { courseSearch } }))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadCourseStudyingNissokenSaga({ payload }) {
  const { courseSearch } = payload
  try {
    const { data } = yield getResultWithPaging({
      action: getCourseBookMarkedApi,
      payload,
      condition: (res) => res.myPageCourseCompanyStudying.pageCourse.result.length
    })
    yield put(loadCourseStudyingNissokenSuccess({ data, savedFilter: { courseSearch } }))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadCourseCostsCompanySaga({ params }) {
  try {
    const { data } = yield getCourseCostIndividual(params)
    yield put(loadCourseCostsIndividualSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadCourseProgressSaga({ payload }) {
  try {
    const { data } = yield getCourseRequiredCompany(payload)
    yield put(loadCourseProgressSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadCourseRequiredCompanySaga({ payload }) {
  const { courseSearch } = payload
  try {
    const { data } = yield getResultWithPaging({
      action: getCourseRequiredCompany,
      payload,
      condition: (res) => res.myPageCourseCompanyRequired.pageCourse.result.length
    })
    yield put(loadCourseRequiredCompanySuccess({ data, savedFilter: { courseSearch } }))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* hideCourseSaga({ payload }) {
  try {
    yield hiddenCourseAPI(payload.courseId)
    delete payload.courseId
    if (payload.isCompanyCourse) yield loadCourseStudyingCompanySaga({ payload })
    else yield loadCourseStudyingNissokenSaga({ payload })
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* voteLikeCourseSaga({ payload }) {
  try {
    const { code, data } = yield voteLikeCourse(payload.courseId)
    if (code === 200) {
      yield put(voteLikeCourseSuccess({ data, ...payload }))
    }
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* updateOrderCoursesSaga({ payload }) {
  const { courseId, params, newItems, tab } = payload
  try {
    const { data } = yield changeOrderCourseApi({ courseId, params })

    const newCourses = [...newItems]
    const idOfCourseToUpdate = newCourses.findIndex((course) => course.courseId === courseId)
    newCourses[idOfCourseToUpdate].userCourseOffset = data

    yield put({
      type: SUCCESS(UPDATE_ORDER_COURSES),
      data: { newCourses, tab }
    })
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export default function* myPageSaga() {
  yield takeEvery(LOAD_STUDYING_INDIVIDUAL, loadCourseStudyingIndividualSaga)
  yield takeLatest(LOAD_STUDYING_COMPANY, loadCourseStudyingCompanySaga)
  yield takeLatest(LOAD_STUDYING_NISSOKEN, loadCourseStudyingNissokenSaga)
  yield takeEvery(LOAD_COSTS_INDIVIDUAL, loadCourseCostsCompanySaga)
  yield takeLatest(LOAD_REQUIRED_COMPANY, loadCourseRequiredCompanySaga)
  yield takeLatest(LOAD_COURSE_PROGRESS, loadCourseProgressSaga)
  yield takeLatest(HIDE_COURSE, hideCourseSaga)
  yield takeLatest(VOTE_LIKE_COURSE, voteLikeCourseSaga)
  yield takeLatest(REQUEST(UPDATE_ORDER_COURSES), updateOrderCoursesSaga)
}
