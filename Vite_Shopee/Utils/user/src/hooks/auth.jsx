import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useInjectSaga, useInjectReducer } from '../store'
import authSaga from '../modules/auth/store/saga'
import authReducer from '../modules/auth/store/reducer'
import {
  getEmailFromTokenRequest,
  getEmailResetRequest,
  loadWorkspacesRequest,
  loginRequest,
  logoutRequest,
  resetLoginError,
  settingPasswordRequest,
  verifyTokenRequest
} from '../modules/auth/store/actions'
import {
  makeSelectCurrentUser,
  makeSelectEmailReset,
  makeSelectVerifyToken,
  makeSelectSettingPassword,
  makeSelectEmailFromToken,
  makeSelectWorkspaces
} from '../modules/auth/store/selectors'
import useQuery from './useQuery'
import { QUERY } from '../constants'

export const useAuth = () => {
  useInjectSaga({ key: 'authStore', saga: authSaga })
  useInjectReducer({ key: 'authStore', reducer: authReducer })

  const dispatch = useDispatch()
  const {
    data: currentUser,
    isLoading: isLoadingLogin,
    error: errorLogin
  } = useSelector(makeSelectCurrentUser())

  const {
    data: emailReset,
    isLoading: isLoadingEmailReset,
    error: errorEmailReset,
    isSent: isSentEmailReset
  } = useSelector(makeSelectEmailReset())

  const signIn = (payload) => {
    dispatch(loginRequest(payload))
  }
  const signOut = () => {
    dispatch(logoutRequest())
  }
  const getEmailReset = ({ email }) => {
    dispatch(getEmailResetRequest({ email }))
  }
  const resetLoginErrorAction = () => {
    dispatch(resetLoginError())
  }
  return {
    signIn,
    signOut,
    getEmailReset,
    resetLoginErrorAction,
    isLoadingLogin,
    currentUser,
    errorLogin,
    emailReset,
    isLoadingEmailReset,
    errorEmailReset,
    isSentEmailReset
  }
}

export const useVerifyToken = () => {
  useInjectSaga({ key: 'authStore', saga: authSaga })
  useInjectReducer({ key: 'authStore', reducer: authReducer })

  const dispatch = useDispatch()
  const query = useQuery()
  const location = useLocation()

  const { data: dataVerifyToken, isLoading, error, isVerify } = useSelector(makeSelectVerifyToken())
  const resetToken = query.get('resetToken')
  const isRegisterCompany = query.get('isRegisterCompany')

  useEffect(() => {
    if (location.pathname.includes('/setting-password/reset')) {
      dispatch(verifyTokenRequest({ resetToken }))
    }
  }, [])

  useEffect(() => {
    if (error?.type === 'ERROR_CHANGE_PASSWORD_TOKEN_EXPIRED') {
      dispatch(getEmailFromTokenRequest({ resetToken }))
    }
  }, [error])

  return {
    dataVerifyToken,
    isLoading,
    error,
    isVerify,
    resetToken,
    isRegisterCompany: !!isRegisterCompany
  }
}

export const useSettingPassword = () => {
  useInjectSaga({ key: 'authStore', saga: authSaga })
  useInjectReducer({ key: 'authStore', reducer: authReducer })

  const { data: dataPassword, isLoading, error, isSuccess } = useSelector(makeSelectSettingPassword())
  const { data: dataEmailFromToken } = useSelector(makeSelectEmailFromToken())

  const dispatch = useDispatch()

  const resetPassword = ({ newPassWord, confirmPassWord, resetToken }) => {
    dispatch(settingPasswordRequest({ newPassWord, confirmPassWord, resetToken }))
  }

  return {
    resetPassword,
    dataPassword,
    isLoading,
    error,
    isSuccess,
    dataEmailFromToken
  }
}

export const useWorkspaces = () => {
  useInjectSaga({ key: 'authStore', saga: authSaga })
  useInjectReducer({ key: 'authStore', reducer: authReducer })

  const query = useQuery()
  const workspaceid = query.get(QUERY.WORKSPACE_ID)

  const dispatch = useDispatch()

  const { isLoading, data, error } = useSelector(makeSelectWorkspaces())

  const hasOnlyOneWorkspace = data.length === 1 && data[0].isWorkspace
  // If exist at least two ws inside list ws, required user choose ws
  const hasWorkspaces = useMemo(() => (data.length > 1 ? data.some((w) => w.isWorkspace) : false), [data])

  const isRequiredWorkspace = hasWorkspaces && !workspaceid

  const currentWorkspace = useMemo(() => {
    if (data.length === 1 && data[0].isWorkspace) return data[0]
    return data.find((w) => Number(w.companyId) === Number(workspaceid))
  }, [data, workspaceid])

  const loadWorkspacesAction = () => dispatch(loadWorkspacesRequest())

  return {
    isLoading,
    hasOnlyOneWorkspace,
    hasWorkspaces,
    isRequiredWorkspace,
    currentWorkspace,
    data,
    error,
    loadWorkspacesAction
  }
}
