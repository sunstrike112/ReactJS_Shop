import { REQUEST } from 'Stores'
import {
  LOGIN_HISTORY, RESET_LOGIN_HISTORIES
} from './constants'

export function loadLoginHistories(payload) {
  return {
    type: REQUEST(LOGIN_HISTORY),
    payload
  }
}

export function resetLoginHistories() {
  return {
    type: REQUEST(RESET_LOGIN_HISTORIES)
  }
}
