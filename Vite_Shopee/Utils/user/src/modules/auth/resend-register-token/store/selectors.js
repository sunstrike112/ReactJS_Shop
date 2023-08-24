/* eslint-disable implicit-arrow-linebreak */
import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectCourse = (state) => state.resendEmailStore || initialState

const makeSelectIsLoading = () =>
  createSelector(selectCourse, (state) => state.isLoading)

const makeSelectError = () =>
  createSelector(selectCourse, (state) => state.error)

const makeSelectSuccess = () =>
  createSelector(selectCourse, (state) => state.isSuccess)

export { makeSelectSuccess, makeSelectError, makeSelectIsLoading }
