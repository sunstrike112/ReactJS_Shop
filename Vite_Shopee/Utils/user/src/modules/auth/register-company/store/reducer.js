import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject } from '../../../../store'

import {
  VERIFY_COMPANY,
  VERIFY_COMPANY_SUCCESS,
  VERIFY_COMPANY_ERROR,
  REGISTER_COMPANY,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_COMPANY_ERROR,
  GET_LIST_PLAN_PACKAGE,
  GET_LIST_PLAN_PACKAGE_SUCCESS,
  GET_LIST_PLAN_PACKAGE_ERROR
} from './constants'

export const initialState = {
  isLoading: false,
  isSuccess: false,
  isRegisterSuccess: false,
  error: null,
  verifiedData: {},
  planPackage: {
    data: null,
    error: null,
    isLoading: null
  }
}

function verifyCompany(state) {
  return updateObject(state, {
    isLoading: true,
    isSuccess: false
  })
}

function verifyCompanySuccess(state, { isSuccess, verifiedData }) {
  return updateObject(state, {
    isLoading: false,
    error: null,
    isSuccess,
    verifiedData
  })
}

function verifyCompanyError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function registerCompany(state) {
  return updateObject(state, {
    isLoading: true,
    isRegisterSuccess: false
  })
}

function registerCompanySuccess(state, { isRegisterSuccess }) {
  return updateObject(state, {
    isLoading: false,
    error: null,
    isRegisterSuccess
  })
}

function registerCompanyError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function getListPlanPackage(state) {
  return updateObject(state, {
    planPackage: {
      ...state.planPackage,
      isLoading: true,
      error: null
    }
  })
}

function getListPlanPackageSuccess(state, { data }) {
  return updateObject(state, {
    planPackage: {
      isLoading: false,
      data,
      error: null
    }
  })
}

function getListPlanPackageError(state, { error }) {
  return updateObject(state, {
    planPackage: {
      isLoading: false,
      error
    }
  })
}

function resetState(state) {
  return updateObject(state, {
    ...initialState
  })
}

export default createReducer(initialState, {
  [VERIFY_COMPANY]: verifyCompany,
  [VERIFY_COMPANY_SUCCESS]: verifyCompanySuccess,
  [VERIFY_COMPANY_ERROR]: verifyCompanyError,

  [REGISTER_COMPANY]: registerCompany,
  [REGISTER_COMPANY_SUCCESS]: registerCompanySuccess,
  [REGISTER_COMPANY_ERROR]: registerCompanyError,

  [GET_LIST_PLAN_PACKAGE]: getListPlanPackage,
  [GET_LIST_PLAN_PACKAGE_SUCCESS]: getListPlanPackageSuccess,
  [GET_LIST_PLAN_PACKAGE_ERROR]: getListPlanPackageError,

  [LOCATION_CHANGE]: resetState
})
