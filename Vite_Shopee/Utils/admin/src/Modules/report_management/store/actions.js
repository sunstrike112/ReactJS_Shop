import { REQUEST } from 'Stores'
import {
  GET_LIST_REPORT, GET_REPORT_DETAIL, LOAD_COMMENTS_DAILY_REPORT, RESET_LIST_REPORT
} from './constants'

function getListReport(payload) {
  return {
    type: REQUEST(GET_LIST_REPORT),
    payload
  }
}

function getReportDetail(payload) {
  return {
    type: REQUEST(GET_REPORT_DETAIL),
    payload
  }
}

function loadCommentsDailyReport(payload) {
  return {
    type: REQUEST(LOAD_COMMENTS_DAILY_REPORT),
    payload
  }
}

function resetState() {
  return {
    type: REQUEST(RESET_LIST_REPORT)
  }
}

export {
  getListReport,
  getReportDetail,
  loadCommentsDailyReport,
  resetState
}
