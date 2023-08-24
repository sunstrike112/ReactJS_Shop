import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { DEFAULT_PAG } from 'Utils'
import { LOCATION_CHANGE } from 'connected-react-router'
import {
  LOAD_COURSE_STATUS,
  LOAD_COURSE_LIST,
  LOAD_GROUP_LIST,
  LOAD_ATTRIBUTE_LIST,
  LOAD_UNIT_LIST,
  SAVE_FILTER,
  RESET_COURSES
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  courses: [],
  pagination: {
    ...DEFAULT_PAG,
    total: 0
  },
  filter: {},
  order: [],
  isSubmitting: false,
  listCourse: {
    isLoading: false,
    data: [],
    error: null
  },
  listGroup: [],
  listUnit: [],
  listAttribute: []
}

function loadCourseStatus(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function courseStatusLoaded(state, { payload }) {
  const { courses, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    courses,
    pagination,
    filter
  })
}

function courseStatusLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function loadCourseList(state) {
  return updateObject(state, {
    listCourse: {
      ...state.listCourse,
      isLoading: true
    }
  })
}

function courseListLoaded(state, { data }) {
  return updateObject(state, {
    listCourse: {
      ...state.listCourse,
      isLoading: false,
      data
    }
  })
}

function courseListLoadingError(state, { error }) {
  return updateObject(state, {
    listCourse: {
      ...state.listCourse,
      isLoading: false,
      error
    }
  })
}

function loadGroupList(state) {
  return updateObject(state, {
    // isLoading: true
  })
}

function groupListLoaded(state, payload) {
  return updateObject(state, {
    // isLoading: false,
    listGroup: payload.data
  })
}

function groupListLoadingError(state, { error }) {
  return updateObject(state, {
    error
    // isLoading: false
  })
}

function loadAttributeList(state) {
  return updateObject(state, {
    // isLoading: true
  })
}

function attributeListLoaded(state, payload) {
  return updateObject(state, {
    // isLoading: false,
    listAttribute: payload.data
  })
}

function attributeListLoadingError(state, { error }) {
  return updateObject(state, {
    error
    // isLoading: false
  })
}

function loadUnitList(state) {
  return updateObject(state, {
    // isLoading: true
  })
}

function unitListLoaded(state, payload) {
  return updateObject(state, {
    // isLoading: false,
    listUnit: payload.data
  })
}

function unitListLoadingError(state, { error }) {
  return updateObject(state, {
    error
    // isLoading: false
  })
}

function saveFilter(state) {
  return updateObject(state, {
    // isLoading: true
  })
}

function filterSaved(state, payload) {
  const { filter } = payload
  return updateObject(state, {
    // isLoading: false,
    filter
  })
}

function savedFilterError(state, { error }) {
  return updateObject(state, {
    error
    // isLoading: false
  })
}

function resetCourses(state) {
  return updateObject(state, {
    courses: [],
    pagination: {
      ...DEFAULT_PAG,
      total: 0
    }
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_COURSE_STATUS)]: loadCourseStatus,
  [SUCCESS(LOAD_COURSE_STATUS)]: courseStatusLoaded,
  [FAILURE(LOAD_COURSE_STATUS)]: courseStatusLoadingError,

  [REQUEST(LOAD_COURSE_LIST)]: loadCourseList,
  [SUCCESS(LOAD_COURSE_LIST)]: courseListLoaded,
  [FAILURE(LOAD_COURSE_LIST)]: courseListLoadingError,

  [REQUEST(LOAD_GROUP_LIST)]: loadGroupList,
  [SUCCESS(LOAD_GROUP_LIST)]: groupListLoaded,
  [FAILURE(LOAD_GROUP_LIST)]: groupListLoadingError,

  [REQUEST(LOAD_ATTRIBUTE_LIST)]: loadAttributeList,
  [SUCCESS(LOAD_ATTRIBUTE_LIST)]: attributeListLoaded,
  [FAILURE(LOAD_ATTRIBUTE_LIST)]: attributeListLoadingError,

  [REQUEST(LOAD_UNIT_LIST)]: loadUnitList,
  [SUCCESS(LOAD_UNIT_LIST)]: unitListLoaded,
  [FAILURE(LOAD_UNIT_LIST)]: unitListLoadingError,

  [REQUEST(SAVE_FILTER)]: saveFilter,
  [SUCCESS(SAVE_FILTER)]: filterSaved,
  [FAILURE(SAVE_FILTER)]: savedFilterError,

  [REQUEST(RESET_COURSES)]: resetCourses,

  [LOCATION_CHANGE]: resetCourses
})
