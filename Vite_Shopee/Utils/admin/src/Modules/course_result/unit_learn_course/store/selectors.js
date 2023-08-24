/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */
import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectStatusUnit = state => state.unitLearnCourseStatus || initialState

const makeSelectStatusUnit = () =>
  createSelector(
    selectStatusUnit,
    state => state
  )

export {
  selectStatusUnit,
  makeSelectStatusUnit
}
