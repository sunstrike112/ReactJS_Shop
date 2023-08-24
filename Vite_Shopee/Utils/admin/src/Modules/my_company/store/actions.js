import { REQUEST, SUCCESS } from 'Stores'
import {
  LOAD_COMPANY_INFO,
  LOAD_COMPANY_PAYMENT_HISTORIES,
  LOAD_DATA_PLAN,
  LOAD_PLAN,
  LOAD_COMPANY_DETAIL,
  BLOCK_COMPANY,
  UPDATE_TRIAL_TIME,
  CANCEL_PLAN,
  UPDATE_COMPANY_INFO,
  UPDATE_PUSH_NOTIFICATION
} from './constants'

export function loadCompanyInfo() {
  return {
    type: REQUEST(LOAD_COMPANY_INFO)
  }
}

export function loadCompanyDetail(payload) {
  return {
    type: REQUEST(LOAD_COMPANY_DETAIL),
    payload
  }
}

export function loadCompanyInfoSuccess() {
  return {
    type: SUCCESS(LOAD_COMPANY_INFO)
  }
}

export function loadPaymentHistories(payload) {
  return {
    type: REQUEST(LOAD_COMPANY_PAYMENT_HISTORIES),
    payload
  }
}

export function loadPaymentHistoriesSuccess({ data }) {
  return {
    type: SUCCESS(LOAD_COMPANY_PAYMENT_HISTORIES),
    data
  }
}

export function loadPlans(planType) {
  return {
    type: REQUEST(LOAD_PLAN),
    planType
  }
}

export function loadPlansSuccess({ data }) {
  return {
    type: SUCCESS(LOAD_PLAN),
    data
  }
}

export function loadDataPlans(planType) {
  return {
    type: REQUEST(LOAD_DATA_PLAN),
    planType
  }
}

export function loadDataPlansSuccess({ data }) {
  return {
    type: SUCCESS(LOAD_DATA_PLAN),
    data
  }
}

export function blockCompany(payload) {
  return {
    type: REQUEST(BLOCK_COMPANY),
    payload
  }
}

export function updateTrialTime(payload) {
  return {
    type: REQUEST(UPDATE_TRIAL_TIME),
    payload
  }
}

export function cancelPlan(payload) {
  return {
    type: REQUEST(CANCEL_PLAN),
    payload
  }
}

export function updateCompanyInfo(payload) {
  return {
    type: REQUEST(UPDATE_COMPANY_INFO),
    payload
  }
}

export function updateCompanyPushNotification(payload) {
  return {
    type: REQUEST(UPDATE_PUSH_NOTIFICATION),
    payload
  }
}
