/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectSeminarState = state => state.seminarStore || initialState

const makeSelectError = () =>
  createSelector(
    selectSeminarState,
    state => state.error
  )

const makeSelectSeminar = () =>
  createSelector(
    selectSeminarState,
    state => state.seminars
  )

const makeSelectSeminarDetail = () =>
  createSelector(
    selectSeminarState,
    state => state.seminar
  )
const makeSelectIshaveData = () =>
  createSelector(
    selectSeminarState,
    state => state.isHaveData
  )

export {
  selectSeminarState,
  makeSelectError,
  makeSelectSeminar,
  makeSelectSeminarDetail,
  makeSelectIshaveData
}
