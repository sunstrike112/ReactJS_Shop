/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducers'

const selectSurveyResults = state => state.surveyResults || initialState

const makeSelectSurveyResults = () =>
  createSelector(
    selectSurveyResults,
    state => state
  )

const makeSelectSurveyQuestion = () =>
  createSelector(
    selectSurveyResults,
    state => state.questions
  )

export {
  selectSurveyResults,
  makeSelectSurveyResults,
  makeSelectSurveyQuestion
}
