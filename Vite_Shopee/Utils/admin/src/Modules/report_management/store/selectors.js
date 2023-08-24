/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectReportManagement = (state) => state.reportManagement || initialState

const makeGetListReport = () => (
  createSelector(selectReportManagement, (state) => state)
)

const makeGetReportDetail = () => (
  createSelector(selectReportManagement, (state) => state)
)
export {
  makeGetListReport,
  makeGetReportDetail
}
