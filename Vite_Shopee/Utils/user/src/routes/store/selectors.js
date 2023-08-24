/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectGlobalState = state => state.globalStore || initialState

const makeSelectError = () =>
  createSelector(
    selectGlobalState,
    state => state.error
  )

const makeSelectLoading = () =>
  createSelector(
    selectGlobalState,
    state => state.isLoading
  )

const makeSelectIsOnline = () =>
  createSelector(
    selectGlobalState,
    state => state.isOnline
  )

const makeSelectMaintainNotice = () =>
  createSelector(
    selectGlobalState,
    state => state.isMaintainNotice
  )
const makeSelectMaintainData = () =>
  createSelector(
    selectGlobalState,
    state => state.maintainNotice
  )

const makeSelectLoadingPortal = () =>
  createSelector(
    selectGlobalState,
    state => state.isLoadingPortal
  )

const makeSelectInitDisplay = () =>
  createSelector(
    selectGlobalState,
    state => state.initDisplay
  )

const makeSelectCompany = () =>
  createSelector(
    selectGlobalState,
    state => state.company
  )

export {
  selectGlobalState,
  makeSelectError,
  makeSelectLoading,
  makeSelectIsOnline,
  makeSelectMaintainNotice,
  makeSelectMaintainData,
  makeSelectLoadingPortal,
  makeSelectInitDisplay,
  makeSelectCompany
}
