/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 * @param  {state} login state
 * @param  {action} login action
 */
import { DEFAULT_LIMIT_COURSE_LIST, DEFAULT_PAG, TabsName } from '../../../constants'
import { REQUEST, SUCCESS, createReducer, updateObject } from '../../../store'
import { copyObjectUsingJSON } from '../../../utils'
import { editArray } from '../../../utils/utils'
import {
  LOAD_USER_CATEGORIES,
  LOAD_USER_CATEGORIES_SUCCESS,

  LOAD_COURSE_CATEGORIES,
  LOAD_COURSE_CATEGORIES_SUCCESS,

  LOAD_REPOS_ERROR,

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

  CHANGE_COURSE_TAB,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_TO_CARD_SUCCESS,
  GET_COURSE_IN_CART,
  GET_COURSE_IN_CART_SUCCESS,
  REMOVE_FROM_CART_SUCCESS,
  VOTE_LIKE_COURSE,
  VOTE_LIKE_COURSE_SUCCESS,

  SEARCHING_COURSE_LIST,
  RESET_FILTER_COURSE_LIST,

  LOAD_NEW_COURSE,
  LOAD_NEW_COURSE_SUCCESS,
  REQUEST_REFRESH_PAGE,
  UPDATE_BOOKMARK,
  RESET_PAGE_TO_INIT
} from './constants'

export const initialFilter = {
  courseSearch: '',
  categories: []
}

export const initialState = {
  userCategories: {
    isLoading: false,
    data: {
      listCompany: [],
      listNisoken: []
    },
    error: null
  },
  courseCategories: {
    isLoading: false,
    data: [],
    error: null
  },
  totalCourse: {
    totalCourseCompany: DEFAULT_PAG.total,
    totalCourseNissoken: DEFAULT_PAG.total,
    totalCourseNew: DEFAULT_PAG.total
  },
  courseCompany: {
    isLoading: false,
    data: {
      ...DEFAULT_PAG,
      limit: DEFAULT_LIMIT_COURSE_LIST,
      result: []
    },
    error: null
  },
  courseCost: {
    isLoading: false,
    data: {
      ...DEFAULT_PAG,
      limit: DEFAULT_LIMIT_COURSE_LIST,
      result: []
    },
    error: null
  },
  courseFree: {
    isLoading: false,
    data: {
      ...DEFAULT_PAG,
      limit: DEFAULT_LIMIT_COURSE_LIST,
      result: []
    },
    error: null
  },
  courseNissoken: {
    isLoading: false,
    data: {
      ...DEFAULT_PAG,
      limit: DEFAULT_LIMIT_COURSE_LIST,
      result: []
    },
    error: null
  },
  coursesNew: {
    isLoading: false,
    data: {
      ...DEFAULT_PAG,
      limit: DEFAULT_LIMIT_COURSE_LIST,
      result: []
    },
    error: null
  },
  courseType: {
    isLoading: false,
    data: {
      userType: '',
      listCourseNishoken: [],
      listCourseFree: [],
      listCourseCosts: [],
      listCourseCompany: [],
      listNewCourse: []
    },
    error: null
  },
  coursesInCart: {
    isLoading: false,
    data: []
  },
  isLiking: false,
  isUpdatingBookmark: false,
  error: null,
  savedFilter: initialFilter,
  courseListTab: 'COMPANY_COURSE',
  isSearching: false,
  views: 0
}

function loadCourseCategories(state) {
  return updateObject(state, {
    courseCategories: {
      ...state.courseCategories,
      isLoading: true
    }
  })
}

function loadCourseCategoriesSuccess(state, { data }) {
  return updateObject(state, {
    courseCategories: {
      ...state.courseCategories,
      data: data || [],
      isLoading: false
    }
  })
}

function loadUserCategories(state) {
  return updateObject(state, {
    userCategories: {
      ...state.userCategories,
      isLoading: true
    }
  })
}

function loadUserCategoriesSuccess(state, { data }) {
  return updateObject(state, {
    userCategories: {
      ...state.userCategories,
      data: data || state.userCategories.data
    }
  })
}

function loadCourseCompany(state) {
  return updateObject(state, {
    isSearching: true,
    courseCompany: {
      ...state.courseCompany,
      isLoading: true
    }
  })
}

function loadCourseCompanySuccess(state, { payload }) {
  const { data, savedFilter } = payload
  const { totalCourseCompany, totalCourseNissoken, totalCourseNew } = data
  const newTotalCourse = { totalCourseCompany, totalCourseNissoken, totalCourseNew }
  return updateObject(state, {
    isSearching: false,
    totalCourse: newTotalCourse,
    courseCompany: {
      ...state.courseCompany,
      data,
      isLoading: false
    },
    savedFilter
  })
}

function loadCourseCost(state) {
  return updateObject(state, {
    courseCost: {
      ...state.courseCost,
      isLoading: true
    }
  })
}

function loadCourseCostSuccess(state, { data }) {
  return updateObject(state, {
    courseCost: {
      ...state.courseCost,
      isLoading: false,
      data
    }
  })
}

