/* eslint-disable no-unused-vars */
import { REQUEST } from '../../store'
import {
  LOAD_REPOS_ERROR,
  CHECK_NETWORK,
  LOAD_INIT_DISPLAY,
  GET_MAINTAIN_NOTICE_REQUEST,
  GET_MAINTAIN_NOTICE_SUCCESS,
  GET_MAINTAIN_NOTICE_FAILURE,
  GET_STATUS_MAINTAIN_REQUEST,
  GET_STATUS_MAINTAIN_SUCCESS,
  GET_STATUS_MAINTAIN_FAILURE,
  LOADING_PORTAL_REQUEST,
  LOADING_PORTAL_STOP,
  SET_THEME_REQUEST
} from './constants'

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error
  }
}

export function checkNetwork(isOnline) {
  return {
    type: CHECK_NETWORK,
    isOnline
  }
}

export function loadInitDisplay(data) {
  return {
    type: LOAD_INIT_DISPLAY,
    data
  }
}

export function getMaintainNoticeRequest() {
  return {
    type: GET_MAINTAIN_NOTICE_REQUEST
  }
}

export function getMaintainNoticeSuccess(data) {
  return {
    type: GET_MAINTAIN_NOTICE_SUCCESS,
    data
  }
}

export function getMaintainNoticeFailure(error) {
  return {
    type: GET_MAINTAIN_NOTICE_FAILURE,
    error
  }
}

export function getStatusMaintainRequest() {
  return {
    type: GET_STATUS_MAINTAIN_REQUEST
  }
}

export function getStatusMaintainSuccess(data) {
  return {
    type: GET_STATUS_MAINTAIN_SUCCESS,
    data
  }
}

export function getStatusMaintainFailure(error) {
  return {
    type: GET_STATUS_MAINTAIN_FAILURE,
    error
  }
}

export function loadingPortalRequest() {
  return {
    type: LOADING_PORTAL_REQUEST
  }
}

export function loadingPortalStop() {
  return {
    type: LOADING_PORTAL_STOP
  }
}

export function setTheme(payload) {
  return {
    type: SET_THEME_REQUEST,
    payload
  }
}
