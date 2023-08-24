/* eslint-disable no-unused-vars */
import {
  HistoryOutlined,
  RobotOutlined,
  QuestionCircleOutlined,
  BookOutlined,
  ReadOutlined,
  TagsOutlined,
  TableOutlined,
  TagOutlined,
  ProfileOutlined,
  FileDoneOutlined,
  ContainerOutlined,
  TeamOutlined,
  VideoCameraAddOutlined,
  ContactsOutlined,
  HomeOutlined,
  NotificationOutlined,
  MenuUnfoldOutlined,
  DownloadOutlined,
  CloudUploadOutlined,
  FormOutlined,
  SettingOutlined,
  PieChartOutlined,
  CloudOutlined,
  DiffOutlined,
  KeyOutlined,
  InsertRowBelowOutlined,
  MailOutlined,
  CopyOutlined,
  SnippetsOutlined,
  MobileOutlined,
  BlockOutlined,
  CloseCircleOutlined,
  UngroupOutlined,
  ClusterOutlined,
  FileImageOutlined
} from '@ant-design/icons'

import {
  ICON_COMPANY,
  ICON_USER,
  ICON_USERS,
  ICON_LIBRARY,
  ICON_COURSE_RESULT,
  ICON_PEN_TOOL,
  ICON_QUESTION,
  ICON_SETTING_MENU,
  FOLDER_ICON,
  ICON_PROJECT_LIST
} from 'Assets'
import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'

export const RoutesName = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  COMPANY_MANAGEMENT: '/company-management/company',
  COMPANY_WAITING: '/company-management/waiting',
  COMPANY_REFUSED: '/company-management/refused',
  COMMUNITY: '/community-management',
  EDIT_MAIN_COMPANY: '/edit-login-info',
  USER: '/user-management',
  BATCH_USER_REGISTER: '/user-management/batch_register',
  BATCH_WORKSPACE_REGISTER: '/user-management/batch_workspace_register',
  BATCH_USER_DELETE: '/user-management/batch_delete',
  BATCH_WORKSPACE_USER_DELETE: '/user-management/batch_workspace_delete',
  BATCH_WORKSPACE_VIRTUAL_USER_DELETE: '/user-management/batch_workspace_virtual_delete',
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
  COURSE_UPLOAD_FILE_IMAGES: '/course-management/upload-images-file',

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
  SETTING_MOBILE: '/setting-mobile',
  SETTING_DOMAIN: '/setting-domain',
  IP_CONFIGURATION: '/external/ip-configuration',
  API_MANAGER_CONFIGURATION: '/external/manager-configuration',
  SETTING_PASSWORD_PLAN: '/setting-password-plan',
  PROJECT_LIST: '/project-list',
  WORK_SPACE: '/workspace-management',
  TAG_MANAGEMENT: '/tag-management',
  COMMUNITY_MANAGEMENT: '/community-managements/community-management',
  COMMENT_MANAGEMENT: '/community-managements/comment-management',
  TEMPLATE_MANAGEMENT: '/community-managements/template-management',
  REPORT_MANAGEMENT: '/community-managements/report-management'
}

const { NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, NISSHOKEN_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN, APPROVAL_MANAGEMENT } = USER_ROLE

