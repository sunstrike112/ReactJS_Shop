import {
  REGISTER_EMAIL,
  REGISTER_EMAIL_ERROR,
  REGISTER_EMAIL_SUCCESS,
  REGISTER_COMPANY,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_COMPANY_ERROR,

  CHECK_EMAIL_EXIST,
  CHECK_EMAIL_EXIST_SUCCESS,
  CHECK_EMAIL_EXIST_ERROR,
  EMAIL_COMPANY_INVALID
} from './constants'

export function registerEmail(payload) {
  return {
    type: REGISTER_EMAIL,
    payload
  }
}

export function registerEmailSuccess(isSuccess) {
  return {
    type: REGISTER_EMAIL_SUCCESS,
    isSuccess
  }
}

export function registerEmailError(error) {
  return {
    type: REGISTER_EMAIL_ERROR,
    error
  }
}

export function checkEmailExist(payload) {
  return {
    type: CHECK_EMAIL_EXIST,
    payload
  }
}

export function checkEmailExistSuccess(data) {
  return {
    type: CHECK_EMAIL_EXIST_SUCCESS,
    data
  }
}

export function checkEmailExistError(error) {
  return {
    type: CHECK_EMAIL_EXIST_ERROR,
    error
  }
}

export function registerCompany(payload) {
  return {
    type: REGISTER_COMPANY,
    payload
  }
}

export function registerCompanySuccess() {
  return {
    type: REGISTER_COMPANY_SUCCESS
  }
}

export function registerCompanyError(error) {
  return {
    type: REGISTER_COMPANY_ERROR,
    error
  }
}

export function emailCompanyInvalid(payload) {
  return {
    type: EMAIL_COMPANY_INVALID,
    payload
  }
}
