import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  REGISTER_BY_CSV
} from './constants'

export const initialState = {
  userList: [],
  isLoading: false,
  isSubmitting: false
}

function registerByCsv(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function registerByCsvSuccess(state, { userList }) {
  return updateObject(state, {
    userList: [...state.userList, ...userList]
  })
}

function registerByCsvEnding(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function registerByCsvError(state, { error }) {
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
  [REQUEST(REGISTER_BY_CSV)]: registerByCsv,
  [SUCCESS(REGISTER_BY_CSV)]: registerByCsvSuccess,
  [FAILURE(REGISTER_BY_CSV)]: registerByCsvError,
  [`ENDING_${REGISTER_BY_CSV}`]: registerByCsvEnding,
  [`RESET_DATA_${REGISTER_BY_CSV}`]: resetCsv,

  [LOCATION_CHANGE]: resetState
})
