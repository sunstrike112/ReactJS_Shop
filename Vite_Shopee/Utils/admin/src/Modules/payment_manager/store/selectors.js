/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectRegistrationPayment = state => state.payment_manager || initialState

const makeSelectRegistrationPayment = () =>

  createSelector(
    selectRegistrationPayment,
    state => state
  )

export {
  selectRegistrationPayment,
  makeSelectRegistrationPayment
}