function loadCourseFree(state) {
  return updateObject(state, {
    courseFree: {
      ...state.courseFree,
      isLoading: true
    }
  })
}

function loadCourseFreeSuccess(state, { data }) {
  return updateObject(state, {
    courseFree: {
      ...state.courseFree,
      data,
      isLoading: false
    }
  })
}

function loadCourseNissoken(state) {
  return updateObject(state, {
    isSearching: true,
    courseNissoken: {
      ...state.courseNissoken,
      isLoading: true
    }
  })
}

function loadCourseNissokenSuccess(state, { payload }) {
  const { data, savedFilter } = payload
  const { totalCourseCompany, totalCourseNissoken, totalCourseNew } = data
  const newTotalCourse = { totalCourseCompany, totalCourseNissoken, totalCourseNew }
  return updateObject(state, {
    isSearching: false,
    totalCourse: newTotalCourse,
    courseNissoken: {
      ...state.courseNissoken,
      data,
      isLoading: false
    },
    savedFilter
  })
}

function loadCourseType(state) {
  return updateObject(state, {
    courseType: {
      ...state.courseType,
      isLoading: true
    }
  })
}

function loadCourseTypeSuccess(state, { data }) {
  return updateObject(state, {
    courseType: {
      ...state.courseType,
      data: data || state.courseType.data,
      isLoading: true
    }
  })
}

function repoLoadingError(state, { error }) {
  return updateObject(state, {
    error,
    isLoading: false,
    isLiking: false,
    isUpdatingBookmark: false
  })
}

function changeCourseListTab(state, { tab }) {
  return updateObject(state, {
    courseListTab: tab
  })
}

function addToCart(state) {
  return updateObject(state, {
    coursesInCart: {
      isLoading: true,
      data: state.coursesInCart.data
    }
  })
}

function addToCartSuccess(state, { course }) {
  const { data } = state.coursesInCart
  const isExisted = data.find((c) => c.courseId === course.courseId)
  return updateObject(state, {
    coursesInCart: {
      data: !isExisted ? [...data, course] : data,
      isLoading: false
    }
  })
}

function getCourseInCart(state) {
  return updateObject(state, {
    coursesInCart: {
      isLoading: true,
      data: []
    }
  })
}

function getCourseInCartSuccess(state, { data }) {
  return updateObject(state, {
    coursesInCart: {
      data,
      isLoading: false
    }
  })
}

function removeFromCart(state) {
  return updateObject(state, {
    coursesInCart: {
      isLoading: true,
      data: state.coursesInCart.data
    }
  })
}
function removeFromCartSuccess(state, { course }) {
  const { data: courseInCart } = state.coursesInCart
  const newCourseInCart = []
  courseInCart.forEach((c) => {
    if (c.courseId !== course.courseId) {
      newCourseInCart.push(c)
    }
  })
  return updateObject(state, {
    coursesInCart: {
      isLoading: false,
      data: newCourseInCart
    }
  })
}

function voteLikeCourse(state) {
  return updateObject(state, {
    isLiking: true
  })
}

function voteLikeCourseSuccess(state, { payload }) {
  const { data, item, tab } = payload
  const newItem = { ...item, isLike: !item.isLike, countLikeCourse: data.likeNumber }

  const getArrayToUpdate = (tabName) => {
    switch (tabName) {
      case TabsName.COMPANY_COURSE: return state.courseCompany.data.result
      case TabsName.NISSOKEN_COURSE: return state.courseNissoken.data.result
      case TabsName.NEW_COURSE: return state.coursesNew.data.result
      default: return []
    }
  }
  const newCourses = editArray(getArrayToUpdate(tab), newItem, (el) => el.courseId === item.courseId)

  const newCourseCompany = copyObjectUsingJSON(state.courseCompany)
  if (tab === TabsName.COMPANY_COURSE) {
    newCourseCompany.data.result = newCourses
  }

  const newCourseNissoken = copyObjectUsingJSON(state.courseNissoken)
  if (tab === TabsName.NISSOKEN_COURSE) {
    newCourseNissoken.data.result = newCourses
  }

  const newCoursesNew = copyObjectUsingJSON(state.coursesNew)
  if (tab === TabsName.NEW_COURSE) {
    newCoursesNew.data.result = newCourses
  }

  return updateObject(state, {
    isLiking: false,
    courseCompany: newCourseCompany,
    courseNissoken: newCourseNissoken,
    coursesNew: newCoursesNew
  })
}

function updateBookmarkRequest(state) {
  return updateObject(state, {
    isUpdatingBookmark: true
  })
}

