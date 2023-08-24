import { REQUEST } from '../../../store'
import {
  LOAD_USER_CATEGORIES,
  LOAD_USER_CATEGORIES_SUCCESS,

  LOAD_COURSE_CATEGORIES,
  LOAD_COURSE_CATEGORIES_SUCCESS,

  LOAD_COURSE_COMPANY,
  LOAD_COURSE_COMPANY_SUCCESS,

  LOAD_COURSE_COST,
  LOAD_COURSE_COST_SUCCESS,

  LOAD_COURSE_FREE,
  LOAD_COURSE_FREE_SUCCESS,

  LOAD_COURSE_NISSOKEN,
  LOAD_COURSE_NISSOKEN_SUCCESS,

  LOAD_COURSE_TYPE,
  LOAD_COURSE_TYPE_SUCCESS,

  LOAD_REPOS_ERROR,

  CHANGE_COURSE_TAB,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INIT_CART,
  ADD_TO_CARD_SUCCESS,
  GET_COURSE_IN_CART,
  GET_COURSE_IN_CART_SUCCESS,
  REMOVE_FROM_CART_SUCCESS,

  VOTE_LIKE_COURSE,
  VOTE_LIKE_COURSE_SUCCESS,

  RESET_FILTER_COURSE_LIST,
  SEARCHING_COURSE_LIST,

  LOAD_NEW_COURSE,
  LOAD_NEW_COURSE_SUCCESS,
  REFRESH_PAGE,
  UPDATE_BOOKMARK,
  RESET_PAGE_TO_INIT
} from './constants'

export function loadUserCategories(userId) {
  return {
    type: LOAD_USER_CATEGORIES,
    userId
  }
}

export function loadUserCategoriesSuccess(data) {
  return {
    type: LOAD_USER_CATEGORIES_SUCCESS,
    data
  }
}

export function loadCourseCategories(userId) {
  return {
    type: LOAD_COURSE_CATEGORIES,
    userId
  }
}

export function loadCourseCategoriesSuccess(data) {
  return {
    type: LOAD_COURSE_CATEGORIES_SUCCESS,
    data
  }
}

export function loadCourseCompany(payload) {
  return {
    type: LOAD_COURSE_COMPANY,
    payload
  }
}

export function loadCourseCompanySuccess(payload) {
  return {
    type: LOAD_COURSE_COMPANY_SUCCESS,
    payload
  }
}

export function loadCourseCost(categories, courseSearch) {
  return {
    type: LOAD_COURSE_COST,
    categories,
    courseSearch
  }
}

export function loadCourseCostSuccess(data) {
  return {
    type: LOAD_COURSE_COST_SUCCESS,
    data
  }
}

export function loadCourseFree(categories, courseSearch) {
  return {
    type: LOAD_COURSE_FREE,
    categories,
    courseSearch
  }
}

export function loadCourseFreeSuccess(data) {
  return {
    type: LOAD_COURSE_FREE_SUCCESS,
    data
  }
}

export function loadCourseNissoken(payload) {
  return {
    type: LOAD_COURSE_NISSOKEN,
    payload
  }
}

export function loadCourseNissokenSuccess(payload) {
  return {
    type: LOAD_COURSE_NISSOKEN_SUCCESS,
    payload
  }
}

export function loadCourseType(userId) {
  return {
    type: LOAD_COURSE_TYPE,
    userId
  }
}

export function loadCourseTypeSuccess(data) {
  return {
    type: LOAD_COURSE_TYPE_SUCCESS,
    data
  }
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error
  }
}

export function changeCourseListTab(tab) {
  return {
    type: CHANGE_COURSE_TAB,
    tab
  }
}

export function addToCart(course) {
  return {
    type: ADD_TO_CART,
    course
  }
}

export function addToCartSuccess(course) {
  return {
    type: ADD_TO_CARD_SUCCESS,
    course
  }
}

export function getCourseInCart() {
  return {
    type: GET_COURSE_IN_CART
  }
}

export function getCourseInCartSuccess(data) {
  return {
    type: GET_COURSE_IN_CART_SUCCESS,
    data
  }
}

export function removeFromCart(course) {
  return {
    type: REMOVE_FROM_CART,
    course
  }
}

export function removeFromCartSuccess(course) {
  return {
    type: REMOVE_FROM_CART_SUCCESS,
    course
  }
}

export function voteLikeCourseAction(payload) {
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

export function initCart() {
  return {
    type: INIT_CART
  }
}

export function resetFilterCourseList() {
  return {
    type: RESET_FILTER_COURSE_LIST
  }
}

export function searchingCourseList(payload) {
  return {
    type: SEARCHING_COURSE_LIST,
    payload
  }
}

export function loadNewCourse(payload) {
  return {
    type: LOAD_NEW_COURSE,
    payload
  }
}

export function loadNewCourseSuccess(payload) {
  return {
    type: LOAD_NEW_COURSE_SUCCESS,
    payload
  }
}

export function refreshCourseListPage() {
  return {
    type: REFRESH_PAGE
  }
}

export function resetPageToInit() {
  return {
    type: RESET_PAGE_TO_INIT
  }
}

export function updateBookmarkRequest(payload) {
  return {
    type: REQUEST(UPDATE_BOOKMARK),
    payload
  }
}
