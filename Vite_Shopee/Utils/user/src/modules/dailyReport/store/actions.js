import { REQUEST } from '../../../store'
import {
  CREATE_DAILY_REPORT,
  CREATE_TEMPLATE,
  DELETE_DAILY_REPORT,
  DELETE_TEMPLATE,
  EDIT_DAILY_REPORT,
  EDIT_TEMPLATE,
  DISLIKE_DAILY_REPORT,
  LIKE_DAILY_REPORT,
  LOAD_DAILY_REPORT,
  LOAD_DAILY_REPORTS,
  LOAD_TEMPLATES,
  LOAD_TEMPLATE_DETAIL,
  MARK_READ_DAILY_REPORT,
  LOAD_USERS_INTERACTED_DAILY_REPORT,
  CREATE_DAILY_REPORT_COMMENT,
  LOAD_COMMENTS_DAILY_REPORT,
  EDIT_DAILY_REPORT_COMMENT,
  SET_COMMENT_FOR_EDIT,
  DELETE_DAILY_REPORT_COMMENT,
  LIKE_DAILY_REPORT_COMMENT,
  DISLIKE_DAILY_REPORT_COMMENT,
  LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT,
  SET_COMPLETE_DAILY_REPORT,
  RESET_FILTER,
  GET_UNREAD,
  GET_PREV_NEXT
} from './constants'

// Daily report
export function loadDailyReports(payload) {
  return {
    type: REQUEST(LOAD_DAILY_REPORTS),
    payload
  }
}

export function loadDailyReport(payload) {
  return {
    type: REQUEST(LOAD_DAILY_REPORT),
    payload
  }
}

export function createDailyReport(payload) {
  return {
    type: REQUEST(CREATE_DAILY_REPORT),
    payload
  }
}

export function editDailyReport(payload) {
  return {
    type: REQUEST(EDIT_DAILY_REPORT),
    payload
  }
}

export function deleteDailyReport(payload) {
  return {
    type: REQUEST(DELETE_DAILY_REPORT),
    payload
  }
}

export function loadUsersInteractedDailyReport(payload) {
  return {
    type: REQUEST(LOAD_USERS_INTERACTED_DAILY_REPORT),
    payload
  }
}

export function likeDailyReport(payload) {
  return {
    type: REQUEST(LIKE_DAILY_REPORT),
    payload
  }
}

export function dislikeDailyReport(payload) {
  return {
    type: REQUEST(DISLIKE_DAILY_REPORT),
    payload
  }
}

export function markReadDailyReport(payload) {
  return {
    type: REQUEST(MARK_READ_DAILY_REPORT),
    payload
  }
}

export function loadCommentsDailyReport(payload) {
  return {
    type: REQUEST(LOAD_COMMENTS_DAILY_REPORT),
    payload
  }
}

export function createDailyReportComment(payload) {
  return {
    type: REQUEST(CREATE_DAILY_REPORT_COMMENT),
    payload
  }
}

export function editDailyReportComment(payload) {
  return {
    type: REQUEST(EDIT_DAILY_REPORT_COMMENT),
    payload
  }
}

export function deleteDailyReportComment(payload) {
  return {
    type: REQUEST(DELETE_DAILY_REPORT_COMMENT),
    payload
  }
}

export function setCommentForEdit(data) {
  return {
    type: REQUEST(SET_COMMENT_FOR_EDIT),
    data
  }
}

export function likeDailyReportComment(payload) {
  return {
    type: REQUEST(LIKE_DAILY_REPORT_COMMENT),
    payload
  }
}

export function dislikeDailyReportComment(payload) {
  return {
    type: REQUEST(DISLIKE_DAILY_REPORT_COMMENT),
    payload
  }
}

export function loadUsersInteractedDailyReportComment(payload) {
  return {
    type: REQUEST(LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT),
    payload
  }
}

export function setCompleteDailyReport(payload) {
  return {
    type: REQUEST(SET_COMPLETE_DAILY_REPORT),
    payload
  }
}

export function resetFilterDailyReport() {
  return {
    type: REQUEST(RESET_FILTER)
  }
}

export function getUnreadDailyReportRequest() {
  return {
    type: REQUEST(GET_UNREAD)
  }
}

export function getPrevNextDailyReportRequest(payload) {
  return {
    type: REQUEST(GET_PREV_NEXT),
    payload
  }
}

// Template
export function loadTemplates(payload) {
  return {
    type: REQUEST(LOAD_TEMPLATES),
    payload
  }
}

export function loadTemplateDetail(payload) {
  return {
    type: REQUEST(LOAD_TEMPLATE_DETAIL),
    payload
  }
}

export function deleteTemplate(payload) {
  return {
    type: REQUEST(DELETE_TEMPLATE),
    payload
  }
}

export function editTemplate(payload) {
  return {
    type: REQUEST(EDIT_TEMPLATE),
    payload
  }
}

export function createTemplate(payload) {
  return {
    type: REQUEST(CREATE_TEMPLATE),
    payload
  }
}
