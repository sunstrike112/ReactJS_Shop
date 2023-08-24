/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectCommunityManagement = (state) => state.communityManagement || initialState

const makeGetListTalkBoard = () => (
  createSelector(selectCommunityManagement, (state) => state)
)

const makeSelectComment = () => (
  createSelector(selectCommunityManagement, (state) => state.listComment)
)

export {
  makeGetListTalkBoard,
  makeSelectComment
}
