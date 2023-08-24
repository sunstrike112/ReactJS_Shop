/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectCourseListState = state => state.courseListStore || initialState

const makeSelectError = () =>
  createSelector(
    selectCourseListState,
    state => state.error
  )

const makeSelectUserCategories = () =>
  createSelector(
    selectCourseListState,
    state => state.userCategories
  )

const makeSelectCourseCategories = () =>
  createSelector(
    selectCourseListState,
    state => state.courseCategories
  )

const makeSelectCourseCompany = () =>
  createSelector(
    selectCourseListState,
    state => state.courseCompany
  )

const makeSelectCourseCost = () =>
  createSelector(
    selectCourseListState,
    state => state.courseCost
  )
const makeSelectCourseFree = () =>
  createSelector(
    selectCourseListState,
    state => state.courseFree
  )

const makeSelectCoursesNissoken = () =>
  createSelector(
    selectCourseListState,
    state => state.courseNissoken
  )

const makeSelectCourseType = () =>
  createSelector(
    selectCourseListState,
    state => state.courseType
  )
const makeSelectcourseListTab = () =>
  createSelector(
    selectCourseListState,
    state => state.courseListTab
  )
const makeSelectCourseInCart = () =>
  createSelector(
    selectCourseListState,
    state => state.coursesInCart
  )

const makeSelectIsLiking = () =>
  createSelector(
    selectCourseListState,
    state => state.isLiking
  )

const makeSelectIsUpdatingBookmark = () =>
  createSelector(
    selectCourseListState,
    state => state.isUpdatingBookmark
  )

const makeSelectSaveFilter = () =>
  createSelector(
    selectCourseListState,
    state => state.savedFilter
  )

const makeSelectTotalCourse = () =>
  createSelector(
    selectCourseListState,
    state => state.totalCourse
  )

const makeSelectIsSearching = () => createSelector(
  selectCourseListState,
  state => state.isSearching
)

const makeSelectNewCourse = () =>
  createSelector(
    selectCourseListState,
    state => state.coursesNew
  )

const makeSelectViews = () =>
  createSelector(
    selectCourseListState,
    state => state.views
  )

export {
  selectCourseListState,
  makeSelectError,
  makeSelectUserCategories,
  makeSelectCourseCategories,
  makeSelectCourseCompany,
  makeSelectCourseCost,
  makeSelectCourseFree,
  makeSelectCoursesNissoken,
  makeSelectCourseType,
  makeSelectcourseListTab,
  makeSelectCourseInCart,
  makeSelectSaveFilter,
  makeSelectIsLiking,
  makeSelectTotalCourse,
  makeSelectIsSearching,
  makeSelectNewCourse,
  makeSelectViews,
  makeSelectIsUpdatingBookmark
}
