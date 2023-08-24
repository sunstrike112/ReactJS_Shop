/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectRegistrationCourses = state => state.registrationCourses || initialState

const makeSelectRegistrationCourses = () =>
  createSelector(
    selectRegistrationCourses,
    state => state
  )

const makeSelectOrderCourse = () =>
  createSelector(
    selectRegistrationCourses,
    state => state.order.map((item, index) => ({ index, ...item }))
  )

export {
  selectRegistrationCourses,
  makeSelectRegistrationCourses,
  makeSelectOrderCourse
}
