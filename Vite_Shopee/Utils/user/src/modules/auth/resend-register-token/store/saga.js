/* eslint-disable no-console */

import { push } from 'connected-react-router'
import { put, takeLatest } from 'redux-saga/effects'
import { resendEmail as resendEmailAPI } from '../../../../apis'

import { resendEmailError } from './actions'

import { RESEND_EMAIL } from './constants'

export function* resendEmailSaga({ payload }) {
  try {
    yield resendEmailAPI(payload)
    yield put(push('/auth/register-success'))
  } catch (error) {
    yield put(resendEmailError(error))
  }
}

export default function* registerSaga() {
  yield takeLatest(RESEND_EMAIL, resendEmailSaga)
}
