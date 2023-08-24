/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects'
import { RoutesName } from 'Modules/course/routes'
import { notification } from 'antd'
import i18next from 'I18n'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  createAssignmentAPI,
  deleteCourseAssignmentAPI,
  loadAutomaticAssignmentAPI,
  loadCourseAssignmentAPI,
  loadCourseCategoryAPI,
  loadDetailAssignmentAPI,
  loadTargetAttributeAPI,
  loadTargetGroupAPI,
  updateAssignmentAPI
} from 'APIs'

import {
  CREATE_ASSIGNMENT,
  DELETE_COURSE_ASSIGNMENT,
  LOAD_AUTOMATIC_ASSIGNMENT,
  LOAD_COURSE_ASSIGNMENT,
  LOAD_COURSE_CATEGORY,
  LOAD_DETAIL_ASSIGNMENT,
  LOAD_TARGET_ATTRIBUTE,
  LOAD_TARGET_GROUP,
  UPDATE_ASSIGNMENT
} from './constants'
import { loadAutomaticAssignment } from './actions'

export function* loadAutomaticAssignmentSaga({ payload }) {
  try {
    const { code, data } = yield loadAutomaticAssignmentAPI(payload)
    const { result: autoAssignment, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_AUTOMATIC_ASSIGNMENT),
        payload: {
          autoAssignment,
          pagination,
          filter: payload?.params?.filter
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_AUTOMATIC_ASSIGNMENT),
      error
    })
  }
}

export function* deleteCourseAssignmentSaga({ payload }) {
  const { data, params } = payload
  try {
    const { code } = yield deleteCourseAssignmentAPI({ data })
    if (code === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      yield put(loadAutomaticAssignment({ params }))
      yield put({
        type: SUCCESS(DELETE_COURSE_ASSIGNMENT)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_COURSE_ASSIGNMENT),
      error
    })
  }
}

export function* loadCourseCategorySaga({ payload }) {
  try {
    const { code, data } = yield loadCourseCategoryAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_COURSE_CATEGORY),
        data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_COURSE_CATEGORY),
      error
    })
  }
}

export function* loadCourseAssignmentSaga({ payload }) {
  try {
    const { code, data } = yield loadCourseAssignmentAPI(payload)
    const { result: courseAssignment, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_COURSE_ASSIGNMENT),
        payload: {
          courseAssignment,
          pagination,
          filter: payload?.params?.filter
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_COURSE_ASSIGNMENT),
      error
    })
  }
}

export function* loadTargetGroupSaga() {
  try {
    const { code, data: targetGroup } = yield loadTargetGroupAPI()
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_TARGET_GROUP),
        targetGroup
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_TARGET_GROUP),
      error
    })
  }
}

export function* loadTargetAttributeSaga({ payload }) {
  try {
    const { code, data } = yield loadTargetAttributeAPI(payload)
    const { result: targetAttribute } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_TARGET_ATTRIBUTE),
        targetAttribute
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_TARGET_ATTRIBUTE),
      error
    })
  }
}

export function* createAssignmentSaga({ payload }) {
  try {
    const { code } = yield createAssignmentAPI(payload)
    const { history } = payload
    if (code === 200) {
      history.push(RoutesName.AUTO_ASSIGNMENT)
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.create_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(CREATE_ASSIGNMENT)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(CREATE_ASSIGNMENT),
      error
    })
  }
}

export function* updateAssignmentSaga({ payload }) {
  try {
    const { code } = yield updateAssignmentAPI(payload)
    const { history } = payload
    if (code === 200) {
      history.push(RoutesName.AUTO_ASSIGNMENT)
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(UPDATE_ASSIGNMENT)
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_ASSIGNMENT),
      error
    })
  }
}

export function* loadDetailAssignmentSaga({ payload }) {
  try {
    const { code, data: detailAssignment } = yield loadDetailAssignmentAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_DETAIL_ASSIGNMENT),
        detailAssignment
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_DETAIL_ASSIGNMENT),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(LOAD_AUTOMATIC_ASSIGNMENT), loadAutomaticAssignmentSaga)
  yield takeLatest(REQUEST(DELETE_COURSE_ASSIGNMENT), deleteCourseAssignmentSaga)
  yield takeLatest(REQUEST(LOAD_COURSE_CATEGORY), loadCourseCategorySaga)
  yield takeLatest(REQUEST(LOAD_COURSE_ASSIGNMENT), loadCourseAssignmentSaga)
  yield takeLatest(REQUEST(LOAD_TARGET_GROUP), loadTargetGroupSaga)
  yield takeLatest(REQUEST(LOAD_TARGET_ATTRIBUTE), loadTargetAttributeSaga)
  yield takeLatest(REQUEST(CREATE_ASSIGNMENT), createAssignmentSaga)
  yield takeLatest(REQUEST(UPDATE_ASSIGNMENT), updateAssignmentSaga)
  yield takeLatest(REQUEST(LOAD_DETAIL_ASSIGNMENT), loadDetailAssignmentSaga)
}
