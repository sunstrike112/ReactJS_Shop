/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectExamination = state => state.examinationStore || initialState

const makeSelectError = () =>
  createSelector(
    selectExamination,
    state => state.error
  )

const makeSelectTestResult = () =>
  createSelector(
    selectExamination,
    state => state.testResult
  )

const makeSelectUnitQuestions = () =>
  createSelector(
    selectExamination,
    state => state.unitQuestions
  )

const makeSelectUnitAnswer = () =>
  createSelector(
    selectExamination,
    state => state.unitAnswerTesting
  )

const makeSelectLoading = () =>
  createSelector(
    selectExamination,
    state => state.isLoading
  )

const makeSelectSubmitTestSuccess = () =>
  createSelector(
    selectExamination,
    state => state.submitTest.isSuccess
  )

export {
  selectExamination,
  makeSelectError,
  makeSelectTestResult,
  makeSelectUnitQuestions,
  makeSelectLoading,
  makeSelectUnitAnswer,
  makeSelectSubmitTestSuccess
}
