/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */
import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectTestResult = state => state.testResult || initialState

const makeSelectTestResult = () =>
  createSelector(
    selectTestResult,
    state => state
  )

export {
  selectTestResult,
  makeSelectTestResult
}
