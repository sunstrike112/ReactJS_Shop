/* eslint-disable arrow-parens */
/* eslint-disable implicit-arrow-linebreak */

/**
 * The global state selectors
 */

import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectWorkspace = (state) => state.workspace || initialState

const makeWorkspace = () => (
  createSelector(selectWorkspace, (state) => state)
)

const makeWorkspaceAll = () => (
  createSelector(selectWorkspace, (state) => state.workspaceAll)
)

const makeCreateWorkspace = () => (
  createSelector(selectWorkspace, (state) => state.createWorkspace)
)

const makeEditWorkspace = () => (
  createSelector(selectWorkspace, (state) => state.editWorkspace)
)

const makeAdminsNissoken = () => (
  createSelector(selectWorkspace, (state) => state.adminsNissoken)
)

const makeWorkspaceDetail = () => (
  createSelector(selectWorkspace, (state) => state.workSpaceDetail)
)

export { selectWorkspace, makeWorkspace, makeWorkspaceAll, makeCreateWorkspace, makeEditWorkspace, makeAdminsNissoken, makeWorkspaceDetail }
