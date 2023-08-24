import React from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'Components/route/privateRoute'

import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'
import IssuePermissonScreen from './issue_status_permissions/create'
import IssueStatusPermissionScreen from './issue_status_permissions'
import RegistrationCategoriesScreen from './registration_categories'
import RegistrationCertificatesScreen from './registration_certificates'
import RegistrationCourseScreen from './registration_course'
import CreateCourseScreen from './registration_course/create_course'
import EditCourseScreen from './registration_course/edit_course'
import ReportPublishingScreen from './report_publishing'
import TeachingMaterialsScreen from './teaching_materials'
import TestQuestionManagementScreen from './test_question_management'
import TestQuestionDetail from './test_question_management/test_question_detail'
import UnitSettingsScreen from './unit_settings'
import TestDetailScreen from './unit_settings/test_detail'
import TestBasicSettingScreen from './unit_settings/test_basic_setting'
import UploadFileScreen from './upload_file'
import RecordingScreen from './recording'
import SubtitleVideoScreen from './subtitle_video'
import AutoAssignmentScreen from './auto_assignment'
import CreateAutomatic from './auto_assignment/create_automatic'
import EditAutomatic from './auto_assignment/edit_automatic'
import BulkIssuePermissionScreen from './bulk_issue_permission'
import OptionSettingScreen from './unit_settings/test_option_setting'
import CreateLectureScreen from './unit_settings/create_lecture'
import EditLectureScreen from './unit_settings/edit_lecture'
import QuestionSettingScreen from './unit_settings/test_question_setting'
import ReportDetailScreen from './unit_settings/report_detail'
import CreateUnitSurveyScreen from './unit_settings/create_survey'
import EditUnitSurveyScreen from './unit_settings/edit_survey'
import ReportBasicSettingScreen from './unit_settings/report_basic_setting'
import ReportQuestionSettingScreen from './unit_settings/report_question_setting'
import CreateQuestionScreen from './unit_settings/create_question'
import EditQuestionScreen from './unit_settings/edit_question'
import UpdatePublishReportScreen from './report_publishing/UpdatePublishReport'
import EditIssuePermissionScreen from './issue_status_permissions/edit'
import SettingCourseJobnare from './setting_course_jobnare'
import UploadFileImagesScreen from './upload_file_images'

export const RoutesName = {
  // AUTO_ASSIGNMENT_COURSE
  AUTO_ASSIGNMENT: '/course-management/auto-assignment',
  CREATE_AUTOMATIC: '/course-management/auto-assignment/create-automatic',
  EDIT_AUTOMATIC: '/course-management/auto-assignment/edit-automatic',

  SETTTING_COURSE_JOBNARE: '/course-management/setting-course-jobnare',

  BULK_ISSUE_PERMISSION: '/course-management/user-learning-lesson-csv',
  ISSUE_PERMISSION: '/course-management/create-user-learning-lesson',
  EDIT_ISSUE_PERMISSION: '/course-management/user-learning-lesson/edit',
  ISSUE_STATUS_PERMISSION: '/course-management/user-learning-lesson',
  REGISTRATION_CATEGORIES: '/course-management/lesson-cate',

  REGISTRATION_COURSE: '/course-management/lesson-course',
  CREATE_COURSE: '/course-management/lesson-course/create',
  EDIT_COURSE: '/course-management/lesson-course/edit',

  REGISTRATION_CERTIFICATES: '/course-management/certificates',
  TEACHING_MATERIALS: '/course-management/teaching-materials',

  // TEST_QUESTION_MANAGEMENT
  TEST_QUESTION_MANAGEMENT: '/course-management/test-question-management',
  TEST_QUESTION_DETAIL: '/course-management/test-question-management/question-detail',

  // UNIT-SETTINGS
  UNIT_SETTINGS: '/course-management/unit-settings',
  CREATE_LECTURE_UNIT_SETTINGS: '/course-management/unit-settings/lecture/create',
  EDIT_LECTURE_UNIT_SETTINGS: '/course-management/unit-settings/lecture/edit',
  TEST_DETAIL: '/course-management/unit-settings/test-detail',
  BASIC_SETTING_INFO: '/course-management/unit-settings/basic-info-setting',
  OPTION_SETTING: '/course-management/unit-settings/option-setting',
  QUESTION_SETTING: '/course-management/unit-settings/question-setting',
  CREATE_QUESTION: '/course-management/unit-settings/question-setting/create',
  EDIT_QUESTION: '/course-management/unit-settings/question-setting/edit',
  UPLOAD_FILE: '/course-management/upload-file',
  UPLOAD_FILE_IMAGES: '/course-management/upload-images-file',

  // REPORT-PUBLISHING
  REPORT_PUBLISHING: '/course-management/report-sharing',
  REPORT_PUBLISHING_UPDATE: '/course-management/report-sharing/update-publish',

  // REPORT-SETTING
  REPORT_DETAIL: '/course-management/unit-settings/report-detail',
  REPORT_BASIC_SETTING: '/course-management/unit-settings/report-basic-setting',
  REPORT_QUESTION_SETTING: '/course-management/unit-settings/report-question-setting',

  // SURVEY-SETTING
  CREATE_UNIT_SURVEY: '/course-management/unit-settings/survey/create',
  EDIT_UNIT_SURVEY: '/course-management/unit-settings/survey/edit'
}

