import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  UPDATE_AUTO_STATUS,
  LOAD_EXCEPT_COURSE,
  DELETE_EXCEPT_COURSE,
  ADD_EXCEPT_COURSE,
  LOAD_EXCEPT_COURSE_ALL
} from './constants'

export const initialState = {
  isLoading: false,
  isAutoAssigning: false,
  isAdding: false,
  isDeleting: false,
  assignAuto: 0,
  coursesExcept: [],
  coursesExceptAll: [],
  filter: {},
  pagination: {
    limit: 100,
    page: 0,
    total: 0
  },
  error: null
}

function loadExceptCourse(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadExceptCourseSuccess(state, { payload }) {
  const { assignAuto, listCourse } = payload
  const { result, limit, page, total } = listCourse
  return updateObject(state, {
    isLoading: false,
    assignAuto,
    coursesExcept: result,
    pagination: {
      limit,
      page,
      total
    }
  })
}

function loadExceptCourseFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function loadExceptCourseAllSuccess(state, { payload }) {
  const { listCourse } = payload
  const { result } = listCourse
  return updateObject(state, {
    coursesExceptAll: result
  })
}

function loadExceptCourseAllFailure(state, { error }) {
  return updateObject(state, {
    error
  })
}

function updateAutoStatus(state) {
  return updateObject(state, {
    isAutoAssigning: true
  })
}

function updateAutoStatusSuccess(state) {
  return updateObject(state, {
    isAutoAssigning: false
  })
}

function updateAutoStatusFailure(state, { error }) {
  return updateObject(state, {
    isAutoAssigning: false,
    error
  })
}

function deleteExceptCourse(state) {
  return updateObject(state, {
    isDeleting: true
  })
}

function deleteExceptCourseSuccess(state) {
  return updateObject(state, {
    isDeleting: false
  })
}

function deleteExceptCourseFailure(state, { error }) {
  return updateObject(state, {
    isDeleting: false,
    error
  })
}

function addExceptCourse(state) {
  return updateObject(state, {
    isAdding: true
  })
}

function addExceptCourseSuccess(state) {
  return updateObject(state, {
    isAdding: false
  })
}

function addExceptCourseFailure(state, { error }) {
  return updateObject(state, {
    isAdding: false,
    error
  })
}

export default createReducer(initialState, {
  [REQUEST(LOAD_EXCEPT_COURSE)]: loadExceptCourse,
  [SUCCESS(LOAD_EXCEPT_COURSE)]: loadExceptCourseSuccess,
  [FAILURE(LOAD_EXCEPT_COURSE)]: loadExceptCourseFailure,

  [SUCCESS(LOAD_EXCEPT_COURSE_ALL)]: loadExceptCourseAllSuccess,
  [FAILURE(LOAD_EXCEPT_COURSE_ALL)]: loadExceptCourseAllFailure,

  [REQUEST(UPDATE_AUTO_STATUS)]: updateAutoStatus,
  [SUCCESS(UPDATE_AUTO_STATUS)]: updateAutoStatusSuccess,
  [FAILURE(UPDATE_AUTO_STATUS)]: updateAutoStatusFailure,

  [REQUEST(DELETE_EXCEPT_COURSE)]: deleteExceptCourse,
  [SUCCESS(DELETE_EXCEPT_COURSE)]: deleteExceptCourseSuccess,
  [FAILURE(DELETE_EXCEPT_COURSE)]: deleteExceptCourseFailure,

  [REQUEST(ADD_EXCEPT_COURSE)]: addExceptCourse,
  [SUCCESS(ADD_EXCEPT_COURSE)]: addExceptCourseSuccess,
  [FAILURE(ADD_EXCEPT_COURSE)]: addExceptCourseFailure
})
