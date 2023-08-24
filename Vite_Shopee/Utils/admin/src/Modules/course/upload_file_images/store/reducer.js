import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { LOCATION_CHANGE } from 'connected-react-router'
import {
  GET_FOLDER_TREE_IMAGE,
  GET_LIST_FOLDER_FILE_IMAGE,
  GET_DETAIL_FOLDER_FILE_IMAGE,
  DELETE_LIST_FOLDER_FILE_IMAGE,
  ADD_NEW_FOLDER_IMAGE,
  UPDATE_FOLDER_FILE_IMAGE,
  UPLOAD_FILE_IMAGE,
  SEARCH_FILE_IMAGE,
  MOVE_FILE_IMAGE,
  RESET_LIST_FOLDER_FILE,
  UPLOAD_FILES_IMAGE
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  isSubmitting: false,
  folderTree: {},
  folderFiles: {},
  folderFile: {},
  selectedFolderFile: {},
  fileIds: [],
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

function uploadFiles(state) {
  return updateObject(state, {
    ...state,
    isSubmitting: true
  })
}

function uploadFilesSuccess(state, { filesUpload }) {
  const ids = filesUpload.map((item) => item.id)
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    fileIds: ids
  })
}

function uploadFilesFailure(state, { error }) {
  return updateObject(state, {
    ...state,
    isSubmitting: false,
    error
  })
}

function resetState(state) {
  return updateObject(state, {
    ...state,
    folderFiles: { ...initialState.folderFiles },
    selectedFolderFile: { ...initialState.selectedFolderFile }
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(GET_FOLDER_TREE_IMAGE)]: getFolderTree,
  [SUCCESS(GET_FOLDER_TREE_IMAGE)]: getFolderTreeSuccess,
  [FAILURE(GET_FOLDER_TREE_IMAGE)]: getFolderTreeFailure,

  [REQUEST(GET_LIST_FOLDER_FILE_IMAGE)]: getFolderFiles,
  [SUCCESS(GET_LIST_FOLDER_FILE_IMAGE)]: getFolderFilesSuccess,
  [FAILURE(GET_LIST_FOLDER_FILE_IMAGE)]: getFolderFilesFailure,

  [REQUEST(GET_DETAIL_FOLDER_FILE_IMAGE)]: getFolderFile,
  [SUCCESS(GET_DETAIL_FOLDER_FILE_IMAGE)]: getFolderFileSuccess,
  [FAILURE(GET_DETAIL_FOLDER_FILE_IMAGE)]: getFolderFileFailure,

  [REQUEST(ADD_NEW_FOLDER_IMAGE)]: addNewFolder,
  [SUCCESS(ADD_NEW_FOLDER_IMAGE)]: addNewFolderSuccess,
  [FAILURE(ADD_NEW_FOLDER_IMAGE)]: addNewFolderFailure,

  [REQUEST(UPDATE_FOLDER_FILE_IMAGE)]: updateFolderFile,
  [SUCCESS(UPDATE_FOLDER_FILE_IMAGE)]: updateFolderFileSuccess,
  [FAILURE(UPDATE_FOLDER_FILE_IMAGE)]: updateFolderFileFailure,

  [REQUEST(DELETE_LIST_FOLDER_FILE_IMAGE)]: deleteFolderFiles,
  [SUCCESS(DELETE_LIST_FOLDER_FILE_IMAGE)]: deleteFolderFilesSuccess,
  [FAILURE(DELETE_LIST_FOLDER_FILE_IMAGE)]: deleteFolderFilesFailure,

  [REQUEST(UPLOAD_FILE_IMAGE)]: uploadFile,
  [SUCCESS(UPLOAD_FILE_IMAGE)]: uploadFileSuccess,
  [FAILURE(UPLOAD_FILE_IMAGE)]: uploadFileFailure,

  [REQUEST(SEARCH_FILE_IMAGE)]: searchFile,
  [SUCCESS(SEARCH_FILE_IMAGE)]: searchFileSuccess,
  [FAILURE(SEARCH_FILE_IMAGE)]: searchFileFailure,

  [REQUEST(MOVE_FILE_IMAGE)]: moveFile,
  [SUCCESS(MOVE_FILE_IMAGE)]: moveFileSuccess,
  [FAILURE(MOVE_FILE_IMAGE)]: searchFileFailure,

  [REQUEST(UPLOAD_FILES_IMAGE)]: uploadFiles,
  [SUCCESS(UPLOAD_FILES_IMAGE)]: uploadFilesSuccess,
  [FAILURE(UPLOAD_FILES_IMAGE)]: uploadFilesFailure,

  [REQUEST(RESET_LIST_FOLDER_FILE)]: resetState,

  [LOCATION_CHANGE]: resetState
})
