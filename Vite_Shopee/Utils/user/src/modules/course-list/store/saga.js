import { put, takeLatest } from 'redux-saga/effects'
import {
  getListCategoryByUser,
  getCourseCategoryByUser,
  getCourseCompany,
  getCourseFree,
  getCourseNissoken,
  getCourseCost,
  getCourseType,
  addToCart,
  getCourseInCart,
  removeFromCart,
  voteLikeCourse,
  getNewCourse
} from '../../../apis'
import { DEFAULT_LIMIT_COURSE_LIST, DEFAULT_PAG, TabsName } from '../../../constants'
import {
  repoLoadingError,
  loadUserCategoriesSuccess,
  loadCourseCategoriesSuccess,
  loadCourseCompanySuccess,
  loadCourseCostSuccess,
  loadCourseFreeSuccess,
  loadCourseNissokenSuccess,
  loadCourseTypeSuccess,
  addToCartSuccess,
  getCourseInCartSuccess,
  removeFromCartSuccess,
  voteLikeCourseSuccess,
  loadNewCourseSuccess
} from './actions'

import {
  LOAD_USER_CATEGORIES,
  LOAD_COURSE_CATEGORIES,
  LOAD_COURSE_COMPANY,
  LOAD_COURSE_COST,
  LOAD_COURSE_FREE,
  LOAD_COURSE_NISSOKEN,
  LOAD_COURSE_TYPE,
  ADD_TO_CART,
  GET_COURSE_IN_CART,
  REMOVE_FROM_CART,
  VOTE_LIKE_COURSE,
  SEARCHING_COURSE_LIST,
  LOAD_NEW_COURSE,
  REFRESH_PAGE,
  RESET_FILTER_COURSE_LIST,
  REQUEST_REFRESH_PAGE,
  UPDATE_BOOKMARK,
  RESET_PAGE_TO_INIT
} from './constants'
import { updateBookmarkApi } from '../../../apis/course.api'
import { REQUEST, SUCCESS } from '../../../store'
import { getResultWithPaging } from '../../../utils'

