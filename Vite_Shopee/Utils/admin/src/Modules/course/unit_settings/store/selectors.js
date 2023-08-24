/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectUnitSetting = (state) => state.unitSetting || initialState

const makeSelectUnitSetting = () => createSelector(selectUnitSetting, (state) => state)

const makeSelectOrderUnitSetting = () =>
  createSelector(selectUnitSetting, (state) => state.order.map((item, index) => ({ index, ...item })))

const makeSelectCourseId = () => createSelector(selectUnitSetting, (state) => state.selectedCourse?.data?.courseId || '')

const makeSelectSurveyQuestionIds = () => createSelector(selectUnitSetting, (state) => state.surveyQuestions.reduce((init, val) => init.concat(val.questionId), []))

export { selectUnitSetting, makeSelectUnitSetting, makeSelectOrderUnitSetting, makeSelectCourseId, makeSelectSurveyQuestionIds }
