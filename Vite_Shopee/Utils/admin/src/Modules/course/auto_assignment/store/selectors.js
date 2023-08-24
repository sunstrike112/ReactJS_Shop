/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectAutoAssignment = (state) => state.autoAssignment || initialState

const makeSelectAutoAssignment = () => (
  createSelector(selectAutoAssignment, (state) => state)
)

export { selectAutoAssignment, makeSelectAutoAssignment }
