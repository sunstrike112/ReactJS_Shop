import {
  LOAD_LESSON_BY_ID,
  LOAD_LESSON_BY_ID_SUCCESS,

  LOAD_COURSE_DETAIL,
  LOAD_COURSE_DETAIL_SUCCESS,

  SUBMIT_LESSON_BY_ID,
  SUBMIT_LESSON_BY_ID_SUCCESS,

  LOAD_COURSE_DETAIL_UNREGISRTERED,
  LOAD_COURSE_DETAIL_UNREGISRTERED_SUCCESS,

  VOTE_LIKE_UNIT,
  COUNT_VIEW_UNIT,

  LOAD_REPOS_ERROR,
  VOTE_LIKE_UNIT_SUCCESS,
  REQUEST_PASSWORD_VIDEO,
  COUNT_VIEW_UNIT_SUCCESS
} from './constants'

export function loadCouresDetail(payload) {
  return {
    type: LOAD_COURSE_DETAIL,
    payload
  }
}

export function loadCouresDetailSuccess(data) {
  return {
    type: LOAD_COURSE_DETAIL_SUCCESS,
    data
  }
}

export function loadCouresDetailUnregistered(payload) {
  return {
    type: LOAD_COURSE_DETAIL_UNREGISRTERED,
    payload
  }
}

export function loadCouresDetailUnregisteredSuccess(data) {
  return {
    type: LOAD_COURSE_DETAIL_UNREGISRTERED_SUCCESS,
    data
  }
}

export function loadLessonById(payload) {
  return {
    type: LOAD_LESSON_BY_ID,
    payload
  }
}

export function loadLessonByIdSuccess(data) {
  return {
    type: LOAD_LESSON_BY_ID_SUCCESS,
    data
  }
}

export function submitLessonById(payload) {
  return {
    type: SUBMIT_LESSON_BY_ID,
    payload
  }
}

export function submitLessonByIdSuccess() {
  return {
    type: SUBMIT_LESSON_BY_ID_SUCCESS
  }
}

export function voteLikeUnit(payload) {
  return {
    type: VOTE_LIKE_UNIT,
    payload
  }
}

export function voteLikeUnitSuccess(payload) {
  return {
    type: VOTE_LIKE_UNIT_SUCCESS,
    payload
  }
}

export function countViewUnitAction(payload) {
  return {
    type: COUNT_VIEW_UNIT,
    payload
  }
}

export function countViewUnitSuccess(data) {
  return {
    type: COUNT_VIEW_UNIT_SUCCESS,
    data
  }
}

export function requestPasswordVideo(payload) {
  return {
    type: REQUEST_PASSWORD_VIDEO,
    payload
  }
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error
  }
}
