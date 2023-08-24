import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { DEFAULT_PAG } from 'Utils'
import {
  GET_APIS_MANAGER,
  ADD_API_MANAGER,
  DELETE_API_MANAGER,
  GET_APIS
} from './constants'

export const externalApi = {
  isLoading: false,
  apis: [],
  error: null
}

export const initialState = {
  isLoading: false,
  isAdding: false,
  isDeleting: false,
  apisManager: [],
  pagination: { ...DEFAULT_PAG },
  error: null,
  externalApi: { ...externalApi }
}

function getExternalApisManager(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function getExternalApisManagerSuccess(state, { payload }) {
  const { apisManager, pagination } = payload
  return updateObject(state, {
    isLoading: false,
    apisManager,
    pagination
  })
}

function getExternalApisManagerFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function getExternalApis(state) {
  return updateObject(state, {
    externalApi: {
      ...state.externalApi,
      isLoading: true
    }
  })
}

function getExternalApisSuccess(state, { payload }) {
  const { apis } = payload
  return updateObject(state, {
    externalApi: {
      ...state.externalApi,
      isLoading: false,
      apis
    }
  })
}

function getExternalApisFailure(state, { error }) {
  return updateObject(state, {
    externalApi: {
      ...state.externalApi,
      isLoading: false,
      error
    }
  })
}

function addExternalApiManager(state) {
  return updateObject(state, {
    isAdding: true
  })
}

function addExternalApiManagerSuccess(state) {
  return updateObject(state, {
    isAdding: false
  })
}

function addExternalApiManagerFailure(state, { error }) {
  return updateObject(state, {
    isAdding: false,
    error
  })
}

function deleteExternalApiManager(state) {
  return updateObject(state, {
    isDeleting: true
  })
}

function deleteExternalApiManagerSuccess(state) {
  return updateObject(state, {
    isDeleting: false
  })
}

function deleteExternalApiManagerFailure(state, { error }) {
  return updateObject(state, {
    isDeleting: false,
    error
  })
}

// Slice reducer
export default createReducer(initialState, {

  [REQUEST(GET_APIS_MANAGER)]: getExternalApisManager,
  [SUCCESS(GET_APIS_MANAGER)]: getExternalApisManagerSuccess,
  [FAILURE(GET_APIS_MANAGER)]: getExternalApisManagerFailure,

  [REQUEST(GET_APIS)]: getExternalApis,
  [SUCCESS(GET_APIS)]: getExternalApisSuccess,
  [FAILURE(GET_APIS)]: getExternalApisFailure,

  [REQUEST(ADD_API_MANAGER)]: addExternalApiManager,
  [SUCCESS(ADD_API_MANAGER)]: addExternalApiManagerSuccess,
  [FAILURE(ADD_API_MANAGER)]: addExternalApiManagerFailure,

  [REQUEST(DELETE_API_MANAGER)]: deleteExternalApiManager,
  [SUCCESS(DELETE_API_MANAGER)]: deleteExternalApiManagerSuccess,
  [FAILURE(DELETE_API_MANAGER)]: deleteExternalApiManagerFailure

})
