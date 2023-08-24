import { LOCATION_CHANGE } from 'connected-react-router'
import { SORT_TYPE } from '../../../constants'
import { createReducer, FAILURE, REQUEST, SUCCESS, updateObject } from '../../../store'
import { updateObjectInArray } from '../../../utils'
import {
  LOAD_DAILY_REPORTS,
  LOAD_DAILY_REPORT,
  LOAD_TEMPLATES,
  LOAD_TEMPLATE_DETAIL,
  DELETE_DAILY_REPORT,
  DELETE_TEMPLATE,
  LIKE_DAILY_REPORT,
  DISLIKE_DAILY_REPORT,
  MARK_READ_DAILY_REPORT,
  LOAD_USERS_INTERACTED_DAILY_REPORT,
  CREATE_DAILY_REPORT_COMMENT,
  LOAD_COMMENTS_DAILY_REPORT,
  SET_COMMENT_FOR_EDIT,
  EDIT_DAILY_REPORT_COMMENT,
  DELETE_DAILY_REPORT_COMMENT,
  LIKE_DAILY_REPORT_COMMENT,
  DISLIKE_DAILY_REPORT_COMMENT,
  LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT,
  SET_COMPLETE_DAILY_REPORT,
  RESET_FILTER,
  GET_UNREAD,
  GET_PREV_NEXT
} from './constants'

const dailyReports = {
  isLoading: false,
  isDeleting: false,
  isLiking: false,
  isDisliking: false,
  isSettingComplete: false,
  isMarkingRead: false,
  data: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0
  },
  filter: {
    page: 1,
    limit: 20,
    sortType: SORT_TYPE.DESC
  },
  totalUnread: 0,
  error: null
}

const dailyReport = {
  isLoading: false,
  data: {},
  error: null
}

const comments = {
  isLoading: false,
  isSubmitting: false,
  isLiking: false,
  isDisliking: false,
  data: [],
  pagination: {
    page: 1,
    limit: 5,
    total: 0
  },
  filter: {
    page: 1,
    limit: 5,
    sortType: SORT_TYPE.DESC,
    textSearch: ''
  },
  commentForEdit: {},
  error: null,
  usersInteracted: {
    isLoadingAll: false,
    like: [],
    dislike: []
  }
}

const templates = {
  isLoading: false,
  isDeleting: false,
  data: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0
  },
  filter: {
    page: 1,
    limit: 20,
    sortType: SORT_TYPE.DESC
  },
  error: null
}

const templateDetail = {
  isLoading: false,
  data: {},
  error: null
}

const usersInteracted = {
  isLoadingAll: false,
  like: [],
  dislike: [],
  complete: []
}

export const initialState = {
  dailyReports: { ...dailyReports },
  dailyReport: { ...dailyReport },
  comments: { ...comments },
  templates: { ...templates },
  templateDetail: { ...templateDetail },
  usersInteracted: { ...usersInteracted }
}

function loadDailyReportsRequest(state) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isLoading: true
    }
  })
}

function loadDailyReportsSuccess(state, { data, pagination, filter }) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isLoading: false,
      data,
      pagination,
      filter
    }
  })
}

function loadDailyReportsFailure(state, { error }) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isLoading: false,
      error
    }
  })
}

function loadDailyReportRequest(state) {
  return updateObject(state, {
    dailyReport: {
      ...state.dailyReport,
      isLoading: true
    }
  })
}

function loadDailyReportSuccess(state, { data }) {
  return updateObject(state, {
    dailyReport: {
      ...state.dailyReport,
      isLoading: false,
      data
    }
  })
}

function loadDailyReportFailure(state, { error }) {
  return updateObject(state, {
    dailyReport: {
      ...state.dailyReport,
      isLoading: false,
      error
    }
  })
}

function loadTemplatesRequest(state) {
  return updateObject(state, {
    templates: {
      ...state.templates,
      isLoading: true
    }
  })
}

function loadTemplatesSuccess(state, { data, pagination, filter }) {
  return updateObject(state, {
    templates: {
      ...state.templates,
      isLoading: false,
      data,
      pagination,
      filter
    }
  })
}

