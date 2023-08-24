/* eslint-disable no-console */
import { put, takeLatest } from 'redux-saga/effects'
import {
  verifyCompany,
  registerCompany,
  getListPlanPackage as getListPlanPackageAPI
} from '../../../../apis'

import {
  registerCompanyError,
  registerCompanySuccess,
  verifyCompanyError,
  verifyCompanySuccess,
  getListPlanPackageError,
  getListPlanPackageSuccess
} from './actions'

import {
  REGISTER_COMPANY,
  VERIFY_COMPANY,
  GET_LIST_PLAN_PACKAGE
} from './constants'

export function* verifyCompanySaga({ payload }) {
  try {
    const verifiedData = yield verifyCompany(payload)
    yield put(verifyCompanySuccess(true, verifiedData.data))
  } catch (error) {
    yield put(verifyCompanyError(error))
  }
}

export function* registerCompanySaga({ payload }) {
  try {
    yield registerCompany(payload)
    yield put(registerCompanySuccess(true))
  } catch (error) {
    yield put(registerCompanyError(error))
  }
}

export function* getListPlanPackageSaga({ payload }) {
  try {
    const data = yield getListPlanPackageAPI(payload)
    yield put(getListPlanPackageSuccess(data.data))
  } catch (error) {
    yield put(getListPlanPackageError(error))
  }
}

export default function* registerSaga() {
  yield takeLatest(VERIFY_COMPANY, verifyCompanySaga)
  yield takeLatest(REGISTER_COMPANY, registerCompanySaga)
  yield takeLatest(GET_LIST_PLAN_PACKAGE, getListPlanPackageSaga)
}
