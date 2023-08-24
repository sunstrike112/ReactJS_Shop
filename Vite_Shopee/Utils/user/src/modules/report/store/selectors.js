/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectReport = state => state.reportStore || initialState

const makeSelectError = () =>
  createSelector(
    selectReport,
    state => state.error
  )

const makeSelectReport = () =>
  createSelector(
    selectReport,
    state => state.report
  )

const makeSelectReportAnswer = () =>
  createSelector(
    selectReport,
    state => state.reportAnswers
  )

const makeSelectSubmitReportSuccess = () =>
  createSelector(
    selectReport,
    state => state.submitReport.isSuccess
  )

const makeSelectSaveDraftReportSuccess = () =>
  createSelector(
    selectReport,
    state => state.submitReport.isDraftSuccess
  )

export {
  selectReport,
  makeSelectError,
  makeSelectReport,
  makeSelectReportAnswer,
  makeSelectSubmitReportSuccess,
  makeSelectSaveDraftReportSuccess
}
