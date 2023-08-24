/* eslint-disable implicit-arrow-linebreak */
import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectCourse = (state) => state.verifyPasswordStore || initialState

const makeSelectIsLoading = () =>
  createSelector(selectCourse, (state) => state.isLoading)

const makeSelectError = () =>
  createSelector(selectCourse, (state) => state.error)

const makeSelectSuccess = () =>
  createSelector(selectCourse, (state) => state.isSuccess)

const makeSelectVerifiedData = () =>
  createSelector(selectCourse, (state) => state.verifiedData)

const makeSelectSettingPasswordSuccess = () =>
  createSelector(selectCourse, (state) => state.isSettingPasswordSuccess)

export {
  makeSelectSuccess,
  makeSelectError,
  makeSelectIsLoading,
  makeSelectVerifiedData,
  makeSelectSettingPasswordSuccess
}
