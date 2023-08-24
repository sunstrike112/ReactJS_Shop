import { REQUEST } from 'Stores'
import { UPLOAD_RECORDING, FOLDER_RECORDING, CHECK_EXIST_FILENAME, UPLOAD_S3 } from './constants'

export function uploadRecording(payload) {
  return {
    type: REQUEST(UPLOAD_RECORDING),
    payload
  }
}

export function uploadS3(payload) {
  return {
    type: REQUEST(UPLOAD_S3),
    payload
  }
}

export function getFolderRecording(payload) {
  return {
    type: REQUEST(FOLDER_RECORDING),
    payload
  }
}

export function checkExistFileName(payload) {
  return {
    type: REQUEST(CHECK_EXIST_FILENAME),
    payload
  }
}
