import { REQUEST } from 'Stores'
import {
  LOAD_REPORT_RESULT, RESET_REPORT_RESULT
} from './constants'

export function loadReportResult(payload) {
  return {
    type: REQUEST(LOAD_REPORT_RESULT),
    payload
  }
}

export function resetState() {
  return {
    type: REQUEST(RESET_REPORT_RESULT)
  }
}