export const ROUTES = [
  // AUTO_ASSIGNMENT_COURSE
  {
    path: RoutesName.AUTO_ASSIGNMENT,
    Component: AutoAssignmentScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.CREATE_AUTOMATIC,
    Component: CreateAutomatic,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.EDIT_AUTOMATIC}/:assignId`,
    Component: EditAutomatic,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.SETTTING_COURSE_JOBNARE,
    Component: SettingCourseJobnare,
    rules: [USER_ROLE.COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    path: RoutesName.BULK_ISSUE_PERMISSION,
    Component: BulkIssuePermissionScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.ISSUE_PERMISSION,
    Component: IssuePermissonScreen,
    rules: [USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.EDIT_ISSUE_PERMISSION,
    Component: EditIssuePermissionScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.ISSUE_STATUS_PERMISSION,
    Component: IssueStatusPermissionScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.REGISTRATION_CATEGORIES,
    Component: RegistrationCategoriesScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.REGISTRATION_CERTIFICATES,
    Component: RegistrationCertificatesScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },

  {
    path: RoutesName.REGISTRATION_COURSE,
    Component: RegistrationCourseScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.CREATE_COURSE,
    Component: CreateCourseScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.EDIT_COURSE}/:id`,
    Component: EditCourseScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.TEACHING_MATERIALS,
    Component: TeachingMaterialsScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  // TEST_QUESTION_MANAGEMENT
  {
    path: RoutesName.TEST_QUESTION_MANAGEMENT,
    Component: TestQuestionManagementScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.TEST_QUESTION_DETAIL}/:questionId`,
    Component: TestQuestionDetail,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },

  // UNIT_SETTING
  {
    path: RoutesName.UNIT_SETTINGS,
    Component: UnitSettingsScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.TEST_DETAIL}/:courseId/:unitId`,
    Component: TestDetailScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.BASIC_SETTING_INFO}/:courseId/:unitId`,
    Component: TestBasicSettingScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.OPTION_SETTING}/:courseId/:unitId`,
    Component: OptionSettingScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.QUESTION_SETTING}/:courseId/:unitId`,
    Component: QuestionSettingScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.UPLOAD_FILE,
    Component: UploadFileScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.UPLOAD_FILE}/recording`,
    Component: RecordingScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.UPLOAD_FILE}/subtitle-video/:id`,
    Component: SubtitleVideoScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.UPLOAD_FILE_IMAGES,
    Component: UploadFileImagesScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.UPLOAD_FILE_IMAGES}/recording`,
    Component: RecordingScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.UPLOAD_FILE_IMAGES}/subtitle-video/:id`,
    Component: SubtitleVideoScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.CREATE_LECTURE_UNIT_SETTINGS}/:courseId`,
    Component: CreateLectureScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.EDIT_LECTURE_UNIT_SETTINGS}/:courseId/:unitId`,
    Component: EditLectureScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  // REPORT_PUBLISHING
  {
    path: RoutesName.REPORT_PUBLISHING,
    Component: ReportPublishingScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.REPORT_PUBLISHING_UPDATE}/:reportId`,
    Component: UpdatePublishReportScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  // REPORT-SETTINGS
  {
    path: `${RoutesName.REPORT_DETAIL}/:reportId`,
    Component: ReportDetailScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.CREATE_UNIT_SURVEY}/:courseId`,
    Component: CreateUnitSurveyScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.EDIT_UNIT_SURVEY}/:courseId/:surveyId`,
    Component: EditUnitSurveyScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.REPORT_BASIC_SETTING}/:courseId/:reportId`,
    Component: ReportBasicSettingScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.REPORT_QUESTION_SETTING}/:reportId`,
    Component: ReportQuestionSettingScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.CREATE_QUESTION}/:courseId/:unitId`,
    Component: CreateQuestionScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: `${RoutesName.EDIT_QUESTION}/:courseId/:unitId/question/:questionId`,
    Component: EditQuestionScreen,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  }
]

export default function CourseRoutes() {
  return (
    <Switch>
      {ROUTES.map((item) => (
        <PrivateRoute key={item.path} exact path={item.path} component={item.Component} rules={item.rules} rulesWS={item.rulesWS} />
      ))}
    </Switch>
  )
}
