/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectCompany = (state) => state.company || initialState

const makeSelectCompany = () => (
  createSelector(selectCompany, (state) => state)
)

export { selectCompany, makeSelectCompany }
