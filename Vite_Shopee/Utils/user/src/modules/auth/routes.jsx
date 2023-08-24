import React from 'react'
import { Switch, useRouteMatch, Route } from 'react-router-dom'
import { CustomRoute } from '../../components'
import ForgotPassWordScreen from './forgot-password'
import LoginScreen from './login'
import RegisterSuccessScreen from './register/register-success'
import ResendRegisterTokenScreen from './resend-register-token'
import PageNotFound from '../page-not-fount'

export default function AuthRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <CustomRoute exact path={`${path}/login`} component={LoginScreen} />
      <CustomRoute
        exact
        path={`${path}/forgot-password`}
        component={ForgotPassWordScreen}
      />
      <CustomRoute
        exact
        path={`${path}/resend-register-email`}
        component={ResendRegisterTokenScreen}
      />
      <CustomRoute
        exact
        path={`${path}/register-success`}
        component={RegisterSuccessScreen}
      />
      <CustomRoute
        exact
        path={`${path}/forgot-password`}
        component={ForgotPassWordScreen}
      />
      <CustomRoute
        exact
        path={`${path}/register-success`}
        component={RegisterSuccessScreen}
      />
      <Route path="*" component={PageNotFound} />
    </Switch>
  )
}
