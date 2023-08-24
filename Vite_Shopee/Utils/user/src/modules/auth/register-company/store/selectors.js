/* eslint-disable implicit-arrow-linebreak */
import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectCourse = (state) => state.registerCompanyStore || initialState

const makeSelectIsLoading = () =>
  createSelector(selectCourse, (state) => state.isLoading)

const makeSelectError = () =>
  createSelector(selectCourse, (state) => state.error)

const makeSelectSuccess = () =>
  createSelector(selectCourse, (state) => state.isSuccess)

const makeSelectVerifiedData = () =>
  createSelector(selectCourse, (state) => state.verifiedData)

const makeSelectRegisterSuccess = () =>
  createSelector(selectCourse, (state) => state.isRegisterSuccess)

const makeSelectPlanPackage = () =>
  createSelector(selectCourse, (state) => state.planPackage)

export {
  makeSelectSuccess,
  makeSelectError,
  makeSelectIsLoading,
  makeSelectVerifiedData,
  makeSelectRegisterSuccess,
  makeSelectPlanPackage
}
