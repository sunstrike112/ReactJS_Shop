/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectSettingPasswordPlan = (state) => state.settingPasswordPlan || initialState

const makeSettingPasswordPlan = () => (
  createSelector(selectSettingPasswordPlan, (state) => state)
)

export { makeSettingPasswordPlan }
