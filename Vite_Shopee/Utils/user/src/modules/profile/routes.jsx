import React, { useMemo } from 'react'
import {
  Route,
  Switch,
  useRouteMatch
} from 'react-router-dom'

import ProfileScreen from './getProfile'
import EditProfileScreen from './editProfile'
import ChangePasswordScreen from './changePassword'
import ChangeEmailScreen from './changeEmail'

import { CustomRoute } from '../../components'
import PageNotFound from '../page-not-fount'
import { USER_WORKSPACE_ROLE } from '../../constants'
import { useProfile } from '../../hooks'

export default function NotificationRoutes() {
  const { path } = useRouteMatch()
  const { profile } = useProfile()
  const { COMPANY_ADMIN, WORKSPACE_ADMIN, VIRTUAL_COMPANY } = USER_WORKSPACE_ROLE

  const ROUTES = [
    {
      path,
      component: ProfileScreen,
      rules: [COMPANY_ADMIN, WORKSPACE_ADMIN, VIRTUAL_COMPANY]
    },
    {
      path: `${path}/edit`,
      component: EditProfileScreen,
      rules: [COMPANY_ADMIN]
    },
    {
      path: `${path}/change-password`,
      component: ChangePasswordScreen,
      rules: [COMPANY_ADMIN, WORKSPACE_ADMIN, VIRTUAL_COMPANY]
    },
    {
      path: `${path}/change-email`,
      component: ChangeEmailScreen,
      rules: [COMPANY_ADMIN]
    }
  ]

  const routes = useMemo(() => ROUTES.filter((r) => r.rules.includes(profile.isWorkSpace)), [profile])

  return (
    <Switch>
      {routes.map((r) => (
        <CustomRoute
          exact
          key={r.path}
          path={r.path}
          component={r.component}
        />
      ))}
      <Route path="*" component={PageNotFound} />
    </Switch>
  )
}
