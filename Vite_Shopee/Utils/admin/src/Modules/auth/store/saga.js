import { put, takeLatest } from 'redux-saga/effects'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import { getProfile } from 'APIs'
// import { USER_URL, SIGNAL_TYPE } from 'Constants'
import { getLocalStorage, STORAGE } from 'Utils'
import { LOAD_PROFILE } from './constants'

export function* loadProfileSaga() {
  try {
    const getMetaData = getLocalStorage(STORAGE.META_DATA)
    const metaData = JSON.parse(getMetaData)
    const { data: result } = yield getProfile({ userId: metaData?.userId })

    yield put({
      type: SUCCESS(LOAD_PROFILE),
      payload: {
        metaData,
        profile: result.data
      }
    })
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_PROFILE),
      error
    })
    // window.location.replace(`${USER_URL}?signal=${SIGNAL_TYPE.LOGOUT}`)
  }
}

export default function* authSaga() {
  yield takeLatest(REQUEST(LOAD_PROFILE), loadProfileSaga)
}
