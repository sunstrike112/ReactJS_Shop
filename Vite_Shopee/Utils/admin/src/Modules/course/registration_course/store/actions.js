import { REQUEST } from 'Stores'
import {
  LOAD_COURSES,
  LOAD_ORDER_COURSE,
  UPDATE_ORDER_COURSE,
  LOAD_COURSE,
  CREATE_COURSE,
  EDIT_COURSE,
  DELETE_COURSES,
  SAVE_FILTER,
  SAVE_INFO_COURSE,
  SAVE_INFO_COURSE_TO_ASSIGN,
  DISABLE_ISSUE_COURSE,
  RESET_COURSES
} from './constants'

export function loadCourses(payload) {
  return {
    type: REQUEST(LOAD_COURSES),
    payload
  }
}

export function loadOrderCourse(payload) {
  return {
    type: REQUEST(LOAD_ORDER_COURSE),
    payload
  }
}

export function updateOrderCourse(payload) {
  return {
    type: REQUEST(UPDATE_ORDER_COURSE),
    payload
  }
}

export function createCourse(payload) {
  return {
    type: REQUEST(CREATE_COURSE),
    payload
  }
}

export function editCourse(payload) {
  return {
    type: REQUEST(EDIT_COURSE),
    payload
  }
}

export function loadCourse(payload) {
  return {
    type: REQUEST(LOAD_COURSE),
    payload
  }
}

export function deleteCourses(payload) {
  return {
    type: REQUEST(DELETE_COURSES),
    payload
  }
}

export function saveFilter(payload) {
  return {
    type: REQUEST(SAVE_FILTER),
    payload
  }
}

export function saveInfoCourse(payload) {
  return {
    type: REQUEST(SAVE_INFO_COURSE),
    payload
  }
}

export function saveInfoCourseToAssign(payload) {
  return {
    type: REQUEST(SAVE_INFO_COURSE_TO_ASSIGN),
    payload
  }
}

export function disabledIssueCourse() {
  return {
    type: REQUEST(DISABLE_ISSUE_COURSE)
  }
}

export function resetState() {
  return {
    type: REQUEST(RESET_COURSES)
  }
}
