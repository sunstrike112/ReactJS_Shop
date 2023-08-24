/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectSendEmail = state => state.sendEmail || initialState

const makeSelectSendEmail = () => createSelector(
  selectSendEmail,
  state => state
)

export {
  selectSendEmail,
  makeSelectSendEmail
}
