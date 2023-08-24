import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject } from '../../../../store'

import {
  VERIFY_PASSWORD,
  VERIFY_PASSWORD_SUCCESS,
  VERIFY_PASSWORD_ERROR,
  SETTING_PASSWORD,
  SETTING_PASSWORD_ERROR,
  SETTING_PASSWORD_SUCCESS
} from './constants'

export const initialState = {
  isLoading: false,
  isSuccess: false,
  isSettingPasswordSuccess: false,
  error: null,
  verifiedData: {}
}

function registerEmail(state) {
  return updateObject(state, {
    isLoading: true,
    isSuccess: false,
    error: null
  })
}

function registerEmailSuccess(state, { isSuccess, verifiedData }) {
  return updateObject(state, {
    isLoading: false,
    error: null,
    isSuccess,
    verifiedData
  })
}

function registerEmailError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function settingPassword(state) {
  return updateObject(state, {
    isLoading: true,
    isSettingPasswordSuccess: false,
    error: null
  })
}

function settingPasswordSuccess(state, { isSettingPasswordSuccess }) {
  return updateObject(state, {
    isLoading: false,
    error: null,
    isSettingPasswordSuccess
  })
}

function settingPasswordError(state, { error }) {
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
  [VERIFY_PASSWORD]: registerEmail,
  [VERIFY_PASSWORD_SUCCESS]: registerEmailSuccess,
  [VERIFY_PASSWORD_ERROR]: registerEmailError,

  [SETTING_PASSWORD]: settingPassword,
  [SETTING_PASSWORD_SUCCESS]: settingPasswordSuccess,
  [SETTING_PASSWORD_ERROR]: settingPasswordError,

  [LOCATION_CHANGE]: resetState
})
