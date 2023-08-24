import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { LOAD_COMPANY_SELECTED, LOAD_COMPANY_TYPES } from './constants'

const companySelected = {
  isLoading: false,
  pagination: {},
  data: [],
  error: null
}

export const initialState = {
  isLoading: false,
  error: null,
  companyTypes: [],
  companySelected: { ...companySelected },
  pagination: {},
  filter: {}
}

function loadCompanyTypes(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadCompanyTypesSuccess(state, { payload }) {
  const { companyTypes, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    companyTypes,
    pagination,
    filter
  })
}

function loadCompanyTypesFailure(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function loadCompanySelected(state) {
  return updateObject(state, {
    companySelected: {
      ...state.companySelected,
      isLoading: true
    }
  })
}

function loadCompanySelectedSuccess(state, { payload }) {
  const { data, pagination } = payload
  return updateObject(state, {
    companySelected: {
      ...state.companySelected,
      isLoading: false,
      data,
      pagination
    }
  })
}

function loadCompanySelectedFailure(state, { error }) {
  return updateObject(state, {
    companySelected: {
      ...state.companySelected,
      isLoading: false,
      error
    }
  })
}

function resetState(state) {
  return updateObject(state, { ...initialState })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_COMPANY_TYPES)]: loadCompanyTypes,
  [SUCCESS(LOAD_COMPANY_TYPES)]: loadCompanyTypesSuccess,
  [FAILURE(LOAD_COMPANY_TYPES)]: loadCompanyTypesFailure,

  [REQUEST(LOAD_COMPANY_SELECTED)]: loadCompanySelected,
  [SUCCESS(LOAD_COMPANY_SELECTED)]: loadCompanySelectedSuccess,
  [FAILURE(LOAD_COMPANY_SELECTED)]: loadCompanySelectedFailure,

  [LOCATION_CHANGE]: resetState
})
