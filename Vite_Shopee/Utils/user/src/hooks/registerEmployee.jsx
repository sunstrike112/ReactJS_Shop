import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TYPE_REGISTER } from '../constants'
import {
  registerEmployee,
  verifyEmployee
} from '../modules/auth/register-employee/store/actions'
import reducer from '../modules/auth/register-employee/store/reducer'
import saga from '../modules/auth/register-employee/store/saga'
import {
  makeSelectError,
  makeSelectIsLoading,
  makeSelectRegisterSuccess,
  makeSelectSuccess,
  makeSelectVerifiedData
} from '../modules/auth/register-employee/store/selectors'
import { useInjectReducer, useInjectSaga } from '../store'
import { locationLogin } from '../utils'
import useSettingPasswordCatch from './settingPasswordCatch'
import useQuery from './useQuery'

export const useRegisterEmployee = () => {
  useInjectSaga({ key: 'registerEmployeeStore', saga })
  useInjectReducer({ key: 'registerEmployeeStore', reducer })

  const query = useQuery()
  const history = useHistory()

  const isLoading = useSelector(makeSelectIsLoading())
  const isSuccess = useSelector(makeSelectSuccess())
  const isRegisterSuccess = useSelector(makeSelectRegisterSuccess())
  const error = useSelector(makeSelectError())
  const verifiedData = useSelector(makeSelectVerifiedData())

  const errorMesg = useSettingPasswordCatch(error, TYPE_REGISTER.EMPLOYEE)

  const dispatch = useDispatch()
  const onVerifyEmployee = (data) => {
    dispatch(verifyEmployee(data))
  }

  const onRedirectToLogin = () => {
    history.push(locationLogin())
  }

  useEffect(() => {
    if (query.get('resetToken')) {
      const resetToken = query.get('resetToken')
      onVerifyEmployee({ resetToken })
    } else history.push(locationLogin())
  }, [])

  const onRegisterEmployee = (data) => {
    dispatch(registerEmployee({ ...data, token: verifiedData.token }))
  }

  return {
    isLoading,
    onRegisterEmployee,
    isSuccess,
    verifiedData,
    errorMesg,
    isRegisterSuccess,
    onRedirectToLogin
  }
}
