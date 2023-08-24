import { REQUEST } from 'Stores'
import {
  GET_DETAIL,
  UPDATE
} from './constants'

export function getSettingMobileDetailRequest() {
  return {
    type: REQUEST(GET_DETAIL)
  }
}

export function updateSettingMobileDetailRequest(payload) {
  return {
    type: REQUEST(UPDATE),
    payload
  }
}
