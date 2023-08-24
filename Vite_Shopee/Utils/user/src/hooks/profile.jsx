import { useDispatch, useSelector } from 'react-redux'

import { useCallback } from 'react'
import { useInjectSaga, useInjectReducer } from '../store'
import saga from '../modules/profile/store/saga'
import reducer from '../modules/profile/store/reducer'

import {
  loadProfile,
  uploadAvatar,
  changePassword as changePasswordAction,
  updateProfile as updateProfileAction,
  changeEmail as changeEmailAction,
  verifyCode as verifyCodeAction,
  getPlan as getPlanAction,
  resetTrialExpired as resetTrialExpiredAction,
  getDataPlan as getDataPlanAction,
  removeErrorPassword
} from '../modules/profile/store/actions'
import {
  makeSelectProfile,
  makeSelectAuthenticated,
  makeSelectUserRole,
  makeSelectUpdateProfile,
  makeSelectUpdateAvatar,
  makeSelectChangePassword,
  makeSelectVerifyCodeEmail,
  makeSelectChangeEmail,
  makeSelectLoading,
  makeSelectPlan,
  makeSelectError,
  makeSelectIsTrialExpired,
  makeSelectDataPlan,
  makeSelectIsPaymentExpired,
  makeSelectIsCompanyCancellation,
  makeSelectUpdatingProfile
} from '../modules/profile/store/selectors'

export const useProfile = () => {
  useInjectSaga({ key: 'profileStore', saga })
  useInjectReducer({ key: 'profileStore', reducer })
  const dispatch = useDispatch()
  const { data: profile } = useSelector(makeSelectProfile())
  const authenticated = useSelector(makeSelectAuthenticated())
  const userRole = useSelector(makeSelectUserRole())
  const isChangePassword = useSelector(makeSelectChangePassword())
  const { isUpdatedAvatar, isDeletedAvatar } = useSelector(makeSelectUpdateAvatar())
  const isUpdatedProfile = useSelector(makeSelectUpdateProfile())
  const verifyCodeState = useSelector(makeSelectVerifyCodeEmail())
  const isChangeEmail = useSelector(makeSelectChangeEmail())
  const loading = useSelector(makeSelectLoading())
  const isUpdatingProfile = useSelector(makeSelectUpdatingProfile())
  const errors = useSelector(makeSelectError())
  const { data: plans, error: getPlanError, isLoading: getPlanIsPloading } = useSelector(makeSelectPlan())
  const { data: dataPlans, error: getDataPlanError, isLoading: getDataPlanIsPloading } = useSelector(makeSelectDataPlan())
  const isTrialExpired = useSelector(makeSelectIsTrialExpired())
  const isCompanyCancellation = useSelector(makeSelectIsCompanyCancellation())
  const isPaymentExpired = useSelector(makeSelectIsPaymentExpired())

  const getProfile = useCallback((payload) => dispatch(loadProfile(payload)), [dispatch])
  const verifyCodeEmail = ({ userId, email }) => dispatch(verifyCodeAction({ userId, email }))
  const changeEmail = ({ userId, email, verifyCode }) => dispatch(changeEmailAction({ userId, email, verifyCode }))

  const updateAvatar = ({
    userId,
    fileName,
    fileType,
    file,
    type,
    isDelete,
    imageAvatar
  }) => dispatch(uploadAvatar({
    userId,
    fileName,
    fileType,
    file,
    type,
    isDelete,
    imageAvatar
  }))

  const changePassword = ({
    changePasswordUserDto,
    userId
  }) => dispatch(changePasswordAction({
    changePasswordUserDto,
    userId
  }))

  const removeErrorPasswordAction = () => dispatch(removeErrorPassword())

  const resetTrialExpired = () => dispatch(resetTrialExpiredAction())

  const updateProfile = (payload) => dispatch(updateProfileAction(payload))
  const getPlan = () => dispatch(getPlanAction())
  const getDataPlan = () => dispatch(getDataPlanAction())

  return {
    profile,
    getProfile,
    updateAvatar,
    authenticated,
    changePassword,
    removeErrorPasswordAction,
    updateProfile,
    userRole,
    isChangePassword,
    isDeletedAvatar,
    isUpdatedAvatar,
    isUpdatedProfile,
    verifyCode: verifyCodeState,
    isChangeEmail,
    plans,
    getPlanError,
    getPlanIsPloading,
    isTrialExpired,
    isCompanyCancellation,
    dataPlans,
    getDataPlanError,
    getDataPlanIsPloading,
    isPaymentExpired,
    getPlan,
    verifyCodeEmail,
    changeEmail,
    loading,
    isUpdatingProfile,
    errors,
    resetTrialExpired,
    getDataPlan
  }
}
