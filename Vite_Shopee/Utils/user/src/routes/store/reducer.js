/* eslint-disable no-unused-vars */
/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 * @param  {state} login state
 * @param  {action} login action
 */
import { createReducer, updateObject } from '../../store'
import {
  LOAD_REPOS_ERROR,
  CHECK_NETWORK,
  SHOW_MAINTAIN_NOTICE,
  LOAD_INIT_DISPLAY,
  GET_MAINTAIN_NOTICE_REQUEST,
  GET_MAINTAIN_NOTICE_SUCCESS,
  GET_MAINTAIN_NOTICE_FAILURE,
  GET_STATUS_MAINTAIN_REQUEST,
  GET_STATUS_MAINTAIN_SUCCESS,
  GET_STATUS_MAINTAIN_FAILURE,
  LOADING_PORTAL_REQUEST,
  LOADING_PORTAL_STOP,
  SET_THEME_FAILURE,
  SET_THEME_SUCCESS
} from './constants'

const company = {
  isLoading: false,
  infoCompany: {},
  themeCompany: {},
  error: null
}

export const initialState = {
  isOnline: true,
  isMaintainNotice: false,
  isLoadingPortal: false,
  maintainNotice: {
    isLoading: false,
    data: null,
    error: null,
    status: false
  },
  initDisplay: {
    menu: '',
    tab: ''
  },
  company: { ...company }
}

function repoLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function checkNetwork(state, { isOnline }) {
  return updateObject(state, {
    isOnline
  })
}

function showMaintainNotice(state, { isMaintainNotice }) {
  return updateObject(state, {
    isMaintainNotice
  })
}

function getMaintainNoticeRequest(state) {
  return updateObject(state, {
    maintainNotice: {
      ...state.maintainNotice,
      isLoading: true
    }
  })
}

function getMaintainNoticeSuccess(state, { data }) {
  return updateObject(state, {
    maintainNotice: {
      ...state.maintainNotice,
      isLoading: false,
      data
    }
  })
}

function getMaintainNoticeFailure(state, { error }) {
  return updateObject(state, {
    maintainNotice: {
      ...state.maintainNotice,
      isLoading: false,
      error
    }
  })
}

function getStatusMaintainRequest(state) {
  return updateObject(state, {
    maintainNotice: {
      ...state.maintainNotice,
      isLoading: true
    }
  })
}

function getStatusMaintainSuccess(state) {
  return updateObject(state, {
    maintainNotice: {
      ...state.maintainNotice,
      isLoading: false,
      status: true
    }
  })
}

function getStatusMaintainFailure(state, { error }) {
  return updateObject(state, {
    maintainNotice: {
      ...state.maintainNotice,
      isLoading: false,
      error
    }
  })
}

function loadingPortalRequest(state) {
  return updateObject(state, {
    ...state,
    isLoadingPortal: true
  })
}

function loadingPortalStop(state) {
  return updateObject(state, {
    ...state,
    isLoadingPortal: false
  })
}

function setThemeSuccess(state, { data }) {
  const { infoCompany, themeCompany } = data
  return updateObject(state, {
    company: {
      ...state.company,
      infoCompany,
      themeCompany
    }
  })
}

function setThemeFailure(state, { error }) {
  return updateObject(state, {
    company: {
      ...state.company,
      error
    }
  })
}

function loadInitDisplay(state, { data }) {
  return updateObject(state, {
    initDisplay: {
      ...state.initDisplay,
      ...data
    }
  })
}

export default createReducer(initialState, {
  [CHECK_NETWORK]: checkNetwork,

  [LOAD_REPOS_ERROR]: repoLoadingError,

  [SHOW_MAINTAIN_NOTICE]: showMaintainNotice,

  [LOAD_INIT_DISPLAY]: loadInitDisplay,

  [GET_MAINTAIN_NOTICE_REQUEST]: getMaintainNoticeRequest,
  [GET_MAINTAIN_NOTICE_SUCCESS]: getMaintainNoticeSuccess,
  [GET_MAINTAIN_NOTICE_FAILURE]: getMaintainNoticeFailure,

  [GET_STATUS_MAINTAIN_REQUEST]: getStatusMaintainRequest,
  [GET_STATUS_MAINTAIN_SUCCESS]: getStatusMaintainSuccess,
  [GET_STATUS_MAINTAIN_FAILURE]: getStatusMaintainFailure,

  [LOADING_PORTAL_REQUEST]: loadingPortalRequest,
  [LOADING_PORTAL_STOP]: loadingPortalStop,

  [SET_THEME_SUCCESS]: setThemeSuccess,
  [SET_THEME_FAILURE]: setThemeFailure
})
