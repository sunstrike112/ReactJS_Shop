import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'Components/route/privateRoute'

import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'
import CreateWorkSpaceScreen from './create_workspace'
import EditWorkspaceScreen from './edit_workspace'

export const RoutesName = {
  CREATE_WORKSPACE: '/workspace-management/create',
  EDIT_WORKSPACE: '/workspace-management/edit'
}

export const ROUTES = [
  {
    path: RoutesName.CREATE_WORKSPACE,
    Component: CreateWorkSpaceScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: `${RoutesName.EDIT_WORKSPACE}/:workspaceId`,
    Component: EditWorkspaceScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  }
]

export default function WorkSpaceRoutes() {
  return (
    <Switch>
      {ROUTES.map((item) => (
        <PrivateRoute key={item.path} exact path={item.path} component={item.Component} rules={item.rules} rulesWS={item.rulesWS} />
      ))}
    </Switch>
  )
}
