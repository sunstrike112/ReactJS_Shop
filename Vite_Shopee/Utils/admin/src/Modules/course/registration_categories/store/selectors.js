/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectRegistrationCourseCategories = state => state.registrationCourseCategories || initialState

const makeSelectRegistrationCourseCategories = () =>
  createSelector(
    selectRegistrationCourseCategories,
    state => state
  )

const makeSelectError = () =>
  createSelector(
    selectRegistrationCourseCategories,
    state => state.error
  )

const makeSelectCourseCategories = () =>
  createSelector(
    selectRegistrationCourseCategories,
    state => state.categories
  )

const makeSelectAllCourseCategories = () =>
  createSelector(
    selectRegistrationCourseCategories,
    state => state.listAllCategories
  )
const makeSelectLoading = () =>
  createSelector(
    selectRegistrationCourseCategories,
    state => state.isLoading
  )

const makeSelectPagination = () =>
  createSelector(
    selectRegistrationCourseCategories,
    state => state.pagination
  )

const makeSelectFilter = () =>
  createSelector(
    selectRegistrationCourseCategories,
    state => state.filter
  )

const makeSelectCourseCategoryDetail = () =>
  createSelector(
    selectRegistrationCourseCategories,
    state => state.courseCategoryDetail
  )

const makeSelectCourseCategoryReOrder = () =>
  createSelector(
    selectRegistrationCourseCategories,
    state => state.listCategoriesOrder
  )

const makeSelectCourseCreateSuccess = () =>
  createSelector(
    selectRegistrationCourseCategories, state => state.isCreateOrEditSuccess
  )

const makeSelectCategoryPreview = () =>
  createSelector(selectRegistrationCourseCategories, state => state.categoryPreview)

export {
  selectRegistrationCourseCategories,
  makeSelectRegistrationCourseCategories,
  makeSelectError,
  makeSelectCourseCategories,
  makeSelectLoading,
  makeSelectPagination,
  makeSelectFilter,
  makeSelectAllCourseCategories,
  makeSelectCourseCategoryDetail,
  makeSelectCourseCategoryReOrder,
  makeSelectCourseCreateSuccess,
  makeSelectCategoryPreview
}
