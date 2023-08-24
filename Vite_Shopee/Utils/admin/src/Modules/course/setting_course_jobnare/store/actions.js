import { REQUEST } from 'Stores'
import {
  UPDATE_AUTO_STATUS,
  LOAD_EXCEPT_COURSE,
  DELETE_EXCEPT_COURSE,
  ADD_EXCEPT_COURSE,
  LOAD_EXCEPT_COURSE_ALL
} from './constants'

export function updateAutoStatus(payload) {
  return {
    type: REQUEST(UPDATE_AUTO_STATUS),
    params: payload
  }
}

export function loadExceptCourse(payload) {
  return {
    type: REQUEST(LOAD_EXCEPT_COURSE),
    payload
  }
}

export function loadExceptCourseAll(payload) {
  return {
    type: REQUEST(LOAD_EXCEPT_COURSE_ALL),
    payload
  }
}

export function addExceptCourse(payload) {
  return {
    type: REQUEST(ADD_EXCEPT_COURSE),
    payload
  }
}

export function deleteExceptCourse(payload) {
  return {
    type: REQUEST(DELETE_EXCEPT_COURSE),
    payload
  }
}
