import {
  put, takeLatest
} from 'redux-saga/effects'

import { REQUEST, SUCCESS, FAILURE } from 'Stores'
import { getCompanySelectedAPI, getCompanyTypesAPI } from 'APIs'

import { LOAD_COMPANY_SELECTED, LOAD_COMPANY_TYPES } from './constants'

export function* loadCompanyTypesSaga({ payload }) {
  try {
    const { data, code } = yield getCompanyTypesAPI(payload)
    const { result: companyTypes, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_COMPANY_TYPES),
        payload: {
          companyTypes,
          pagination,
          filter: payload?.params?.filter || {}
        }
      })
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_COMPANY_TYPES),
      error
    })
  }
}

export function* loadCompanySelectedSaga({ payload }) {
  const { callback } = payload
  try {
    const { data, code } = yield getCompanySelectedAPI(payload)
    const { result, ...pagination } = data
    if (code === 200) {
      yield put({
        type: SUCCESS(LOAD_COMPANY_SELECTED),
        payload: {
          data: result,
          pagination
        }
      })
      if (callback) {
        callback.done()
      }
    }
  } catch (error) {
    yield put({
      type: FAILURE(LOAD_COMPANY_SELECTED),
      error
    })
  }
}

export default function* registrationCoursesSaga() {
  yield takeLatest(REQUEST(LOAD_COMPANY_TYPES), loadCompanyTypesSaga)
  yield takeLatest(REQUEST(LOAD_COMPANY_SELECTED), loadCompanySelectedSaga)
}
