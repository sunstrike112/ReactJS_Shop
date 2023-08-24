/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects'
import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  uploadSubtitle, getVideoDetail
} from 'APIs'

import {
  UPLOAD_SUBTITLE, GET_VIDEO_DETAIL
} from './constants'

export function* uploadSubtitleSaga({ payload }) {
  const { isSave, RouteName, folderId, history, ...rest } = payload
  try {
    const { code } = yield uploadSubtitle(rest)
    if (code === 200) {
      const { data: videoDetail } = yield getVideoDetail(payload.videoId)
      yield put({
        type: SUCCESS(UPLOAD_SUBTITLE),
        videoDetail
      })
      if (isSave) {
        if (folderId) yield history.push(`${RouteName}?folderId=${folderId}`)
        else yield history.push(RouteName)
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(UPLOAD_SUBTITLE),
      error
    })
  }
}

export function* getVideoDetailSaga({ payload }) {
  try {
    const { data: videoDetail } = yield getVideoDetail(payload)
    yield put({
      type: SUCCESS(GET_VIDEO_DETAIL),
      videoDetail
    })
  } catch (error) {
    yield put({
      type: FAILURE(GET_VIDEO_DETAIL),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(UPLOAD_SUBTITLE), uploadSubtitleSaga)
  yield takeLatest(REQUEST(GET_VIDEO_DETAIL), getVideoDetailSaga)
}
