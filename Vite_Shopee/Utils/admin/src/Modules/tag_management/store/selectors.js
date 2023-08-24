/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectTagManagement = (state) => state.tagManagement || initialState

const makeGetListTag = () => (
  createSelector(selectTagManagement, (state) => state)
)

const deleteTag = () => (
  createSelector(selectTagManagement, (state) => state.deleteTag)
)

const makeCreateTag = () => (
  createSelector(selectTagManagement, (state) => state.createTag)
)

const makeUpdateTag = () => (
  createSelector(selectTagManagement, (state) => state.updateTag)
)

export {
  makeGetListTag,
  makeCreateTag,
  makeUpdateTag,
  deleteTag
}
