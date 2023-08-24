/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectSettingDomain = (state) => state.settingDomain || initialState

const makeSettingDomain = () => (
  createSelector(selectSettingDomain, (state) => state)
)

export { makeSettingDomain }
