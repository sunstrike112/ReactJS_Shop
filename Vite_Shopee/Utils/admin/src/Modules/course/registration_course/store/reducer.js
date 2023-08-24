import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  LOAD_COURSES,
  LOAD_ORDER_COURSE,
  UPDATE_ORDER_COURSE,
  CREATE_COURSE,
  LOAD_COURSE,
  EDIT_COURSE,
  DELETE_COURSES,
  SAVE_FILTER,
  SAVE_INFO_COURSE,
  SAVE_INFO_COURSE_TO_ASSIGN,
  DISABLE_ISSUE_COURSE,
  RESET_COURSES
} from './constants'

export const initialState = {
  isLoading: false,
  isLoadingOrder: false,
  error: null,
  courses: [],
  course: {},
  pagination: {
    limit: 100,
    page: 0,
    total: 0
  },
  filter: {},
  order: [],
  isSubmitting: false,
  isDisabledIssueCourse: false,
  infoCourse: {},
  infoCourseToAssign: {
    startDate: null,
    endDate: null,
    required: false,
    listCourseIds: [],
    listUserIds: [],
    isEnoughData: false,
    usersSelected: {
      selectedRowKeys: [],
      selectedRows: []
    }
  }
}

function loadCourses(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function coursesLoaded(state, { payload }) {
  const { courses, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    courses,
    pagination,
    filter
  })
}

function coursesLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function loadOrderCourse(state) {
  return updateObject(state, {
    isLoadingOrder: true
  })
}

function orderCourseLoaded(state, { payload }) {
  const { order } = payload
  return updateObject(state, {
    isLoadingOrder: false,
    order
  })
}

function orderCourseLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoadingOrder: false
  })
}

function editOrderCourse(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function editOrderCourseSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function editOrderCourseError(state, { error }) {
  return updateObject(state, { error })
}

function loadCourse(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function courseLoaded(state, { payload }) {
  const { course } = payload
  return updateObject(state, {
    isLoading: false,
    course
  })
}

function courseLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function createCourse(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function createCourseSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function createCourseError(state, { error }) {
  return updateObject(state, { error })
}

function editCourse(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function editCourseSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function editCourseError(state, { error }) {
  return updateObject(state, { error })
}

function deleteCourses(state) {
  return updateObject(state, {
    error: null,
    isSubmitting: true
  })
}

function deleteCoursesSuccess(state) {
  return updateObject(state, {
    isSubmitting: false
  })
}

function deleteCoursesError(state, { error }) {
  return updateObject(state, { error })
}

function saveFilter(state) {
  return updateObject(state, { })
}

function filterSaved(state, payload) {
  const { filter } = payload
  return updateObject(state, { filter })
}

function saveInfoCourse(state, payload) {
  return updateObject(state, {
    infoCourse: payload?.payload,
    isDisabledIssueCourse: false
  })
}

function saveInfoCourseToAssign(state, { payload }) {
  return updateObject(state, { infoCourseToAssign: payload })
}

function disabledIssueCourse(state) {
  return updateObject(state, { isDisabledIssueCourse: true })
}

function savedFilterError(state, { error }) {
  return updateObject(state, { error })
}

function resetState(state) {
  return updateObject(state, {
    ...initialState,
    infoCourse: state.infoCourse,
    infoCourseToAssign: state.infoCourseToAssign,
    isDisabledIssueCourse: state.isDisabledIssueCourse,
    courseCategoryId: state.courseCategoryId,
    courseCategoryName: state.courseCategoryName
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_COURSES)]: loadCourses,
  [SUCCESS(LOAD_COURSES)]: coursesLoaded,
  [FAILURE(LOAD_COURSES)]: coursesLoadingError,

  [REQUEST(LOAD_ORDER_COURSE)]: loadOrderCourse,
  [SUCCESS(LOAD_ORDER_COURSE)]: orderCourseLoaded,
  [FAILURE(LOAD_ORDER_COURSE)]: orderCourseLoadingError,

  [REQUEST(UPDATE_ORDER_COURSE)]: editOrderCourse,
  [SUCCESS(UPDATE_ORDER_COURSE)]: editOrderCourseSuccess,
  [FAILURE(UPDATE_ORDER_COURSE)]: editOrderCourseError,

  [REQUEST(LOAD_COURSE)]: loadCourse,
  [SUCCESS(LOAD_COURSE)]: courseLoaded,
  [FAILURE(LOAD_COURSE)]: courseLoadingError,

  [REQUEST(CREATE_COURSE)]: createCourse,
  [SUCCESS(CREATE_COURSE)]: createCourseSuccess,
  [FAILURE(CREATE_COURSE)]: createCourseError,

  [REQUEST(EDIT_COURSE)]: editCourse,
  [SUCCESS(EDIT_COURSE)]: editCourseSuccess,
  [FAILURE(EDIT_COURSE)]: editCourseError,

  [REQUEST(DELETE_COURSES)]: deleteCourses,
  [SUCCESS(DELETE_COURSES)]: deleteCoursesSuccess,
  [FAILURE(DELETE_COURSES)]: deleteCoursesError,

  [REQUEST(SAVE_FILTER)]: saveFilter,
  [SUCCESS(SAVE_FILTER)]: filterSaved,
  [FAILURE(SAVE_FILTER)]: savedFilterError,

  [REQUEST(SAVE_INFO_COURSE)]: saveInfoCourse,
  [REQUEST(SAVE_INFO_COURSE_TO_ASSIGN)]: saveInfoCourseToAssign,
  [REQUEST(DISABLE_ISSUE_COURSE)]: disabledIssueCourse,

  [REQUEST(RESET_COURSES)]: resetState,

  [LOCATION_CHANGE]: resetState
})
