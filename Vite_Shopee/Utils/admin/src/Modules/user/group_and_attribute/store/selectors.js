/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectGroupAttribute = state => state.groupAttribute || initialState

const makeSelectGroupAttribute = () =>
  createSelector(
    selectGroupAttribute,
    state => state
  )

export {
  selectGroupAttribute,
  makeSelectGroupAttribute
}
