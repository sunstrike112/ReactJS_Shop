/* eslint-disable no-unused-vars */
import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { DEFAULT_PAG } from 'Utils'
import {
  GET_WORKSPACE_ALL,
  DELETE_WORKSPACE,
  CREATE_WORKSPACE,
  EDIT_WORKSPACE,
  GET_ADMINS_NISSOKEN,
  GET_WORKSPACE_DETAIL,
  DELETE_USER_WORKSPACE,
  ADD_USER_WORKSPACE,
  RESET_WORKSPACES
} from './constants'

const workspaceAll = {
  isLoading: false,
  isDeleting: false,
  data: [],
  pagination: { limit: DEFAULT_PAG.limit },
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

const adminsNissoken = {
  isLoading: false,
  data: [],
  pagination: {},
  filter: {},
  error: null
}

const workSpaceDetail = {
  isLoading: false,
  data: {},
  error: null
}

export const initialState = {
  isLoading: false,
  isSubmitting: false,
  workspaceAll: { ...workspaceAll },
  workspaceList: [],
  workSpaceDetail: { ...workSpaceDetail },
  createWorkspace: { ...createWorkspace },
  editWorkspace: { ...editWorkspace },
  adminsNissoken: { ...adminsNissoken },
  filter: {},
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    limit: 100
  },
  error: null
}

function getAllWorkspace(state) {
  return updateObject(state, {
    workspaceAll: {
      ...state.workspaceAll,
      isLoading: true
    }
  })
}

function getAllWorkspaceSuccess(state, { payload }) {
  const { data, pagination, filter } = payload
  return updateObject(state, {
    workspaceAll: {
      ...state.workspaceAll,
      isLoading: false,
      data,
      pagination,
      filter
    }
  })
}

function getAllWorkspaceFailure(state, { error }) {
  return updateObject(state, {
    workspaceAll: {
      ...state.workspaceAll,
      isLoading: false,
      error
    }
  })
}

function deleteWorkspace(state) {
  return updateObject(state, {
    workspaceAll: {
      ...state.workspaceAll,
      isDeleting: true
    }
  })
}

function deleteWorkspaceSuccess(state) {
  return updateObject(state, {
    workspaceAll: {
      ...state.workspaceAll,
      isDeleting: false
    }
  })
}

function deleteWorkspaceFailure(state, { error }) {
  return updateObject(state, {
    workspaceAll: {
      ...state.workspaceAll,
      isDeleting: false,
      error
    }
  })
}

function createWorkspaceRequest(state) {
  return updateObject(state, {
    createWorkspace: {
      ...state.createWorkspace,
      isCreating: true
    }
  })
}

function createWorkspaceSuccess(state) {
  return updateObject(state, {
    createWorkspace: {
      ...state.createWorkspace,
      isCreating: false
    }
  })
}

function createWorkspaceFailure(state, { error }) {
  return updateObject(state, {
    createWorkspace: {
      ...state.createWorkspace,
      isCreating: false,
      error
    }
  })
}

function editWorkspaceRequest(state) {
  return updateObject(state, {
    editWorkspace: {
      ...state.editWorkspace,
      isEditing: true
    }
  })
}

function editWorkspaceSuccess(state) {
  return updateObject(state, {
    editWorkspace: {
      ...state.editWorkspace,
      isEditing: false
    }
  })
}

function editWorkspaceFailure(state, { error }) {
  return updateObject(state, {
    editWorkspace: {
      ...state.editWorkspace,
      isEditing: false,
      error
    }
  })
}

function getAdminsNissoken(state) {
  return updateObject(state, {
    adminsNissoken: {
      ...state.adminsNissoken,
      isLoading: true
    }
  })
}

function getAdminsNissokenSuccess(state, { payload }) {
  const { data, pagination, filter } = payload
  return updateObject(state, {
    adminsNissoken: {
      ...state.adminsNissoken,
      isLoading: false,
      data,
      pagination,
      filter
    }
  })
}

