import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'Components/route/privateRoute'

import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'
import ApiManager from './api_manager'

export const RoutesName = {
  API_MANAGER_CONFIGURATION: '/external/manager-configuration'
}

export const ROUTES = [
  {
    path: RoutesName.API_MANAGER_CONFIGURATION,
    Component: ApiManager,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  }
]

export default function ExternalRoutes() {
  return (
    <Switch>
      {ROUTES.map((item) => (
        <PrivateRoute
          key={item.path}
          exact
          path={item.path}
          component={item.Component}
          rules={item.rules}
          rulesWS={item.rulesWS}
        />
      ))}
    </Switch>
  )
}
