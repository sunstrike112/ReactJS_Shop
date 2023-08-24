/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectRegistrationNotifi = state => state.registrationNotifi || initialState

const makeSelectRegistrationNotifi = () =>

  createSelector(
    selectRegistrationNotifi,
    state => state
  )

export {
  selectRegistrationNotifi,
  makeSelectRegistrationNotifi
}
