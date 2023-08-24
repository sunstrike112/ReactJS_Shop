/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectWorkspaceRegisterByCsv = state => state.workspaceRegisterByCsv || initialState

const makeSelectWorkspaceRegisterByCsv = () =>
  createSelector(
    selectWorkspaceRegisterByCsv,
    state => state
  )

export {
  selectWorkspaceRegisterByCsv,
  makeSelectWorkspaceRegisterByCsv
}
