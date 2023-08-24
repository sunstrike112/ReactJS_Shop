import { REQUEST } from 'Stores'
import {
  TOGGLE_SIDEBAR,
  HOVER_SIDEBAR,
  SET_THEME_REQUEST,
  API_82_105
} from './constants'

export function toggleSidebar(payload) {
  return {
    type: TOGGLE_SIDEBAR,
    payload
  }
}

export function hoverSidebar(payload) {
  return {
    type: HOVER_SIDEBAR,
    payload
  }
}

export function setTheme(payload) {
  return {
    type: SET_THEME_REQUEST,
    payload
  }
}

export function updateApi82105(payload) {
  return {
    type: REQUEST(API_82_105),
    payload
  }
}
