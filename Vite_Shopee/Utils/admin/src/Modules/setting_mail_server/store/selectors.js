/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectSettingEmailServer = (state) => state.settingEmailServer || initialState

const makeSelectSettingEmailServer = () => (
  createSelector(selectSettingEmailServer, (state) => state)
)

export { makeSelectSettingEmailServer }
