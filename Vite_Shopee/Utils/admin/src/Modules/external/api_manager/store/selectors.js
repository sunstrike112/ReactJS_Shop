/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectingExternalApiManager = (state) => state.externalApiManager || initialState

const makeSelectExternalApiManager = () => (
  createSelector(selectingExternalApiManager, (state) => state)
)

export { makeSelectExternalApiManager }
