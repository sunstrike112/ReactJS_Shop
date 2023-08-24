import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { LOCATION_CHANGE } from 'connected-react-router'
import {
  LOAD_TEST_RESULT,
  LOAD_COURSE_LIST,
  LOAD_GROUP_LIST,
  LOAD_ATTRIBUTE_LIST,
  LOAD_UNIT_LIST_LESSON,
  LOAD_UNIT_LIST_REPORT,
  LOAD_UNIT_LIST_SURVEY,
  LOAD_UNIT_LIST_TEST,
  LOAD_UNIT_LIST_ALL,
  SAVE_FILTER,
  RESET_TEST_RESULT
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  testResult: [],
  pagination: {
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
  listUnit: [],
  listAttribute: [],
  listUnitAll: []
}

function loadTestResult(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function testResultLoaded(state, { payload }) {
  const { testResult, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    testResult,
    pagination,
    filter
  })
}

function testResultLoadingError(state, { error }) {
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
function unitListLessonLoaded(state, { data }) {
  return updateObject(state, { listUnitLesson: data })
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

function resetTestResult(state) {
  return updateObject(state, {
    testResult: [...initialState.testResult],
    pagination: { ...initialState.pagination },
    filter: { ...initialState.filter }
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_TEST_RESULT)]: loadTestResult,
  [SUCCESS(LOAD_TEST_RESULT)]: testResultLoaded,
  [FAILURE(LOAD_TEST_RESULT)]: testResultLoadingError,

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

  [REQUEST(RESET_TEST_RESULT)]: resetTestResult,

  [LOCATION_CHANGE]: resetTestResult
})
