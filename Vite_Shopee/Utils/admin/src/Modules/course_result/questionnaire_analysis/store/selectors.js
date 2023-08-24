/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */
import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectQuestionnaireAnalysis = state => state.questionnaireAnalysis || initialState

const makeSelectQuestionnaireAnalysis = () =>
  createSelector(
    selectQuestionnaireAnalysis,
    state => state
  )

export {
  selectQuestionnaireAnalysis,
  makeSelectQuestionnaireAnalysis
}
