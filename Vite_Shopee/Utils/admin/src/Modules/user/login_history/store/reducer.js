import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { DEFAULT_PAG } from 'Utils'
import {
  LOGIN_HISTORY, RESET_LOGIN_HISTORIES
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  histories: [],
  pagination: { ...DEFAULT_PAG },
  filter: {}
}

function loadHistories(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function historiesLoaded(state, { payload }) {
  const { histories, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    histories,
    pagination,
    filter
  })
}

function historiesLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function resetLoginHistories(state) {
  return updateObject(state, {
    histories: [...initialState.histories],
    pagination: { ...initialState.pagination }
  })
}

function resetState(state) {
  return updateObject(state, { ...initialState })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOGIN_HISTORY)]: loadHistories,
  [SUCCESS(LOGIN_HISTORY)]: historiesLoaded,
  [FAILURE(LOGIN_HISTORY)]: historiesLoadingError,

  [REQUEST(RESET_LOGIN_HISTORIES)]: resetLoginHistories,

  [LOCATION_CHANGE]: resetState
})
