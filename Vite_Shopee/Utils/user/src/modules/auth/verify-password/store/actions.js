import {
  SETTING_PASSWORD,
  SETTING_PASSWORD_ERROR,
  SETTING_PASSWORD_SUCCESS,
  VERIFY_PASSWORD,
  VERIFY_PASSWORD_ERROR,
  VERIFY_PASSWORD_SUCCESS
} from './constants'

export function verifyPassword(payload) {
  return {
    type: VERIFY_PASSWORD,
    payload
  }
}

export function verifyPasswordSuccess(isSuccess, verifiedData) {
  return {
    type: VERIFY_PASSWORD_SUCCESS,
    isSuccess,
    verifiedData
  }
}

export function verifyPasswordError(error) {
  return {
    type: VERIFY_PASSWORD_ERROR,
    error
  }
}

export function settingPassword(payload) {
  return {
    type: SETTING_PASSWORD,
    payload
  }
}

export function settingPasswordSuccess(isSettingPasswordSuccess) {
  return {
    type: SETTING_PASSWORD_SUCCESS,
    isSettingPasswordSuccess
  }
}

export function settingPasswordError(error) {
  return {
    type: SETTING_PASSWORD_ERROR,
    error
  }
}
