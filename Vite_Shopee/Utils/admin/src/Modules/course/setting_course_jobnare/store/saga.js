import { put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import i18next from 'I18n'
import { getResultWithPaging } from 'Utils'
import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  updateStatusAuto,
  addExceptCourse,
  getExceptCourse,
  deleteExceptCourse
} from 'APIs'

import {
  UPDATE_AUTO_STATUS,
  LOAD_EXCEPT_COURSE,
  DELETE_EXCEPT_COURSE,
  ADD_EXCEPT_COURSE,
  LOAD_EXCEPT_COURSE_ALL
} from './constants'

export function* loadExceptCourseSaga({ payload }) {
  try {
    const { code, data } = yield getResultWithPaging({ action: getExceptCourse, payload, condition: (res) => res.listCourse.result.length })
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_EXCEPT_COURSE),
        payload: data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_EXCEPT_COURSE),
      error
    })
  }
}

export function* loadExceptCourseAllSaga({ payload }) {
  try {
    const { code, data } = yield getResultWithPaging({ action: getExceptCourse, payload, condition: (res) => res.listCourse.result.length })
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_EXCEPT_COURSE_ALL),
        payload: data
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_EXCEPT_COURSE_ALL),
      error
    })
  }
}

export function* deleteExceptCourseSaga({ payload }) {
  const { data, callback } = payload
  try {
    const { status } = yield deleteExceptCourse(data?.ids)
    if (status === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.delete_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(DELETE_EXCEPT_COURSE)
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(DELETE_EXCEPT_COURSE),
      error
    })
  }
}

export function* addExceptCourseSaga({ payload }) {
  const { ids, callback, params } = payload
  try {
    const { status } = yield addExceptCourse(ids)
    if (status === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.add_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(ADD_EXCEPT_COURSE)
      })
      yield put({
        type: REQUEST(LOAD_EXCEPT_COURSE),
        payload: {
          params
        }
      })
      callback.done()
    }
  } catch (error) {
    yield put({
      type: FAILURE(ADD_EXCEPT_COURSE),
      error
    })
  }
}

export function* updateAutoStatusSaga(payload) {
  const { params } = payload
  try {
    const { status } = yield updateStatusAuto()
    if (status === 200) {
      notification.success({
        message: i18next.t('common:success'),
        description: i18next.t('common:message.update_success'),
        duration: 2
      })
      yield put({
        type: SUCCESS(UPDATE_AUTO_STATUS)
      })
      yield put({
        type: REQUEST(LOAD_EXCEPT_COURSE),
        payload: {
          params
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_AUTO_STATUS),
      error
    })
  }
}

export default function* settingCourseJobnareSaga() {
  yield takeLatest(REQUEST(UPDATE_AUTO_STATUS), updateAutoStatusSaga)
  yield takeLatest(REQUEST(LOAD_EXCEPT_COURSE), loadExceptCourseSaga)
  yield takeLatest(REQUEST(LOAD_EXCEPT_COURSE_ALL), loadExceptCourseAllSaga)
  yield takeLatest(REQUEST(DELETE_EXCEPT_COURSE), deleteExceptCourseSaga)
  yield takeLatest(REQUEST(ADD_EXCEPT_COURSE), addExceptCourseSaga)
}
