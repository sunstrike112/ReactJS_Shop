/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectuserRegisterByCsv = state => state.userRegisterByCsv || initialState

const makeSelectuserRegisterByCsv = () =>
  createSelector(
    selectuserRegisterByCsv,
    state => state
  )

export {
  selectuserRegisterByCsv,
  makeSelectuserRegisterByCsv
}
