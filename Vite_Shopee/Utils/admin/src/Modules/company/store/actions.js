import { REQUEST } from 'Stores'
import {
  LOAD_CONTRACT_PLAN,
  LOAD_COMPANY_LIST,
  LOAD_COMPANY_ALL,
  DELETE_COMPANY,
  GET_COMPANY_LIST_WAITING,
  GET_COMPANY_LIST_REFUSED,
  GET_COMPANY_WAITING_DETAIL,
  GET_ADMIN_PROFILE,
  UPDATE_ADMIN_PROFILE,
  UPDATE_STATUS_FOR_COMPANY_WAITING,
  MOVE_COMPANY_REFUSED_TO_WAITING,
  RESET_COMPANIES_MANAGEMENT,
  GET_AMOUNT_OF_COMPANY_UNAPPROVED,
  CLOSE_NOTICE_TO_SUPER_ADMIN
} from './constants'

// COMPANY_MANAGEMENT
export function loadContractPlan(payload) {
  return {
    type: REQUEST(LOAD_CONTRACT_PLAN),
    payload
  }
}

export function loadCompanyList(payload) {
  return {
    type: REQUEST(LOAD_COMPANY_LIST),
    payload
  }
}

export function loadCompanyAll(payload) {
  return {
    type: REQUEST(LOAD_COMPANY_ALL),
    payload
  }
}

export function deleteCompany(payload) {
  return {
    type: REQUEST(DELETE_COMPANY),
    payload
  }
}

export function resetCompaniesManagement() {
  return {
    type: REQUEST(RESET_COMPANIES_MANAGEMENT)
  }
}

// COMPANY_WAITING
export function getCompanyListWaiting(payload) {
  return {
    type: REQUEST(GET_COMPANY_LIST_WAITING),
    payload
  }
}

export function getAmountOfCompanyUnapproved() {
  return {
    type: REQUEST(GET_AMOUNT_OF_COMPANY_UNAPPROVED)
  }
}

export function closeNoticeToSuperAdmin() {
  return {
    type: REQUEST(CLOSE_NOTICE_TO_SUPER_ADMIN)
  }
}

export function getCompanyWaitingDetail(payload) {
  return {
    type: REQUEST(GET_COMPANY_WAITING_DETAIL),
    payload
  }
}

export function updateStatusForCompanyWaiting(payload) {
  return {
    type: REQUEST(UPDATE_STATUS_FOR_COMPANY_WAITING),
    payload
  }
}

// COMPANY_REFUSED
export function getCompanyListRefused(payload) {
  return {
    type: REQUEST(GET_COMPANY_LIST_REFUSED),
    payload
  }
}

export function moveCompanyRefusedToWaiting(payload) {
  return {
    type: REQUEST(MOVE_COMPANY_REFUSED_TO_WAITING),
    payload
  }
}

// ADMIN_PROFILE
export function getAdminProfile() {
  return {
    type: REQUEST(GET_ADMIN_PROFILE)
  }
}

export function updateAdminProfile(payload) {
  return {
    type: REQUEST(UPDATE_ADMIN_PROFILE),
    payload
  }
}
