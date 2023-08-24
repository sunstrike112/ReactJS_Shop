import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'Components/route/privateRoute'

import { USER_ROLE } from 'Constants/auth'
// import SeminarManagementScreen from './seminar'

export const RoutesName = {
  PAYMENT_MANAGEMENT: '/payment-management'
}

export const ROUTES = [
  {
    path: RoutesName.PAYMENT_MANAGEMENT,
    // Component: SeminarManagementScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
  }
]

export default function PaymentRoutes() {
  return (
    <Switch>
      {ROUTES.map((item) => (
        <PrivateRoute key={item.path} exact path={item.path} component={item.Component} rules={item.rules} />
      ))}
    </Switch>
  )
}
