/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectSettingMaintenanceStatus = (state) => state.settingMobile || initialState

const makeSelectSettingMobile = () => (
  createSelector(selectSettingMaintenanceStatus, (state) => state)
)

export { selectSettingMaintenanceStatus, makeSelectSettingMobile }
