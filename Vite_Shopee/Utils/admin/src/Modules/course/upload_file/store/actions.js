import { REQUEST } from 'Stores'
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

export function getFolderTree(payload) {
  return {
    type: REQUEST(GET_FOLDER_TREE),
    payload
  }
}

export function getFolderFiles(payload) {
  return {
    type: REQUEST(GET_LIST_FOLDER_FILE),
    payload
  }
}

export function getDetailFolderFile(payload) {
  return {
    type: REQUEST(GET_DETAIL_FOLDER_FILE),
    payload
  }
}

export function deleteFolderFiles(payload) {
  return {
    type: REQUEST(DELETE_LIST_FOLDER_FILE),
    payload
  }
}

export function addNewFolder(payload) {
  return {
    type: REQUEST(ADD_NEW_FOLDER),
    payload
  }
}

export function updateFolderFile(payload) {
  return {
    type: REQUEST(UPDATE_FOLDER_FILE),
    payload
  }
}

export function uploadFile(payload) {
  return {
    type: REQUEST(UPLOAD_FILE),
    payload
  }
}

export function searchFile(payload) {
  return {
    type: REQUEST(SEARCH_FILE),
    payload
  }
}

export function moveFile(payload) {
  return {
    type: REQUEST(MOVE_FILE),
    payload
  }
}

export function resetState() {
  return {
    type: REQUEST(RESET_LIST_FOLDER_FILE)
  }
}
