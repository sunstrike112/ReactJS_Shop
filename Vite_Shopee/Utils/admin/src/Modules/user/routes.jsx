import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'Components/route/privateRoute'

import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'
import UserManagement from './user_management'
import BatchUserRegisterScreen from './user_management/batch_register_user'
import BatchWorkspaceRegisterScreen from './user_management/batch_register_workspace'
import BatchRegisterWorkspaceVirtualScreen from './user_management/batch_register_workspace_virtual'
import BatchUserRegisterResultScreen from './user_management/batch_register_user/result'
import BatchDeleteUserScreen from './user_management/batch_delete_user'
import BatchWSDeleteUserScreen from './user_management/batch_delete_user_workspace'

import UserRegisterScreen from './user_management/register_user'
import EditUserScreen from './user_management/edit_user'
import UserDetailScreen from './user_management/user_detail'
import UserTestResultScreen from './user_management/user_test_result'
import UserLearnStatusScreen from './user_management/user_learn_status'
import UserLearnHistoryScreen from './user_management/user_learn_history'
import AttributeOfUserScreen from './user_management/attribute_of_user'
import GroupOfUserScreen from './user_management/group_of_user'
import LoginStatusScreen from './user_management/login_status'

import LoginHistoryScreen from './login_history'

import GroupManagementScreen from './group_and_attribute/group_management'
import AttributeManagementScreen from './group_and_attribute/attribute_management'
import BatchWSVirtualDeleteUserScreen from './user_management/batch_delete_workspace_virtual'

export const RoutesName = {
  USER_MANAGEMENT: '/user-management/user',
  BATCH_USER_REGISTER: '/user-management/batch_register',
  BATCH_WORKSPACE_REGISTER: '/user-management/batch_workspace_register',
  BATCH_USER_REGISTER_HELP: '/user-management/batch_register/help',
  BATCH_USER_REGISTER_RESULT: '/user-management/batch_register/result',
  BATCH_WORKSPACE_VIRTUAL_REGISTER: '/user-management/batch_workspace_virtual_register',
  USER_REGISTER: '/user-management/user/register',
  EDIT_USER: '/user-management/user/edit',
  USER_DETAIL: '/user-management/user/detail',
  USER_TEST_RESULT: '/user-management/user/test-result',
  USER_LEARN_STATUS: '/user-management/user/learn-status',
  USER_LEARN_HISTORY: '/user-management/user/learn-history',
  ASSIGN_OR_REMOVE_ATTRIBUTES: '/user-management/user/attributes',
  ASSIGN_OR_REMOVE_GROUPS: '/user-management/user/groups',
  LOGIN_STATUS: '/user-management/user/login-status',

  LOGIN_HISTORY: '/user-management/login-history',

  GROUP_MANAGEMENT: '/user-management/group',
  ATTRIBUTE_MANAGEMENT: '/user-management/attribute',
  BATCH_USER_DELETE: '/user-management/batch_delete',
  BATCH_USER_WORKSPACE_DELETE: '/user-management/batch_workspace_delete',
  BATCH_USER_WORKSPACE_VIRTUAL_DELETE: '/user-management/batch_workspace_virtual_delete'
}

export const ROUTES = [
  {
    path: RoutesName.USER_MANAGEMENT,
    Component: UserManagement,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.BATCH_USER_REGISTER,
    Component: BatchUserRegisterScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: RoutesName.BATCH_WORKSPACE_REGISTER,
    Component: BatchWorkspaceRegisterScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.BATCH_WORKSPACE_VIRTUAL_REGISTER,
    Component: BatchRegisterWorkspaceVirtualScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.VIRTUAL_COMPANY]
  },
  {
    path: RoutesName.BATCH_USER_REGISTER_RESULT,
    Component: BatchUserRegisterResultScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.USER_REGISTER,
    Component: UserRegisterScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.EDIT_USER}/:userId`,
    Component: EditUserScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY]
  },
  {
    path: `${RoutesName.USER_DETAIL}/:userId`,
    Component: UserDetailScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.USER_TEST_RESULT}/:userId`,
    Component: UserTestResultScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.USER_LEARN_STATUS}/:userId`,
    Component: UserLearnStatusScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.USER_LEARN_HISTORY}/:userId`,
    Component: UserLearnHistoryScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.ASSIGN_OR_REMOVE_ATTRIBUTES}`,
    Component: AttributeOfUserScreen,
    rules: [USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.ASSIGN_OR_REMOVE_GROUPS}`,
    Component: GroupOfUserScreen,
    rules: [USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.LOGIN_STATUS}`,
    Component: LoginStatusScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.LOGIN_HISTORY}`,
    Component: LoginHistoryScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.GROUP_MANAGEMENT}`,
    Component: GroupManagementScreen,
    rules: [USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.ATTRIBUTE_MANAGEMENT}`,
    Component: AttributeManagementScreen,
    rules: [USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.BATCH_USER_DELETE,
    Component: BatchDeleteUserScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: RoutesName.BATCH_USER_WORKSPACE_DELETE,
    Component: BatchWSDeleteUserScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.BATCH_USER_WORKSPACE_VIRTUAL_DELETE,
    Component: BatchWSVirtualDeleteUserScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.VIRTUAL_COMPANY]
  }
]

export default function UserRoutes() {
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
