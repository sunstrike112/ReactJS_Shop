import { REQUEST } from 'Stores'
import {
  LOAD_LIST_ISSUE_PERMISSION,
  LOAD_ISSUE_PERMISSION,
  CREATE_ISSUE_PERMISSION,
  EDIT_ISSUE_PERMISSION,
  DELETE_ISSUE_PERMISSION,
  LOAD_LIST_USER_SELECTED,
  LOAD_LIST_USER,
  LOAD_LIST_CATEGORY,
  LOAD_LIST_GROUP,
  LOAD_LIST_ATTRIBUTE,
  LOAD_LIST_COURSE,
  LOAD_LIST_UPDATE_ISSUE_PERMISSION,
  CLEAR_LIST_ISSUE_PERMISSION,
  CLEAR_LIST_USER_SELECTED,
  RESET_ISSUES_PERMISSION
} from './constants'

export function clearListUserSelectedPermission(payload) {
  return {
    type: REQUEST(CLEAR_LIST_USER_SELECTED),
    payload
  }
}

export function clearListIssuePermission(payload) {
  return {
    type: REQUEST(CLEAR_LIST_ISSUE_PERMISSION),
    payload
  }
}

export function loadListIssuePermission(payload) {
  return {
    type: REQUEST(LOAD_LIST_ISSUE_PERMISSION),
    payload
  }
}

export function createIssuePermission(payload) {
  return {
    type: REQUEST(CREATE_ISSUE_PERMISSION),
    payload
  }
}

export function editIssuePermission(payload) {
  return {
    type: REQUEST(EDIT_ISSUE_PERMISSION),
    payload
  }
}

export function loadIssuePermission(payload) {
  return {
    type: REQUEST(LOAD_ISSUE_PERMISSION),
    payload
  }
}

export function deleteIssuePermission(payload) {
  return {
    type: REQUEST(DELETE_ISSUE_PERMISSION),
    payload
  }
}

export function loadListCategory(payload) {
  return {
    type: REQUEST(LOAD_LIST_CATEGORY),
    payload
  }
}

export function loadListUser(payload) {
  return {
    type: REQUEST(LOAD_LIST_USER),
    payload
  }
}

export function loadListUserSelected(payload) {
  return {
    type: REQUEST(LOAD_LIST_USER_SELECTED),
    payload
  }
}

export function loadListGroup(payload) {
  return {
    type: REQUEST(LOAD_LIST_GROUP),
    payload
  }
}

export function loadListAttribute(payload) {
  return {
    type: REQUEST(LOAD_LIST_ATTRIBUTE),
    payload
  }
}

export function loadListCourse(payload) {
  return {
    type: REQUEST(LOAD_LIST_COURSE),
    payload
  }
}

export function loadListUpdateIssuePermission(payload) {
  return {
    type: REQUEST(LOAD_LIST_UPDATE_ISSUE_PERMISSION),
    payload
  }
}

export function resetIssuesPermission() {
  return {
    type: REQUEST(RESET_ISSUES_PERMISSION)
  }
}
