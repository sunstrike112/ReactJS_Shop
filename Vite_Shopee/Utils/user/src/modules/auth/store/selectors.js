import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectAuthState = (state) => state.authStore || initialState

const makeSelectCurrentUser = () => createSelector(selectAuthState, (state) => state.currentUser)

const makeSelectEmailReset = () => createSelector(selectAuthState, (state) => state.emailReset)

const makeSelectVerifyToken = () => createSelector(selectAuthState, (state) => state.verifyToken)

const makeSelectSettingPassword = () => createSelector(selectAuthState, (state) => state.settingPassword)

const makeSelectEmailFromToken = () => createSelector(selectAuthState, (state) => state.emailFromToken)

const makeSelectWorkspaces = () => createSelector(selectAuthState, (state) => state.workspaces)

export {
  makeSelectCurrentUser,
  makeSelectEmailReset,
  makeSelectVerifyToken,
  makeSelectSettingPassword,
  makeSelectEmailFromToken,
  makeSelectWorkspaces
}