function loadTemplatesFailure(state, { error }) {
  return updateObject(state, {
    templates: {
      ...state.templates,
      isLoading: false,
      error
    }
  })
}

function loadTemplateDetailRequest(state) {
  return updateObject(state, {
    templateDetail: {
      ...state.templateDetail,
      isLoading: true
    }
  })
}

function loadTemplateDetailSuccess(state, { data }) {
  return updateObject(state, {
    templateDetail: {
      ...state.templateDetail,
      isLoading: false,
      data
    }
  })
}

function loadTemplateDetailFailure(state, { error }) {
  return updateObject(state, {
    templateDetail: {
      ...state.templateDetail,
      isLoading: false,
      error
    }
  })
}

function deleteDailyReportRequest(state) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isDeleting: true
    }
  })
}

function deleteDailyReportSuccess(state) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isDeleting: false
    }
  })
}

function deleteDailyReportFailure(state, { error }) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isDeleting: false,
      error
    }
  })
}

function deleteTemplateRequest(state) {
  return updateObject(state, {
    templates: {
      ...state.templates,
      isDeleting: true
    }
  })
}

function deleteTemplateSuccess(state) {
  return updateObject(state, {
    templates: {
      ...state.templates,
      isDeleting: false
    }
  })
}

function deleteTemplateFailure(state, { error }) {
  return updateObject(state, {
    templates: {
      ...state.templates,
      isDeleting: false,
      error
    }
  })
}

function likeDailyReportRequest(state) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isLiking: true
    }
  })
}

function likeDailyReportSuccess(state, { data }) {
  data = {
    ...data,
    isLike: Boolean(data.isLike),
    isDislike: Boolean(data.isDislike)
  }
  const newData = updateObjectInArray(state.dailyReports.data, data, (el) => el.id === data.id)

  const newDailyReportData = { ...state.dailyReport.data, ...data }
  let newDailyReportsData = { ...state.dailyReports.data }
  newDailyReportsData = newData

  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isLiking: false,
      data: newDailyReportsData
    },
    dailyReport: {
      ...state.dailyReport,
      data: newDailyReportData
    }
  })
}

function likeDailyReportFailure(state, { error }) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isLiking: false,
      error
    }
  })
}

function dislikeDailyReportRequest(state) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isDisliking: true
    }
  })
}

function dislikeDailyReportSuccess(state, { data }) {
  data = {
    ...data,
    isLike: Boolean(data.isLike),
    isDislike: Boolean(data.isDislike)
  }
  const newData = updateObjectInArray(state.dailyReports.data, data, (el) => el.id === data.id)

  const newDailyReportData = { ...state.dailyReport.data, ...data }
  let newDailyReportsData = { ...state.dailyReports.data }
  newDailyReportsData = newData

  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isDisliking: false,
      data: newDailyReportsData
    },
    dailyReport: {
      ...state.dailyReport,
      data: newDailyReportData
    }
  })
}

function dislikeDailyReportFailure(state, { error }) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isDisliking: false,
      error
    }
  })
}

function loadUsersInteractedRequest(state, { payload }) {
  return updateObject(state, {
    usersInteracted: {
      ...state.usersInteracted,
      isLoadingAll: payload.isLoadAll
    }
  })
}

function loadUsersInteractedSuccess(state, { data }) {
  return updateObject(state, {
    usersInteracted: {
      ...state.usersInteracted,
      ...data,
      isLoadingAll: false
    }
  })
}

function loadUsersInteractedFailure(state, { error }) {
  return updateObject(state, {
    usersInteracted: {
      ...state.usersInteracted,
      isLoadingAll: false,
      error
    }
  })
}

function markReadDailyReportRequest(state) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isMarkingRead: true
    }
  })
}

function markReadDailyReportSuccess(state, { data }) {
  data = { ...data, isRead: Boolean(data.isRead) }
  const newData = updateObjectInArray(state.dailyReports.data, data, (el) => el.id === data.id)

  let newDailyReportsData = { ...state.dailyReports.data }
  newDailyReportsData = newData

  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isMarkingRead: false,
      data: newDailyReportsData
    } })
}

