import { LOCATION_CHANGE } from 'connected-react-router'
import { updateObject, createReducer, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  LOAD_LIST_PROJECT,
  DELETE_PROJECT,
  CREATE_PROJECT,
  LINK_FILE_TO_PROJECT,
  PUBLISH_PROJECT,
  RESET_LIST_PROJECT
} from './constants'

export const initialState = {
  isLoading: false,
  pagination: {
    page: 1,
    limit: 100
  },
  listProject: [],
  isUploaded: false,
  isDeleted: false,
  error: null,
  publishState: null // maybe: null, publishing, published
}

function loadListProject(state) {
  return updateObject(state, {
    isLoading: true,
    error: null
  })
}

function loadListProjectSuccess(state, { payload }) {
  const { listProject, pagination } = payload
  return updateObject(state, {
    isLoading: false,
    listProject,
    pagination
  })
}

export function repoLoadingError(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function deleteProject(state) {
  return updateObject(state, {
    isLoading: true,
    isDeleted: false,
    publishState: null,
    error: null
  })
}

function deleteProjectSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    isDeleted: true
  })
}

function createProject(state) {
  return updateObject(state, {
    isLoading: true,
    isUploaded: false,
    publishState: null,
    error: null
  })
}

function createProjectSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    isUploaded: true
  })
}

function linkFileToProject(state) {
  return updateObject(state, {
    error: null,
    isLoading: true,
    isUploaded: false,
    publishState: null
  })
}

function linkFileToProjectSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    isUploaded: true,
    error: null
  })
}

function publishProject(state) {
  return updateObject(state, {
    error: null,
    isLoading: true,
    isUploaded: false,
    publishState: 'publishing'
  })
}

function publishProjectSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    publishState: 'published'
  })
}

function resetState(state) {
  return updateObject(state, {
    ...initialState
  })
}

export default createReducer(initialState, {
  [REQUEST(LOAD_LIST_PROJECT)]: loadListProject,
  [SUCCESS(LOAD_LIST_PROJECT)]: loadListProjectSuccess,
  [FAILURE(LOAD_LIST_PROJECT)]: repoLoadingError,

  [REQUEST(DELETE_PROJECT)]: deleteProject,
  [SUCCESS(DELETE_PROJECT)]: deleteProjectSuccess,
  [FAILURE(DELETE_PROJECT)]: repoLoadingError,

  [REQUEST(CREATE_PROJECT)]: createProject,
  [SUCCESS(CREATE_PROJECT)]: createProjectSuccess,
  [FAILURE(CREATE_PROJECT)]: repoLoadingError,

  [REQUEST(LINK_FILE_TO_PROJECT)]: linkFileToProject,
  [SUCCESS(LINK_FILE_TO_PROJECT)]: linkFileToProjectSuccess,
  [FAILURE(LINK_FILE_TO_PROJECT)]: repoLoadingError,

  [REQUEST(PUBLISH_PROJECT)]: publishProject,
  [SUCCESS(PUBLISH_PROJECT)]: publishProjectSuccess,
  [FAILURE(PUBLISH_PROJECT)]: repoLoadingError,

  [REQUEST(RESET_LIST_PROJECT)]: resetState,

  [LOCATION_CHANGE]: resetState
})
