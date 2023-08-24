/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectLoginHistory = state => state.loginHistories || initialState

const makeSelectLoginHistory = () =>
  createSelector(
    selectLoginHistory,
    state => state
  )

export {
  selectLoginHistory,
  makeSelectLoginHistory
}
