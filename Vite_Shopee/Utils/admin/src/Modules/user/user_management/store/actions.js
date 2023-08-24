import { REQUEST } from 'Stores'
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

export function loadUsers(payload) {
  return {
    type: REQUEST(LOAD_USERS),
    payload
  }
}

export function loadUser(payload) {
  return {
    type: REQUEST(LOAD_USER),
    payload
  }
}

export function resetUsers() {
  return {
    type: REQUEST(RESET_USERS)
  }
}

export function loadCompanies(payload) {
  return {
    type: REQUEST(LOAD_ALL_COMPANY),
    payload
  }
}

export function createUser(payload) {
  return {
    type: REQUEST(CREATE_USER),
    payload
  }
}

export function createNissokenUser(payload) {
  return {
    type: REQUEST(CREATE_NISSOKEN_USER),
    payload
  }
}

export function updateUser(payload) {
  return {
    type: REQUEST(UPDATE_USER),
    payload
  }
}
export function deleteUsers(payload) {
  return {
    type: REQUEST(DELETE_USERS),
    payload
  }
}

export function assignRemoveGroup(payload) {
  return {
    type: REQUEST(ASSIGN_REMOVE_GROUP),
    payload
  }
}

export function assignRemoveAttribute(payload) {
  return {
    type: REQUEST(ASSIGN_REMOVE_ATTRIBUTE),
    payload
  }
}

export function updateLoginStatus(payload) {
  return {
    type: REQUEST(UPDATE_LOGIN_STATUS),
    payload
  }
}

export function loadUserLearnStatus(payload) {
  return {
    type: REQUEST(LOAD_USER_LEARN_STATUS),
    payload
  }
}

export function loadUserTestResult(payload) {
  return {
    type: REQUEST(LOAD_USER_TEST_RESULT),
    payload
  }
}

export function loadUserLearnHistory(payload) {
  return {
    type: REQUEST(LOAD_USER_LEARN_HISTORY),
    payload
  }
}

export function batchRegisterUser(payload) {
  return {
    type: REQUEST(BATCH_REGISTER_USER),
    payload
  }
}

export function downloadCSVTemplate(payload) {
  return {
    type: REQUEST(DOWNLOAD_CSV_TEMPLATE),
    payload
  }
}

export function loadImportUserResult(payload) {
  return {
    type: REQUEST(LOAD_IMPORT_USER_RESULT),
    payload
  }
}

export function checkExistEmail(payload) {
  return {
    type: REQUEST(CHECK_EXIST_EMAIL),
    payload
  }
}
