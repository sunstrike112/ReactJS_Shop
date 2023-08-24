import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { ERROR_USER_EXPIRED_PAYMENT, ERROR_USER_EXPIRED_TRIAL, ERROR_COMPANY_HAS_CANCELLATION, LOAD_PROFILE } from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  authenticated: null,
  metaData: {},
  profile: {},
  isSubmitting: false,
  isPaymentExpired: false,
  isCancellation: false,
  isTrialExpired: false
}

function loadProfile(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function profileLoaded(state, { payload }) {
  const { profile, metaData } = payload
  return updateObject(state, {
    isLoading: false,
    authenticated: true,
    metaData,
    profile
  })
}

function profileLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false,
    authenticated: false
  })
}

function trialExpired(state) {
  return updateObject(state, {
    isTrialExpired: true
  })
}

function companyCancellation(state) {
  return updateObject(state, {
    isCancellation: true
  })
}

function paymentExpired(state) {
  return updateObject(state, {
    isPaymentExpired: true
  })
}

// createLessonInitial
function resetState(state) {
  return updateObject(state, {
    isPaymentExpired: false,
    isTrialExpired: false
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_PROFILE)]: loadProfile,
  [SUCCESS(LOAD_PROFILE)]: profileLoaded,
  [FAILURE(LOAD_PROFILE)]: profileLoadingError,
  [ERROR_USER_EXPIRED_TRIAL]: trialExpired,
  [ERROR_COMPANY_HAS_CANCELLATION]: companyCancellation,
  [ERROR_USER_EXPIRED_PAYMENT]: paymentExpired,
  [LOCATION_CHANGE]: resetState
})
