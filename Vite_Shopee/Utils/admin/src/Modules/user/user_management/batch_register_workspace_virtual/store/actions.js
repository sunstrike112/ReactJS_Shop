import { REQUEST } from 'Stores'
import {
  REGISTER_WORKSPACE_BY_CSV
} from './constants'

export function registerWorkspaceByCsv(payload) {
  return {
    type: REQUEST(REGISTER_WORKSPACE_BY_CSV),
    payload
  }
}

export function resetCsv() {
  return {
    type: `RESET_DATA_${REGISTER_WORKSPACE_BY_CSV}`
  }
}
