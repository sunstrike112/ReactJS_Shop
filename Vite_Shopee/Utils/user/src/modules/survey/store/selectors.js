/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectSurvey = state => state.surveyStore || initialState

const makeSelectError = () =>
  createSelector(
    selectSurvey,
    state => state.error
  )

const makeSelectSurveyResult = () =>
  createSelector(
    selectSurvey,
    state => state.surveyResult
  )

const makeSelectSurvey = () =>
  createSelector(
    selectSurvey,
    state => state.survey
  )

const makeSelectSurveyAnswer = () =>
  createSelector(
    selectSurvey,
    state => state.surveyAnswers
  )

const makeSelectSubmitSurveySuccess = () =>
  createSelector(
    selectSurvey,
    state => state.submitSurvey.isSuccess
  )

const makeSelectIsLoadingBothTestAndResult = () =>
  createSelector(
    selectSurvey,
    state => state.isLoadingBothTestAndResult
  )

export {
  selectSurvey,
  makeSelectError,
  makeSelectSurveyResult,
  makeSelectSurvey,
  makeSelectSurveyAnswer,
  makeSelectSubmitSurveySuccess,
  makeSelectIsLoadingBothTestAndResult
}
