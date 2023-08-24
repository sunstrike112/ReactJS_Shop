/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectTestQuestionManagement = (state) => state.testQuestionManagement || initialState

const makeSelectTestQuestionManagement = () => (
  createSelector(selectTestQuestionManagement, (state) => state)
)

export { selectTestQuestionManagement, makeSelectTestQuestionManagement }
