/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectuserDeleteByCsv = state => state.userDeleteByCsv || initialState

const makeSelectuserDeleteByCsv = () =>
  createSelector(
    selectuserDeleteByCsv,
    state => state
  )

export {
  selectuserDeleteByCsv,
  makeSelectuserDeleteByCsv
}