function markReadDailyReportFailure(state, { error }) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isMarkingRead: false,
      error
    } })
}

function loadCommentsDailyReportRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLoading: true
    }
  })
}

function loadCommentsDailyReportSuccess(state, { data, pagination, filter }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLoading: false,
      data,
      pagination,
      filter
    }
  })
}

function loadCommentsDailyReportFailure(state, { error }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLoading: false,
      error
    }
  })
}

function createDailyReportCommentRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isSubmitting: true
    }
  })
}

function createDailyReportCommentSuccess(state) {
  const newDailyReport = { ...state.dailyReport }
  newDailyReport.data.totalComment += 1
  return updateObject(state, {
    comments: {
      ...state.comments,
      isSubmitting: false
    },
    dailyReport: newDailyReport
  })
}

function createDailyReportCommentFailure(state, { error }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isSubmitting: false,
      error
    }
  })
}

function editDailyReportCommentRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isSubmitting: true
    }
  })
}

function editDailyReportCommentSuccess(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isSubmitting: false
    }
  })
}

function editDailyReportCommentFailure(state, { error }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isSubmitting: false,
      error
    }
  })
}

function setCommentForEditRequest(state, { data }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      commentForEdit: data
    }
  })
}

function deleteDailyReportCommentRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isDeleting: true
    }
  })
}

function deleteDailyReportCommentSuccess(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isDeleting: false
    }
  })
}

function deleteDailyReportCommentFailure(state, { error }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isSubmitting: false,
      error
    }
  })
}

function likeDailyReportCommentRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLiking: true
    }
  })
}

function likeDailyReportCommentSuccess(state, { data }) {
  data = {
    ...data,
    isLike: Boolean(data.isLike),
    isDislike: Boolean(data.isDislike)
  }
  const newData = updateObjectInArray(state.comments.data, data, (el) => el.id === data.id)

  let newCommentsData = { ...state.comments.data }
  newCommentsData = newData

  return updateObject(state, {
    comments: {
      ...state.comments,
      isLiking: false,
      data: newCommentsData
    }
  })
}

function likeDailyReportCommentFailure(state, { error }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isLiking: false,
      error
    }
  })
}

function dislikeDailyReportCommentRequest(state) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isDisliking: true
    }
  })
}

function dislikeDailyReportCommentSuccess(state, { data }) {
  data = {
    ...data,
    isLike: Boolean(data.isLike),
    isDislike: Boolean(data.isDislike)
  }
  const newData = updateObjectInArray(state.comments.data, data, (el) => el.id === data.id)

  let newCommentsData = { ...state.comments.data }
  newCommentsData = newData

  return updateObject(state, {
    comments: {
      ...state.comments,
      isDisliking: false,
      data: newCommentsData
    }
  })
}

function dislikeDailyReportCommentFailure(state, { error }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      isDisliking: false,
      error
    }
  })
}

function loadUsersInteractedCommentRequest(state, { payload }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      usersInteracted: {
        ...state.comments.usersInteracted,
        isLoadingAll: payload.isLoadAll
      }
    }
  })
}

function loadUsersInteractedCommentSuccess(state, { data }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      usersInteracted: {
        ...state.comments.usersInteracted,
        ...data,
        isLoadingAll: false
      }
    }
  })
}

function loadUsersInteractedCommentFailure(state, { error }) {
  return updateObject(state, {
    comments: {
      ...state.comments,
      usersInteracted: {
        ...state.comments.usersInteracted,
        isLoadingAll: false,
        error
      }
    }
  })
}

function setCompleteDailyReportRequest(state) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isSettingComplete: true
    }
  })
}

function setCompleteDailyReportSuccess(state, { data }) {
  data = {
    ...data,
    complete: Boolean(data.complete)
  }
  const newData = updateObjectInArray(state.dailyReports.data, data, (el) => el.id === data.id)

  const newDailyReportData = { ...state.dailyReport.data, ...data }
  let newDailyReportsData = { ...state.dailyReports.data }
  newDailyReportsData = newData

  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isSettingComplete: false,
      data: newDailyReportsData
    },
    dailyReport: {
      ...state.dailyReport,
      data: newDailyReportData
    }
  })
}

