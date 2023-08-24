import { REQUEST } from 'Stores'
import {
  LOAD_REPORT_DETAIL,
  LOAD_REPORT_QUESTIONS
} from './constants'

export function loadReportDetail(payload) {
  return {
    type: REQUEST(LOAD_REPORT_DETAIL),
    payload
  }
}

export function loadReportQuestions(payload) {
  return {
    type: REQUEST(LOAD_REPORT_QUESTIONS),
    payload
  }
}
