import { useDispatch, useSelector } from 'react-redux'

import { useCallback } from 'react'
import { useInjectSaga, useInjectReducer } from '../store'
import courseListSaga from '../modules/course-list/store/saga'
import courseListReducer from '../modules/course-list/store/reducer'

import {
  loadCourseFree,
  loadCourseCompany,
  loadCourseCost,
  loadCourseType,
  loadCourseNissoken,
  changeCourseListTab,
  addToCart,
  removeFromCart,
  initCart,
  getCourseInCart,
  voteLikeCourseAction,
  searchingCourseList,
  resetFilterCourseList,
  loadNewCourse,
  refreshCourseListPage,
  updateBookmarkRequest,
  resetPageToInit
} from '../modules/course-list/store/actions'
import {
  makeSelectCourseCompany,
  makeSelectCourseCost,
  makeSelectCourseFree,
  makeSelectCoursesNissoken,
  makeSelectCourseType,
  makeSelectcourseListTab,
  makeSelectCourseInCart,
  makeSelectIsLiking,
  makeSelectSaveFilter,
  makeSelectTotalCourse,
  makeSelectIsSearching,
  makeSelectError,
  makeSelectNewCourse,
  makeSelectViews,
  makeSelectIsUpdatingBookmark
} from '../modules/course-list/store/selectors'

export const useCourseList = ({ userId }) => {
  useInjectSaga({ key: 'courseListStore', saga: courseListSaga })
  useInjectReducer({ key: 'courseListStore', reducer: courseListReducer })

  const dispatch = useDispatch()
  const { data: courseCompany, isLoading: courseCompanyIsLoading } = useSelector(makeSelectCourseCompany())
  const { data: courseCost, isLoading: courseCostIsLoading } = useSelector(makeSelectCourseCost())
  const { data: courseFree, isLoading: courseFreeIsLoading } = useSelector(makeSelectCourseFree())
  const { data: courseNissoken, isLoading: courseNissokenIsLoading } = useSelector(makeSelectCoursesNissoken())
  const { data: coursesNew, isLoading: newCourseIsLoading } = useSelector(makeSelectNewCourse())

  const { data: courseType } = useSelector(makeSelectCourseType())
  const { data: courseInCart } = useSelector(makeSelectCourseInCart())
  const totalCourse = useSelector(makeSelectTotalCourse())
  const courseListTab = useSelector(makeSelectcourseListTab())
  const isLiking = useSelector(makeSelectIsLiking())
  const isUpdatingBookmark = useSelector(makeSelectIsUpdatingBookmark())
  const isSearching = useSelector(makeSelectIsSearching())
  const error = useSelector(makeSelectError())
  const viewsCourseList = useSelector(makeSelectViews())

  const getCourseCompany = (payload) => dispatch(loadCourseCompany(payload))
  const getCourseNissoken = (payload) => dispatch(loadCourseNissoken(payload))
  const getCourseCost = (categories = [], courseSearch = '') => dispatch(loadCourseCost(categories, courseSearch))
  const getCourseFree = (categories = [], courseSearch = '') => dispatch(loadCourseFree(categories, courseSearch))
  const searchingCourseListAction = (payload) => dispatch(searchingCourseList(payload))
  const getCourseType = () => dispatch(loadCourseType(userId))
  const onChangeTab = (tab) => dispatch(changeCourseListTab(tab))
  const addCourseToCart = (course) => dispatch(addToCart(course))
  const getCourseDataInCart = () => dispatch(getCourseInCart())
  const removeCourseFromCart = (course) => dispatch(removeFromCart(course))
  const initCourseInCart = () => dispatch(initCart())
  const voteLikeCourse = (payload) => dispatch(voteLikeCourseAction(payload))
  const getNewCourse = (payload) => dispatch(loadNewCourse(payload))
  const refreshCourseListPageAction = useCallback(() => dispatch(refreshCourseListPage()), [])
  const resetPageToInitOfCourseListAction = useCallback(() => dispatch(resetPageToInit()), [])
  const updateBookmarkAction = useCallback((payload) => dispatch(updateBookmarkRequest(payload)), [])

  // Filter
  const savedFilter = useSelector(makeSelectSaveFilter())
  const resetFilterCourseListAction = () => {
    dispatch(resetFilterCourseList())
    resetPageToInitOfCourseListAction()
  }

  return {
    isLiking,
    isUpdatingBookmark,
    isSearching,
    courseCompany,
    courseCost,
    courseFree,
    courseNissoken,
    courseType,
    courseListTab,
    courseInCart,
    courseCompanyIsLoading,
    courseCostIsLoading,
    courseFreeIsLoading,
    courseNissokenIsLoading,
    totalCourse,
    error,
    coursesNew,
    newCourseIsLoading,
    viewsCourseList,
    getCourseCompany,
    getCourseCost,
    getCourseFree,
    getCourseNissoken,
    getCourseType,
    onChangeTab,
    addCourseToCart,
    removeCourseFromCart,
    initCourseInCart,
    getCourseDataInCart,
    voteLikeCourse,
    searchingCourseListAction,
    getNewCourse,
    refreshCourseListPageAction,
    resetPageToInitOfCourseListAction,
    updateBookmarkAction,
    // filter
    savedFilter,
    resetFilterCourseListAction
  }
}
