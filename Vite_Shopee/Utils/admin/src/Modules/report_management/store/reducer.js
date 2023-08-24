/* eslint-disable no-unused-vars */
import { SORT_BY_TYPE } from 'Constants/sorter'
import { createReducer, FAILURE, REQUEST, SUCCESS, updateObject } from 'Stores'
import { LOCATION_CHANGE } from 'connected-react-router'
import {
  GET_LIST_REPORT,
  GET_REPORT_DETAIL,
  LOAD_COMMENTS_DAILY_REPORT,
  RESET_LIST_REPORT
} from './constants'

const listReport = {
  isLoading: false,
  result: [],
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 100
  },
  filter: {},
  error: null
}

const reportDetail = {
  dataReport: {
    title: '',
    email: '',
    departmentIdList: [],
    attributeIdList: []
  }
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
    sortType: SORT_BY_TYPE.descend,
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

export const initialState = {
  isLoading: false,
  isSubmitting: false,
  listReport: { ...listReport },
  reportDetail: { ...reportDetail },
  comments: { ...comments },
  filter: {
    name: '',
    comnpanyId: ''
  },
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 100
  },
  error: null
}

function getReportRequest(state) {
  return updateObject(state, {
    listReport: {
      ...state.listReport,
      isLoading: true
    }
  })
}

function getReportSuccess(state, { payload }) {
  const { result, pagination, filter } = payload
  return updateObject(state, {
    listReport: {
      ...state.result,
      isLoading: false,
      result,
      pagination
    },
    filter
  })
}

function getReportFailure(state, { error }) {
  return updateObject(state, {
    listReport: {
      ...state.listReport,
      isLoading: false,
      error
    }
  })
}

function getReportDetailRequest(state) {
  return updateObject(state, {
    reportDetail: {
      ...state.reportDetail,
      isLoading: true
    }
  })
}

function getReportDetailSuccess(state, { payload }) {
  return updateObject(state, {
    reportDetail: {
      ...state.reportDetail,
      isLoading: false,
      dataReport: payload
    }
  })
}

function getReportDetailFailure(state, { error }) {
  return updateObject(state, {
    reportDetail: {
      ...state.reportDetail,
      isLoading: false,
      error
    }
  })
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

function resetState(state) {
  return updateObject(state, {
    pagination: { ...initialState.pagination },
    listReport: { ...initialState.listReport }
  })
}

export default createReducer(initialState, {
  [REQUEST(GET_LIST_REPORT)]: getReportRequest,
  [SUCCESS(GET_LIST_REPORT)]: getReportSuccess,
  [FAILURE(GET_LIST_REPORT)]: getReportFailure,

  [REQUEST(GET_REPORT_DETAIL)]: getReportDetailRequest,
  [SUCCESS(GET_REPORT_DETAIL)]: getReportDetailSuccess,
  [FAILURE(GET_REPORT_DETAIL)]: getReportDetailFailure,

  [REQUEST(LOAD_COMMENTS_DAILY_REPORT)]: loadCommentsDailyReportRequest,
  [SUCCESS(LOAD_COMMENTS_DAILY_REPORT)]: loadCommentsDailyReportSuccess,
  [FAILURE(LOAD_COMMENTS_DAILY_REPORT)]: loadCommentsDailyReportFailure,

  [REQUEST(RESET_LIST_REPORT)]: resetState,
  [LOCATION_CHANGE]: resetState
})
