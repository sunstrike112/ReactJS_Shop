/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectGlobal = state => state.global || initialState

const makeSelectGlobal = () =>
  createSelector(
    selectGlobal,
    state => state
  )

export {
  selectGlobal,
  makeSelectGlobal
}