function getAdminsNissokenFailure(state, { error }) {
  return updateObject(state, {
    adminsNissoken: {
      ...state.adminsNissoken,
      isLoading: false,
      error
    }
  })
}

function getWorkspaceDetail(state) {
  return updateObject(state, {
    workSpaceDetail: {
      ...state.workSpaceDetail,
      isLoading: true
    }
  })
}

function getWorkspaceDetailSuccess(state, { data }) {
  return updateObject(state, {
    workSpaceDetail: {
      ...state.workSpaceDetail,
      isLoading: false,
      data
    }
  })
}

function getWorkspaceDetailFailure(state, { error }) {
  return updateObject(state, {
    workSpaceDetail: {
      ...state.workSpaceDetail,
      isLoading: false,
      error
    }
  })
}

function addUserWorkSpace(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function addUserWorkSpaceSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function addUserWorkSpaceFailure(state, { error }) {
  return updateObject(state, {
    error,
    isSubmitting: false
  })
}

// createLessonInitial
function resetState(state) {
  return updateObject(state, {
    filter: {}
  })
}

function deleteUserWorkspace(state) {
  return updateObject(state, {
    error: null,
    isLoading: true
  })
}

function deleteUserWorkspaceSuccess(state) {
  return updateObject(state, {
    isLoading: false
  })
}

function deleteUserWorkspaceFailure(state, { error }) {
  return updateObject(state, { error, isLoading: false })
}

function resetWorkspaces(state) {
  return updateObject(state, {
    workspaceAll: { ...initialState.workspaceAll }
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(GET_WORKSPACE_ALL)]: getAllWorkspace,
  [SUCCESS(GET_WORKSPACE_ALL)]: getAllWorkspaceSuccess,
  [FAILURE(GET_WORKSPACE_ALL)]: getAllWorkspaceFailure,

  [REQUEST(DELETE_WORKSPACE)]: deleteWorkspace,
  [SUCCESS(DELETE_WORKSPACE)]: deleteWorkspaceSuccess,
  [FAILURE(DELETE_WORKSPACE)]: deleteWorkspaceFailure,

  [REQUEST(CREATE_WORKSPACE)]: createWorkspaceRequest,
  [SUCCESS(CREATE_WORKSPACE)]: createWorkspaceSuccess,
  [FAILURE(CREATE_WORKSPACE)]: createWorkspaceFailure,

  [REQUEST(EDIT_WORKSPACE)]: editWorkspaceRequest,
  [SUCCESS(EDIT_WORKSPACE)]: editWorkspaceSuccess,
  [FAILURE(EDIT_WORKSPACE)]: editWorkspaceFailure,

  [REQUEST(GET_ADMINS_NISSOKEN)]: getAdminsNissoken,
  [SUCCESS(GET_ADMINS_NISSOKEN)]: getAdminsNissokenSuccess,
  [FAILURE(GET_ADMINS_NISSOKEN)]: getAdminsNissokenFailure,

  [REQUEST(GET_WORKSPACE_DETAIL)]: getWorkspaceDetail,
  [SUCCESS(GET_WORKSPACE_DETAIL)]: getWorkspaceDetailSuccess,
  [FAILURE(GET_WORKSPACE_DETAIL)]: getWorkspaceDetailFailure,

  [REQUEST(DELETE_USER_WORKSPACE)]: deleteUserWorkspace,
  [SUCCESS(DELETE_USER_WORKSPACE)]: deleteUserWorkspaceSuccess,
  [FAILURE(DELETE_USER_WORKSPACE)]: deleteUserWorkspaceFailure,

  [REQUEST(ADD_USER_WORKSPACE)]: addUserWorkSpace,
  [SUCCESS(ADD_USER_WORKSPACE)]: addUserWorkSpaceSuccess,
  [FAILURE(ADD_USER_WORKSPACE)]: addUserWorkSpaceFailure,

  [REQUEST(RESET_WORKSPACES)]: resetWorkspaces,

  [LOCATION_CHANGE]: resetWorkspaces
})
