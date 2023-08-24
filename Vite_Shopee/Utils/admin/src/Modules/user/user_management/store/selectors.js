/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectUserManagement = state => state.userManagement || initialState

const makeSelectUserManagement = () =>
  createSelector(
    selectUserManagement,
    state => state
  )

export {
  selectUserManagement,
  makeSelectUserManagement
}
