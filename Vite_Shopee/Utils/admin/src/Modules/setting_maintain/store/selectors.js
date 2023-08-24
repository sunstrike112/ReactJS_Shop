/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectSettingMaintenanceStatus = (state) => state.settingMaintenanceStatus || initialState

const makeSettingMaintenanceStatus = () => (
  createSelector(selectSettingMaintenanceStatus, (state) => state)
)

export { selectSettingMaintenanceStatus, makeSettingMaintenanceStatus }
