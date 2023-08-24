import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'Components/route/privateRoute'

import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'
import CreateTalkBoardScreen from './create_talkboard'
import EditTalkBoardScreen from './edit_talkboard'
import CommentManagementScreen from './comment_management'

export const RoutesName = {
  CREATE_TALKBOARD: '/community-managements/community-management/create',
  EDIT_TALKBOARD: '/community-managements/edit',
  COMMENT_MANAGEMENT: '/community-managements/comment-management'
}

export const ROUTES = [
  {
    path: RoutesName.CREATE_TALKBOARD,
    Component: CreateTalkBoardScreen,
    rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.EDIT_TALKBOARD}/:talkBoardId`,
    Component: EditTalkBoardScreen,
    rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.COMMENT_MANAGEMENT,
    Component: CommentManagementScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  }
]

export default function TalkBoardRoutes() {
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
