import { REQUEST } from 'Stores'
import {
  CREATE_NOTIFI,
  LOAD_FIND_USER,
  DELETE_NOTIFI,
  LOAD_LIST_USER,
  GET_NOTIFI,
  EDIT_NOTIFI,
  LOAD_SEND_HISTORY,
  DELETE_HISTORY,
  GET_EMAIL_DETAIL,
  RESET_NOTIFICATIONS,
  RESET_EMAIL_HISTORIES
} from './constants'

export function createNotifi(payload) {
  return {
    type: REQUEST(CREATE_NOTIFI),
    payload
  }
}

export function loadFindUser(payload) {
  return {
    type: REQUEST(LOAD_FIND_USER),
    payload
  }
}

export function loadSendHistory(payload) {
  return {
    type: REQUEST(LOAD_SEND_HISTORY),
    payload
  }
}

export function deleteHistory(payload) {
  return {
    type: REQUEST(DELETE_HISTORY),
    payload
  }
}

export function getEmailDetail(payload) {
  return {
    type: REQUEST(GET_EMAIL_DETAIL),
    payload
  }
}

export function deleteNotifi(payload) {
  return {
    type: REQUEST(DELETE_NOTIFI),
    payload
  }
}

export function listUser(payload) {
  return {
    type: REQUEST(LOAD_LIST_USER),
    payload
  }
}

export function getNotifi(payload) {
  return {
    type: REQUEST(GET_NOTIFI),
    payload
  }
}

export function editNotifi(payload) {
  return {
    type: REQUEST(EDIT_NOTIFI),
    payload
  }
}

export function resetNotifications() {
  return {
    type: REQUEST(RESET_NOTIFICATIONS)
  }
}

export function resetEmailHistories() {
  return {
    type: REQUEST(RESET_EMAIL_HISTORIES)
  }
}
