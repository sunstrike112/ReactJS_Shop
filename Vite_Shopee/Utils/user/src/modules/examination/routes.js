import React from 'react'
import {
  Switch,
  useRouteMatch,
  Route
} from 'react-router-dom'
import { CustomRoute } from '../../components'
import TestingScreen from './testing'
import TestResultScreen from './test-result'
import PageNotFound from '../page-not-fount'

export default function UnitTestRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <CustomRoute
        exact
        path={`${path}/:courseId/:testId`}
        component={TestingScreen}
      />
      <CustomRoute
        exact
        path={`${path}/test-result/:courseId/:testId`}
        component={TestResultScreen}
      />
      <Route component={PageNotFound} />
    </Switch>
  )
}
