import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'

import { LOCATION_CHANGE } from 'connected-react-router'
import {
  LOAD_UNIT_STATUS,
  LOAD_COURSE_LIST,
  LOAD_GROUP_LIST,
  LOAD_ATTRIBUTE_LIST,
  LOAD_UNIT_LIST_LESSON,
  LOAD_UNIT_LIST_REPORT,
  LOAD_UNIT_LIST_SURVEY,
  LOAD_UNIT_LIST_TEST,
  LOAD_UNIT_LIST_ALL,
  SAVE_FILTER,
  LOAD_UNIT_DETAIL,
  LOAD_UNIT_DETAIL_BY_ID,
  LOAD_DATE_TIME_HISTORY_VARIABLE,
  RESET_UNITS_LEARN_COURSE
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  unit: [],
  pagination: {
    limit: 100,
    page: 0,
    total: 0
  },
  paginationDetail: {
    limit: 100,
    page: 0,
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
  listUnitLesson: [],
  listUnitReport: [],
  listUnitSurvey: [],
  listUnitTest: [],
  listUnitAll: [],
  listAttribute: [],
  unitDetail: {},
  unitDetailById: {}
}

function loadUnitStatus(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function unitStatusLoaded(state, { payload }) {
  const { unit, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    unit,
    pagination,
    filter
  })
}

function unitStatusLoadingError(state, { error }) {
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

function loadUnitListLesson(state) {
  return updateObject(state, {})
}
function unitListLessonLoaded(state, payload) {
  return updateObject(state, { listUnitLesson: payload.data })
}
function unitListLessonLoadingError(state, { error }) {
  return updateObject(state, { error })
}

function loadUnitListTest(state) {
  return updateObject(state, {})
}
function unitListTestLoaded(state, payload) {
  return updateObject(state, { listUnitTest: payload.data })
}
function unitListTestLoadingError(state, { error }) {
  return updateObject(state, { error })
}

function loadUnitListReport(state) {
  return updateObject(state, {})
}
function unitListReportLoaded(state, payload) {
  return updateObject(state, { listUnitReport: payload.data })
}
function unitListReportLoadingError(state, { error }) {
  return updateObject(state, { error })
}

function loadUnitListSurvey(state) {
  return updateObject(state, {})
}
function unitListSurveyLoaded(state, payload) {
  return updateObject(state, { listUnitSurvey: payload.data })
}
function unitListSurveyLoadingError(state, { error }) {
  return updateObject(state, { error })
}

function loadUnitListAll(state) {
  return updateObject(state, {})
}
function unitListAllLoaded(state, payload) {
  return updateObject(state, { listUnitAll: payload.data })
}
function unitListAllLoadingError(state, { error }) {
  return updateObject(state, { error })
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

function loadUnitDetail(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadUnitDetailSuccess(state, { payload }) {
  const { unitDetail, filter, pagination } = payload
  return updateObject(state, {
    isLoading: false,
    pagination,
    unitDetail,
    filter
  })
}

function loadUnitDetailFailed(state, { error }) {
  return updateObject(state, { error, isLoading: false })
}

function loadUnitDetailById(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadUnitDetailByIdSuccess(state, { payload }) {
  const { unitDetailById, filter, paginationDetail } = payload
  return updateObject(state, {
    isLoading: false,
    paginationDetail,
    unitDetailById,
    filter
  })
}

function loadUnitDetailByIdFailed(state, { error }) {
  return updateObject(state, { error })
}

function loadDateTimeVariable(state) {
  return updateObject(state)
}

function loadDateTimeVariableFailed(state, { error }) {
  return updateObject(state, { error })
}

function resetUnitsLearnCourse(state) {
  return updateObject(state, {
    unit: [...initialState.unit],
    pagination: { ...initialState.pagination },
    filter: { ...initialState.filter }
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_UNIT_STATUS)]: loadUnitStatus,
  [SUCCESS(LOAD_UNIT_STATUS)]: unitStatusLoaded,
  [FAILURE(LOAD_UNIT_STATUS)]: unitStatusLoadingError,

  [REQUEST(LOAD_COURSE_LIST)]: loadCourseList,
  [SUCCESS(LOAD_COURSE_LIST)]: courseListLoaded,
  [FAILURE(LOAD_COURSE_LIST)]: courseListLoadingError,

  [REQUEST(LOAD_GROUP_LIST)]: loadGroupList,
  [SUCCESS(LOAD_GROUP_LIST)]: groupListLoaded,
  [FAILURE(LOAD_GROUP_LIST)]: groupListLoadingError,

  [REQUEST(LOAD_ATTRIBUTE_LIST)]: loadAttributeList,
  [SUCCESS(LOAD_ATTRIBUTE_LIST)]: attributeListLoaded,
  [FAILURE(LOAD_ATTRIBUTE_LIST)]: attributeListLoadingError,

  [REQUEST(LOAD_UNIT_LIST_LESSON)]: loadUnitListLesson,
  [SUCCESS(LOAD_UNIT_LIST_LESSON)]: unitListLessonLoaded,
  [FAILURE(LOAD_UNIT_LIST_LESSON)]: unitListLessonLoadingError,

  [REQUEST(LOAD_UNIT_LIST_TEST)]: loadUnitListTest,
  [SUCCESS(LOAD_UNIT_LIST_TEST)]: unitListTestLoaded,
  [FAILURE(LOAD_UNIT_LIST_TEST)]: unitListTestLoadingError,

  [REQUEST(LOAD_UNIT_LIST_REPORT)]: loadUnitListReport,
  [SUCCESS(LOAD_UNIT_LIST_REPORT)]: unitListReportLoaded,
  [FAILURE(LOAD_UNIT_LIST_REPORT)]: unitListReportLoadingError,

  [REQUEST(LOAD_UNIT_LIST_SURVEY)]: loadUnitListSurvey,
  [SUCCESS(LOAD_UNIT_LIST_SURVEY)]: unitListSurveyLoaded,
  [FAILURE(LOAD_UNIT_LIST_SURVEY)]: unitListSurveyLoadingError,

  [REQUEST(LOAD_UNIT_LIST_ALL)]: loadUnitListAll,
  [SUCCESS(LOAD_UNIT_LIST_ALL)]: unitListAllLoaded,
  [FAILURE(LOAD_UNIT_LIST_ALL)]: unitListAllLoadingError,

  [REQUEST(SAVE_FILTER)]: saveFilter,
  [SUCCESS(SAVE_FILTER)]: filterSaved,
  [FAILURE(SAVE_FILTER)]: savedFilterError,

  [REQUEST(LOAD_UNIT_DETAIL)]: loadUnitDetail,
  [SUCCESS(LOAD_UNIT_DETAIL)]: loadUnitDetailSuccess,
  [FAILURE(LOAD_UNIT_DETAIL)]: loadUnitDetailFailed,

  [REQUEST(LOAD_UNIT_DETAIL_BY_ID)]: loadUnitDetailById,
  [SUCCESS(LOAD_UNIT_DETAIL_BY_ID)]: loadUnitDetailByIdSuccess,
  [FAILURE(LOAD_UNIT_DETAIL_BY_ID)]: loadUnitDetailByIdFailed,

  [REQUEST(LOAD_DATE_TIME_HISTORY_VARIABLE)]: loadDateTimeVariable,
  [FAILURE(LOAD_DATE_TIME_HISTORY_VARIABLE)]: loadDateTimeVariableFailed,

  [REQUEST(RESET_UNITS_LEARN_COURSE)]: resetUnitsLearnCourse,

  [LOCATION_CHANGE]: resetUnitsLearnCourse

})
