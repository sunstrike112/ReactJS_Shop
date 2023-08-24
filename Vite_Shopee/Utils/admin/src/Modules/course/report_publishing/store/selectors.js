/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectReportSetting = (state) => state.reportPublishSetting || initialState

const makeSelectReportSetting = () => createSelector(selectReportSetting, (state) => state)

export { selectReportSetting, makeSelectReportSetting }
