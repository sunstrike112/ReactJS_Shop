/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */
import { createSelector } from 'reselect'
import { initialState } from './reducers'

const selectReportResult = state => state.reportResults || initialState

const makeSelectReportResult = () =>
  createSelector(
    selectReportResult,
    state => state
  )

export {
  selectReportResult,
  makeSelectReportResult
}