function updateBookmarkSuccess(state, { payload }) {
  const { item, data, tab } = payload
  const newItem = { ...item, isBookmark: data.isBookmark }

  const getArrayToUpdate = (tabName) => {
    switch (tabName) {
      case TabsName.COMPANY_COURSE: return state.courseCompany.data.result
      case TabsName.NISSOKEN_COURSE: return state.courseNissoken.data.result
      case TabsName.NEW_COURSE: return state.coursesNew.data.result
      default: return []
    }
  }
  const newCourses = editArray(getArrayToUpdate(tab), newItem, (el) => el.courseId === item.courseId)

  const newCourseCompany = copyObjectUsingJSON(state.courseCompany)
  if (tab === TabsName.COMPANY_COURSE) {
    newCourseCompany.data.result = newCourses
  }

  const newCourseNissoken = copyObjectUsingJSON(state.courseNissoken)
  if (tab === TabsName.NISSOKEN_COURSE) {
    newCourseNissoken.data.result = newCourses
  }

  const newCoursesNew = copyObjectUsingJSON(state.coursesNew)
  if (tab === TabsName.NEW_COURSE) {
    newCoursesNew.data.result = newCourses
  }

  return updateObject(state, {
    isUpdatingBookmark: false,
    courseCompany: newCourseCompany,
    courseNissoken: newCourseNissoken,
    coursesNew: newCoursesNew
  })
}

function searchingCourseList(state) {
  return updateObject(state, {
    isSearching: true
  })
}

function loadNewCourse(state) {
  return updateObject(state, {
    isSearching: true,
    coursesNew: {
      ...state.coursesNew,
      isLoading: true
    }
  })
}

function loadNewCourseSuccess(state, { payload }) {
  const { data, savedFilter } = payload
  const { totalCourseCompany, totalCourseNissoken, totalCourseNew } = data
  const newTotalCourse = { totalCourseCompany, totalCourseNissoken, totalCourseNew }
  return updateObject(state, {
    isSearching: false,
    totalCourse: newTotalCourse,
    coursesNew: {
      ...state.coursesNew,
      data,
      isLoading: false
    },
    savedFilter
  })
}

function resetFilter(state) {
  return updateObject(state, {
    savedFilter: initialFilter
  })
}

function resetPageToInit(state) {
  const newCourseCompany = copyObjectUsingJSON(state.courseCompany)
  newCourseCompany.data.page = DEFAULT_PAG.page

  const newCourseNissoken = copyObjectUsingJSON(state.courseNissoken)
  newCourseNissoken.data.page = DEFAULT_PAG.page

  const newCoursesNew = copyObjectUsingJSON(state.coursesNew)
  newCoursesNew.data.page = DEFAULT_PAG.page

  return updateObject(state, {
    courseCompany: newCourseCompany,
    courseNissoken: newCourseNissoken,
    coursesNew: newCoursesNew
  })
}

function refreshPage(state) {
  return updateObject(state, {
    views: state.views + 1
  })
}

export default createReducer(initialState, {
  [LOAD_USER_CATEGORIES]: loadUserCategories,
  [LOAD_COURSE_CATEGORIES]: loadCourseCategories,

  [LOAD_USER_CATEGORIES_SUCCESS]: loadUserCategoriesSuccess,
  [LOAD_COURSE_CATEGORIES_SUCCESS]: loadCourseCategoriesSuccess,

  [LOAD_COURSE_COMPANY]: loadCourseCompany,
  [LOAD_COURSE_COMPANY_SUCCESS]: loadCourseCompanySuccess,

  [LOAD_COURSE_COST]: loadCourseCost,
  [LOAD_COURSE_COST_SUCCESS]: loadCourseCostSuccess,

  [LOAD_COURSE_FREE]: loadCourseFree,
  [LOAD_COURSE_FREE_SUCCESS]: loadCourseFreeSuccess,

  [LOAD_COURSE_NISSOKEN]: loadCourseNissoken,
  [LOAD_COURSE_NISSOKEN_SUCCESS]: loadCourseNissokenSuccess,

  [LOAD_COURSE_TYPE]: loadCourseType,
  [LOAD_COURSE_TYPE_SUCCESS]: loadCourseTypeSuccess,
  [CHANGE_COURSE_TAB]: changeCourseListTab,

  [ADD_TO_CART]: addToCart,
  [ADD_TO_CARD_SUCCESS]: addToCartSuccess,
  [GET_COURSE_IN_CART]: getCourseInCart,
  [GET_COURSE_IN_CART_SUCCESS]: getCourseInCartSuccess,
  [REMOVE_FROM_CART]: removeFromCart,
  [REMOVE_FROM_CART_SUCCESS]: removeFromCartSuccess,

  [VOTE_LIKE_COURSE]: voteLikeCourse,
  [VOTE_LIKE_COURSE_SUCCESS]: voteLikeCourseSuccess,

  [REQUEST(UPDATE_BOOKMARK)]: updateBookmarkRequest,
  [SUCCESS(UPDATE_BOOKMARK)]: updateBookmarkSuccess,

  [SEARCHING_COURSE_LIST]: searchingCourseList,

  [LOAD_REPOS_ERROR]: repoLoadingError,

  [LOAD_NEW_COURSE]: loadNewCourse,
  [LOAD_NEW_COURSE_SUCCESS]: loadNewCourseSuccess,

  [REQUEST_REFRESH_PAGE]: refreshPage,

  [RESET_FILTER_COURSE_LIST]: resetFilter,
  [RESET_PAGE_TO_INIT]: resetPageToInit
})
