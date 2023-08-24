import { REQUEST } from 'Stores'
import { LOAD_GROUPS, LOAD_ATTRIBUTES, LOAD_RECEIVER_EMAIL, LOAD_RECEIVER_EMAIL_SELECTED, SEND_EMAIL } from './constants'

export function loadGroups() {
  return {
    type: REQUEST(LOAD_GROUPS)
  }
}

export function loadAttributes(payload) {
  return {
    type: REQUEST(LOAD_ATTRIBUTES),
    payload
  }
}

export function loadReceiverEmail(payload) {
  return {
    type: REQUEST(LOAD_RECEIVER_EMAIL),
    payload
  }
}

export function loadReceiverEmailSelected(payload) {
  return {
    type: REQUEST(LOAD_RECEIVER_EMAIL_SELECTED),
    payload
  }
}

export function sendEmail(payload) {
  return {
    type: REQUEST(SEND_EMAIL),
    payload
  }
}
