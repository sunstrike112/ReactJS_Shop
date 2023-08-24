/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 * @param  {state} login state
 * @param  {action} login action
 */
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  UPLOAD_RECORDING,
  FOLDER_RECORDING,
  CHECK_EXIST_FILENAME,
  UPLOAD_S3
} from './constants'

export const initialState = {
  isLoading: false,
  isUploadSuccess: false,
  error: null,
  parentFolderId: null,
  isExistFileName: false,
  urlS3: null
}

function uploadRecording(state) {
  return updateObject(state, {
    isLoading: true,
    isUploadSuccess: false
  })
}

function uploadRecordingSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    isUploadSuccess: true
  })
}

function uploadRecordingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false,
    isUploadSuccess: false
  })
}

function uploadS3(state) {
  return updateObject(state, {
    isLoading: true,
    isUploadSuccess: false
  })
}

function uploadS3Success(state, { urlS3 }) {
  return updateObject(state, {
    isLoading: false,
    urlS3
  })
}

function uploadS3Error(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false,
    isUploadSuccess: false
  })
}

function getFolderRecording(state) {
  return updateObject(state, {
    isUploadSuccess: false
  })
}

function getFolderRecordingSuccess(state, { parentFolderId }) {
  return updateObject(state, {
    isLoading: false,
    parentFolderId
  })
}

function getFolderRecordingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false,
    isUploadSuccess: false
  })
}

function checkExistFileName(state) {
  return updateObject(state, {
    isExistFileName: false
  })
}

function checkExistFileNameSuccess(state, { isExistFileName }) {
  return updateObject(state, {
    isExistFileName
  })
}

function checkExistFileNameError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false,
    isUploadSuccess: false,
    isExistFileName: false
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(UPLOAD_RECORDING)]: uploadRecording,
  [SUCCESS(UPLOAD_RECORDING)]: uploadRecordingSuccess,
  [FAILURE(UPLOAD_RECORDING)]: uploadRecordingError,
  [REQUEST(UPLOAD_S3)]: uploadS3,
  [SUCCESS(UPLOAD_S3)]: uploadS3Success,
  [FAILURE(UPLOAD_S3)]: uploadS3Error,
  [REQUEST(FOLDER_RECORDING)]: getFolderRecording,
  [SUCCESS(FOLDER_RECORDING)]: getFolderRecordingSuccess,
  [FAILURE(FOLDER_RECORDING)]: getFolderRecordingError,
  [REQUEST(CHECK_EXIST_FILENAME)]: checkExistFileName,
  [SUCCESS(CHECK_EXIST_FILENAME)]: checkExistFileNameSuccess,
  [FAILURE(CHECK_EXIST_FILENAME)]: checkExistFileNameError
})
