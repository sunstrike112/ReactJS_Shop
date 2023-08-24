import {
  BookOutlined, FormOutlined, ReadOutlined,
  TagsOutlined
} from '@ant-design/icons'
import {
  ICON_PEN_TOOL
} from 'Assets'
import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'

export const RoutesName = {
  HOME: '/',
  LOADING: '/loading',
  LOGIN: '/login',
  REGISTER: '/register',
  COMMUNITY: '/community-management',

  USER: '/user-management',
  BATCH_USER_REGISTER: '/user-management/batch_register',
  BATCH_WORKSPACE_REGISTER: '/user-management/batch_workspace_register',
  BATCH_WORKSPACE_VIRTUAL_REGISTER: '/user-management/batch_workspace_virtual_register',
  USER_MANAGEMENT: '/user-management/user',
  GROUP_MANAGEMENT: '/user-management/group',
  ATTRIBUTE_MANAGEMENT: '/user-management/attribute',
  LOGIN_HISTORY: '/user-management/login-history',

  NOTIFY_MANAGEMENT: '/contact-management/notify-management',
  EMAIL_HISTORIES_MANAGEMENT: '/contact-management/email-histories-management',

  COURSE: '/course-management',
  COURSE_CATEGORY: '/course-management/lesson-cate',
  COURSE_MANAGEMENT: '/course-management/lesson-course',
  COURSE_UNIT_SETTING: '/course-management/unit-settings',
  COURSE_UPLOAD_FILE: '/course-management/upload-file',
  COURSE_ASSIGNMENT: '/course-management/auto-assignment',
  COURSE_TEST_QUESTION: '/course-management/test-question-management',
  COURSE_ISSUE_PERMISSION: '/course-management/create-user-learning-lesson',
  COURSE_PERMISSION_MANAGEMENT: '/course-management/user-learning-lesson',
  SETTING_COURSE_JOBNARE: '/course-management/setting-course-jobnare',

  COURSE_RESULT: '/course-result',
  STATUS_LEARN_COURSE: '/course-result/status-learn-course',
  COMPLETION_STATUS_BY_USER: '/course-result/completion-status-by-user',
  UNIT_LEARN_COURSE: '/course-result/unit-learn-course',
  QUESTIONNAIRE_ANALYSIS: '/course-result/questionnaire-analysis',
  TEST_RESULTS: '/course-result/test-results',
  SURVEY_ANSWER: '/course-result/survey-answer',
  STATISTICAL_RESULTS_OF_SURVEY: '/course-result/statistical-results-of-survey',
  REPORT_HISTORIES: '/course-result/report-histories',
  EVALUATE_REPORT: '/course-result/report-histories/evaluate-report',

  INQUIRY: '/inquiry-management',
  LIBRARY: '/library-management',
  SETTINGS: '/site-settings',
  SEMINAR: '/seminar-management',
  PAYMENT_MANAGER: '/payment-management',
  MY_COMPANY: '/my-company',
  MAIL_SERVER: '/setting-mail-server',
  DOWNLOAD_MANUAL: '/download-manual',
  SETTING_MAINTAIN: '/setting-maintain',
  SETTING_DOMAIN: '/setting-domain',
  SETTING_PASSWORD_PLAN: '/setting-password-plan',
  PROJECT_LIST: '/project-list',
  WORK_SPACE: '/workspace-management',
  TAG_MANAGEMENT: '/tag-management',
  COMMUNITY_MANAGEMENT: '/community-managements',
  COMMENT_MANAGEMENT: '/comment-management'
}

export const QUERY_PARAMS = {
  ASSIGN_COURSE_SUCCESS: 'create-course-in-webview-success',
  UPLOAD_VIDEO_FAILURE: 'error-upload-video',
  FILE_ALREADY_EXIST: 'file-already-exist',
  APP_LOGIN: 'authLogin'
}

const { NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, NISSHOKEN_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN } = USER_ROLE

export const MenuList = [
  {
    Icon: ICON_PEN_TOOL,
    title: 'course',
    fill: 'none',
    stroke: 'currentColor',
    key: 'course-management',
    rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN],
    children: [
      {
        Icon: TagsOutlined,
        title: 'webView.registration_course_categories',
        pathName: RoutesName.COURSE_CATEGORY,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'category',
        rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: BookOutlined,
        title: 'webView.registration_courses',
        pathName: RoutesName.COURSE_MANAGEMENT,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'course',
        rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: ReadOutlined,
        title: 'webView.unit_settings',
        pathName: RoutesName.COURSE_UNIT_SETTING,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'unit',
        rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: FormOutlined,
        title: 'webView.issus_permission',
        pathName: RoutesName.COURSE_ISSUE_PERMISSION,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'attendance-permit',
        rules: [COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      }
    ]
  }
]
