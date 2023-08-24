/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectTalkBoard = state => state.talkBoard || initialState

const makeSelectError = () =>
  createSelector(
    selectTalkBoard,
    state => state.error
  )

const makeSelectTag = () =>
  createSelector(
    selectTalkBoard,
    state => state.listTag
  )

const makeSelectGroup = () =>
  createSelector(
    selectTalkBoard,
    state => state.listGroup
  )

const makeSelectAttribute = () =>
  createSelector(
    selectTalkBoard,
    state => state.listAttribute
  )

const makeSelectListTalkBoard = () =>
  createSelector(
    selectTalkBoard,
    state => state.listTalkBoard
  )

const makeSelectListTalkBoardUpdate = () =>
  createSelector(
    selectTalkBoard,
    state => state.listTalkBoardUpdate
  )

const makeSelectTalkBoard = () => (
  createSelector(
    selectTalkBoard,
    (state) => state.talkBoard
  )
)

const makeSelectComments = () => (
  createSelector(
    selectTalkBoard,
    (state) => state.comments
  )
)

const makeSelectUnreadTalkBoard = () =>
  createSelector(
    selectTalkBoard,
    state => state.unreadTalkBoard
  )

const makeSelectTalkBoardDetail = () => (
  createSelector(
    selectTalkBoard,
    (state) => state.talkBoardDetail
  )
)

export {
  selectTalkBoard,
  makeSelectError,
  makeSelectTag,
  makeSelectGroup,
  makeSelectAttribute,
  makeSelectTalkBoard,
  makeSelectComments,
  makeSelectListTalkBoard,
  makeSelectListTalkBoardUpdate,
  makeSelectUnreadTalkBoard,
  makeSelectTalkBoardDetail
}
