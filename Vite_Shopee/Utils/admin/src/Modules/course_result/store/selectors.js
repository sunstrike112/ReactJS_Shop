/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectTest = state => state.testSaga || initialState

const makeSelectError = () =>
  createSelector(
    selectTest,
    state => state.error
  )

const makeSelectUsers = () =>
  createSelector(
    selectTest,
    state => state.users
  )

const makeSelectLoading = () =>
  createSelector(
    selectTest,
    state => state.isLoading
  )

export {
  selectTest,
  makeSelectError,
  makeSelectUsers,
  makeSelectLoading
}