function setCompleteDailyReportFailure(state, { error }) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      isSettingComplete: false,
      error
    }
  })
}

function getUnreadDailyReportSuccess(state, { data }) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      totalUnread: data
    }
  })
}

function getUnreadDailyReportFailure(state, { error }) {
  return updateObject(state, {
    dailyReports: {
      ...state.dailyReports,
      error
    }
  })
}

function getPrevNextDailyReportRequest(state, { payload }) {
  const { typeMove } = payload.queriesParam
  return updateObject(state, {
    dailyReport: {
      ...state.dailyReport,
      isLoadingPrevNext: true,
      typeMove
    }
  })
}

function getPrevNextDailyReportSuccess(state) {
  return updateObject(state, {
    dailyReport: {
      ...state.dailyReport,
      isLoadingPrevNext: false
    }
  })
}

function getPrevNextDailyReportFailure(state, { error }) {
  return updateObject(state, {
    dailyReport: {
      ...state.dailyReport,
      isLoadingPrevNext: false,
      error
    }
  })
}

function resetFilterRequest(state) {
  return updateObject(state, {
    ...initialState
  })
}

function resetState(state) {
  return updateObject(state, {
    ...state,
    templates: {
      ...templates,
      pagination: { ...state.templates.pagination },
      filter: { ...state.templates.filter }
    },
    templateDetail: { ...templateDetail },
    dailyReport: { ...dailyReport },
    comments: { ...comments }
  })
}

