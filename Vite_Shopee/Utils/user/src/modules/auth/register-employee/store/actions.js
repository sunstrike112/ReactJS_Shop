import {
  VERIFY_EMPLOYEE,
  VERIFY_EMPLOYEE_ERROR,
  VERIFY_EMPLOYEE_SUCCESS,
  REGISTER_EMPLOYEE,
  REGISTER_EMPLOYEE_ERROR,
  REGISTER_EMPLOYEE_SUCCESS
} from './constants'

export function verifyEmployee(payload) {
  return {
    type: VERIFY_EMPLOYEE,
    payload
  }
}

export function verifyEmployeeSuccess(isSuccess, verifiedData) {
  return {
    type: VERIFY_EMPLOYEE_SUCCESS,
    isSuccess,
    verifiedData
  }
}

export function verifyEmployeeError(error) {
  return {
    type: VERIFY_EMPLOYEE_ERROR,
    error
  }
}

export function registerEmployee(payload) {
  return {
    type: REGISTER_EMPLOYEE,
    payload
  }
}

export function registerEmployeeSuccess(isRegisterSuccess) {
  return {
    type: REGISTER_EMPLOYEE_SUCCESS,
    isRegisterSuccess
  }
}

export function registerEmployeeError(error) {
  return {
    type: REGISTER_EMPLOYEE_ERROR,
    error
  }
}
