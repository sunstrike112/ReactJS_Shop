/* eslint-disable no-unused-vars */
import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { DEFAULT_PAG } from 'Utils'
import {
  GET_LIST_TAG,
  CREATE_TAG,
  UPDATE_TAG,
  DELETE_TAG,
  RESET_LIST_TAG
} from './constants'

const listTag = {
  isLoading: false,
  data: [],
  pagination: { ...DEFAULT_PAG },
  filter: {},
  error: null
}

const createWorkspace = {
  isCreating: false,
  error: null
}

const editWorkspace = {
  isEditing: false,
  error: null
}

export const initialState = {
  isLoading: false,
  isSubmitting: false,
  listTag: { ...listTag },
  workspaceList: [],
  createWorkspace: { ...createWorkspace },
  editWorkspace: { ...editWorkspace },
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

function getTagRequest(state) {
  return updateObject(state, {
    listTag: {
      ...state.listTag,
      isLoading: true
    }
  })
}

function getTagSuccess(state, { payload }) {
  const { result, pagination, filter } = payload
  return updateObject(state, {
    listTag: {
      ...state.result,
      isLoading: false,
      result,
      pagination
    },
    filter
  })
}

function getTagFailure(state, { error }) {
  return updateObject(state, {
    listTag: {
      ...state.listTag,
      isLoading: false,
      error
    }
  })
}

function deleteTagRequest(state) {
  return updateObject(state, {
    error: null,
    isLoading: true
  })
}

function deleteTagSuccess(state) {
  return updateObject(state, {
    isLoading: false
  })
}

function deleteTagFailure(state, { error }) {
  return updateObject(state, { error, isLoading: false })
}

function createTagRequest(state) {
  return updateObject(state, {
    createWorkspace: {
      ...state.createWorkspace,
      isCreating: true
    }
  })
}

function createTagSuccess(state) {
  return updateObject(state, {
    createWorkspace: {
      ...state.createWorkspace,
      isCreating: false
    }
  })
}

function createTagFailure(state, { error }) {
  return updateObject(state, {
    createWorkspace: {
      ...state.createWorkspace,
      isCreating: false,
      error
    }
  })
}

function updateTagRequest(state) {
  return updateObject(state, {
    editWorkspace: {
      ...state.editWorkspace,
      isEditing: true
    }
  })
}

function updateTagSuccess(state) {
  return updateObject(state, {
    editWorkspace: {
      ...state.editWorkspace,
      isEditing: false
    }
  })
}

function updateTagFailure(state, { error }) {
  return updateObject(state, {
    editWorkspace: {
      ...state.editWorkspace,
      isEditing: false,
      error
    }
  })
}

function resetState(state) {
  return updateObject(state, { ...initialState })
}

export default createReducer(initialState, {
  [REQUEST(GET_LIST_TAG)]: getTagRequest,
  [SUCCESS(GET_LIST_TAG)]: getTagSuccess,
  [FAILURE(GET_LIST_TAG)]: getTagFailure,

  [REQUEST(DELETE_TAG)]: deleteTagRequest,
  [SUCCESS(DELETE_TAG)]: deleteTagSuccess,
  [FAILURE(DELETE_TAG)]: deleteTagFailure,

  [REQUEST(CREATE_TAG)]: createTagRequest,
  [SUCCESS(CREATE_TAG)]: createTagSuccess,
  [FAILURE(CREATE_TAG)]: createTagFailure,

  [REQUEST(UPDATE_TAG)]: updateTagRequest,
  [SUCCESS(UPDATE_TAG)]: updateTagSuccess,
  [FAILURE(UPDATE_TAG)]: updateTagFailure,

  [REQUEST(RESET_LIST_TAG)]: resetState,

  [LOCATION_CHANGE]: resetState
})