export default createReducer(initialState, {
  [REQUEST(LOAD_DAILY_REPORTS)]: loadDailyReportsRequest,
  [SUCCESS(LOAD_DAILY_REPORTS)]: loadDailyReportsSuccess,
  [FAILURE(LOAD_DAILY_REPORTS)]: loadDailyReportsFailure,

  [REQUEST(LOAD_DAILY_REPORT)]: loadDailyReportRequest,
  [SUCCESS(LOAD_DAILY_REPORT)]: loadDailyReportSuccess,
  [FAILURE(LOAD_DAILY_REPORT)]: loadDailyReportFailure,

  [REQUEST(LOAD_TEMPLATES)]: loadTemplatesRequest,
  [SUCCESS(LOAD_TEMPLATES)]: loadTemplatesSuccess,
  [FAILURE(LOAD_TEMPLATES)]: loadTemplatesFailure,

  [REQUEST(LOAD_TEMPLATE_DETAIL)]: loadTemplateDetailRequest,
  [SUCCESS(LOAD_TEMPLATE_DETAIL)]: loadTemplateDetailSuccess,
  [FAILURE(LOAD_TEMPLATE_DETAIL)]: loadTemplateDetailFailure,

  [REQUEST(DELETE_DAILY_REPORT)]: deleteDailyReportRequest,
  [SUCCESS(DELETE_DAILY_REPORT)]: deleteDailyReportSuccess,
  [FAILURE(DELETE_DAILY_REPORT)]: deleteDailyReportFailure,

  [REQUEST(DELETE_TEMPLATE)]: deleteTemplateRequest,
  [SUCCESS(DELETE_TEMPLATE)]: deleteTemplateSuccess,
  [FAILURE(DELETE_TEMPLATE)]: deleteTemplateFailure,

  [REQUEST(LIKE_DAILY_REPORT)]: likeDailyReportRequest,
  [SUCCESS(LIKE_DAILY_REPORT)]: likeDailyReportSuccess,
  [FAILURE(LIKE_DAILY_REPORT)]: likeDailyReportFailure,

  [REQUEST(DISLIKE_DAILY_REPORT)]: dislikeDailyReportRequest,
  [SUCCESS(DISLIKE_DAILY_REPORT)]: dislikeDailyReportSuccess,
  [FAILURE(DISLIKE_DAILY_REPORT)]: dislikeDailyReportFailure,

  [REQUEST(LOAD_USERS_INTERACTED_DAILY_REPORT)]: loadUsersInteractedRequest,
  [SUCCESS(LOAD_USERS_INTERACTED_DAILY_REPORT)]: loadUsersInteractedSuccess,
  [FAILURE(LOAD_USERS_INTERACTED_DAILY_REPORT)]: loadUsersInteractedFailure,

  [REQUEST(MARK_READ_DAILY_REPORT)]: markReadDailyReportRequest,
  [SUCCESS(MARK_READ_DAILY_REPORT)]: markReadDailyReportSuccess,
  [FAILURE(MARK_READ_DAILY_REPORT)]: markReadDailyReportFailure,

  [REQUEST(LOAD_COMMENTS_DAILY_REPORT)]: loadCommentsDailyReportRequest,
  [SUCCESS(LOAD_COMMENTS_DAILY_REPORT)]: loadCommentsDailyReportSuccess,
  [FAILURE(LOAD_COMMENTS_DAILY_REPORT)]: loadCommentsDailyReportFailure,

  [REQUEST(CREATE_DAILY_REPORT_COMMENT)]: createDailyReportCommentRequest,
  [SUCCESS(CREATE_DAILY_REPORT_COMMENT)]: createDailyReportCommentSuccess,
  [FAILURE(CREATE_DAILY_REPORT_COMMENT)]: createDailyReportCommentFailure,

  [REQUEST(EDIT_DAILY_REPORT_COMMENT)]: editDailyReportCommentRequest,
  [SUCCESS(EDIT_DAILY_REPORT_COMMENT)]: editDailyReportCommentSuccess,
  [FAILURE(EDIT_DAILY_REPORT_COMMENT)]: editDailyReportCommentFailure,

  [REQUEST(SET_COMMENT_FOR_EDIT)]: setCommentForEditRequest,

  [REQUEST(LIKE_DAILY_REPORT_COMMENT)]: likeDailyReportCommentRequest,
  [SUCCESS(LIKE_DAILY_REPORT_COMMENT)]: likeDailyReportCommentSuccess,
  [FAILURE(LIKE_DAILY_REPORT_COMMENT)]: likeDailyReportCommentFailure,

  [REQUEST(DISLIKE_DAILY_REPORT_COMMENT)]: dislikeDailyReportCommentRequest,
  [SUCCESS(DISLIKE_DAILY_REPORT_COMMENT)]: dislikeDailyReportCommentSuccess,
  [FAILURE(DISLIKE_DAILY_REPORT_COMMENT)]: dislikeDailyReportCommentFailure,

  [REQUEST(DELETE_DAILY_REPORT_COMMENT)]: deleteDailyReportCommentRequest,
  [SUCCESS(DELETE_DAILY_REPORT_COMMENT)]: deleteDailyReportCommentSuccess,
  [FAILURE(DELETE_DAILY_REPORT_COMMENT)]: deleteDailyReportCommentFailure,

  [REQUEST(LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT)]: loadUsersInteractedCommentRequest,
  [SUCCESS(LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT)]: loadUsersInteractedCommentSuccess,
  [FAILURE(LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT)]: loadUsersInteractedCommentFailure,

  [REQUEST(LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT)]: loadUsersInteractedCommentRequest,
  [SUCCESS(LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT)]: loadUsersInteractedCommentSuccess,
  [FAILURE(LOAD_USERS_INTERACTED_DAILY_REPORT_COMMENT)]: loadUsersInteractedCommentFailure,

  [REQUEST(SET_COMPLETE_DAILY_REPORT)]: setCompleteDailyReportRequest,
  [SUCCESS(SET_COMPLETE_DAILY_REPORT)]: setCompleteDailyReportSuccess,
  [FAILURE(SET_COMPLETE_DAILY_REPORT)]: setCompleteDailyReportFailure,

  [SUCCESS(GET_UNREAD)]: getUnreadDailyReportSuccess,
  [FAILURE(GET_UNREAD)]: getUnreadDailyReportFailure,

  [REQUEST(GET_PREV_NEXT)]: getPrevNextDailyReportRequest,
  [SUCCESS(GET_PREV_NEXT)]: getPrevNextDailyReportSuccess,
  [FAILURE(GET_PREV_NEXT)]: getPrevNextDailyReportFailure,

  [REQUEST(RESET_FILTER)]: resetFilterRequest,

  [LOCATION_CHANGE]: resetState
})
