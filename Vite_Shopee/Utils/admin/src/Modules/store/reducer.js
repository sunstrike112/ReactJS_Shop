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
import { REQUEST, createReducer, updateObject } from 'Stores'
import { TOGGLE_SIDEBAR, HOVER_SIDEBAR, SET_THEME_REQUEST, SET_THEME_SUCCESS, SET_THEME_FAILURE, API_82_105 } from './constants'

const company = {
  isLoading: false,
  infoCompany: {},
  themeCompany: {},
  error: null
}

export const initialState = {
  sidebarCompact: false,
  sidebarHover: false,
  company: { ...company },
  api82105: {
    isError: false,
    isRequiredLogout: false
  }
}

function toggleSidebar(state) {
  return updateObject(state, {
    sidebarCompact: !state.sidebarCompact
  })
}

function hoverSidebar(state) {
  return updateObject(state, {
    sidebarHover: !state.sidebarHover
  })
}

function setThemeRequest(state) {
  return updateObject(state, {
    company: {
      ...state.company,
      isLoading: true
    }
  })
}

function setThemeSuccess(state, { data }) {
  const { infoCompany, themeCompany } = data
  return updateObject(state, {
    company: {
      ...state.company,
      isLoading: false,
      infoCompany,
      themeCompany
    }
  })
}

function setThemeFailure(state, { error }) {
  return updateObject(state, {
    company: {
      ...state.company,
      isLoading: false,
      error
    }
  })
}

function updateApi82105(state, { payload }) {
  return updateObject(state, {
    api82105: {
      ...state.api82105,
      ...payload
    }
  })
}

// Slice reducer
export default createReducer(initialState, {
  [TOGGLE_SIDEBAR]: toggleSidebar,
  [HOVER_SIDEBAR]: hoverSidebar,

  [SET_THEME_REQUEST]: setThemeRequest,
  [SET_THEME_SUCCESS]: setThemeSuccess,
  [SET_THEME_FAILURE]: setThemeFailure,

  [REQUEST(API_82_105)]: updateApi82105
})
