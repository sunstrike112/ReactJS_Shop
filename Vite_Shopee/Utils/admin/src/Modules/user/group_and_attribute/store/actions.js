import { REQUEST } from 'Stores'
import {
  LOAD_GROUPS,
  LOAD_GROUP,
  CREATE_GROUP,
  UPDATE_GROUP,
  DELETE_GROUPS,
  LOAD_ATTRIBUTES,
  LOAD_ATTRIBUTE,
  CREATE_ATTRIBUTE,
  UPDATE_ATTRIBUTE,
  DELETE_ATTRIBUTES,
  SAVE_FILTER
} from './constants'

export function loadGroups(payload) {
  return {
    type: REQUEST(LOAD_GROUPS),
    payload
  }
}

export function loadGroup(payload) {
  return {
    type: REQUEST(LOAD_GROUP),
    payload
  }
}

export function createGroup(payload) {
  return {
    type: REQUEST(CREATE_GROUP),
    payload
  }
}

export function updateGroup(payload) {
  return {
    type: REQUEST(UPDATE_GROUP),
    payload
  }
}

export function deleteGroups(payload) {
  return {
    type: REQUEST(DELETE_GROUPS),
    payload
  }
}

export function loadAttributes(payload) {
  return {
    type: REQUEST(LOAD_ATTRIBUTES),
    payload
  }
}

export function loadAttribute(payload) {
  return {
    type: REQUEST(LOAD_ATTRIBUTE),
    payload
  }
}

export function createAttribute(payload) {
  return {
    type: REQUEST(CREATE_ATTRIBUTE),
    payload
  }
}

export function updateAttribute(payload) {
  return {
    type: REQUEST(UPDATE_ATTRIBUTE),
    payload
  }
}

export function deleteAttributes(payload) {
  return {
    type: REQUEST(DELETE_ATTRIBUTES),
    payload
  }
}

export function saveFilter(payload) {
  return {
    type: REQUEST(SAVE_FILTER),
    payload
  }
}
