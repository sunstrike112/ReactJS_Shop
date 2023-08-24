import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TYPE_REGISTER } from '../constants'
import {
  settingPassword,
  verifyPassword
} from '../modules/auth/verify-password/store/actions'
import reducer from '../modules/auth/verify-password/store/reducer'
import saga from '../modules/auth/verify-password/store/saga'
import {
  makeSelectError,
  makeSelectIsLoading,
  makeSelectSettingPasswordSuccess,
  makeSelectSuccess,
  makeSelectVerifiedData
} from '../modules/auth/verify-password/store/selectors'
import { useInjectReducer, useInjectSaga } from '../store'
import { locationLogin } from '../utils'
import useSettingPasswordCatch from './settingPasswordCatch'
import useQuery from './useQuery'

export const useVerifyPassword = () => {
  useInjectSaga({ key: 'verifyPasswordStore', saga })
  useInjectReducer({ key: 'verifyPasswordStore', reducer })

  const query = useQuery()
  const history = useHistory()

  const isLoading = useSelector(makeSelectIsLoading())
  const isSuccess = useSelector(makeSelectSuccess())
  const isSettingPasswordSuccess = useSelector(
    makeSelectSettingPasswordSuccess()
  )
  const error = useSelector(makeSelectError())
  const verifiedData = useSelector(makeSelectVerifiedData())

  const errorMesg = useSettingPasswordCatch(error, TYPE_REGISTER.INDIVIDUAL)

  const dispatch = useDispatch()
  const onVerifyPassword = (data) => {
    dispatch(verifyPassword(data))
  }
  const onRedirectToLogin = () => {
    history.push(locationLogin())
  }

  useEffect(() => {
    if (query.get('resetToken')) {
      const resetToken = query.get('resetToken')
      onVerifyPassword({ resetToken })
    } else history.push('/auth/register')
  }, [])

  const onRegisterPassword = (data) => {
    dispatch(
      settingPassword({ ...data, resetToken: verifiedData.tokenExpired })
    )
  }

  return {
    isLoading,
    onVerifyPassword,
    onRegisterPassword,
    isSuccess,
    verifiedData,
    isSettingPasswordSuccess,
    onRedirectToLogin,
    errorMesg
  }
}
