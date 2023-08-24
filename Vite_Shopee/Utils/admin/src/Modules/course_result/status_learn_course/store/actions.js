import { REQUEST } from 'Stores'
import {
  LOAD_COURSE_STATUS,
  LOAD_COURSE_LIST,
  LOAD_GROUP_LIST,
  LOAD_ATTRIBUTE_LIST,
  LOAD_UNIT_LIST,
  SAVE_FILTER,
  RESET_COURSES
} from './constants'

export function loadCourseStatus(payload) {
  return {
    type: REQUEST(LOAD_COURSE_STATUS),
    payload
  }
}

export function loadCourseList(payload) {
  return {
    type: REQUEST(LOAD_COURSE_LIST),
    payload
  }
}

export function loadGroupList() {
  return {
    type: REQUEST(LOAD_GROUP_LIST)
  }
}

export function loadAttributeList() {
  return {
    type: REQUEST(LOAD_ATTRIBUTE_LIST)
  }
}

export function loadUnitList() {
  return {
    type: REQUEST(LOAD_UNIT_LIST)
  }
}

export function saveFilter(payload) {
  return {
    type: REQUEST(SAVE_FILTER),
    payload
  }
}

export function resetCourses() {
  return {
    type: REQUEST(RESET_COURSES)
  }
}