export const MenuList = [
  {
    Icon: HomeOutlined,
    title: 'home',
    pathName: RoutesName.HOME,
    fill: 'text_hight_light',
    stroke: 'none',
    key: 'home',
    rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, APPROVAL_MANAGEMENT],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY]
  },
  {
    Icon: ICON_COMPANY,
    title: 'company',
    fill: 'white',
    stroke: 'currentColor',
    key: 'company-management',
    rules: [NISSHOKEN_SUPER_ADMIN, APPROVAL_MANAGEMENT],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN],
    children: [
      {
        Icon: ICON_COMPANY,
        title: 'company',
        pathName: RoutesName.COMPANY_MANAGEMENT,
        fill: 'white',
        stroke: 'currentColor',
        key: 'company',
        rules: [NISSHOKEN_SUPER_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
      },
      {
        Icon: BlockOutlined,
        title: 'company:waiting.title',
        pathName: RoutesName.COMPANY_WAITING,
        fill: 'white',
        stroke: 'currentColor',
        key: 'company-waiting',
        rules: [APPROVAL_MANAGEMENT, NISSHOKEN_SUPER_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
      },
      {
        Icon: CloseCircleOutlined,
        title: 'company:refused.title',
        pathName: RoutesName.COMPANY_REFUSED,
        fill: 'white',
        stroke: 'currentColor',
        key: 'company-waiting',
        rules: [APPROVAL_MANAGEMENT, NISSHOKEN_SUPER_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
      }
    ]
  },
  {
    Icon: InsertRowBelowOutlined,
    title: 'workspace',
    pathName: RoutesName.WORK_SPACE,
    fill: 'white',
    stroke: 'currentColor',
    key: 'workspace-management',
    rules: [NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    Icon: ICON_USER,
    title: 'user',
    fill: 'inherit',
    stroke: 'currentColor',
    key: 'user-management',
    rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY],
    children: [
      {
        Icon: ICON_USER,
        title: 'user_management',
        pathName: RoutesName.USER_MANAGEMENT,
        fill: 'inherit',
        stroke: 'currentColor',
        key: 'user',
        rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, NISSHOKEN_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY]
      },
      {
        Icon: CloudUploadOutlined,
        title: 'batch_register',
        pathName: RoutesName.BATCH_USER_REGISTER,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'user',
        rules: [COMPANY_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
      },
      {
        Icon: CloudUploadOutlined,
        title: 'batch_workspace_register',
        pathName: RoutesName.BATCH_WORKSPACE_REGISTER,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'user',
        rules: [NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: CloudUploadOutlined,
        title: 'batch_workspace_register',
        pathName: RoutesName.BATCH_WORKSPACE_VIRTUAL_REGISTER,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'user',
        rules: [NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.VIRTUAL_COMPANY]
      },
      {
        Icon: CloudUploadOutlined,
        title: 'batch_delete',
        pathName: RoutesName.BATCH_USER_DELETE,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'user',
        rules: [COMPANY_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
      },
      {
        Icon: CloudUploadOutlined,
        title: 'batch_delete',
        pathName: RoutesName.BATCH_WORKSPACE_USER_DELETE,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'user',
        rules: [NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: CloudUploadOutlined,
        title: 'batch_delete',
        pathName: RoutesName.BATCH_WORKSPACE_VIRTUAL_USER_DELETE,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'user',
        rules: [NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.VIRTUAL_COMPANY]
      },
      {
        Icon: TeamOutlined,
        title: 'group_management',
        pathName: RoutesName.GROUP_MANAGEMENT,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'group',
        rules: [NISSHOKEN_ADMIN, COMPANY_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: TagOutlined,
        title: 'attribute_management',
        pathName: RoutesName.ATTRIBUTE_MANAGEMENT,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'attribute',
        rules: [NISSHOKEN_ADMIN, COMPANY_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: HistoryOutlined,
        title: 'login_history',
        pathName: RoutesName.LOGIN_HISTORY,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'login-history',
        rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN, USER_WORKSPACE_ROLE.VIRTUAL_COMPANY]
      }
    ]
  },
  {
    Icon: ContactsOutlined,
    title: 'contact',
    fill: 'none',
    stroke: 'text_hight_light',
    key: 'contact-management',
    rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN],
    children: [
      {
        Icon: NotificationOutlined,
        title: 'notify_management',
        pathName: RoutesName.NOTIFY_MANAGEMENT,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'notify-management',
        rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: HistoryOutlined,
        title: 'email_history_management',
        pathName: RoutesName.EMAIL_HISTORIES_MANAGEMENT,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'email-history-management',
        rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      }
    ]
  },
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
        title: 'registration_course_categories',
        pathName: RoutesName.COURSE_CATEGORY,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'category',
        rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: BookOutlined,
        title: 'registration_courses',
        pathName: RoutesName.COURSE_MANAGEMENT,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'course',
        rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: ReadOutlined,
        title: 'unit_settings',
        pathName: RoutesName.COURSE_UNIT_SETTING,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'unit',
        rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: FOLDER_ICON,
        title: 'upload_file',
        pathName: RoutesName.COURSE_UPLOAD_FILE,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'file',
        rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: FileImageOutlined,
        title: 'upload_file_images',
        pathName: RoutesName.COURSE_UPLOAD_FILE_IMAGES,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'images',
        rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: RobotOutlined,
        title: 'auto_assignment',
        pathName: RoutesName.COURSE_ASSIGNMENT,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'assignment',
        rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: DiffOutlined,
        title: 'setting_course_jobnare',
        pathName: RoutesName.SETTING_COURSE_JOBNARE,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'setting-course-jobnare',
        rules: [COMPANY_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
      },
      {
        Icon: QuestionCircleOutlined,
        title: 'test_question',
        pathName: RoutesName.COURSE_TEST_QUESTION,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'test',
        rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: HistoryOutlined,
        title: 'issue_status_permissions',
        pathName: RoutesName.COURSE_PERMISSION_MANAGEMENT,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'status-permit',
        rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: FormOutlined,
        title: 'issus_permission',
        pathName: RoutesName.COURSE_ISSUE_PERMISSION,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'attendance-permit',
        rules: [COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      }
    ]
  },
  {
    Icon: ICON_COURSE_RESULT,
    title: 'course_result',
    fill: 'none',
    stroke: 'currentColor',
    key: 'course-result',
    rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN],
    children: [
      {
        Icon: BookOutlined,
        title: 'status_learn_course_of_user',
        pathName: RoutesName.STATUS_LEARN_COURSE,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'status-learn-course',
        rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: ReadOutlined,
        title: 'completion_status_by_user',
        pathName: RoutesName.COMPLETION_STATUS_BY_USER,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'unit-learn-course',
        rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: ReadOutlined,
        title: 'unit_learn_course_of_user',
        pathName: RoutesName.UNIT_LEARN_COURSE,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'unit-learn-course',
        rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: QuestionCircleOutlined,
        title: 'test_results',
        pathName: RoutesName.TEST_RESULTS,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'test-results',
        rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: FileDoneOutlined,
        title: 'statistical_results_of_survey',
        pathName: RoutesName.STATISTICAL_RESULTS_OF_SURVEY,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'statistical-results-of-survey',
        rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: ProfileOutlined,
        title: 'survey_answer',
        pathName: RoutesName.SURVEY_ANSWER,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'survey-answer',
        rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: ContainerOutlined,
        title: 'report_histories',
        pathName: RoutesName.REPORT_HISTORIES,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'report-histories',
        rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: PieChartOutlined,
        title: 'questionnaire_analysis',
        pathName: RoutesName.QUESTIONNAIRE_ANALYSIS,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'questionnaire-analysis',
        rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      }
    ]
  },
  {
    Icon: TableOutlined,
    title: 'community_management',
    fill: 'none',
    stroke: 'text_hight_light',
    key: 'community-managements',
    rules: [COMPANY_ADMIN, NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN],
    children: [
      {
        Icon: TagsOutlined,
        title: 'topic_management',
        pathName: RoutesName.COMMUNITY_MANAGEMENT,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'community-management',
        rules: [COMPANY_ADMIN, NISSHOKEN_SUPER_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: BookOutlined,
        title: 'comment_management',
        pathName: RoutesName.COMMENT_MANAGEMENT,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'comment-management',
        rules: [COMPANY_ADMIN, NISSHOKEN_SUPER_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: CopyOutlined,
        title: 'template_management',
        pathName: RoutesName.TEMPLATE_MANAGEMENT,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'template-management',
        rules: [COMPANY_ADMIN, NISSHOKEN_SUPER_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      },
      {
        Icon: SnippetsOutlined,
        title: 'report_management',
        pathName: RoutesName.REPORT_MANAGEMENT,
        fill: 'none',
        stroke: 'text_hight_light',
        key: 'report-management',
        rules: [COMPANY_ADMIN, NISSHOKEN_SUPER_ADMIN],
        rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
      }
    ]
  },
  {
    Icon: VideoCameraAddOutlined,
    title: 'seminar',
    pathName: RoutesName.SEMINAR,
    fill: 'text_hight_light',
    stroke: 'none',
    key: 'seminar-management',
    rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  // Temporary hide for release 13/12/2021
  // {
  //   Icon: ICON_USERS,
  //   title: 'community',
  //   pathName: RoutesName.COMMUNITY,
  //   fill: 'text_hight_light',
  //   stroke: 'none',
  //   key: 'community-management',
  //   rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN]
  // },
  // {
  //   Icon: ICON_QUESTION,
  //   title: 'inquiry',
  //   pathName: RoutesName.INQUIRY,
  //   fill: 'text_hight_light',
  //   stroke: 'none',
  //   key: 'inquiry-management',
  //   rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN]
  // },
  // {
  //   Icon: ICON_LIBRARY,
  //   title: 'library',
  //   pathName: RoutesName.LIBRARY,
  //   fill: 'text_hight_light',
  //   stroke: 'none',
  //   key: 'library-management',
  //   rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN]
  // },
  {
    Icon: ICON_COMPANY,
    title: 'my_company',
    pathName: RoutesName.MY_COMPANY,
    fill: 'white',
    stroke: 'currentColor',
    key: 'my-company',
    rules: [COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    Icon: MailOutlined,
    title: 'mail_server',
    pathName: RoutesName.MAIL_SERVER,
    fill: 'text_hight_light',
    stroke: 'none',
    key: 'setting-mail-server',
    rules: [COMPANY_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    Icon: MenuUnfoldOutlined,
    title: 'payment_management',
    pathName: RoutesName.PAYMENT_MANAGER,
    fill: 'text_hight_light',
    stroke: 'none',
    key: 'payment-management',
    rules: [NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    Icon: DownloadOutlined,
    title: 'download_manual',
    pathName: RoutesName.DOWNLOAD_MANUAL,
    fill: 'text_hight_light',
    stroke: 'none',
    key: 'download-manual',
    rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    Icon: SettingOutlined,
    title: 'setting_maintain',
    pathName: RoutesName.SETTING_MAINTAIN,
    fill: 'text_hight_light',
    stroke: 'none',
    key: 'setting-maintain',
    rules: [NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    Icon: MobileOutlined,
    title: 'setting_mobile',
    pathName: RoutesName.SETTING_MOBILE,
    fill: 'text_hight_light',
    stroke: 'none',
    key: 'setting-mobile',
    rules: [NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    Icon: CloudOutlined,
    title: 'setting_domain',
    pathName: RoutesName.SETTING_DOMAIN,
    fill: 'text_hight_light',
    stroke: 'none',
    key: 'setting-domain',
    rules: [NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    Icon: UngroupOutlined,
    title: 'external:apiManager.title',
    pathName: RoutesName.API_MANAGER_CONFIGURATION,
    fill: 'text_hight_light',
    stroke: 'none',
    key: 'external',
    rules: [NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    Icon: KeyOutlined,
    title: 'setting_password_plan',
    pathName: RoutesName.SETTING_PASSWORD_PLAN,
    fill: 'text_hight_light',
    stroke: 'none',
    key: 'setting-password-plan',
    rules: [NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN]
  },
  {
    Icon: ICON_PROJECT_LIST,
    title: 'project_list',
    pathName: RoutesName.PROJECT_LIST,
    fill: 'text_hight_light',
    stroke: 'none',
    key: 'project-list',
    rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    Icon: TagsOutlined,
    title: 'tag_management',
    pathName: RoutesName.TAG_MANAGEMENT,
    fill: 'none',
    stroke: 'text_hight_light',
    key: 'tag-management',
    rules: [COMPANY_ADMIN, NISSHOKEN_SUPER_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  }
  // Temporary hide for release 13/12/2021
  // {
  //   Icon: ICON_SETTING_MENU,
  //   title: 'settings',
  //   pathName: RoutesName.SETTINGS,
  //   fill: 'text_hight_light',
  //   stroke: 'none',
  //   key: 'site-settings',
  //   rules: [NISSHOKEN_SUPER_ADMIN, COMPANY_ADMIN]
  // }
]
