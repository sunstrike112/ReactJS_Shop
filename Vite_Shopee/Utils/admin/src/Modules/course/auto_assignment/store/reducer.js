/* eslint-disable no-unused-vars */
import { LOCATION_CHANGE } from 'connected-react-router'
import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import {
  CREATE_ASSIGNMENT,
  DELETE_COURSE_ASSIGNMENT,
  LOAD_AUTOMATIC_ASSIGNMENT,
  LOAD_COURSE_ASSIGNMENT,
  LOAD_COURSE_CATEGORY,
  LOAD_DETAIL_ASSIGNMENT,
  LOAD_TARGET_ATTRIBUTE,
  LOAD_TARGET_GROUP,
  RESET_AUTO_ASSIGNMENTS,
  UPDATE_ASSIGNMENT
} from './constants'

const courseCategory = {
  isLoading: false,
  data: [],
  error: null
}

export const initialState = {
  isLoading: false,
  isSubmitting: false,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  autoAssignment: [],
  courseCategory: { ...courseCategory },
  courseAssignment: [],
  targetGroup: [],
  targetAttribute: [],
  detailAssignment: [],
  filter: {},
  pagination: {},
  error: null
}

function loadAutomaticAssignment(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadAutomaticAssignmentSuccess(state, { payload }) {
  const { autoAssignment, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    autoAssignment,
    pagination,
    filter
  })
}

function loadAutomaticAssignmentFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function deleteCourseAssignment(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function deleteCourseAssignmentSuccess(state) {
  return updateObject(state, {
    isLoading: false,
    isSubmitting: true
  })
}

function deleteCourseAssignmentFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function loadCourseCategory(state) {
  return updateObject(state, {
    courseCategory: {
      ...state.courseCategory,
      isLoading: true
    }
  })
}

function loadCourseCategorySuccess(state, { data }) {
  return updateObject(state, {
    courseCategory: {
      ...state.courseCategory,
      isLoading: false,
      data
    }
  })
}

function loadCourseCategoryFailure(state, { error }) {
  return updateObject(state, {
    courseCategory: {
      ...state.courseCategory,
      isLoading: false,
      error
    }
  })
}

function loadCourseAssignment(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadCourseAssignmentSuccess(state, { payload }) {
  const { courseAssignment, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    courseAssignment,
    pagination,
    filter
  })
}

function loadCourseAssignmentFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function loadTargetGroup(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadTargetGroupSuccess(state, { targetGroup }) {
  return updateObject(state, {
    isLoading: false,
    targetGroup
  })
}

function loadTargetGroupFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function loadTargetAttribute(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadTargetAttributeSuccess(state, { targetAttribute }) {
  return updateObject(state, {
    isLoading: false,
    targetAttribute
  })
}

function loadTargetAttributeFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function createAssignment(state) {
  return updateObject(state, {
    isLoadingCreate: true
  })
}

function createAssignmentSuccess(state) {
  return updateObject(state, {
    isLoadingCreate: false,
    isSubmitting: true
  })
}

function createAssignmentFailure(state, { error }) {
  return updateObject(state, {
    isLoadingCreate: false,
    error
  })
}

function updateAssignment(state) {
  return updateObject(state, {
    isLoadingUpdate: true
  })
}

function updateAssignmentSuccess(state) {
  return updateObject(state, {
    isLoadingUpdate: false,
    isSubmitting: true
  })
}

function updateAssignmentFailure(state, { error }) {
  return updateObject(state, {
    isLoadingUpdate: false,
    error
  })
}

function loadDetailAssignment(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadDetailAssignmentSuccess(state, { detailAssignment }) {
  return updateObject(state, {
    isLoading: false,
    detailAssignment
  })
}

function loadDetailAssignmentFailure(state, { error }) {
  return updateObject(state, {
    isLoading: false,
    error
  })
}

function resetAutoAssignments(state) {
  return updateObject(state, {
    autoAssignment: [...initialState.autoAssignment],
    filter: { ...initialState.filter },
    pagination: { ...initialState.pagination }
  })
}

// createLessonInitial
function resetState(state) {
  return updateObject(state, {
    isSubmitting: false,
    autoAssignment: [],
    pagination: {},
    filter: {}
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_AUTOMATIC_ASSIGNMENT)]: loadAutomaticAssignment,
  [SUCCESS(LOAD_AUTOMATIC_ASSIGNMENT)]: loadAutomaticAssignmentSuccess,
  [FAILURE(LOAD_AUTOMATIC_ASSIGNMENT)]: loadAutomaticAssignmentFailure,

  [REQUEST(DELETE_COURSE_ASSIGNMENT)]: deleteCourseAssignment,
  [SUCCESS(DELETE_COURSE_ASSIGNMENT)]: deleteCourseAssignmentSuccess,
  [FAILURE(DELETE_COURSE_ASSIGNMENT)]: deleteCourseAssignmentFailure,

  [REQUEST(LOAD_COURSE_CATEGORY)]: loadCourseCategory,
  [SUCCESS(LOAD_COURSE_CATEGORY)]: loadCourseCategorySuccess,
  [FAILURE(LOAD_COURSE_CATEGORY)]: loadCourseCategoryFailure,

  [REQUEST(LOAD_COURSE_ASSIGNMENT)]: loadCourseAssignment,
  [SUCCESS(LOAD_COURSE_ASSIGNMENT)]: loadCourseAssignmentSuccess,
  [FAILURE(LOAD_COURSE_ASSIGNMENT)]: loadCourseAssignmentFailure,

  [REQUEST(LOAD_TARGET_GROUP)]: loadTargetGroup,
  [SUCCESS(LOAD_TARGET_GROUP)]: loadTargetGroupSuccess,
  [FAILURE(LOAD_TARGET_GROUP)]: loadTargetGroupFailure,

  [REQUEST(LOAD_TARGET_ATTRIBUTE)]: loadTargetAttribute,
  [SUCCESS(LOAD_TARGET_ATTRIBUTE)]: loadTargetAttributeSuccess,
  [FAILURE(LOAD_TARGET_ATTRIBUTE)]: loadTargetAttributeFailure,

  [REQUEST(CREATE_ASSIGNMENT)]: createAssignment,
  [SUCCESS(CREATE_ASSIGNMENT)]: createAssignmentSuccess,
  [FAILURE(CREATE_ASSIGNMENT)]: createAssignmentFailure,

  [REQUEST(UPDATE_ASSIGNMENT)]: updateAssignment,
  [SUCCESS(UPDATE_ASSIGNMENT)]: updateAssignmentSuccess,
  [FAILURE(UPDATE_ASSIGNMENT)]: updateAssignmentFailure,

  [REQUEST(LOAD_DETAIL_ASSIGNMENT)]: loadDetailAssignment,
  [SUCCESS(LOAD_DETAIL_ASSIGNMENT)]: loadDetailAssignmentSuccess,
  [FAILURE(LOAD_DETAIL_ASSIGNMENT)]: loadDetailAssignmentFailure,

  [REQUEST(RESET_AUTO_ASSIGNMENTS)]: resetAutoAssignments,

  [LOCATION_CHANGE]: resetState
})
