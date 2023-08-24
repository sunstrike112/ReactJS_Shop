import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TYPE_REGISTER } from '../constants'
import {
  getListPlanPackage,
  registerCompany,
  verifyCompany
} from '../modules/auth/register-company/store/actions'
import {
  checkEmailExist, emailCompanyInvalid
} from '../modules/auth/register/store/actions'
import reducer from '../modules/auth/register-company/store/reducer'
import saga from '../modules/auth/register-company/store/saga'
import checkEmaiReducer from '../modules/auth/register/store/reducer'
import checkEmailSaga from '../modules/auth/register/store/saga'
import { makeSelectIsExistEmail, makeSelectValidateEmailCompany } from '../modules/auth/register/store/selectors'

import {
  makeSelectError,
  makeSelectIsLoading,
  makeSelectPlanPackage,
  makeSelectRegisterSuccess,
  makeSelectSuccess,
  makeSelectVerifiedData
} from '../modules/auth/register-company/store/selectors'
import { useInjectReducer, useInjectSaga } from '../store'
import useSettingPasswordCatch from './settingPasswordCatch'
import useQuery from './useQuery'
import { useEmailSchema } from '../modules/auth/register/registerCompanySchema'
import { locationLogin } from '../utils'

export const useRegisterCompany = () => {
  useInjectSaga({ key: 'registerCompanyStore', saga })
  useInjectReducer({ key: 'registerCompanyStore', reducer })

  const query = useQuery()
  const history = useHistory()

  const isLoading = useSelector(makeSelectIsLoading())
  const isSuccess = useSelector(makeSelectSuccess())
  const isRegisterSuccess = useSelector(makeSelectRegisterSuccess())
  const error = useSelector(makeSelectError())
  const verifiedData = useSelector(makeSelectVerifiedData())
  const { data: planPackageData } = useSelector(makeSelectPlanPackage())

  const errorMesg = useSettingPasswordCatch(error, TYPE_REGISTER.COMPANY)

  const dispatch = useDispatch()

  const fetchPlanPackage = () => {
    dispatch(getListPlanPackage())
  }

  const onRegisterCompany = (data) => {
    dispatch(
      registerCompany({
        ...data,
        resetToken: verifiedData.token,
        token: verifiedData.token
      })
    )
  }

  const onVerifyPassword = (data) => {
    dispatch(verifyCompany(data))
  }

  const onRedirectToLogin = () => {
    history.push(locationLogin())
  }

  useEffect(() => {
    if (query.get('resetToken')) {
      const resetToken = query.get('resetToken')
      onVerifyPassword({ resetToken })
      fetchPlanPackage()
    } else history.push(locationLogin())
  }, [])

  return {
    isLoading,
    onVerifyPassword,
    onRegisterCompany,
    isSuccess,
    verifiedData,
    error,
    planPackageData,
    errorMesg,
    isRegisterSuccess,
    onRedirectToLogin
  }
}

export const useCheckEmailExist = () => {
  useInjectSaga({ key: 'registerEmailStore', saga: checkEmailSaga })
  useInjectReducer({ key: 'registerEmailStore', reducer: checkEmaiReducer })
  const dispatch = useDispatch()
  const isExistEmail = useSelector(makeSelectIsExistEmail())
  const validateEmailCompany = useSelector(makeSelectValidateEmailCompany())

  const checkEmailExistAction = (payload) => dispatch(checkEmailExist(payload))
  const query = useQuery()

  const emailURL = query.get('email')

  const validateEmail = async (email) => {
    try {
      const schema = await useEmailSchema()
      await schema.validateSync({
        email
      })
    } catch (error) {
      const errors = JSON.parse(JSON.stringify(error))
      dispatch(emailCompanyInvalid(errors))
    }
  }

  useEffect(() => {
    validateEmail(emailURL)
    if (emailURL) {
      const email = emailURL.trim().toLocaleLowerCase()
      checkEmailExistAction({ email })
    }
  }, [emailURL])

  return {
    checkEmailExistAction,
    isExistEmail,
    validateEmailCompany
  }
}
