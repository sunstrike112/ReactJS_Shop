import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject } from '../../../../store'

import {
  VERIFY_EMPLOYEE,
  VERIFY_EMPLOYEE_SUCCESS,
  VERIFY_EMPLOYEE_ERROR,
  REGISTER_EMPLOYEE,
  REGISTER_EMPLOYEE_SUCCESS,
  REGISTER_EMPLOYEE_ERROR
} from './constants'

export const initialState = {
  isLoading: false,
  isSuccess: false,
  isRegisterSuccess: false,
  error: null,
  verifiedData: {}
}

function verifyEmployee(state) {
  return updateObject(state, {
    isLoading: true,
    isSuccess: false
  })
}

function verifyEmployeeSuccess(state, { isSuccess, verifiedData }) {
  return updateObject(state, {
    isLoading: false,
    error: null,
    isSuccess,
    verifiedData
  })
}

function verifyEmployeeError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function registerEmployee(state) {
  return updateObject(state, {
    isLoading: true,
    isRegisterSuccess: false
  })
}

function registerEmployeeSuccess(state, { isRegisterSuccess }) {
  return updateObject(state, {
    isLoading: false,
    error: null,
    isRegisterSuccess
  })
}

function registerEmployeeError(state, { error }) {
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
  [VERIFY_EMPLOYEE]: verifyEmployee,
  [VERIFY_EMPLOYEE_SUCCESS]: verifyEmployeeSuccess,
  [VERIFY_EMPLOYEE_ERROR]: verifyEmployeeError,

  [REGISTER_EMPLOYEE]: registerEmployee,
  [REGISTER_EMPLOYEE_SUCCESS]: registerEmployeeSuccess,
  [REGISTER_EMPLOYEE_ERROR]: registerEmployeeError,

  [LOCATION_CHANGE]: resetState
})
