import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, updateObject } from '../../../store'
import {
  GET_EMAIL_FROM_TOKEN_FAILURE,
  GET_EMAIL_FROM_TOKEN_REQUEST,
  GET_EMAIL_FROM_TOKEN_SUCCESS,
  GET_EMAIL_RESET_ERROR,
  GET_EMAIL_RESET_REQUEST,
  GET_EMAIL_RESET_SUCCESS,
  LOAD_WORKSPACES_FAILURE,
  LOAD_WORKSPACES_REQUEST,
  LOAD_WORKSPACES_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SETTING_PASSWORD_FAILURE,
  SETTING_PASSWORD_REQUEST,
  SETTING_PASSWORD_SUCCESS,
  VERIFY_TOKEN_FAILURE,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  RESET_LOGIN_ERROR
} from './constants'

export const initialState = {
  currentUser: {
    isLoading: false,
    data: null,
    error: null
  },
  emailReset: {
    isLoading: false,
    isSent: false,
    data: null,
    error: null
  },
  verifyToken: {
    isLoading: false,
    isVerify: false,
    data: {},
    error: null
  },
  settingPassword: {
    isLoading: false,
    isSuccess: false,
    data: {},
    error: null
  },
  emailFromToken: {
    isLoading: false,
    data: null,
    error: null
  },
  workspaces: {
    isLoading: false,
    data: [],
    error: null
  }
}

function loginRequest(state) {
  return updateObject(state, {
    currentUser: {
      ...state.currentUser,
      isLoading: true
    }
  })
}

function loginSuccess(state, { data }) {
  return updateObject(state, {
    currentUser: {
      ...state.currentUser,
      isLoading: false,
      data: data || state.currentUser.data,
      error: null
    }
  })
}

function loginFailure(state, { error }) {
  return updateObject(state, {
    currentUser: {
      ...state.currentUser,
      isLoading: false,
      error
    }
  })
}

function resetLoginError(state) {
  return updateObject(state, {
    currentUser: {
      ...state.currentUser,
      error: null
    }
  })
}

function logoutRequest(state) {
  return updateObject(state, {
    currentUser: {
      ...state.currentUser,
      isLoading: true
    }
  })
}

function logoutSuccess() {
  return updateObject(initialState, { })
}

function logoutFailure(state, { error }) {
  return updateObject(state, {
    currentUser: {
      ...state.currentUser,
      isLoading: false,
      error
    }
  })
}

function getEmailResetRequest(state) {
  return updateObject(state, {
    emailReset: {
      ...state.emailReset,
      isLoading: true
    }
  })
}

function getEmailResetSuccess(state, { data }) {
  const { isSent } = data
  return updateObject(state, {
    emailReset: {
      ...state.emailReset,
      isLoading: false,
      isSent
    }
  })
}

function getEmailResetError(state, { error }) {
  return updateObject(state, {
    emailReset: {
      ...state.emailReset,
      isLoading: false,
      error
    }
  })
}

function getVerifyTokenRequest(state) {
  return updateObject(state, {
    verifyToken: {
      ...state.verifyToken,
      isLoading: true
    }
  })
}

function getVerifyTokenSuccess(state, { data }) {
  return updateObject(state, {
    verifyToken: {
      ...state.verifyToken,
      isLoading: false,
      isVerify: true,
      data: data || state.verifyToken.data
    }
  })
}

function getVerifyTokenError(state, { error }) {
  return updateObject(state, {
    verifyToken: {
      ...state.verifyToken,
      isLoading: false,
      error
    }
  })
}

function settingPasswordRequest(state) {
  return updateObject(state, {
    settingPassword: {
      ...state.settingPassword,
      isLoading: true
    }
  })
}

function settingPasswordSuccess(state, { data }) {
  return updateObject(state, {
    settingPassword: {
      ...state.settingPassword,
      isLoading: false,
      isSuccess: true,
      data: data || state.settingPassword.data
    }
  })
}

function settingPasswordFailure(state, { error }) {
  return updateObject(state, {
    settingPassword: {
      ...state.settingPassword,
      isLoading: false,
      error
    }
  })
}

function getEmailFromTokenRequest(state) {
  return updateObject(state, {
    emailFromToken: {
      ...state.emailFromToken,
      isLoading: true
    }
  })
}

function getEmailFromTokenSuccess(state, { data }) {
  return updateObject(state, {
    emailFromToken: {
      ...state.emailFromToken,
      isLoading: false,
      data
    }
  })
}

function getEmailFromTokenFailure(state, { error }) {
  return updateObject(state, {
    emailFromToken: {
      ...state.emailFromToken,
      isLoading: false,
      error
    }
  })
}

function loadWorkspacesRequest(state) {
  return updateObject(state, {
    workspaces: {
      ...state.workspaces,
      isLoading: true
    }
  })
}

function loadWorkspacesSuccess(state, { data }) {
  return updateObject(state, {
    workspaces: {
      ...state.workspaces,
      isLoading: false,
      data
    }
  })
}

function loadWorkspacesFailure(state, { error }) {
  return updateObject(state, {
    workspaces: {
      ...state.workspaces,
      isLoading: false,
      error
    }
  })
}

function resetState(state) {
  return updateObject(state, {
    currentUser: {
      ...state.currentUser,
      error: null
    },
    emailReset: {
      ...state.emailReset,
      isSent: false,
      error: null
    },
    settingPassword: {
      ...state.settingPassword,
      isSuccess: false
    }
  })
}

export default createReducer(initialState, {
  [LOGIN_REQUEST]: loginRequest,
  [LOGIN_SUCCESS]: loginSuccess,
  [LOGIN_FAILURE]: loginFailure,
  [RESET_LOGIN_ERROR]: resetLoginError,

  [LOGOUT_REQUEST]: logoutRequest,
  [LOGOUT_SUCCESS]: logoutSuccess,
  [LOGOUT_FAILURE]: logoutFailure,

  [GET_EMAIL_RESET_REQUEST]: getEmailResetRequest,
  [GET_EMAIL_RESET_SUCCESS]: getEmailResetSuccess,
  [GET_EMAIL_RESET_ERROR]: getEmailResetError,

  [VERIFY_TOKEN_REQUEST]: getVerifyTokenRequest,
  [VERIFY_TOKEN_SUCCESS]: getVerifyTokenSuccess,
  [VERIFY_TOKEN_FAILURE]: getVerifyTokenError,

  [SETTING_PASSWORD_REQUEST]: settingPasswordRequest,
  [SETTING_PASSWORD_SUCCESS]: settingPasswordSuccess,
  [SETTING_PASSWORD_FAILURE]: settingPasswordFailure,

  [GET_EMAIL_FROM_TOKEN_REQUEST]: getEmailFromTokenRequest,
  [GET_EMAIL_FROM_TOKEN_SUCCESS]: getEmailFromTokenSuccess,
  [GET_EMAIL_FROM_TOKEN_FAILURE]: getEmailFromTokenFailure,

  [LOAD_WORKSPACES_REQUEST]: loadWorkspacesRequest,
  [LOAD_WORKSPACES_SUCCESS]: loadWorkspacesSuccess,
  [LOAD_WORKSPACES_FAILURE]: loadWorkspacesFailure,

  [LOCATION_CHANGE]: resetState
})
