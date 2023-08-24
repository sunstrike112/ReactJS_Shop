/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectRegistrationCourses = state => state.settingAccessCourse || initialState

const makeSelectSettingAccessCourse = () =>
  createSelector(
    selectRegistrationCourses,
    state => state
  )
export {
  selectRegistrationCourses,
  makeSelectSettingAccessCourse
}
