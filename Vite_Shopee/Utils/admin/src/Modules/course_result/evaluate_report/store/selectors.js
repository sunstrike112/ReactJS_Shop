/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */
import { createSelector } from 'reselect'
import { initialState } from './reducers'

const selectReportDetail = state => state.reportDetail || initialState

const makeSelectReportDetail = () =>
  createSelector(
    selectReportDetail,
    state => state
  )

export {
  selectReportDetail,
  makeSelectReportDetail
}
