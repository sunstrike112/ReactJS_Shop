import { REQUEST } from '../../../store'
import {
  LOAD_STUDYING_INDIVIDUAL,
  LOAD_STUDYING_INDIVIDUAL_SUCCESS,
  LOAD_STUDYING_COMPANY,
  LOAD_STUDYING_COMPANY_SUCCESS,
  LOAD_STUDYING_NISSOKEN,
  LOAD_STUDYING_NISSOKEN_SUCCESS,
  LOAD_REPOS_ERROR,
  LOAD_COSTS_INDIVIDUAL,
  LOAD_COSTS_INDIVIDUAL_SUCCESS,
  LOAD_REQUIRED_COMPANY,
  LOAD_REQUIRED_COMPANY_SUCCESS,
  LOAD_COURSE_PROGRESS,
  LOAD_COURSE_PROGRESS_SUCCESS,
  HIDE_COURSE,
  VOTE_LIKE_COURSE,
  VOTE_LIKE_COURSE_SUCCESS,
  RESET_FILTER_MY_PAGE,
  UPDATE_ORDER_COURSES,
  UPDATE_BOOKMARK_COURSE_DISPLAY_TYPE
} from './constants'

export function loadCourseStudyingIndividual(params, courseType) {
  return {
    type: LOAD_STUDYING_INDIVIDUAL,
    params,
    courseType
  }
}

export function loadCourseCostsIndividual(params) {
  return {
    type: LOAD_COSTS_INDIVIDUAL,
    params
  }
}

export function loadCourseRequiredCompany(payload) {
  return {
    type: LOAD_REQUIRED_COMPANY,
    payload
  }
}

export function loadCourseRequiredCompanySuccess(payload) {
  return {
    type: LOAD_REQUIRED_COMPANY_SUCCESS,
    payload
  }
}

export function loadCourseProgress(payload) {
  return {
    type: LOAD_COURSE_PROGRESS,
    payload
  }
}

export function loadCourseProgressSuccess(data) {
  return {
    type: LOAD_COURSE_PROGRESS_SUCCESS,
    data
  }
}

export function loadCourseCostsIndividualSuccess(data) {
  return {
    type: LOAD_COSTS_INDIVIDUAL_SUCCESS,
    data
  }
}

export function loadCourseStudyingCompany(payload) {
  return {
    type: LOAD_STUDYING_COMPANY,
    payload
  }
}

export function loadCourseStudyingNissoken(payload) {
  return {
    type: LOAD_STUDYING_NISSOKEN,
    payload
  }
}

export function loadCourseStudyingIndividualSuccess(data) {
  return {
    type: LOAD_STUDYING_INDIVIDUAL_SUCCESS,
    data
  }
}

export function loadCourseStudyingCompanySuccess(payload) {
  return {
    type: LOAD_STUDYING_COMPANY_SUCCESS,
    payload
  }
}

export function loadCourseStudyingNissokenSuccess(payload) {
  return {
    type: LOAD_STUDYING_NISSOKEN_SUCCESS,
    payload
  }
}

export function hiddenCourse(payload) {
  return {
    type: HIDE_COURSE,
    payload
  }
}

export function voteLikeCourseRequest(payload) {
  return {
    type: VOTE_LIKE_COURSE,
    payload
  }
}

export function voteLikeCourseSuccess(payload) {
  return {
    type: VOTE_LIKE_COURSE_SUCCESS,
    payload
  }
}

export function resetFilter() {
  return {
    type: RESET_FILTER_MY_PAGE
  }
}

export function updateOrderCourses(payload) {
  return {
    type: REQUEST(UPDATE_ORDER_COURSES),
    payload
  }
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error
  }
}

export function updateDisplayType(payload) {
  return {
    type: REQUEST(UPDATE_BOOKMARK_COURSE_DISPLAY_TYPE),
    payload
  }
}
