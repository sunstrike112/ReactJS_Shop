import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject } from '../../../../store'

import {
  REGISTER_EMAIL,
  REGISTER_EMAIL_SUCCESS,
  REGISTER_EMAIL_ERROR,

  CHECK_EMAIL_EXIST,
  CHECK_EMAIL_EXIST_SUCCESS,
  CHECK_EMAIL_EXIST_ERROR,

  REGISTER_COMPANY,
  REGISTER_COMPANY_SUCCESS,
  REGISTER_COMPANY_ERROR,
  EMAIL_COMPANY_INVALID
} from './constants'

export const initialState = {
  isLoading: false,
  isSuccess: false,
  error: null,
  validateEmailCompany: {},
  emailExist: {
    isLoading: false,
    data: {
      address: null,
      careerName: null,
      cellPhoneNumber: null,
      companyName: null,
      email: '',
      firstFurigana: null,
      firstName: null,
      lastFurigana: null,
      lastName: null,
      statusExist: '',
      telPhoneNumber: null
    },
    error: null
  },
  registerCompany: {
    isLoading: false,
    isSuccess: false,
    error: null
  }
}

function registerEmail(state) {
  return updateObject(state, {
    isLoading: true,
    isSuccess: false,
    error: null
  })
}

function registerEmailSuccess(state, { isSuccess }) {
  return updateObject(state, {
    isLoading: false,
    error: null,
    isSuccess
  })
}

function registerEmailError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function registerCompany(state) {
  return updateObject(state, {
    registerCompany: {
      isLoading: true,
      isSuccess: false,
      error: null
    }
  })
}

function registerCompanySuccess(state) {
  return updateObject(state, {
    registerCompany: {
      isLoading: false,
      isSuccess: true,
      error: null
    }
  })
}

function registerCompanyError(state, { error }) {
  return updateObject(state, {
    registerCompany: {
      isLoading: false,
      isSuccess: false,
      error
    },
    emailExist: {
      ...state.emailExist,
      error
    }
  })
}

function checkEmailExist(state) {
  return updateObject(state, {
    emailExist: {
      ...state.emailExist,
      isLoading: true,
      error: null
    }
  })
}

function checkEmailExistSuccess(state, { data }) {
  return updateObject(state, {
    emailExist: {
      isLoading: false,
      data,
      error: null
    }
  })
}

function checkEmailExistError(state, { error }) {
  return updateObject(state, {
    emailExist: {
      isLoading: false,
      data: initialState.emailExist.data,
      error
    }
  })
}

function emailCompanyInvalid(state, { payload }) {
  return updateObject(state, {
    ...state,
    validateEmailCompany: payload
  })
}

function resetState(state) {
  return updateObject(state, {
    ...initialState
  })
}

export default createReducer(initialState, {
  [REGISTER_EMAIL]: registerEmail,
  [REGISTER_EMAIL_SUCCESS]: registerEmailSuccess,
  [REGISTER_EMAIL_ERROR]: registerEmailError,

  [CHECK_EMAIL_EXIST]: checkEmailExist,
  [CHECK_EMAIL_EXIST_SUCCESS]: checkEmailExistSuccess,
  [CHECK_EMAIL_EXIST_ERROR]: checkEmailExistError,

  [REGISTER_COMPANY]: registerCompany,
  [REGISTER_COMPANY_SUCCESS]: registerCompanySuccess,
  [REGISTER_COMPANY_ERROR]: registerCompanyError,

  [EMAIL_COMPANY_INVALID]: emailCompanyInvalid,

  [LOCATION_CHANGE]: resetState
})
