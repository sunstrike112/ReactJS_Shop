import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PrivateRoute } from '../../components'
import { ROUTES_NAME } from '../../constants'
import { useProfile } from '../../hooks'
import PageNotFound from '../page-not-fount'
import CreateDailyReportScreen from './CreateDailyReport'
import CreateTemplateScreen from './CreateTemplate'
import DailyReportDetailScreen from './DailyReport'
import DailyReports from './DailyReports'
import DetailTemplate from './DetailTemplate'
import EditDailyReportScreen from './EditDailyReport'
import EditTemplateScreen from './EditTemplate'
import TemplateScreen from './Template'

const DailyReportsRoutes = () => {
  // Use hooks
  const { authenticated } = useProfile()
  // End use hooks

  return (
    <Switch>
      <PrivateRoute
        exact
        path={ROUTES_NAME.DAILY_REPORTS}
        component={DailyReports}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path={ROUTES_NAME.DAILY_REPORT_CREATE}
        component={CreateDailyReportScreen}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path={`${ROUTES_NAME.DAILY_REPORT_EDIT}/:dailyReportId`}
        component={EditDailyReportScreen}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path={`${ROUTES_NAME.DAILY_REPORT_DETAIL}/:dailyReportId`}
        component={DailyReportDetailScreen}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path={ROUTES_NAME.TEMPLATE}
        component={TemplateScreen}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path={ROUTES_NAME.TEMPLATE_CREATE}
        component={CreateTemplateScreen}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path={`${ROUTES_NAME.TEMPLATE_EDIT}/:templateId`}
        component={EditTemplateScreen}
        authenticated={authenticated}
      />
      <PrivateRoute
        exact
        path={`${ROUTES_NAME.TEMPLATE_DETAIL}/:templateId`}
        component={DetailTemplate}
        authenticated={authenticated}
      />
      <Route path="*" component={PageNotFound} />
    </Switch>

  )
}

export default DailyReportsRoutes
