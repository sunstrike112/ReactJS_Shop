/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectCourse = state => state.myPageStore || initialState

const makeSelectCoursesStudingIndividual = () =>
  createSelector(
    selectCourse,
    state => state.courseStudingIndividual
  )

const makeSelectIsLoading = () =>
  createSelector(
    selectCourse,
    state => state.isLoading
  )
const makeSelectIsLiking = () =>
  createSelector(
    selectCourse,
    state => state.isLiking
  )

const makeSelectCoursesStudyingCompany = () =>
  createSelector(
    selectCourse,
    state => state.courseStudyingCompany
  )

const makeSelectCoursesStudyingNissoken = () =>
  createSelector(
    selectCourse,
    state => state.courseStudyingNissoken
  )

const makeSelectCoursesRequired = () =>
  createSelector(
    selectCourse,
    state => state.courseRequired
  )

const makeSelectCoursesStudyingRequired = () =>
  createSelector(
    selectCourse,
    state => state.courseStudyingRequired
  )
const makeSelectCourseProgress = () =>
  createSelector(
    selectCourse,
    state => state.courseProgress
  )

const makeSelectSavedFilter = () =>
  createSelector(
    selectCourse,
    state => state.savedFilter
  )

const makeSelectTotalCourse = () =>
  createSelector(
    selectCourse,
    state => state.totalCourse
  )

const makeSelectDisplayType = () =>
  createSelector(
    selectCourse,
    state => state.displayType
  )

export {
  selectCourse,
  makeSelectCoursesStudingIndividual,
  makeSelectCoursesRequired,
  makeSelectCoursesStudyingCompany,
  makeSelectCoursesStudyingNissoken,
  makeSelectCoursesStudyingRequired,
  makeSelectIsLoading,
  makeSelectIsLiking,
  makeSelectCourseProgress,
  makeSelectSavedFilter,
  makeSelectTotalCourse,
  makeSelectDisplayType
}
