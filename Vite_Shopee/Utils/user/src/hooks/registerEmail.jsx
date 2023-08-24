import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { registerEmail, registerCompany } from '../modules/auth/register/store/actions'
import reducer from '../modules/auth/register/store/reducer'
import saga from '../modules/auth/register/store/saga'
import {
  makeSelectIsLoading,
  makeSelectSuccess,
  makeSelectError,
  makeSelectRegisterCompany
} from '../modules/auth/register/store/selectors'
import { useInjectReducer, useInjectSaga } from '../store'

export const useRegisterEmail = () => {
  useInjectSaga({ key: 'registerEmailStore', saga })
  useInjectReducer({ key: 'registerEmailStore', reducer })
  const history = useHistory()

  const isLoading = useSelector(makeSelectIsLoading())
  const isSuccess = useSelector(makeSelectSuccess())
  const errorRegister = useSelector(makeSelectError())
  const registerCompanyState = useSelector(makeSelectRegisterCompany())

  const dispatch = useDispatch()
  const onRegisterEmail = (data) => {
    dispatch(registerEmail(data))
  }

  const onRegisterCompany = (payload) => {
    dispatch(registerCompany(payload))
  }

  useEffect(() => {
    if (isSuccess) history.push('/auth/register-success')
  }, [isSuccess])

  return {
    isLoading,
    errorRegister,
    onRegisterEmail,
    onRegisterCompany,
    registerCompanyState
  }
}
