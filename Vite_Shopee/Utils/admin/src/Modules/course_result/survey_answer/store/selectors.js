/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */
import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectSurveyAnswer = state => state.surveyAnswer || initialState

const makeSelectSurveyAnswer = () =>
  createSelector(
    selectSurveyAnswer,
    state => state
  )

export {
  selectSurveyAnswer,
  makeSelectSurveyAnswer
}
