import {
  VERIFY_COMPANY,
  VERIFY_COMPANY_ERROR,
  VERIFY_COMPANY_SUCCESS,
  REGISTER_COMPANY,
  REGISTER_COMPANY_ERROR,
  REGISTER_COMPANY_SUCCESS,
  GET_LIST_PLAN_PACKAGE,
  GET_LIST_PLAN_PACKAGE_SUCCESS,
  GET_LIST_PLAN_PACKAGE_ERROR
} from './constants'

export function verifyCompany(payload) {
  return {
    type: VERIFY_COMPANY,
    payload
  }
}

export function verifyCompanySuccess(isSuccess, verifiedData) {
  return {
    type: VERIFY_COMPANY_SUCCESS,
    isSuccess,
    verifiedData
  }
}

export function verifyCompanyError(error) {
  return {
    type: VERIFY_COMPANY_ERROR,
    error
  }
}

export function registerCompany(payload) {
  return {
    type: REGISTER_COMPANY,
    payload
  }
}

export function registerCompanySuccess(isRegisterSuccess) {
  return {
    type: REGISTER_COMPANY_SUCCESS,
    isRegisterSuccess
  }
}

export function registerCompanyError(error) {
  return {
    type: REGISTER_COMPANY_ERROR,
    error
  }
}

export function getListPlanPackage(payload) {
  return {
    type: GET_LIST_PLAN_PACKAGE,
    payload
  }
}

export function getListPlanPackageSuccess(data) {
  return {
    type: GET_LIST_PLAN_PACKAGE_SUCCESS,
    data
  }
}

export function getListPlanPackageError(error) {
  return {
    type: GET_LIST_PLAN_PACKAGE_ERROR,
    error
  }
}
