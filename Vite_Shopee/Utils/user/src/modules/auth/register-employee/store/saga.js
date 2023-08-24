/* eslint-disable no-console */

import { put, takeLatest } from 'redux-saga/effects'
import { verifyEmployee, registerEmployee } from '../../../../apis'

import {
  registerEmployeeError,
  registerEmployeeSuccess,
  verifyEmployeeError,
  verifyEmployeeSuccess
} from './actions'

import { REGISTER_EMPLOYEE, VERIFY_EMPLOYEE } from './constants'

export function* verifyEmployeeSaga({ payload }) {
  try {
    const verifiedData = yield verifyEmployee(payload)
    const { code } = verifiedData
    if (code === 200) {
      yield put(verifyEmployeeSuccess(true, verifiedData.data))
    }
    if (code === 401) {
      yield put(verifyEmployeeError({ type: verifiedData.message }))
    }
  } catch (error) {
    yield put(verifyEmployeeError(error))
  }
}

export function* registerEmployeeSaga({ payload }) {
  try {
    const dataAPI = yield registerEmployee(payload)
    const { code } = dataAPI
    if (code === 200) {
      yield put(registerEmployeeSuccess(true))
    }
    if (code === 401) {
      yield put(verifyEmployeeError({ type: dataAPI.message }))
    }
  } catch (error) {
    yield put(registerEmployeeError(error))
  }
}

export default function* registerSaga() {
  yield takeLatest(VERIFY_EMPLOYEE, verifyEmployeeSaga)
  yield takeLatest(REGISTER_EMPLOYEE, registerEmployeeSaga)
}
