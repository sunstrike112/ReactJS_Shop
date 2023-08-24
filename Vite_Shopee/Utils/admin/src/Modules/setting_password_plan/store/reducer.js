/* eslint-disable no-unused-vars */
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { DEFAULT_PAG } from 'Utils'
import {
  ADD_PASSWORD,
  APPLY_PLAN_ZZ,
  CHANGE_STATUS_PLAN_ZZ,
  DELETE_PASSWORD,
  GET_PASSWORDS,
  RESET_STATE_PASSWORD
} from './constants'

export const initialState = {
  isLoading: false,
  isAdding: false,
  isDeleting: false,
  isChangingStatus: false,
  isApplying: false,
  passwordsPlan: [],
  pagination: {
    ...DEFAULT_PAG,
    total: 0
  },
  filter: {},
  error: null
}

function getPasswordRequest(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function getPasswordSuccess(state, { payload }) {
  const { passwordsPlan, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    passwordsPlan,
    pagination,
    filter
  })
}

function getPasswordFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function addPasswordRequest(state) {
  return updateObject(state, {
    isAdding: true
  })
}

function addPasswordSuccess(state) {
  return updateObject(state, {
    isAdding: false
  })
}

function addPasswordFailure(state, { error }) {
  return updateObject(state, {
    isAdding: false,
    error
  })
}

function deletePasswordRequest(state) {
  return updateObject(state, {
    isDeleting: true
  })
}

function deletePasswordSuccess(state) {
  return updateObject(state, {
    isDeleting: false
  })
}

function deletePasswordFailure(state, { error }) {
  return updateObject(state, {
    isDeleting: false,
    error
  })
}

function changeStatusPlanZZRequest(state) {
  return updateObject(state, {
    isChangingStatus: true
  })
}

function changeStatusPlanZZSuccess(state) {
  return updateObject(state, {
    isChangingStatus: false
  })
}

function changeStatusPlanZZFailure(state, { error }) {
  return updateObject(state, {
    isChangingStatus: false,
    error
  })
}

function applyPlanZZRequest(state) {
  return updateObject(state, {
    isApplying: true
  })
}

function applyPlanZZSuccess(state) {
  return updateObject(state, {
    isApplying: false
  })
}

function applyPlanZZFailure(state, { error }) {
  return updateObject(state, {
    isApplying: false,
    error
  })
}

function resetState(state) {
  return updateObject(state, {
    ...state,
    passwordsPlan: [...initialState.passwordsPlan],
    pagination: { ...initialState.pagination }
  })
}

// Slice reducer
export default createReducer(initialState, {

  [REQUEST(GET_PASSWORDS)]: getPasswordRequest,
  [SUCCESS(GET_PASSWORDS)]: getPasswordSuccess,
  [FAILURE(GET_PASSWORDS)]: getPasswordFailure,

  [REQUEST(ADD_PASSWORD)]: addPasswordRequest,
  [SUCCESS(ADD_PASSWORD)]: addPasswordSuccess,
  [FAILURE(ADD_PASSWORD)]: addPasswordFailure,

  [REQUEST(DELETE_PASSWORD)]: deletePasswordRequest,
  [SUCCESS(DELETE_PASSWORD)]: deletePasswordSuccess,
  [FAILURE(DELETE_PASSWORD)]: deletePasswordFailure,

  [REQUEST(CHANGE_STATUS_PLAN_ZZ)]: changeStatusPlanZZRequest,
  [SUCCESS(CHANGE_STATUS_PLAN_ZZ)]: changeStatusPlanZZSuccess,
  [FAILURE(CHANGE_STATUS_PLAN_ZZ)]: changeStatusPlanZZFailure,

  [REQUEST(APPLY_PLAN_ZZ)]: applyPlanZZRequest,
  [SUCCESS(APPLY_PLAN_ZZ)]: applyPlanZZSuccess,
  [FAILURE(APPLY_PLAN_ZZ)]: applyPlanZZFailure,

  [REQUEST(RESET_STATE_PASSWORD)]: resetState

})
