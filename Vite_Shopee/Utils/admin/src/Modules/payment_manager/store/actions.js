import { REQUEST } from 'Stores'
import { LOAD_LIST_PAYMENT } from './constants'

export function loadPaymentHistoryList(payload) {
  return {
    type: REQUEST(LOAD_LIST_PAYMENT),
    payload
  }
}

export function resetState() {
  return {
    type: REQUEST(LOAD_LIST_PAYMENT)
  }
}
