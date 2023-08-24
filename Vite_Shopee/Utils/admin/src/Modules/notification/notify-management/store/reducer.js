import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'

import { DEFAULT_PAG } from 'Utils'
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

export const initialState = {
  isLoading: false,
  error: null,
  findUser: [],
  pagination: { ...DEFAULT_PAG },
  filter: {},
  listDataUser: [],
  listDataUserAll: [],
  isSubmitting: false,
  notifi: {
    editable: 0
  },
  listSendHistory: [],
  emailDetail: {}
}

function createNotifi(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function createNotifiSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function createNotifiError(state, { error }) {
  return updateObject(state, {
    error,
    isSubmitting: false
  })
}

function loadFindUser(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function findUserLoaded(state, { payload }) {
  const { findUser, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    findUser,
    pagination,
    filter
  })
}

function findUserLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function deleteNotifi(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function deleteNotifiSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function deleteNotifiError(state, { error }) {
  return updateObject(state, { error })
}

function loadSendUser(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function sendUserLoaded(state, { payload }) {
  const { listSendHistory, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    listSendHistory,
    pagination,
    filter
  })
}

function sendUserLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function deleteHistory(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function deleteHistorySuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function deleteHistoryError(state, { error }) {
  return updateObject(state, { error })
}

function getEmailDetail(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function getEmailDetailLoaded(state, { payload }) {
  const { emailDetail, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    emailDetail,
    pagination,
    filter
  })
}

function getEmailDetailLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function getNotifi(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function getNotfiLoaded(state, { payload }) {
  const { notifi, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    notifi,
    pagination,
    filter
  })
}

function getNotifiLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function loadListUser(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function listUserLoaded(state, { payload }) {
  const { listDataUser, listDataUserAll, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    listDataUser,
    listDataUserAll,
    pagination,
    filter
  })
}

function listUserLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function editNotifi(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function editNotifiSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function editNotifiError(state, { error }) {
  return updateObject(state, {
    error,
    isSubmitting: false
  })
}

function resetNotifications(state) {
  return updateObject(state, {
    findUser: [...initialState.findUser],
    pagination: { ...initialState.pagination },
    filter: { ...initialState.filter }
  })
}

function resetEmailHistories(state) {
  return updateObject(state, {
    listSendHistory: [...initialState.listSendHistory],
    pagination: { ...initialState.pagination }
  })
}

function resetState(state) {
  return updateObject(state, { ...initialState })
}

export default createReducer(initialState, {
  [REQUEST(CREATE_NOTIFI)]: createNotifi,
  [SUCCESS(CREATE_NOTIFI)]: createNotifiSuccess,
  [FAILURE(CREATE_NOTIFI)]: createNotifiError,

  [REQUEST(LOAD_FIND_USER)]: loadFindUser,
  [SUCCESS(LOAD_FIND_USER)]: findUserLoaded,
  [FAILURE(LOAD_FIND_USER)]: findUserLoadingError,

  [REQUEST(LOAD_SEND_HISTORY)]: loadSendUser,
  [SUCCESS(LOAD_SEND_HISTORY)]: sendUserLoaded,
  [FAILURE(LOAD_SEND_HISTORY)]: sendUserLoadingError,

  [REQUEST(GET_EMAIL_DETAIL)]: getEmailDetail,
  [SUCCESS(GET_EMAIL_DETAIL)]: getEmailDetailLoaded,
  [FAILURE(GET_EMAIL_DETAIL)]: getEmailDetailLoadingError,

  [REQUEST(DELETE_HISTORY)]: deleteHistory,
  [SUCCESS(DELETE_HISTORY)]: deleteHistorySuccess,
  [FAILURE(DELETE_HISTORY)]: deleteHistoryError,

  [REQUEST(GET_NOTIFI)]: getNotifi,
  [SUCCESS(GET_NOTIFI)]: getNotfiLoaded,
  [FAILURE(GET_NOTIFI)]: getNotifiLoadingError,

  [REQUEST(DELETE_NOTIFI)]: deleteNotifi,
  [SUCCESS(DELETE_NOTIFI)]: deleteNotifiSuccess,
  [FAILURE(DELETE_NOTIFI)]: deleteNotifiError,

  [REQUEST(LOAD_LIST_USER)]: loadListUser,
  [SUCCESS(LOAD_LIST_USER)]: listUserLoaded,
  [FAILURE(LOAD_LIST_USER)]: listUserLoadingError,

  [REQUEST(EDIT_NOTIFI)]: editNotifi,
  [SUCCESS(EDIT_NOTIFI)]: editNotifiSuccess,
  [FAILURE(EDIT_NOTIFI)]: editNotifiError,

  [REQUEST(RESET_NOTIFICATIONS)]: resetNotifications,
  [REQUEST(RESET_EMAIL_HISTORIES)]: resetEmailHistories,

  [LOCATION_CHANGE]: resetState
})
