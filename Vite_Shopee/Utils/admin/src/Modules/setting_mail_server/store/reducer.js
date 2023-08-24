import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { LOCATION_CHANGE } from 'connected-react-router'
import {
  GET_EMAIL_SERVER,
  UPDATE_EMAIL_SERVER
} from './constants'

export const initialState = {
  isLoading: false,
  isUpdating: false,
  emailServer: {},
  error: null
}

function getEmailServerRequest(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function getEmailServerSuccess(state, { data }) {
  return updateObject(state, {
    isLoading: false,
    emailServer: data
  })
}

function getEmailServerFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function updateEmailServerRequest(state) {
  return updateObject(state, {
    isUpdating: true
  })
}

function updateEmailServerSuccess(state) {
  return updateObject(state, {
    isUpdating: false
  })
}

function updateEmailServerFailure(state, { error }) {
  return updateObject(state, {
    isUpdating: false,
    error
  })
}

function resetState(state) {
  return updateObject(state, { ...initialState })
}

// Slice reducer
export default createReducer(initialState, {

  [REQUEST(GET_EMAIL_SERVER)]: getEmailServerRequest,
  [SUCCESS(GET_EMAIL_SERVER)]: getEmailServerSuccess,
  [FAILURE(GET_EMAIL_SERVER)]: getEmailServerFailure,

  [REQUEST(UPDATE_EMAIL_SERVER)]: updateEmailServerRequest,
  [SUCCESS(UPDATE_EMAIL_SERVER)]: updateEmailServerSuccess,
  [FAILURE(UPDATE_EMAIL_SERVER)]: updateEmailServerFailure,

  [LOCATION_CHANGE]: resetState

})
