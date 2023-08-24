/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducers'

const selectMyCompany = (state) => state.myCompany || initialState

const makeSelectMyCompany = () => (
  createSelector(selectMyCompany, (state) => state)
)

const makeSelectPaymentHistories = () => (
  createSelector(selectMyCompany, (state) => state.paymentHistories)
)

const makeSelectPlans = () => (
  createSelector(selectMyCompany, (state) => state.plans)
)

const makeSelectDataPlans = () => (
  createSelector(selectMyCompany, (state) => state.dataPlans)
)

const makeSelectBillStatus = () => (
  createSelector(selectMyCompany, (state) => state.billStatus)
)

const makeSelectIsCardError = () => (
  createSelector(selectMyCompany, (state) => state.isCardError)
)

const makeSelectCancelData = () => (
  createSelector(selectMyCompany, (state) => state.cancelData)
)

export {
  selectMyCompany,
  makeSelectMyCompany,
  makeSelectPaymentHistories,
  makeSelectPlans,
  makeSelectDataPlans,
  makeSelectBillStatus,
  makeSelectCancelData,
  makeSelectIsCardError
}
