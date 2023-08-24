import { REQUEST } from 'Stores'
import {
  LOAD_LIST_PROJECT,
  DELETE_PROJECT,
  CREATE_PROJECT,
  LINK_FILE_TO_PROJECT,
  PUBLISH_PROJECT,
  RESET_LIST_PROJECT
} from './constants'

export function loadListProject(payload) {
  return {
    type: REQUEST(LOAD_LIST_PROJECT),
    payload
  }
}
export function deleteProject(payload) {
  return {
    type: REQUEST(DELETE_PROJECT),
    payload
  }
}

export function createProject(payload) {
  return {
    type: REQUEST(CREATE_PROJECT),
    payload
  }
}

export function linkFileToProject(payload) {
  return {
    type: REQUEST(LINK_FILE_TO_PROJECT),
    payload
  }
}

export function publishProject(payload) {
  return {
    type: REQUEST(PUBLISH_PROJECT),
    payload
  }
}
export function resetState() {
  return {
    type: REQUEST(RESET_LIST_PROJECT)
  }
}
