import PrivateRoute from 'Components/route/privateRoute'
import { Switch } from 'react-router-dom'
import React from 'react'

import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'
import CompanyManagementScreen from './company_management'
import CompanyRefuseScreen from './company_refuse'
import CompanyWaitingScreen from './company_waiting'
import CompanyWaitingDetailScreen from './company_waiting_detail'
import EditLoginInfo from './edit_login_info'
import SeminarManagementScreen from './seminar'
import SeminarCreateScreen from './seminar/create'
import SeminarEditScreen from './seminar/edit'

export const RoutesName = {
  // SEMINAR
  SEMINAR_MANAGEMENT: '/seminar-management',
  SEMINAR_CREATE: '/seminar-management/create',
  SEMINAR_UPDATE: '/seminar-management/:seminarId/edit',
  // COMPANY
  COMPANY_MANAGEMENT: '/company-management/company',
  COMPANY_WAITING: '/company-management/waiting',
  COMPANY_WAITING_DETAIL: '/company-management/waiting-detail',
  COMPANY_REFUSED: '/company-management/refused',
  EDIT_MAIN_COMPANY: '/edit-login-info'
}

export const ROUTES = [
  {
    path: RoutesName.SEMINAR_MANAGEMENT,
    Component: SeminarManagementScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.SEMINAR_CREATE,
    Component: SeminarCreateScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.SEMINAR_UPDATE,
    Component: SeminarEditScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.COMPANY_MANAGEMENT,
    Component: CompanyManagementScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: RoutesName.COMPANY_WAITING,
    Component: CompanyWaitingScreen,
    rules: [USER_ROLE.APPROVAL_MANAGEMENT, USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: `${RoutesName.COMPANY_WAITING_DETAIL}/:companyId`,
    Component: CompanyWaitingDetailScreen,
    rules: [USER_ROLE.APPROVAL_MANAGEMENT, USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: RoutesName.COMPANY_REFUSED,
    Component: CompanyRefuseScreen,
    rules: [USER_ROLE.APPROVAL_MANAGEMENT, USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: RoutesName.EDIT_MAIN_COMPANY,
    Component: EditLoginInfo,
    rules: [USER_ROLE.APPROVAL_MANAGEMENT, USER_ROLE.NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  }
]

export default function CompanyRoutes() {
  return (
    <Switch>
      {ROUTES.map((item) => (
        <PrivateRoute key={item.path} exact path={item.path} component={item.Component} rules={item.rules} rulesWS={item.rulesWS} />
      ))}
    </Switch>
  )
}
