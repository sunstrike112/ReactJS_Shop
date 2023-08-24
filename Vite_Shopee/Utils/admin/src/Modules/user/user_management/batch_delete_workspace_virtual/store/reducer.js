import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  DELETE_BY_CSV
} from './constants'

export const initialState = {
  userList: [],
  isLoading: false,
  isSubmitting: false
}

function deleteByCsv(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function deleteByCsvSuccess(state, { userList }) {
  return updateObject(state, {
    userList: [...state.userList, ...userList]
  })
}

function deleteByCsvEnding(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function deleteByCsvError(state, { error }) {
  return updateObject(state, {
    isSubmitting: false,
    error
  })
}

function resetCsv(state) {
  return updateObject(state, {
    ...initialState
  })
}
function resetState(state) {
  return updateObject(state, {
    ...initialState
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(DELETE_BY_CSV)]: deleteByCsv,
  [SUCCESS(DELETE_BY_CSV)]: deleteByCsvSuccess,
  [FAILURE(DELETE_BY_CSV)]: deleteByCsvError,
  [`ENDING_${DELETE_BY_CSV}`]: deleteByCsvEnding,
  [`RESET_DATA_${DELETE_BY_CSV}`]: resetCsv,

  [LOCATION_CHANGE]: resetState
})
