/* eslint-disable implicit-arrow-linebreak */
import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectCourse = (state) => state.registerEmailStore || initialState

const makeSelectIsLoading = () =>
  createSelector(selectCourse, (state) => state.isLoading)

const makeSelectError = () =>
  createSelector(selectCourse, (state) => state.error)

const makeSelectSuccess = () =>
  createSelector(selectCourse, (state) => state.isSuccess)

const makeSelectIsExistEmail = () =>
  createSelector(selectCourse, (state) => state.emailExist)

const makeSelectRegisterCompany = () =>
  createSelector(selectCourse, (state) => state.registerCompany)

const makeSelectValidateEmailCompany = () =>
  createSelector(selectCourse, (state) => state.validateEmailCompany)

export {
  makeSelectSuccess,
  makeSelectError,
  makeSelectIsLoading,
  makeSelectIsExistEmail,
  makeSelectRegisterCompany,
  makeSelectValidateEmailCompany
}
