/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */
import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectStatusCourse = state => state.statusCourse || initialState

const makeSelectStatusCourse = () =>
  createSelector(
    selectStatusCourse,
    state => state
  )

export {
  selectStatusCourse,
  makeSelectStatusCourse
}
