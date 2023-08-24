import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import { CustomRoute } from '../../components'
import RegisterCompanyScreen from './register-company'
import RegisterEmployeeScreen from './register-employee'
import VerifyPasswordScreen from './verify-password'

export default function AuthPublicRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <CustomRoute
        path={`${path}/verify-password-company`}
        component={RegisterCompanyScreen}
      />
      <CustomRoute
        path={`${path}/register-employee`}
        component={RegisterEmployeeScreen}
      />
      <CustomRoute
        path={`${path}/verify-password`}
        component={VerifyPasswordScreen}
      />
    </Switch>
  )
}
