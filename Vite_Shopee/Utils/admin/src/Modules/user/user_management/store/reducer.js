import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  LOAD_USERS,
  LOAD_USER,
  CREATE_USER,
  DELETE_USERS,
  ASSIGN_REMOVE_GROUP,
  ASSIGN_REMOVE_ATTRIBUTE,
  UPDATE_LOGIN_STATUS,
  LOAD_USER_LEARN_STATUS,
  LOAD_USER_TEST_RESULT,
  LOAD_USER_LEARN_HISTORY,
  BATCH_REGISTER_USER,
  DOWNLOAD_CSV_TEMPLATE,
  LOAD_IMPORT_USER_RESULT,
  UPDATE_USER,
  LOAD_ALL_COMPANY,
  CREATE_NISSOKEN_USER,
  CHECK_EXIST_EMAIL,
  RESET_USERS
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  users: [],
  user: {},
  userLearnStatus: [],
  userTestResult: [],
  userLearnHistory: [],
  importUserResult: [],
  companies: [],
  pagination: {
    total: 0,
    pages: 1,
    page: 1,
    limit: 100
  },
  sort: {},
  filter: {},
  isSubmitting: false,
  userExist: {
    name: '',
    kana: '',
    isExist: false,
    isLoading: false
  }
}

function loadUsers(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadCompanies(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function companiesLoaded(state, { companies }) {
  return updateObject(state, {
    isLoading: false,
    companies
  })
}

function companiesLoadingError(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}
function usersLoaded(state, { payload }) {
  const { users, pagination, sort, filter } = payload
  return updateObject(state, {
    isLoading: false,
    users,
    pagination,
    sort: sort || {},
    filter: filter || {}
  })
}

function usersLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function loadUser(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function userLoaded(state, { payload }) {
  const { user } = payload
  return updateObject(state, {
    isLoading: false,
    user
  })
}

function userLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function resetUsers(state) {
  return updateObject(state, {
    users: [...initialState.users],
    pagination: { ...initialState.pagination },
    sort: { ...initialState.sort },
    filter: { ...initialState.filter }
  })
}

function createUser(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function createUserSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function createUserError(state, { error }) {
  return updateObject(state, {
    isSubmitting: false,
    error
  })
}

function createNissokenUser(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function createNissokenUserSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function createNissokenUserError(state, { error }) {
  return updateObject(state, {
    isSubmitting: false,
    error
  })
}

function updateUser(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function updateUserSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function updateUserError(state, { error }) {
  return updateObject(state, {
    error,
    isSubmitting: false
  })
}

function deleteUsers(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function deleteUsersSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function deleteUsersError(state, { error }) {
  return updateObject(state, { error, isSubmitting: false })
}

function assignRemoveGroup(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function assignRemoveGroupSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function assignRemoveGroupError(state, { error }) {
  return updateObject(state, { error })
}

function assignRemoveAttribute(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function assignRemoveAttributeSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function assignRemoveAttributeError(state, { error }) {
  return updateObject(state, { error })
}

function updateLoginStatus(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function updateLoginStatusSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function updateLoginStatusError(state, { error }) {
  return updateObject(state, { error })
}

function loadUserLearnStatus(state) {
  return updateObject(state, {
    error: null,
    isLoading: true
  })
}

function userLearnStatusLoaded(state, { userLearnStatus, pagination, filter }) {
  return updateObject(state, {
    isLoading: false,
    userLearnStatus,
    pagination,
    filter
  })
}

function userLearnStatusLoadingError(state, { error }) {
  return updateObject(state, { isLoading: false, error })
}

function loadUserTestResult(state) {
  return updateObject(state, {
    error: null,
    isLoading: true
  })
}

function userTestResultLoaded(state, { userTestResult, pagination, filter }) {
  return updateObject(state, {
    isLoading: false,
    userTestResult,
    pagination,
    filter
  })
}

function userTestResultLoadingError(state, { error }) {
  return updateObject(state, { isLoading: false, error })
}

function loadUserLearnHistory(state) {
  return updateObject(state, {
    error: null,
    isLoading: true
  })
}

function userLearnHistoryLoaded(state, { userLearnHistory, pagination, filter }) {
  return updateObject(state, {
    isLoading: false,
    userLearnHistory,
    pagination,
    filter
  })
}

function userLearnHistoryLoadingError(state, { error }) {
  return updateObject(state, { isLoading: false, error })
}

function batchRegisterUser(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function batchRegisterUserSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function batchRegisterUserError(state, { error }) {
  return updateObject(state, { error })
}

function downloadCSVTemplate(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function downloadCSVTemplateSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function downloadCSVTemplateError(state, { error }) {
  return updateObject(state, { error })
}

function loadImportUserResult(state) {
  return updateObject(state, {
    error: null,
    isLoading: true
  })
}

function importUserLoaded(state, { payload }) {
  const { importUserResult } = payload
  return updateObject(state, {
    isLoading: false,
    importUserResult
  })
}

function importUserResultLoadingError(state, { error }) {
  return updateObject(state, { isLoading: false, error })
}

function checkExistEmail(state) {
  return updateObject(state, {
    error: null,
    userExist: {
      ...state.userExist,
      isLoading: true
    }
  })
}

function checkExistEmailSuccess(state, { userExist }) {
  return updateObject(state, {
    error: null,
    userExist: {
      ...userExist,
      isLoading: false
    }
  })
}

function checkExistEmailError(state, { error }) {
  return updateObject(state, {
    error,
    userExist: initialState.userExist
  })
}

function resetState(state) {
  return updateObject(state, { ...initialState })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(CHECK_EXIST_EMAIL)]: checkExistEmail,
  [SUCCESS(CHECK_EXIST_EMAIL)]: checkExistEmailSuccess,
  [FAILURE(CHECK_EXIST_EMAIL)]: checkExistEmailError,

  [REQUEST(LOAD_USERS)]: loadUsers,
  [SUCCESS(LOAD_USERS)]: usersLoaded,
  [FAILURE(LOAD_USERS)]: usersLoadingError,

  [REQUEST(LOAD_USER)]: loadUser,
  [SUCCESS(LOAD_USER)]: userLoaded,
  [FAILURE(LOAD_USER)]: userLoadingError,

  [REQUEST(RESET_USERS)]: resetUsers,

  [REQUEST(LOAD_ALL_COMPANY)]: loadCompanies,
  [SUCCESS(LOAD_ALL_COMPANY)]: companiesLoaded,
  [FAILURE(LOAD_ALL_COMPANY)]: companiesLoadingError,

  [REQUEST(CREATE_USER)]: createUser,
  [SUCCESS(CREATE_USER)]: createUserSuccess,
  [FAILURE(CREATE_USER)]: createUserError,

  [REQUEST(CREATE_NISSOKEN_USER)]: createNissokenUser,
  [SUCCESS(CREATE_NISSOKEN_USER)]: createNissokenUserSuccess,
  [FAILURE(CREATE_NISSOKEN_USER)]: createNissokenUserError,

  [REQUEST(UPDATE_USER)]: updateUser,
  [SUCCESS(UPDATE_USER)]: updateUserSuccess,
  [FAILURE(UPDATE_USER)]: updateUserError,

  [REQUEST(DELETE_USERS)]: deleteUsers,
  [SUCCESS(DELETE_USERS)]: deleteUsersSuccess,
  [FAILURE(DELETE_USERS)]: deleteUsersError,

  [REQUEST(ASSIGN_REMOVE_GROUP)]: assignRemoveGroup,
  [SUCCESS(ASSIGN_REMOVE_GROUP)]: assignRemoveGroupSuccess,
  [FAILURE(ASSIGN_REMOVE_GROUP)]: assignRemoveGroupError,

  [REQUEST(ASSIGN_REMOVE_ATTRIBUTE)]: assignRemoveAttribute,
  [SUCCESS(ASSIGN_REMOVE_ATTRIBUTE)]: assignRemoveAttributeSuccess,
  [FAILURE(ASSIGN_REMOVE_ATTRIBUTE)]: assignRemoveAttributeError,

  [REQUEST(UPDATE_LOGIN_STATUS)]: updateLoginStatus,
  [SUCCESS(UPDATE_LOGIN_STATUS)]: updateLoginStatusSuccess,
  [FAILURE(UPDATE_LOGIN_STATUS)]: updateLoginStatusError,

  [REQUEST(LOAD_USER_LEARN_STATUS)]: loadUserLearnStatus,
  [SUCCESS(LOAD_USER_LEARN_STATUS)]: userLearnStatusLoaded,
  [FAILURE(LOAD_USER_LEARN_STATUS)]: userLearnStatusLoadingError,

  [REQUEST(LOAD_USER_TEST_RESULT)]: loadUserTestResult,
  [SUCCESS(LOAD_USER_TEST_RESULT)]: userTestResultLoaded,
  [FAILURE(LOAD_USER_TEST_RESULT)]: userTestResultLoadingError,

  [REQUEST(LOAD_USER_LEARN_HISTORY)]: loadUserLearnHistory,
  [SUCCESS(LOAD_USER_LEARN_HISTORY)]: userLearnHistoryLoaded,
  [FAILURE(LOAD_USER_LEARN_HISTORY)]: userLearnHistoryLoadingError,

  [REQUEST(BATCH_REGISTER_USER)]: batchRegisterUser,
  [SUCCESS(BATCH_REGISTER_USER)]: batchRegisterUserSuccess,
  [FAILURE(BATCH_REGISTER_USER)]: batchRegisterUserError,

  [REQUEST(DOWNLOAD_CSV_TEMPLATE)]: downloadCSVTemplate,
  [SUCCESS(DOWNLOAD_CSV_TEMPLATE)]: downloadCSVTemplateSuccess,
  [FAILURE(DOWNLOAD_CSV_TEMPLATE)]: downloadCSVTemplateError,

  [REQUEST(LOAD_IMPORT_USER_RESULT)]: loadImportUserResult,
  [SUCCESS(LOAD_IMPORT_USER_RESULT)]: importUserLoaded,
  [FAILURE(LOAD_IMPORT_USER_RESULT)]: importUserResultLoadingError,

  [LOCATION_CHANGE]: resetState
})
