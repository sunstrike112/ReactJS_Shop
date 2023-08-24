/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 * @param  {state} login state
 * @param  {action} login action
 */
import { DEFAULT_PAG, MY_PAGE_TABS, BOOKMARK_COURSE_DISPLAY_TYPE } from '../../../constants'
import { REQUEST, SUCCESS, createReducer, updateObject } from '../../../store'
import { copyObjectUsingJSON } from '../../../utils'
import { editArray } from '../../../utils/utils'
import {
  HIDE_COURSE,
  HIDE_COURSE_SUCCESS,
  LOAD_COSTS_INDIVIDUAL,
  LOAD_COSTS_INDIVIDUAL_SUCCESS,
  LOAD_COURSE_PROGRESS,
  LOAD_COURSE_PROGRESS_SUCCESS,
  LOAD_REPOS_ERROR,
  LOAD_REQUIRED_COMPANY,
  LOAD_REQUIRED_COMPANY_SUCCESS,
  LOAD_STUDYING_COMPANY,
  LOAD_STUDYING_COMPANY_SUCCESS,
  LOAD_STUDYING_INDIVIDUAL,
  LOAD_STUDYING_INDIVIDUAL_SUCCESS,
  LOAD_STUDYING_NISSOKEN,
  LOAD_STUDYING_NISSOKEN_SUCCESS,
  RESET_FILTER_MY_PAGE,
  UPDATE_BOOKMARK_COURSE_DISPLAY_TYPE,
  UPDATE_ORDER_COURSES,
  VOTE_LIKE_COURSE,
  VOTE_LIKE_COURSE_SUCCESS
} from './constants'

const courseInitital = {
  myPageCourseProgress: {
    completeCourse: DEFAULT_PAG.total,
    progressCourse: DEFAULT_PAG.total,
    totalCourse: DEFAULT_PAG.total
  },
  lstTagName: [],
  pageCourse: {
    ...DEFAULT_PAG,
    result: []
  },
  lstCourse: [],
  search: '',
  isLiking: false
}

const initialFilter = { courseSearch: '' }

export const initialState = {
  isOnline: true,
  isLoading: false,
  isLiking: false,
  courseStudingIndividual: {
    data: courseInitital,
    error: null
  },
  courseStudyingCompany: {
    data: courseInitital,
    error: null
  },
  courseStudyingNissoken: {
    data: courseInitital,
    error: null
  },
  courseStudyingRequired: {
    data: courseInitital,
    error: null
  },
  savedFilter: initialFilter,
  courseProgress: {},
  totalCourse: {
    totalCourseCompany: 0,
    totalCourseCompanyIsBookmark: 0,
    totalCourseNishoken: 0,
    totalCourseNishokenIsBookmark: 0,
    totalCourseRequired: 0,
    totalAllCourse: 0
  },
  displayType: BOOKMARK_COURSE_DISPLAY_TYPE.DEFAULT
}

