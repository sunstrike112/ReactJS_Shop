/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 * @param  {state} login state
 * @param  {action} login action
 */
import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer, updateObject } from '../../../store'
import { editArray } from '../../../utils/utils'
import {
  LOAD_COURSE_DETAIL,
  LOAD_COURSE_DETAIL_SUCCESS,
  LOAD_LESSON_BY_ID,
  LOAD_LESSON_BY_ID_SUCCESS,
  SUBMIT_LESSON_BY_ID,
  SUBMIT_LESSON_BY_ID_SUCCESS,
  LOAD_COURSE_DETAIL_UNREGISRTERED,
  LOAD_COURSE_DETAIL_UNREGISRTERED_SUCCESS,
  LOAD_REPOS_ERROR,
  VOTE_LIKE_UNIT_SUCCESS,
  VOTE_LIKE_UNIT,
  REQUEST_PASSWORD_VIDEO,
  COUNT_VIEW_UNIT_SUCCESS
} from './constants'

const lessonDetailInitial = {
  completionSettings: null,
  courseId: null,
  estimatedStudyTime: 0,
  images: [],
  lessonId: 0,
  limitEnd: 0,
  limitEndType: null,
  limitStart: 0,
  limitStartType: null,
  messageCompleted: null,
  path: '',
  type: 0,
  unitDetails: '',
  unitName: ''
}

const couseDetailInitial = {
  listCourseCategoryName: [],
  courseImagePath: '',
  courseName: '',
  numberOfCompletedCourse: 0,
  numberOfTotalCourse: 0,
  overviewText: '',
  progressCourseComplete: 0,
  endTime: 0,
  overview: '',
  recentStudyTime: 0,
  recentStudyUnitName: '',
  startTime: 0,
  studyTimes: 0,
  tagName: [],
  targetTime: 0
}

export const initialState = {
  error: null,
  userId: 1,
  lessonDetail: {
    isLoading: false,
    data: lessonDetailInitial,
    error: null,
    isLoadDataSuccess: false,
    historyId: undefined
  },
  isRequestPasswordVideo: false,
  isSubmitEnd: false,
  courseDetail: {
    isLoading: false,
    isLiking: false,
    data: {
      ...couseDetailInitial,
      unit: []
    },
    error: null
  },
  courseDetailUnregistered: {
    isLoading: false,
    data: {
      ...couseDetailInitial,
      free: false,
      price: null,
      listUserCourseUnitResponse: []
    },
    error: null
  }
}

function loadCourseDetail(state) {
  return updateObject(state, {
    courseDetail: {
      ...state.courseDetail,
      isLoading: true
    }
  })
}

function loadCourseDetailSuccess(state, { data }) {
  return updateObject(state, {
    courseDetail: {
      ...state.courseDetail,
      isLoading: false,
      error: null,
      data: data || state.courseDetail.data
    }
  })
}

function loadCouresDetailUnregistered(state) {
  return updateObject(state, {
    courseDetailUnregistered: {
      ...state.courseDetailUnregistered,
      isLoading: true
    },
    isSubmitEnd: false
  })
}

function loadCouresDetailUnregisteredSuccess(state, { data }) {
  return updateObject(state, {
    courseDetailUnregistered: {
      isLoading: false,
      error: null,
      data: data || state.courseDetailUnregistered.data
    }
  })
}

function loadLessonById(state) {
  return updateObject(state, {
    lessonDetail: {
      ...state.lessonDetail,
      isLoading: true,
      isLoadDataSuccess: false
    },
    isSubmitEnd: false
  })
}

function loadLessonByIdSuccess(state, { data }) {
  return updateObject(state, {
    lessonDetail: {
      ...state.lessonDetail,
      isLoading: false,
      error: null,
      data,
      isLoadDataSuccess: true
    }
  })
}

function submitLessonById(state) {
  return updateObject(state, {
    isSubmitEnd: false
  })
}

function submitLessonByIdSuccess(state) {
  return updateObject(state, {
    isSubmitEnd: true
  })
}

function repoLoadingError(state, { error }) {
  return updateObject(state, {
    error
  })
}

function voteLikeUnitRequest(state) {
  return updateObject(state, {
    courseDetail: {
      ...state.courseDetail,
      isLiking: true
    }
  })
}

function voteLikeUnitSuccess(state, { payload }) {
  const { data, item } = payload
  item.isLike = !item.isLike
  item.countLikeCourse = data.likeNumber
  const newData = editArray(state.courseDetail.data.unit, item, (el) => el.unitId === item.unitId)

  const newCourseDetail = state.courseDetail
  newCourseDetail.data.unit = newData
  newCourseDetail.isLiking = false
  return updateObject(state, {
    courseDetail: { ...newCourseDetail }
  })
}

function countViewUnitSuccess(state, { data }) {
  return updateObject(state, {
    lessonDetail: { ...state.lessonDetail, historyId: data }
  })
}

function requestPasswordVideo(state, { payload }) {
  const { isRequestPasswordVideo } = payload

  return updateObject(state, {
    isRequestPasswordVideo
  })
}

function resetState(state) {
  return updateObject(state, {
    ...initialState,
    courseDetail: {
      ...state.courseDetail,
      data: null
    },
    courseDetailUnregistered: {
      ...state.courseDetailUnregistered,
      data: null
    },
    isSubmitEnd: false
  })
}

export default createReducer(initialState, {
  [LOAD_COURSE_DETAIL]: loadCourseDetail,
  [LOAD_COURSE_DETAIL_SUCCESS]: loadCourseDetailSuccess,

  [LOAD_LESSON_BY_ID]: loadLessonById,
  [LOAD_LESSON_BY_ID_SUCCESS]: loadLessonByIdSuccess,

  [SUBMIT_LESSON_BY_ID]: submitLessonById,
  [SUBMIT_LESSON_BY_ID_SUCCESS]: submitLessonByIdSuccess,

  [LOAD_COURSE_DETAIL_UNREGISRTERED]: loadCouresDetailUnregistered,
  [LOAD_COURSE_DETAIL_UNREGISRTERED_SUCCESS]: loadCouresDetailUnregisteredSuccess,

  [VOTE_LIKE_UNIT]: voteLikeUnitRequest,
  [VOTE_LIKE_UNIT_SUCCESS]: voteLikeUnitSuccess,

  [COUNT_VIEW_UNIT_SUCCESS]: countViewUnitSuccess,

  [REQUEST_PASSWORD_VIDEO]: requestPasswordVideo,

  [LOAD_REPOS_ERROR]: repoLoadingError,

  [LOCATION_CHANGE]: resetState
})
