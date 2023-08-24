import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { MAINTENANCE } from '../apis/api'
import useQuery from './useQuery'

const useSettingPasswordCatch = (error, typeRegister) => {
  const { t } = useTranslation()

  const query = useQuery()
  const history = useHistory()

  const [errorMesg, setErrorMesg] = useState()

  useEffect(() => {
    if (error) {
      switch (error?.type) {
        case 'ERROR_USER_HAVE_SET_A_PASSWORD':
          setErrorMesg(t('register.have_set_a_password'))
          return
        case 'ERROR_USER_NOT_FOUND':
          setErrorMesg(t('register.old_link'))
          return
        case 'ERROR_CHANGE_PASSWORD_TOKEN_EXPIRED':
          history.push(
            `/auth/resend-register-email?resetToken=${query.get(
              'resetToken'
            )}&typeRegister=${typeRegister}`
          )
          return
        case MAINTENANCE:
          setErrorMesg(t('errors.server_maintaining'))
          return
        default:
          history.push('/auth/register')
          setErrorMesg(t(error?.type))
      }
    }
  }, [error, t])

  return errorMesg
}

export default useSettingPasswordCatch
