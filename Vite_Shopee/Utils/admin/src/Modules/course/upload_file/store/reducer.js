import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { LOCATION_CHANGE } from 'connected-react-router'
import {
  GET_FOLDER_TREE,
  GET_LIST_FOLDER_FILE,
  GET_DETAIL_FOLDER_FILE,
  DELETE_LIST_FOLDER_FILE,
  ADD_NEW_FOLDER,
  UPDATE_FOLDER_FILE,
  UPLOAD_FILE,
  SEARCH_FILE,
  MOVE_FILE,
  RESET_LIST_FOLDER_FILE
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  isSubmitting: false,
  folderTree: {},
  folderFiles: {},
  folderFile: {},
  selectedFolderFile: {},
  isMoveFile: false
}

function getFolderTree(state) {
  return updateObject(state, {
    ...state,
    isLoading: true
  })
}

function getFolderTreeSuccess(state, { folderTree }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    folderTree
  })
}

function getFolderTreeFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    error
  })
}

function getFolderFiles(state) {
  return updateObject(state, {
    ...state,
    isLoading: true
  })
}

function getFolderFilesSuccess(state, { folderFiles, selectedFolderFile }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    folderFiles,
    selectedFolderFile
  })
}

function getFolderFilesFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    error
  })
}

function getFolderFile(state) {
  return updateObject(state, {
    ...state,
    isLoading: true
  })
}

function getFolderFileSuccess(state, { folderFile }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    folderFile
  })
}

function getFolderFileFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    error
  })
}

function deleteFolderFiles(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: true
  })
}

function deleteFolderFilesSuccess(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: false
  })
}

function deleteFolderFilesFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    error
  })
}

function addNewFolder(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: true
  })
}

function addNewFolderSuccess(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: false
  })
}

function addNewFolderFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    error
  })
}

function updateFolderFile(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: true
  })
}

function updateFolderFileSuccess(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: false
  })
}

function updateFolderFileFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    error
  })
}

function uploadFile(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: true
  })
}

function uploadFileSuccess(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: false
  })
}

function uploadFileFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    error
  })
}

function searchFile(state) {
  return updateObject(state, {
    ...state,
    isLoading: true
  })
}

function searchFileSuccess(state, { folderFiles }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    folderFiles
  })
}

function searchFileFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isLoading: false,
    error
  })
}

function moveFile(state) {
  return updateObject(state, {
    isLoading: true,
    isMoveFile: false
  })
}

function moveFileSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    isMoveFile: true
  })
}

function resetState(state) {
  return updateObject({
    ...state,
    folderFiles: { ...initialState.folderFiles },
    selectedFolderFile: { ...initialState.selectedFolderFile }
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(GET_FOLDER_TREE)]: getFolderTree,
  [SUCCESS(GET_FOLDER_TREE)]: getFolderTreeSuccess,
  [FAILURE(GET_FOLDER_TREE)]: getFolderTreeFailure,

  [REQUEST(GET_LIST_FOLDER_FILE)]: getFolderFiles,
  [SUCCESS(GET_LIST_FOLDER_FILE)]: getFolderFilesSuccess,
  [FAILURE(GET_LIST_FOLDER_FILE)]: getFolderFilesFailure,

  [REQUEST(GET_DETAIL_FOLDER_FILE)]: getFolderFile,
  [SUCCESS(GET_DETAIL_FOLDER_FILE)]: getFolderFileSuccess,
  [FAILURE(GET_DETAIL_FOLDER_FILE)]: getFolderFileFailure,

  [REQUEST(ADD_NEW_FOLDER)]: addNewFolder,
  [SUCCESS(ADD_NEW_FOLDER)]: addNewFolderSuccess,
  [FAILURE(ADD_NEW_FOLDER)]: addNewFolderFailure,

  [REQUEST(UPDATE_FOLDER_FILE)]: updateFolderFile,
  [SUCCESS(UPDATE_FOLDER_FILE)]: updateFolderFileSuccess,
  [FAILURE(UPDATE_FOLDER_FILE)]: updateFolderFileFailure,

  [REQUEST(DELETE_LIST_FOLDER_FILE)]: deleteFolderFiles,
  [SUCCESS(DELETE_LIST_FOLDER_FILE)]: deleteFolderFilesSuccess,
  [FAILURE(DELETE_LIST_FOLDER_FILE)]: deleteFolderFilesFailure,

  [REQUEST(UPLOAD_FILE)]: uploadFile,
  [SUCCESS(UPLOAD_FILE)]: uploadFileSuccess,
  [FAILURE(UPLOAD_FILE)]: uploadFileFailure,

  [REQUEST(SEARCH_FILE)]: searchFile,
  [SUCCESS(SEARCH_FILE)]: searchFileSuccess,
  [FAILURE(SEARCH_FILE)]: searchFileFailure,

  [REQUEST(MOVE_FILE)]: moveFile,
  [SUCCESS(MOVE_FILE)]: moveFileSuccess,
  [FAILURE(MOVE_FILE)]: searchFileFailure,

  [REQUEST(RESET_LIST_FOLDER_FILE)]: resetState,

  [LOCATION_CHANGE]: resetState
})
