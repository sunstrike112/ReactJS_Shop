/* eslint-disable no-unused-vars */
import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  LOAD_DETAIL_PUBLISH_REPORT,
  LOAD_REPORTS,
  UPDATE_DETAIL_PUBLISH_REPORT
} from './constants'

export const initialState = {
  isLoading: false,
  isSubmitting: false,
  reports: [],
  filter: {},
  pagination: {},
  detailPublishReport: {},
  error: null
}

function loadReports(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadReportsSuccess(state, { payload }) {
  const { reports, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    reports,
    pagination,
    filter
  })
}

function loadReportsFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function loadDetailPublishReports(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadDetailPublishReportsSuccess(state, { data }) {
  return updateObject(state, {
    isLoading: false,
    detailPublishReport: data
  })
}

function loadDetailPublishReportsFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function updateDetailPublishReports(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function updateDetailPublishReportsSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    isSubmitting: true
  })
}

function updateDetailPublishReportsFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

// createLessonInitial
function resetState(state) {
  return updateObject(state, {
    filter: {},
    isSubmitting: false
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_REPORTS)]: loadReports,
  [SUCCESS(LOAD_REPORTS)]: loadReportsSuccess,
  [FAILURE(LOAD_REPORTS)]: loadReportsFailure,

  [REQUEST(LOAD_DETAIL_PUBLISH_REPORT)]: loadDetailPublishReports,
  [SUCCESS(LOAD_DETAIL_PUBLISH_REPORT)]: loadDetailPublishReportsSuccess,
  [FAILURE(LOAD_DETAIL_PUBLISH_REPORT)]: loadDetailPublishReportsFailure,

  [REQUEST(UPDATE_DETAIL_PUBLISH_REPORT)]: updateDetailPublishReports,
  [SUCCESS(UPDATE_DETAIL_PUBLISH_REPORT)]: updateDetailPublishReportsSuccess,
  [FAILURE(UPDATE_DETAIL_PUBLISH_REPORT)]: updateDetailPublishReportsFailure,

  [LOCATION_CHANGE]: resetState
})
