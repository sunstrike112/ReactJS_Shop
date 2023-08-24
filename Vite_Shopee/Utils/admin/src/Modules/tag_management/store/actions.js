import { REQUEST } from 'Stores'
import {
  GET_LIST_TAG,
  CREATE_TAG,
  UPDATE_TAG,
  DELETE_TAG,
  RESET_LIST_TAG
} from './constants'

function getListTagAction(payload) {
  return {
    type: REQUEST(GET_LIST_TAG),
    payload
  }
}

function createTagAction(payload) {
  return {
    type: REQUEST(CREATE_TAG),
    payload
  }
}

function updateTagAction(payload) {
  return {
    type: REQUEST(UPDATE_TAG),
    payload
  }
}

function deleteTagAction(payload) {
  return {
    type: REQUEST(DELETE_TAG),
    payload
  }
}

function resetState() {
  return {
    type: REQUEST(RESET_LIST_TAG)
  }
}

export {
  getListTagAction,
  createTagAction,
  updateTagAction,
  deleteTagAction,
  resetState
}
