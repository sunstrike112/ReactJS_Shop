import React from 'react'
import {
  Switch,
  useRouteMatch,
  Route
} from 'react-router-dom'

import { CustomRoute } from '../../components'
import CourseDetailScreen from './course-detail'
import CourseLessonScreen from './course-lesson'
import CourseDetailUnregistered from './course-detail-unregistered'
import PageNotFound from '../page-not-fount'

export default function CourseRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <CustomRoute
        exact
        path={`${path}/:courseId/lesson/:lessonId`}
        component={CourseLessonScreen}
      />
      <CustomRoute
        exact
        path={`${path}/detail/:courseId`}
        component={CourseDetailScreen}
      />
      <CustomRoute
        exact
        path={`${path}/detail-unregistered/:courseId`}
        component={CourseDetailUnregistered}
      />
      <Route component={PageNotFound} />
    </Switch>
  )
}
