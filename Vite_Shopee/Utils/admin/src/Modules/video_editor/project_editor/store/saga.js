/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects'
import i18next from 'I18n'
import { FAILURE, SUCCESS, REQUEST } from 'Stores'
import {
  getprojectDetail,
  videoEditor,
  updateProjectNameAPI,
  videoEditorSplitPause
} from 'APIs'
import { notification } from 'antd'
import {
  GET_VIDEO_DETAIL,
  UPDATE_PROJECT_NAME,
  EXPORT_VIDEO,
  EXPORT_VIDEO_SPLIT_PAUSE
} from './constants'

i18next.loadNamespaces(['common'])

export function* loadvideoDetailSaga({ payload }) {
  try {
    const { data } = yield getprojectDetail(payload)
    yield put({
      type: SUCCESS(GET_VIDEO_DETAIL),
      projectDetail: data
    })
  } catch (error) {
    yield put({
      type: FAILURE(GET_VIDEO_DETAIL),
      error
    })
  }
}

export function* exportVideoSaga({ payload }) {
  try {
    const { code } = yield videoEditor(payload)
    if (code === 200) {
      const { data } = yield getprojectDetail(payload.id)
      yield put({
        type: SUCCESS(EXPORT_VIDEO)
      })
      yield put({
        type: SUCCESS(GET_VIDEO_DETAIL),
        projectDetail: data
      })
      notification.success({
        message: i18next.t('project:message.publish_processing_title'),
        description: i18next.t('project:message.publish_processing'),
        duration: 5
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_VIDEO_DETAIL),
      error
    })
  }
}

export function* exportVideoSplitPauseSaga({ payload }) {
  try {
    const { code } = yield videoEditorSplitPause(payload)
    if (code === 200) {
      const { data } = yield getprojectDetail(payload.id)
      yield put({
        type: SUCCESS(EXPORT_VIDEO)
      })
      yield put({
        type: SUCCESS(GET_VIDEO_DETAIL),
        projectDetail: data
      })
      notification.success({
        message: i18next.t('project:message.publish_processing_title'),
        description: i18next.t('project:message.publish_processing'),
        duration: 5
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(GET_VIDEO_DETAIL),
      error
    })
  }
}

export function* updateProjectNameSaga({ payload }) {
  try {
    const { code } = yield updateProjectNameAPI(payload)
    if (code === 200) {
      yield put({
        type: SUCCESS(UPDATE_PROJECT_NAME),
        payload
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPDATE_PROJECT_NAME),
      error
    })
  }
}

export default function* videoEditorSaga() {
  yield takeLatest(REQUEST(GET_VIDEO_DETAIL), loadvideoDetailSaga)
  yield takeLatest(REQUEST(UPDATE_PROJECT_NAME), updateProjectNameSaga)
  yield takeLatest(REQUEST(EXPORT_VIDEO), exportVideoSaga)
  yield takeLatest(REQUEST(EXPORT_VIDEO_SPLIT_PAUSE), exportVideoSplitPauseSaga)
}
