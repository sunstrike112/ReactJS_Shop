/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectDailyReports = state => state.dailyReportsStore || initialState

const makeSelectDailyReports = () =>
  createSelector(selectDailyReports, state => state)

export {
  selectDailyReports,
  makeSelectDailyReports
}
