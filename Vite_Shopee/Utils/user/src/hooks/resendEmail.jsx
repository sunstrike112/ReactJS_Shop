import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TYPE_REGISTER } from '../constants'
import { resendEmail } from '../modules/auth/resend-register-token/store/actions'
import reducer from '../modules/auth/resend-register-token/store/reducer'
import saga from '../modules/auth/resend-register-token/store/saga'
import {
  makeSelectIsLoading,
  makeSelectSuccess
} from '../modules/auth/resend-register-token/store/selectors'
import { useInjectReducer, useInjectSaga } from '../store'
import { locationLogin } from '../utils'
import useQuery from './useQuery'

export const useResedEmail = () => {
  useInjectSaga({ key: 'resendEmailStore', saga })
  useInjectReducer({ key: 'resendEmailStore', reducer })

  const query = useQuery()
  const history = useHistory()

  const isLoading = useSelector(makeSelectIsLoading())
  const isSuccess = useSelector(makeSelectSuccess())

  const dispatch = useDispatch()

  const onSubmit = () => {
    switch (query.get('typeRegister')) {
      case TYPE_REGISTER.INDIVIDUAL:
        dispatch(
          resendEmail({
            token: query.get('resetToken'),
            typeRegister: query.get('typeRegister')
          })
        )
        return
      default:
        history.push(locationLogin())
    }
  }

  useEffect(() => {
    if (!query.get('resetToken') || !query.get('typeRegister')) {
      history.push(locationLogin())
    }
  }, [])

  return {
    isLoading,
    onSubmit,
    isSuccess,
    typeRegister: query.get('typeRegister')
  }
}
