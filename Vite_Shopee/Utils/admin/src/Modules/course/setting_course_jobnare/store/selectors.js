/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const settingCourseJobnare = (state) => state.settingCourseJobnare || initialState

const makeSettingCourseJobnare = () => (
  createSelector(settingCourseJobnare, (state) => state)
)

export { settingCourseJobnare, makeSettingCourseJobnare }
