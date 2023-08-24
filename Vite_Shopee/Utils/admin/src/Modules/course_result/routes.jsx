import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'Components/route/privateRoute'

import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'
import StatusLearnCourseScreens from './status_learn_course'
import CompletionStatusByUserScreen from './completion_status_by_user'
import QuestionnaireAnalysis from './questionnaire_analysis'
import TestResultsScreen from './test_results'
import SurveyAnswerScreen from './survey_answer'
import StatisticalResultsOfSurvey from './statistical_results_of_survey'
import ReportHistories from './report_histories'
import EvaluateReport from './evaluate_report'
import ViewHistory from './completion_status_by_user/ViewHistory'
import UnitLearnCourseScreen from './unit_learn_course'

export const RoutesName = {
  STATUS_LEARN_COURSE: '/course-result/status-learn-course',
  COMPLETION_STATUS_BY_USER: '/course-result/completion-status-by-user',
  UNIT_LEARN_COURSE: '/course-result/unit-learn-course',
  UNIT_VIEW_HISTORY: '/course-result/unit-learn-course/view-history',
  QUESTIONNAIRE_ANALYSIS: '/course-result/questionnaire-analysis',
  TEST_RESULTS: '/course-result/test-results',
  SURVEY_ANSWER: '/course-result/survey-answer',
  STATISTICAL_RESULTS_OF_SURVEY: '/course-result/statistical-results-of-survey',
  REPORT_HISTORIES: '/course-result/report-histories',
  EVALUATE_REPORT: '/course-result/report-histories/evaluate-report'
}

export const ROUTES = [
  {
    path: RoutesName.STATUS_LEARN_COURSE,
    Component: StatusLearnCourseScreens,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.COMPLETION_STATUS_BY_USER,
    Component: CompletionStatusByUserScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.UNIT_LEARN_COURSE,
    Component: UnitLearnCourseScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.UNIT_VIEW_HISTORY,
    Component: ViewHistory,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.TEST_RESULTS,
    Component: TestResultsScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.SURVEY_ANSWER,
    Component: SurveyAnswerScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.STATISTICAL_RESULTS_OF_SURVEY,
    Component: StatisticalResultsOfSurvey,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.REPORT_HISTORIES,
    Component: ReportHistories,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.EVALUATE_REPORT,
    Component: EvaluateReport,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.QUESTIONNAIRE_ANALYSIS,
    Component: QuestionnaireAnalysis,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  }
]

export default function CourseResultRoutes() {
  return (
    <Switch>
      {ROUTES.map((item) => (
        <PrivateRoute key={item.path} exact path={item.path} component={item.Component} rules={item.rules} rulesWS={item.rulesWS} />
      ))}
    </Switch>
  )
}
