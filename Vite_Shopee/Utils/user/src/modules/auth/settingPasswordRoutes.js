import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import { CustomRoute } from '../../components'
import { useAuth } from '../../hooks'
import { getLocalStorage, STORAGE } from '../../utils'
import RegisterCompanyScreen from './register-company'
import RegisterEmployeeScreen from './register-employee'
import ResendSettingToken from './resend-setting-token'
import SettingPasswordScreen from './setting-password'
import VerifyPasswordScreen from './verify-password'

export default function SettingPasswordRoutes() {
  const { path } = useRouteMatch()

  const { signOut } = useAuth()
  const [loading, setLoading] = useState(true)

  const setLoadingIsFalse = () => setLoading(false)

  useEffect(async () => {
    const userToken = await getLocalStorage(STORAGE.USER_TOKEN)

    if (userToken) {
      signOut()
      setTimeout(setLoadingIsFalse, 1000)
    } else {
      setTimeout(setLoadingIsFalse, 1000)
    }

    return () => {
      clearTimeout(setLoadingIsFalse)
    }
  }, [])

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  return (
    <Switch>
      <CustomRoute path={`${path}/company`} component={RegisterCompanyScreen} />
      <CustomRoute
        path={`${path}/employee`}
        component={RegisterEmployeeScreen}
      />
      <CustomRoute path={`${path}/user`} component={VerifyPasswordScreen} />
      <CustomRoute path={`${path}/reset`} component={SettingPasswordScreen} />
      <CustomRoute path={`${path}/resend`} component={ResendSettingToken} />
    </Switch>
  )
}
