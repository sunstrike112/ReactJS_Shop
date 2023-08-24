/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectCourse = state => state.courseStore || initialState

const makeSelectError = () =>
  createSelector(
    selectCourse,
    state => state.error
  )

const makeSelectCourseDetail = () =>
  createSelector(
    selectCourse,
    state => state.courseDetail
  )

const makeSelectCourseDetailUnregistered = () =>
  createSelector(
    selectCourse,
    state => state.courseDetailUnregistered
  )

const makeSelectLessonDetail = () =>
  createSelector(
    selectCourse,
    state => state.lessonDetail
  )

const makeSelectLessonIsSubmited = () =>
  createSelector(
    selectCourse,
    state => state.isSubmitEnd
  )

const makeSelectIsRequestPasswordVideo = () =>
  createSelector(
    selectCourse,
    state => state.isRequestPasswordVideo
  )

const makeSelectLoading = () =>
  createSelector(
    selectCourse,
    state => state.isLoading
  )

export {
  selectCourse,
  makeSelectError,
  makeSelectCourseDetail,
  makeSelectLessonDetail,
  makeSelectLoading,
  makeSelectLessonIsSubmited,
  makeSelectCourseDetailUnregistered,
  makeSelectIsRequestPasswordVideo
}
