import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'Components/route/privateRoute'

import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'
import ReportDetailScreen from './detail'

export const RoutesName = {
  REPORT_MANAGEMENT: '/community-managements/report-management',
  REPORT_DETAIL: '/community-managements/report-management/detail'
}

export const ROUTES = [
  {
    path: `${RoutesName.REPORT_DETAIL}/:reportId`,
    Component: ReportDetailScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  }
]

export default function ReportRoutes() {
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
