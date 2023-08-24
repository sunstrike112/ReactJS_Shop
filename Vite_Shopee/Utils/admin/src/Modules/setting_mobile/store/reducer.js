import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { GET_DETAIL, UPDATE } from './constants'

export const initialState = {
  isLoading: false,
  data: {},
  isSubmitting: false,
  error: null
}

function getSettingMobileDetailRequest(state) {
  return updateObject(state, {
    ...state,
    isLoading: true
  })
}

function getSettingMobileDetailSuccess(state, { data }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    data
  })
}

function getSettingMobileDetailFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    error
  })
}

function updateSettingMobileDetailRequest(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: true
  })
}

function updateSettingMobileDetailSuccess(state, { data }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    data
  })
}

function updateSettingMobileDetailFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    error
  })
}

// Slice reducer
export default createReducer(initialState, {

  [REQUEST(GET_DETAIL)]: getSettingMobileDetailRequest,
  [SUCCESS(GET_DETAIL)]: getSettingMobileDetailSuccess,
  [FAILURE(GET_DETAIL)]: getSettingMobileDetailFailure,

  [REQUEST(UPDATE)]: updateSettingMobileDetailRequest,
  [SUCCESS(UPDATE)]: updateSettingMobileDetailSuccess,
  [FAILURE(UPDATE)]: updateSettingMobileDetailFailure

})
