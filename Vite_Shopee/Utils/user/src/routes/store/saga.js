/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { put, takeLatest } from 'redux-saga/effects'
import {
  getMaintainNoticeSuccess,
  getMaintainNoticeFailure,
  getStatusMaintainSuccess,
  getStatusMaintainFailure,
  loadingPortalRequest,
  loadingPortalStop
} from './actions'
import { GET_MAINTAIN_NOTICE_REQUEST, GET_STATUS_MAINTAIN_REQUEST, SET_THEME_FAILURE, SET_THEME_REQUEST, SET_THEME_SUCCESS } from './constants'

import { getMaintainNoticeAPI, getThemeAPI } from '../../apis'
import { removeLocalStorage, setFavicon, setLocalStorage, setTitle, STORAGE } from '../../utils'

export function* getMaintainNoticeSaga() {
  try {
    const { data } = yield getMaintainNoticeAPI()
    yield put(getMaintainNoticeSuccess(data))
  } catch (error) {
    yield put(getMaintainNoticeFailure(error))
  }
}

export function* getStatusMaintainSaga() {
  try {
    const { data } = yield getMaintainNoticeAPI()
    yield put(getStatusMaintainSuccess(data))
  } catch (error) {
    yield put(getStatusMaintainFailure(error))
  }
}

export function* setThemeSaga({ payload }) {
  yield put(loadingPortalRequest())
  try {
    const { data } = yield getThemeAPI(payload)
    setLocalStorage(STORAGE.THEME, JSON.stringify(data.code))
    setFavicon(data.faviconPath)
    setTitle(data.name)
    yield put({
      type: SET_THEME_SUCCESS,
      data: {
        themeCompany: data.elementTheme,
        infoCompany: data
      }
    })
  } catch (error) {
    yield put({
      type: SET_THEME_FAILURE,
      error
    })
    yield removeLocalStorage(STORAGE.THEME)
  } finally {
    yield put(loadingPortalStop())
  }
}

export default function* globalSaga() {
  yield takeLatest(GET_MAINTAIN_NOTICE_REQUEST, getMaintainNoticeSaga)
  yield takeLatest(GET_STATUS_MAINTAIN_REQUEST, getStatusMaintainSaga)
  yield takeLatest(SET_THEME_REQUEST, setThemeSaga)
}
