import { REQUEST } from 'Stores'
import {
  DELETE_COURSE_ASSIGNMENT,
  LOAD_AUTOMATIC_ASSIGNMENT,
  LOAD_COURSE_CATEGORY,
  LOAD_COURSE_ASSIGNMENT,
  LOAD_TARGET_GROUP,
  LOAD_TARGET_ATTRIBUTE,
  CREATE_ASSIGNMENT,
  LOAD_DETAIL_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  RESET_AUTO_ASSIGNMENTS
} from './constants'

export function loadAutomaticAssignment(payload) {
  return {
    type: REQUEST(LOAD_AUTOMATIC_ASSIGNMENT),
    payload
  }
}

export function deleteCourseAssignment(payload) {
  return {
    type: REQUEST(DELETE_COURSE_ASSIGNMENT),
    payload
  }
}

export function loadCourseCategory(payload) {
  return {
    type: REQUEST(LOAD_COURSE_CATEGORY),
    payload
  }
}

export function loadCourseAssignment(payload) {
  return {
    type: REQUEST(LOAD_COURSE_ASSIGNMENT),
    payload
  }
}

export function loadTargetGroup() {
  return {
    type: REQUEST(LOAD_TARGET_GROUP)
  }
}

export function loadTargetAttribute(payload) {
  return {
    type: REQUEST(LOAD_TARGET_ATTRIBUTE),
    payload
  }
}

export function createAssignment(payload) {
  return {
    type: REQUEST(CREATE_ASSIGNMENT),
    payload
  }
}

export function updateAssignment(payload) {
  return {
    type: REQUEST(UPDATE_ASSIGNMENT),
    payload
  }
}

export function loadDetailAssignment(payload) {
  return {
    type: REQUEST(LOAD_DETAIL_ASSIGNMENT),
    payload
  }
}

export function resetAutoAssignments() {
  return {
    type: REQUEST(RESET_AUTO_ASSIGNMENTS)
  }
}
