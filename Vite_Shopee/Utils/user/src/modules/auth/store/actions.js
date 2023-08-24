import {
  GET_EMAIL_FROM_TOKEN_REQUEST,
  GET_EMAIL_FROM_TOKEN_FAILURE,
  GET_EMAIL_FROM_TOKEN_SUCCESS,
  GET_EMAIL_RESET_ERROR,
  GET_EMAIL_RESET_REQUEST,
  GET_EMAIL_RESET_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SETTING_PASSWORD_FAILURE,
  SETTING_PASSWORD_REQUEST,
  SETTING_PASSWORD_SUCCESS,
  VERIFY_TOKEN_FAILURE,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  LOAD_WORKSPACES_SUCCESS,
  LOAD_WORKSPACES_REQUEST,
  LOAD_WORKSPACES_FAILURE,
  RESET_STATE_REQUEST,
  RESET_LOGIN_ERROR
} from './constants'

export function loginRequest(payload) {
  return {
    type: LOGIN_REQUEST,
    payload
  }
}

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data
  }
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  }
}

export function resetLoginError() {
  return {
    type: RESET_LOGIN_ERROR
  }
}

export function logoutRequest(payload) {
  return {
    type: LOGOUT_REQUEST,
    payload
  }
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function logoutFailure() {
  return {
    type: LOGOUT_FAILURE
  }
}

export function getEmailResetRequest(payload) {
  return {
    type: GET_EMAIL_RESET_REQUEST,
    payload
  }
}

export function getEmailResetSuccess(data) {
  return {
    type: GET_EMAIL_RESET_SUCCESS,
    data
  }
}

export function getEmailResetError(error) {
  return {
    type: GET_EMAIL_RESET_ERROR,
    error
  }
}

export function verifyTokenRequest(payload) {
  return {
    type: VERIFY_TOKEN_REQUEST,
    payload
  }
}

export function verifyTokenSuccess(data) {
  return {
    type: VERIFY_TOKEN_SUCCESS,
    data
  }
}

export function verifyTokenFailure(error) {
  return {
    type: VERIFY_TOKEN_FAILURE,
    error
  }
}

export function settingPasswordRequest(payload) {
  return {
    type: SETTING_PASSWORD_REQUEST,
    payload
  }
}

export function settingPasswordSuccess(data) {
  return {
    type: SETTING_PASSWORD_SUCCESS,
    data
  }
}

export function settingPasswordFailure(error) {
  return {
    type: SETTING_PASSWORD_FAILURE,
    error
  }
}

export function getEmailFromTokenRequest(payload) {
  return {
    type: GET_EMAIL_FROM_TOKEN_REQUEST,
    payload
  }
}

export function getEmailFromTokenSuccess(data) {
  return {
    type: GET_EMAIL_FROM_TOKEN_SUCCESS,
    data
  }
}

export function getEmailFromTokenFailure(error) {
  return {
    type: GET_EMAIL_FROM_TOKEN_FAILURE,
    error
  }
}

export function loadWorkspacesRequest() {
  return {
    type: LOAD_WORKSPACES_REQUEST
  }
}

export function loadWorkspacesSuccess(data) {
  return {
    type: LOAD_WORKSPACES_SUCCESS,
    data
  }
}

export function loadWorkspacesFailure(error) {
  return {
    type: LOAD_WORKSPACES_FAILURE,
    error
  }
}

export function resetStateRequest(payload) {
  return {
    type: RESET_STATE_REQUEST,
    payload
  }
}
