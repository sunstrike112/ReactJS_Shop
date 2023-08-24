/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectCompanySeminar = state => state.companySeminar || initialState

const makeSelectCompanySeminar = () =>
  createSelector(
    selectCompanySeminar,
    state => state
  )

export {
  selectCompanySeminar,
  makeSelectCompanySeminar
}