function loadCourseStudyingIndividual(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadCourseCostsIndividual(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadCourseRequiredCompany(state, { payload }) {
  const { isSearching } = payload
  // Clear cache another page when searching
  const newCourseStudyingCompany = copyObjectUsingJSON(state.courseStudyingCompany)
  newCourseStudyingCompany.data.pageCourse.page = isSearching ? DEFAULT_PAG.page : newCourseStudyingCompany.data.pageCourse.page
  newCourseStudyingCompany.data.pageCourse.result = isSearching ? [] : newCourseStudyingCompany.data.pageCourse.result

  const newCourseStudyingNissoken = copyObjectUsingJSON(state.courseStudyingNissoken)
  newCourseStudyingNissoken.data.pageCourse.page = isSearching ? DEFAULT_PAG.page : newCourseStudyingNissoken.data.pageCourse.page
  newCourseStudyingNissoken.data.pageCourse.result = isSearching ? [] : newCourseStudyingNissoken.data.pageCourse.result
  return updateObject(state, {
    isLoading: true,
    courseStudyingCompany: newCourseStudyingCompany,
    courseStudyingNissoken: newCourseStudyingNissoken
  })
}

function loadRequiredCompanySuccess(state, { payload }) {
  const { data, savedFilter } = payload
  const { totalCourseCompanyIsBookmark, totalCourseNishokenIsBookmark, totalCourseRequired, myPageCourseProgress, totalAllCourse } = data.myPageCourseCompanyRequired
  const newTotalCourse = { totalCourseCompanyIsBookmark, totalCourseNishokenIsBookmark, totalCourseRequired, totalAllCourse }

  return updateObject(state, {
    isLoading: false,
    totalCourse: { ...state.totalCourse, ...newTotalCourse },
    courseProgress: myPageCourseProgress,
    courseStudyingRequired: {
      ...state.courseStudyingRequired,
      data: data.myPageCourseCompanyRequired
    },
    savedFilter
  })
}

function loadCourseProgress(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function loadCourseProgressSuccess(state, { data }) {
  return updateObject(state, {
    isLoading: false,
    courseProgress: data?.myPageCourseCompanyRequired?.myPageCourseProgress
  })
}

function loadCostsIndividualSuccess(state, { data }) {
  return updateObject(state, {
    courseRequired: {
      ...state.courseRequired,
      data
    }
  })
}

function loadStudyingIndividualSuccess(state, { data }) {
  return updateObject(state, {
    courseStudingIndividual: {
      ...state.courseStudingIndividual,
      data
    }
  })
}

function loadCourseStudyingCompany(state, { payload }) {
  const { isSearching } = payload
  // Clear cache another course when searching
  const newCourseStudyingNissoken = copyObjectUsingJSON(state.courseStudyingNissoken)
  newCourseStudyingNissoken.data.pageCourse.page = isSearching ? DEFAULT_PAG.page : newCourseStudyingNissoken.data.pageCourse.page
  newCourseStudyingNissoken.data.pageCourse.result = isSearching ? [] : newCourseStudyingNissoken.data.pageCourse.result

  const newCourseStudyingRequired = copyObjectUsingJSON(state.courseStudyingRequired)
  newCourseStudyingRequired.data.pageCourse.page = isSearching ? DEFAULT_PAG.page : newCourseStudyingRequired.data.pageCourse.page
  newCourseStudyingRequired.data.pageCourse.result = isSearching ? [] : newCourseStudyingRequired.data.pageCourse.result
  return updateObject(state, {
    isLoading: true,
    courseStudyingNissoken: newCourseStudyingNissoken,
    courseStudyingRequired: newCourseStudyingRequired
  })
}

function loadStudyingCompanySuccess(state, { payload }) {
  const { savedFilter, data } = payload
  const { totalCourseCompanyIsBookmark, totalCourseNishokenIsBookmark, totalCourseRequired, totalAllCourse } = data.myPageCourseCompanyStudying
  const newTotalCourse = { totalCourseCompanyIsBookmark, totalCourseNishokenIsBookmark, totalCourseRequired, totalAllCourse }

  return updateObject(state, {
    isLoading: false,
    totalCourse: { ...state.totalCourse, ...newTotalCourse },
    courseStudyingCompany: {
      data: data.myPageCourseCompanyStudying,
      error: null
    },
    savedFilter
  })
}

function loadCourseStudyingNissoken(state, { payload }) {
  const { isSearching } = payload
  // Clear cache another course when searching
  const newCourseStudyingCompany = copyObjectUsingJSON(state.courseStudyingCompany)
  newCourseStudyingCompany.data.pageCourse.page = isSearching ? DEFAULT_PAG.page : newCourseStudyingCompany.data.pageCourse.page
  newCourseStudyingCompany.data.pageCourse.result = isSearching ? [] : newCourseStudyingCompany.data.pageCourse.result

  const newCourseStudyingRequired = copyObjectUsingJSON(state.courseStudyingRequired)
  newCourseStudyingRequired.data.pageCourse.page = isSearching ? DEFAULT_PAG.page : newCourseStudyingRequired.data.pageCourse.page
  newCourseStudyingRequired.data.pageCourse.result = isSearching ? [] : newCourseStudyingRequired.data.pageCourse.result
  return updateObject(state, {
    isLoading: true,
    courseStudyingCompany: newCourseStudyingCompany,
    courseStudyingRequired: newCourseStudyingRequired
  })
}

function loadStudyingNissokenSuccess(state, { payload }) {
  const { savedFilter, data } = payload
  const { totalCourseCompanyIsBookmark, totalCourseNishokenIsBookmark, totalCourseRequired, totalAllCourse } = data.myPageCourseCompanyStudying
  const newTotalCourse = { totalCourseCompanyIsBookmark, totalCourseNishokenIsBookmark, totalCourseRequired, totalAllCourse }

  return updateObject(state, {
    isLoading: false,
    totalCourse: { ...state.totalCourse, ...newTotalCourse },
    courseStudyingNissoken: {
      ...state.courseStudyingNissoken,
      data: data.myPageCourseCompanyStudying,
      error: null
    },
    savedFilter
  })
}

function hideCourse(state) {
  return updateObject(state, {
    isLoading: true
  })
}

function hideCourseSuccess(state) {
  return updateObject(state, {
    isLoading: false
  })
}

function resetSavedFilter(state) {
  // Reset page of tabs -> 1

  const newCourseStudyingCompany = copyObjectUsingJSON(state.courseStudyingCompany)
  newCourseStudyingCompany.data.pageCourse.page = DEFAULT_PAG.page

  const newCourseStudyingNissoken = copyObjectUsingJSON(state.courseStudyingNissoken)
  newCourseStudyingNissoken.data.pageCourse.page = DEFAULT_PAG.page

  const newCourseStudyingRequired = copyObjectUsingJSON(state.courseStudyingRequired)
  newCourseStudyingRequired.data.pageCourse.page = DEFAULT_PAG.page

  return updateObject(state, {
    savedFilter: initialFilter,
    courseStudyingCompany: newCourseStudyingCompany,
    courseStudyingNissoken: newCourseStudyingNissoken,
    courseStudyingRequired: newCourseStudyingRequired
  })
}

function voteLikeCourse(state) {
  return updateObject(state, {
    isLiking: true
  })
}

function voteLikeCourseSuccess(state, { payload }) {
  const { data, item, tab } = payload
  item.isLike = !item.isLike
  item.countLikeCourse = data.likeNumber
  const getArrayEdit = (tabName) => {
    switch (tabName) {
      case MY_PAGE_TABS.COMPANY_COURSE: return state.courseStudyingCompany.data.pageCourse.result
      case MY_PAGE_TABS.NISSOKEN_COURSE: return state.courseStudyingNissoken.data.pageCourse.result
      case MY_PAGE_TABS.REQUIRED_COURSE: return state.courseStudyingRequired.data.pageCourse.result
      default: return []
    }
  }
  const newData = editArray(getArrayEdit(tab), item, (el) => el.courseId === item.courseId)

  const newCourseStudyingCompany = state.courseStudyingCompany
  newCourseStudyingCompany.data.pageCourse.result = tab === MY_PAGE_TABS.COMPANY_COURSE ? newData : state.courseStudyingCompany.data.pageCourse.result

  const newCourseStudyingNissoken = state.courseStudyingNissoken
  newCourseStudyingNissoken.data.pageCourse.result = tab === MY_PAGE_TABS.NISSOKEN_COURSE ? newData : state.courseStudyingNissoken.data.pageCourse.result

  const newCourseStudyingRequired = state.courseStudyingRequired
  newCourseStudyingRequired.data.pageCourse.result = tab === MY_PAGE_TABS.REQUIRED_COURSE ? newData : state.courseStudyingRequired.data.pageCourse.result

  return updateObject(state, {
    isLiking: false,
    courseStudyingCompany: { ...newCourseStudyingCompany },
    courseStudyingNissoken: { ...newCourseStudyingNissoken },
    courseStudyingRequired: { ...newCourseStudyingRequired }
  })
}

function updateOrderCourseRequest(state, { payload }) {
  const { newItems, tab } = payload

  const newCourseStudyingCompany = state.courseStudyingCompany
  newCourseStudyingCompany.data.pageCourse.result = tab === MY_PAGE_TABS.COMPANY_COURSE ? newItems : state.courseStudyingCompany.data.pageCourse.result

  const newCourseStudyingNissoken = state.courseStudyingNissoken
  newCourseStudyingNissoken.data.pageCourse.result = tab === MY_PAGE_TABS.NISSOKEN_COURSE ? newItems : state.courseStudyingNissoken.data.pageCourse.result

  return updateObject(state, {
    isLoading: true,
    courseStudyingCompany: { ...newCourseStudyingCompany },
    courseStudyingNissoken: { ...newCourseStudyingNissoken }
  })
}

function updateOrderCourseSuccess(state, { data }) {
  const { newCourses, tab } = data

  const newCourseStudyingCompany = state.courseStudyingCompany
  newCourseStudyingCompany.data.pageCourse.result = tab === MY_PAGE_TABS.COMPANY_COURSE ? newCourses : state.courseStudyingCompany.data.pageCourse.result

  const newCourseStudyingNissoken = state.courseStudyingNissoken
  newCourseStudyingNissoken.data.pageCourse.result = tab === MY_PAGE_TABS.NISSOKEN_COURSE ? newCourses : state.courseStudyingNissoken.data.pageCourse.result

  return updateObject(state, {
    isLoading: false,
    courseStudyingCompany: { ...newCourseStudyingCompany },
    courseStudyingNissoken: { ...newCourseStudyingNissoken }
  })
}

function updateDisplayType(state, { payload }) {
  const { displayType } = payload
  return updateObject(state, {
    displayType
  })
}

function repoLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false
  })
}

