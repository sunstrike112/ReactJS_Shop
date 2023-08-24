import { REQUEST } from 'Stores'
import { LOAD_COMPANY_SELECTED, LOAD_COMPANY_TYPES } from './constants'

export function loadCompanyTypes(payload) {
  return {
    type: REQUEST(LOAD_COMPANY_TYPES),
    payload
  }
}

export function loadCompanySelected(payload) {
  return {
    type: REQUEST(LOAD_COMPANY_SELECTED),
    payload
  }
}
