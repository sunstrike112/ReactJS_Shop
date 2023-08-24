/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'

import { useInjectReducer } from '../store'

import { CustomRoute, PrivateRoute, PublicRoute, StrictRoute, WorkspaceRoute } from '../components'
import { useProfile } from '../hooks'
import AuthRoutes from '../modules/auth/routes'
import CourseListScreen from '../modules/course-list'
import CourseRoutes from '../modules/course/routes'
import ExaminationRoutes from '../modules/examination/routes'
import { checkNetwork } from './store/actions'
import reducer from './store/reducer'

import MypageScreen from '../modules/mypage'
import NotificationDetail from '../modules/notification/detail'
import NotificationList from '../modules/notification/notification-list'
import ReportScreen from '../modules/report'
import SurveyScreen from '../modules/survey/list-question'

import { ROUTES_NAME } from '../constants'
import RegisterCompany from '../modules/auth/register/register-company'
import SettingPasswordRoutes from '../modules/auth/settingPasswordRoutes'
import WorkspaceScreen from '../modules/auth/workspace'
import DailyReportsRoutes from '../modules/dailyReport'
import LoadingScreen from '../modules/loading'
import PageNotFound from '../modules/page-not-fount'
import PolicyScreen from '../modules/pocily'
import ProfileRoute from '../modules/profile/routes'
import SeminarList from '../modules/seminar'
import CreateTalkBoardScreen from '../modules/talk-board/create-talk-board'
import EditTalkBoardScreen from '../modules/talk-board/edit-talk-board'
import TalkBoardRoutes from '../modules/talk-board/routes'
import TermOfUseScreen from '../modules/term_of_use'

export default function AppRoutes({ isOnline = true }) {
  useInjectReducer({ key: 'globalStore', reducer })
  const dispatch = useDispatch()

  const { pathname } = useLocation()
  const { authenticated } = useProfile()

  useEffect(async () => {
    dispatch(checkNetwork(isOnline))
  }, [isOnline])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Switch>
      <PrivateRoute
        exact
        path="/mypage"
        component={MypageScreen}
        authenticated={authenticated}
      />
      <StrictRoute
        exact
        path="/auth/register-company"
        component={RegisterCompany}
        authenticated={authenticated}
      />
      <PublicRoute
        path="/auth"
        component={AuthRoutes}
        authenticated={authenticated}
      />
      <CustomRoute path="/setting-password" component={SettingPasswordRoutes} />
      <WorkspaceRoute
        path="/workspaces"
        component={WorkspaceScreen}
        authenticated={authenticated}
      />
      <PrivateRoute
        path="/course"
        component={CourseRoutes}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path="/course-list"
        component={CourseListScreen}
        authenticated={authenticated}
      />
      <PrivateRoute
        path="/examination"
        component={ExaminationRoutes}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path="/survey/:courseId/:surveyId"
        component={SurveyScreen}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path="/report/:courseId/:reportId"
        component={ReportScreen}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path="/notifications"
        component={NotificationList}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path="/notification/detail/:newsId"
        component={NotificationDetail}
        authenticated={authenticated}
      />
      <PrivateRoute
        path="/profile"
        component={ProfileRoute}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path="/seminars"
        component={SeminarList}
        authenticated={authenticated}
      />
      <PrivateRoute
        path="/talk-board"
        component={TalkBoardRoutes}
        authenticated={authenticated}
      />
      <PrivateRoute
        path="/create-talk-board"
        component={CreateTalkBoardScreen}
        authenticated={authenticated}
      />
      <PrivateRoute
        path="/edit-talk-board/:talkBoardId"
        component={EditTalkBoardScreen}
        authenticated={authenticated}
      />
      <PrivateRoute
        path={ROUTES_NAME.DAILY_REPORTS}
        component={DailyReportsRoutes}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path="/"
        authenticated={authenticated}
      />
      <CustomRoute exact path="/loading" component={LoadingScreen} />
      <CustomRoute exact path="/policy" component={PolicyScreen} />
      <CustomRoute exact path="/term-of-use" component={TermOfUseScreen} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  )
}