export default createReducer(initialState, {
  [LOAD_STUDYING_INDIVIDUAL]: loadCourseStudyingIndividual,
  [LOAD_STUDYING_INDIVIDUAL_SUCCESS]: loadStudyingIndividualSuccess,

  [LOAD_STUDYING_COMPANY]: loadCourseStudyingCompany,
  [LOAD_STUDYING_COMPANY_SUCCESS]: loadStudyingCompanySuccess,

  [LOAD_STUDYING_NISSOKEN]: loadCourseStudyingNissoken,
  [LOAD_STUDYING_NISSOKEN_SUCCESS]: loadStudyingNissokenSuccess,

  [LOAD_REPOS_ERROR]: repoLoadingError,

  [LOAD_COSTS_INDIVIDUAL]: loadCourseCostsIndividual,
  [LOAD_COSTS_INDIVIDUAL_SUCCESS]: loadCostsIndividualSuccess,

  [LOAD_REQUIRED_COMPANY]: loadCourseRequiredCompany,
  [LOAD_REQUIRED_COMPANY_SUCCESS]: loadRequiredCompanySuccess,

  [LOAD_COURSE_PROGRESS]: loadCourseProgress,
  [LOAD_COURSE_PROGRESS_SUCCESS]: loadCourseProgressSuccess,

  [HIDE_COURSE]: hideCourse,
  [HIDE_COURSE_SUCCESS]: hideCourseSuccess,

  [VOTE_LIKE_COURSE]: voteLikeCourse,
  [VOTE_LIKE_COURSE_SUCCESS]: voteLikeCourseSuccess,

  [REQUEST(UPDATE_ORDER_COURSES)]: updateOrderCourseRequest,
  [SUCCESS(UPDATE_ORDER_COURSES)]: updateOrderCourseSuccess,

  [RESET_FILTER_MY_PAGE]: resetSavedFilter,

  [REQUEST(UPDATE_BOOKMARK_COURSE_DISPLAY_TYPE)]: updateDisplayType
})
