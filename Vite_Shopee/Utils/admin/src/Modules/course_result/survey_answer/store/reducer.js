import { createReducer, updateObject, REQUEST, SUCCESS, FAILURE } from 'Stores'
import { LOCATION_CHANGE } from 'connected-react-router'
import {
  LOAD_SURVEY_ANSWER,
  LOAD_COURSE_LIST,
  LOAD_GROUP_LIST,
  LOAD_ATTRIBUTE_LIST,
  LOAD_UNIT_LIST_LESSON,
  LOAD_UNIT_LIST_REPORT,
  LOAD_UNIT_LIST_SURVEY,
  LOAD_UNIT_LIST_TEST,
  LOAD_UNIT_LIST_ALL,
  LOAD_SURVEY_ANSWER_DETAIL,
  RESET_SURVEY_ANSWER_DETAIL,
  SAVE_FILTER,
  RESET_SURVEY_ANSWER
} from './constants'

export const initialState = {
  isLoading: false,
  error: null,
  surveyAnswer: [],
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
  surveyDetail: {
    surveyName: '',
    pageQuestionSurvey: {
      total: 0,
      limit: 100,
      pages: 0,
      page: 0,
      result: []
    }
  }
}

function loadSureyAnswer(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function surveyAnswerLoaded(state, { payload }) {
  const { surveyAnswer, pagination, filter } = payload
  return updateObject(state, {
    isLoading: false,
    surveyAnswer,
    pagination,
    filter
  })
}

function surveyAnswerLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

function loadSureyAnswerDetail(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function surveyAnswerDetailLoaded(state, { payload }) {
  return updateObject(state, {
    isLoading: false,
    surveyDetail: payload
  })
}

function surveyAnswerDetailError(state, { error }) {
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

function resetSureyAnswerDetail(state) {
  return updateObject(state, {
    surveyDetail: initialState.surveyDetail
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

function resetState(state) {
  return updateObject(state, {
    surveyAnswer: [...initialState.surveyAnswer],
    pagination: { ...initialState.pagination }
  })
}

// Slice reducer
export default createReducer(initialState, {
  [REQUEST(LOAD_SURVEY_ANSWER)]: loadSureyAnswer,
  [SUCCESS(LOAD_SURVEY_ANSWER)]: surveyAnswerLoaded,
  [FAILURE(LOAD_SURVEY_ANSWER)]: surveyAnswerLoadingError,

  [REQUEST(LOAD_SURVEY_ANSWER_DETAIL)]: loadSureyAnswerDetail,
  [SUCCESS(LOAD_SURVEY_ANSWER_DETAIL)]: surveyAnswerDetailLoaded,
  [FAILURE(LOAD_SURVEY_ANSWER_DETAIL)]: surveyAnswerDetailError,
  [REQUEST(RESET_SURVEY_ANSWER_DETAIL)]: resetSureyAnswerDetail,

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

  [REQUEST(RESET_SURVEY_ANSWER)]: resetState,

  [LOCATION_CHANGE]: resetState
})
