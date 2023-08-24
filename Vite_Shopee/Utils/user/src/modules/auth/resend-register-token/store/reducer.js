import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject } from '../../../../store'

import {
  RESEND_EMAIL,
  RESEND_EMAIL_SUCCESS,
  RESEND_EMAIL_ERROR
} from './constants'

export const initialState = {
  isLoading: false,
  isSuccess: false,
  error: null
}

function resendEmail(state) {
  return updateObject(state, {
    isLoading: true,
    isSuccess: false,
    error: null
  })
}

function resendEmailSuccess(state, { isSuccess }) {
  return updateObject(state, {
    isLoading: false,
    error: null,
    isSuccess
  })
}

function resendEmailError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function resetState(state) {
  return updateObject(state, {
    ...initialState
  })
}

export default createReducer(initialState, {
  [RESEND_EMAIL]: resendEmail,
  [RESEND_EMAIL_SUCCESS]: resendEmailSuccess,
  [RESEND_EMAIL_ERROR]: resendEmailError,

  [LOCATION_CHANGE]: resetState
})
