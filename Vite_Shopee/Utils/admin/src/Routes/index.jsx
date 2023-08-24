/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Switch, useLocation } from 'react-router-dom'

import { useAuth, useHistories, useWebview } from 'Hooks'

import PrivateRoute from 'Components/route/privateRoute'
import PublicRoute from 'Components/route/publicRoute'
import Logout from 'Modules/auth/logout'
import Verify from 'Modules/auth/verify'
import TalkBoardRoutes from 'Modules/community_management/routes'
import CompanyRoutes from 'Modules/company/routes'
import CourseRoutes from 'Modules/course/routes'
import CourseResultRoutes from 'Modules/course_result/routes'
import ContactRoutes from 'Modules/notification/routes'
import UserRoutes from 'Modules/user/routes'
import BatchRegisterUserHelp from 'Modules/user/user_management/batch_register_user/help'
import ProjectListRoutes from 'Modules/video_editor/routes'
import WorkSpaceRoutes from 'Modules/workspace/routes'

import Layout from 'Layouts/home'

import Loading from 'Components/loading'
import ExternalRoutes from 'Modules/external/routes'
import ForbiddenScreen from 'Modules/other/403'
import ReportRoutes from 'Modules/report_management/routes'
import TemplateRoutes from 'Modules/template_management/routes'
import RoutesName, { ROUTES } from './constant'

export default function AppRoutes() {
  const history = useHistories()
  const { pathname } = useLocation()
  const { isLoading, authenticated, loadProfileAction } = useAuth()
  const { isWebviewMode } = useWebview()

  useEffect(() => {
    if (pathname !== RoutesName.LOGOUT) {
      loadProfileAction()
    }

    // scroll to top per navigation
    const unListen = history.listen(() => {
      document.getElementById('content').scrollTo(0, 0)
    })
    return () => {
      unListen()
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Switch>
      <PublicRoute exact path="/user-management/batch_register/help" component={BatchRegisterUserHelp} />
      <PublicRoute exact path="/auth/verify" component={Verify} />
      <PublicRoute exact path="/auth/logout" component={Logout} />
      <PublicRoute exact path="/403" component={ForbiddenScreen} />
      {isLoading || !authenticated ? (
        <Loading />
      ) : (
        <Layout>
          <Switch>
            {ROUTES({ isWebviewMode }).map((item) => (
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
          <UserRoutes />
          <ContactRoutes />
          <CourseRoutes />
          <CourseResultRoutes />
          <CompanyRoutes />
          <ProjectListRoutes />
          <WorkSpaceRoutes />
          <TalkBoardRoutes />
          <TemplateRoutes />
          <ReportRoutes />
          <ExternalRoutes />
        </Layout>
      )}
    </Switch>
  )
}
