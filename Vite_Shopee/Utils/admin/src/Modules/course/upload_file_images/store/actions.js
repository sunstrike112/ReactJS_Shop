import { REQUEST } from 'Stores'
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
  RESET_LIST_FOLDER_FILE
} from './constants'

export function getFolderTree(payload) {
  return {
    type: REQUEST(GET_FOLDER_TREE_IMAGE),
    payload
  }
}

export function getFolderFiles(payload) {
  return {
    type: REQUEST(GET_LIST_FOLDER_FILE_IMAGE),
    payload
  }
}

export function getDetailFolderFile(payload) {
  return {
    type: REQUEST(GET_DETAIL_FOLDER_FILE_IMAGE),
    payload
  }
}

export function deleteFolderFiles(payload) {
  return {
    type: REQUEST(DELETE_LIST_FOLDER_FILE_IMAGE),
    payload
  }
}

export function addNewFolder(payload) {
  return {
    type: REQUEST(ADD_NEW_FOLDER_IMAGE),
    payload
  }
}

export function updateFolderFile(payload) {
  return {
    type: REQUEST(UPDATE_FOLDER_FILE_IMAGE),
    payload
  }
}

export function uploadFile(payload) {
  return {
    type: REQUEST(UPLOAD_FILE_IMAGE),
    payload
  }
}

export function searchFile(payload) {
  return {
    type: REQUEST(SEARCH_FILE_IMAGE),
    payload
  }
}

export function moveFile(payload) {
  return {
    type: REQUEST(MOVE_FILE_IMAGE),
    payload
  }
}

export function resetState() {
  return {
    type: REQUEST(RESET_LIST_FOLDER_FILE)
  }
}
