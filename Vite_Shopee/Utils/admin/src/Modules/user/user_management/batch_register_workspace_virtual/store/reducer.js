import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  REGISTER_WORKSPACE_BY_CSV
} from './constants'

export const initialState = {
  userList: [],
  isLoading: false,
  isSubmitting: false
}

function registerWorkspaceByCsv(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function registerWorkspaceByCsvSuccess(state, { userList }) {
  return updateObject(state, {
    userList: [...state.userList, ...userList]
  })
}

function registerWorkspaceByCsvEnding(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function registerWorkspaceByCsvError(state, { error }) {
  return updateObject(state, {
    isSubmitting: false,
    error
  })
}

function resetCsv(state) {
  return updateObject(state, {
    userList: []
  })
}
function resetState(state) {
  return updateObject(state, {
    ...initialState
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(REGISTER_WORKSPACE_BY_CSV)]: registerWorkspaceByCsv,
  [SUCCESS(REGISTER_WORKSPACE_BY_CSV)]: registerWorkspaceByCsvSuccess,
  [FAILURE(REGISTER_WORKSPACE_BY_CSV)]: registerWorkspaceByCsvError,
  [`ENDING_${REGISTER_WORKSPACE_BY_CSV}`]: registerWorkspaceByCsvEnding,
  [`RESET_DATA_${REGISTER_WORKSPACE_BY_CSV}`]: resetCsv,

  [LOCATION_CHANGE]: resetState
})