export function* loadUserCategorySaga({ userId }) {
  try {
    const { data } = yield getListCategoryByUser(userId)

    yield put(loadUserCategoriesSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadCourseCategorySaga({ userId }) {
  try {
    const { data } = yield getCourseCategoryByUser(userId)
    yield put(loadCourseCategoriesSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadCourseCompanySaga({ payload }) {
  const { categories, courseSearch, isRequired } = payload
  try {
    const { data } = yield getResultWithPaging({ action: getCourseCompany, payload, condition: (res) => res.result.length })
    yield put(loadCourseCompanySuccess({ data, savedFilter: { categories, courseSearch, isRequired } }))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadCourseNissokenSaga({ payload }) {
  const { categories, courseSearch, isRequired } = payload
  try {
    const { data } = yield getResultWithPaging({ action: getCourseNissoken, payload, condition: (res) => res.result.length })
    yield put(loadCourseNissokenSuccess({ data, savedFilter: { categories, courseSearch, isRequired } }))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadCourseCostSaga({ categories, courseSearch }) {
  try {
    const { data } = yield getCourseCost(categories, courseSearch)
    yield put(loadCourseCostSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadCourseFreeSaga({ categories, courseSearch }) {
  try {
    const { data } = yield getCourseFree(categories, courseSearch)
    yield put(loadCourseFreeSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* loadCourseTypeSaga({ userId }) {
  try {
    const { data } = yield getCourseType(userId)
    yield put(loadCourseTypeSuccess(data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* addToCartSaga({ course }) {
  try {
    yield addToCart(course.courseId)
    yield put(addToCartSuccess(course))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* getCourseInCartSaga() {
  try {
    const data = yield getCourseInCart()
    yield put(getCourseInCartSuccess(data.data))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* removeFromCartSaga({ course }) {
  try {
    yield removeFromCart(course.courseId)
    yield put(removeFromCartSuccess(course))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* voteLikeCourseSaga({ payload }) {
  try {
    const { code, data } = yield voteLikeCourse(payload.courseId)
    if (code === 200) {
      yield put(voteLikeCourseSuccess({ data, ...payload }))
    }
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* searchingCourseListSaga({ payload }) {
  const { courseListTab, categories, courseSearch, isRequired, history } = payload
  const newSavedFilter = { categories, courseSearch, isRequired }
  const params = {
    page: DEFAULT_PAG.page,
    limit: DEFAULT_LIMIT_COURSE_LIST,
    ...newSavedFilter
  }

  const getResponseWithTab = {
    [TabsName.COMPANY_COURSE]: getCourseCompany,
    [TabsName.NISSOKEN_COURSE]: getCourseNissoken,
    [TabsName.NEW_COURSE]: getNewCourse
  }
  const pushCourseWithTab = {
    [TabsName.COMPANY_COURSE]: loadCourseCompanySuccess,
    [TabsName.NISSOKEN_COURSE]: loadCourseNissokenSuccess,
    [TabsName.NEW_COURSE]: loadNewCourseSuccess
  }
  const totalMappingCourse = {
    [TabsName.COMPANY_COURSE]: 'totalCourseCompany',
    [TabsName.NISSOKEN_COURSE]: 'totalCourseNissoken',
    [TabsName.NEW_COURSE]: 'totalCourseNew'
  }

  let currentTab = courseListTab
  let courseTabs = [TabsName.COMPANY_COURSE, TabsName.NISSOKEN_COURSE, TabsName.NEW_COURSE] // Priority course to show data

  yield put({ type: RESET_PAGE_TO_INIT })
  function* getCourseWithTab() {
    try {
      const { data } = yield getResponseWithTab[currentTab](params)

      const coursesHasTotal = courseTabs.filter((courseTab) => data[totalMappingCourse[courseTab]] !== 0)
      if (coursesHasTotal.includes(currentTab) || !coursesHasTotal.length) {
        yield put(pushCourseWithTab[currentTab]({ data, savedFilter: newSavedFilter }))

        if (currentTab !== courseListTab) history.push(`/course-list?fromTab=${currentTab}`)
      } else {
        // eslint-disable-next-line prefer-destructuring
        currentTab = coursesHasTotal[0]
        yield getCourseWithTab()
      }
    } catch (error) {
      yield put(repoLoadingError(error))
    }
  }
  yield getCourseWithTab()
}

export function* loadNewCourseSaga({ payload }) {
  const { categories, courseSearch, isRequired } = payload
  try {
    const { data } = yield getResultWithPaging({ action: getNewCourse, payload, condition: (res) => res.result.length })
    yield put(loadNewCourseSuccess({ data, savedFilter: { categories, courseSearch, isRequired } }))
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* updateBookmarkSaga({ payload }) {
  const { queryParam, ...restPayload } = payload
  try {
    const { data } = yield updateBookmarkApi(queryParam)
    yield put({
      type: SUCCESS(UPDATE_BOOKMARK),
      payload: { data, ...restPayload }
    })
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

export function* refreshPageSaga() {
  try {
    yield put({ type: RESET_FILTER_COURSE_LIST })
    yield put({ type: RESET_PAGE_TO_INIT })
    yield put({ type: REQUEST_REFRESH_PAGE })
  } catch (error) {
    yield put(repoLoadingError(error))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* AppSaga() {
  // Watches for appSaga actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_USER_CATEGORIES, loadUserCategorySaga)
  yield takeLatest(LOAD_COURSE_CATEGORIES, loadCourseCategorySaga)

  yield takeLatest(LOAD_COURSE_COMPANY, loadCourseCompanySaga)
  yield takeLatest(LOAD_COURSE_COST, loadCourseCostSaga)
  yield takeLatest(LOAD_COURSE_FREE, loadCourseFreeSaga)
  yield takeLatest(LOAD_COURSE_NISSOKEN, loadCourseNissokenSaga)
  yield takeLatest(LOAD_NEW_COURSE, loadNewCourseSaga)
  yield takeLatest(LOAD_COURSE_TYPE, loadCourseTypeSaga)
  yield takeLatest(ADD_TO_CART, addToCartSaga)
  yield takeLatest(GET_COURSE_IN_CART, getCourseInCartSaga)
  yield takeLatest(REMOVE_FROM_CART, removeFromCartSaga)
  yield takeLatest(VOTE_LIKE_COURSE, voteLikeCourseSaga)
  yield takeLatest(SEARCHING_COURSE_LIST, searchingCourseListSaga)
  yield takeLatest(REFRESH_PAGE, refreshPageSaga)
  yield takeLatest(REQUEST(UPDATE_BOOKMARK), updateBookmarkSaga)
}
