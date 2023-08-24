import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { DEFAULT_PAG } from 'Utils'
import { LOCATION_CHANGE } from 'connected-react-router'
import {
  LOAD_REPORT_RESULT, RESET_REPORT_RESULT
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  results: [],
  pagination: {
    ...DEFAULT_PAG,
    total: 0
  },
  filter: null
}

function loadReportResults(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadReportResultsSuccess(state, { payload }) {
  const { results, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    results,
    pagination,
    filter
  })
}

function loadReportResultsFail(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function resetState(state) {
  return updateObject(state, {
    ...state,
    results: [...initialState.results],
    pagination: { ...initialState.pagination }
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_REPORT_RESULT)]: loadReportResults,
  [SUCCESS(LOAD_REPORT_RESULT)]: loadReportResultsSuccess,
  [FAILURE(LOAD_REPORT_RESULT)]: loadReportResultsFail,

  [REQUEST(RESET_REPORT_RESULT)]: resetState,

  [LOCATION_CHANGE]: resetState
})
