import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'Components/route/privateRoute'

import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'
import TemplateDetailScreen from './detail'

export const RoutesName = {
  TEMPLATE_MANAGEMENT: '/community-managements/template-management',
  TEMPLATE_DETAIL: '/community-managements/template-management/detail'
}

export const ROUTES = [
  {
    path: `${RoutesName.TEMPLATE_DETAIL}/:templateId`,
    Component: TemplateDetailScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  }
]

export default function TemplateRoutes() {
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
