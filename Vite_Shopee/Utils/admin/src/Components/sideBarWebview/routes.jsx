/* eslint-disable no-unused-vars */
import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'Components/route/privateRoute'

import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'
import SideBarMobile from './index'
import { RoutesName } from './constant'

export const ROUTES = [
  {
    path: '/',
    Component: SideBarMobile,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY]
  }
]

export default function SideBarRoute() {
  return (
    <Switch>
      {ROUTES.map((item) => (
        <PrivateRoute key={item.path} exact path={item.path} component={item.Component} rules={item.rules} rulesWS={item.rulesWS} />
      ))}
    </Switch>
  )
}
