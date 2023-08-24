import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectProfile = (state) => state.profileStore || initialState

const makeSelectError = () => createSelector(
  selectProfile,
  (state) => state.errors
)

const makeSelectLoading = () => createSelector(
  selectProfile,
  (state) => state.isLoading
)

const makeSelectUpdatingProfile = () => createSelector(
  selectProfile,
  (state) => state.isUpdatingProfile
)

const makeSelectProfile = () => createSelector(
  selectProfile,
  (state) => state.profile
)

const makeSelectUserRole = () => createSelector(
  selectProfile,
  (state) => state.userRole
)

const makeSelectChangePassword = () => createSelector(
  selectProfile,
  (state) => state.isChangePassword
)

const makeSelectUpdateProfile = () => createSelector(
  selectProfile,
  (state) => state.isUpdatedProfile
)

const makeSelectUpdateAvatar = () => createSelector(
  selectProfile,
  (state) => state.uploadAvatar
)

const makeSelectAuthenticated = () => createSelector(
  selectProfile,
  (state) => state.authenticated
)

const makeSelectVerifyCodeEmail = () => createSelector(
  selectProfile,
  (state) => state.verifyCode
)

const makeSelectChangeEmail = () => createSelector(
  selectProfile,
  (state) => state.isChangeEmail
)

const makeSelectPlan = () => createSelector(
  selectProfile,
  (state) => state.plans
)

const makeSelectDataPlan = () => createSelector(
  selectProfile,
  (state) => state.dataPlans
)

const makeSelectIsTrialExpired = () => createSelector(
  selectProfile,
  (state) => state.isTrialExpired
)
const makeSelectIsCompanyCancellation = () => createSelector(
  selectProfile,
  (state) => state.isCompanyCancellation
)
const makeSelectIsPaymentExpired = () => createSelector(
  selectProfile,
  (state) => state.isPaymentExpired
)

export {
  selectProfile,
  makeSelectError,
  makeSelectProfile,
  makeSelectAuthenticated,
  makeSelectUserRole,
  makeSelectChangePassword,
  makeSelectUpdateProfile,
  makeSelectUpdateAvatar,
  makeSelectVerifyCodeEmail,
  makeSelectChangeEmail,
  makeSelectLoading,
  makeSelectPlan,
  makeSelectIsTrialExpired,
  makeSelectIsCompanyCancellation,
  makeSelectDataPlan,
  makeSelectIsPaymentExpired,
  makeSelectUpdatingProfile
}
