/* eslint-disable no-console */
/* eslint-disable import/named */

/* eslint-disable no-case-declarations */
/**
 * Gets the repositories of the user from Github
 */

import {
  put, takeLatest
} from 'redux-saga/effects'

import { testAPI } from 'APIs'
import {
  reposLoaded, repoLoadingError
} from './actions'

import {
  LOAD_REPOS
} from './constants'

/**
 * Get user info request/response handler
 */
export function* loadReposSaga() {
  try {
    // Call our request helper (see 'Helpers/axios')
    const { data } = yield testAPI()
    yield put(reposLoaded(data.results))
  } catch (err) {
    yield put(repoLoadingError(err))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* homeSaga() {
  // Watches for appSaga actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, loadReposSaga)
}
