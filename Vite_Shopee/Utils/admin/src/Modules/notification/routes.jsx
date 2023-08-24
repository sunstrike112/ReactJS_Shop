import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'Components/route/privateRoute'

// component
import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'
import NotifyManagement from './notify-management'
import NotifyPost from './notify-management/notify-post'
import ScreenEmailHistories from './email-histories-management'
import NotifyDetail from './notify-detail'
import EditNotifi from './notify-management/edit-notifi'
import SendEmailScreen from './send_email'
import ScreenEmailDetail from './email_detail'

export const RoutesName = {
  NOTIFY_MANAGEMENT: '/contact-management/notify-management',
  NOTIFY_POST: '/contact-management/notify-management/notify-post',
  NOTIFY_DETAIL: '/contact-management/notify-management/notify-detail',
  EDIT_NOTIFI: '/contact-management/notify-management/edit-notifi',
  EMAIL_HISTORIES_MANAGEMENT: '/contact-management/email-histories-management',
  SEND_EMAIL: '/contact-management/email-histories-management/send-email',
  EMAIL_DETAIL: '/contact-management/email-histories-management/email-detail'
}

export const ROUTES = [
  {
    path: RoutesName.NOTIFY_MANAGEMENT,
    Component: NotifyManagement,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.NOTIFY_POST,
    Component: NotifyPost,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.EMAIL_HISTORIES_MANAGEMENT,
    Component: ScreenEmailHistories,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.NOTIFY_DETAIL}/:id`,
    Component: NotifyDetail,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.EDIT_NOTIFI}/:id`,
    Component: EditNotifi,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.SEND_EMAIL,
    Component: SendEmailScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.EMAIL_DETAIL}/:id`,
    Component: ScreenEmailDetail,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  }
]

const ContactRoutes = () => (
  <Switch>
    {ROUTES.map((item) => (
      <PrivateRoute key={item.path} exact path={item.path} component={item.Component} rules={item.rules} rulesWS={item.rulesWS} />
    ))}
  </Switch>
)

export default ContactRoutes
