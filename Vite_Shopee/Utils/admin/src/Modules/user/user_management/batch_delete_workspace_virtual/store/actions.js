import { REQUEST } from 'Stores'
import {
  DELETE_BY_CSV
} from './constants'

export function deleteByCsv(payload) {
  return {
    type: REQUEST(DELETE_BY_CSV),
    payload
  }
}

export function resetCsv() {
  return {
    type: `RESET_DATA_${DELETE_BY_CSV}`
  }
}
