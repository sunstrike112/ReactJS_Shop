import { REQUEST } from 'Stores'
import {
  REGISTER_BY_CSV
} from './constants'

export function registerByCsv(payload) {
  return {
    type: REQUEST(REGISTER_BY_CSV),
    payload
  }
}

export function resetCsv() {
  return {
    type: `RESET_DATA_${REGISTER_BY_CSV}`
  }
}
