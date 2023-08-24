/* eslint-disable no-console */

import { put, takeLatest } from 'redux-saga/effects'
import {
  getSeminarList,
  getSeminarDetail
} from '../../../apis'
import {
  repoLoadingError,
  loadSeminarsSuccess,
  loadSeminarDetailSuccess
} from './actions'

import {
  LOAD_SEMINAR_DETAIL,
  LOAD_SEMINAR_LIST
} from './constants'

export function* loadSeminarSaga() {
  try {
    const { data } = yield getSeminarList()

    yield put(loadSeminarsSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadSeminarDetailSaga({ seminarId }) {
  try {
    const { data } = yield getSeminarDetail(seminarId)

    yield put(loadSeminarDetailSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* AppSaga() {
  // Watches for appSaga actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_SEMINAR_LIST, loadSeminarSaga)
  yield takeLatest(LOAD_SEMINAR_DETAIL, loadSeminarDetailSaga)
}
