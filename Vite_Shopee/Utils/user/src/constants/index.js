export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL
export const ADMIN_URL = process.env.REACT_APP_ADMIN_URL
export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount'
export const DAEMON = '@@saga-injector/daemon'
export const S3_DOMAIN = process.env.REACT_APP_S3_DOMAIN
export const S3_PDF_DOMAIN = process.env.REACT_APP_S3_DOMAIN_PDF
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount'

export const PDF_DEV = 'elearning-pdf-to-image-dev'
export const PDF_STG = 'elearning-pdf-to-image-stg'
export const PDF_PROD = 'elearning-pdf-to-image-prod'

export * from './talk__board'
export * from './initDisplay'
export * from './youtube'
export * from './routes'
export * from './dailyReport'
export * from './courseList'
export * from './auth'

export const QUESTION_TYPE = {
  CHOOSE_MANY: 'CHOOSE_MANY',
  SELECT_ONE: 'SELECT_ONE',
  DESCRIPTION: 'DESCRIPTION'
}

export const LESSON_DETAIL_TYPE = {
  VIDEO: 'VIDEO',
  PPT: 'PPT',
  PDF: 'PDF',
  IMAGE: 'IMAGE'
}
export const LESSON_STATUS_COMPLETE = {
  COMPLETED: 'COMPLETED',
  UNCOMPLETED: 'UNCOMPLETED',
  SUBMITTED: 'SUBMITTED',
  RESUBMITTED: 'RESUBMITTED',
  EVALUATION_COMPLETED: 'EVALUATION_COMPLETED',
  NEW: 'NEW',
  WAITING_FOR_RELEASE: 'WAITING_FOR_RELEASE'
}

export const LESSON_TYPE = {
  REPORT: 'REPORT',
  SURVEY: 'SURVEY',
  TEST: 'TEST',
  LESSON: 'LESSON',
  EXTERNAL: 'EXTERNAL',
  PPT: 'PPT',
  PDF: 'PDF',
  VIDEO: 'VIDEO',
  IMAGE: 'IMAGE'
}

export const USER_ROLE = {
  INDIVIDUAL_USER: 'INDIVIDUAL_USER',
  COMPANY_EMPLOYEE: 'COMPANY_EMPLOYEE',
  COMPANY_ADMIN: 'COMPANY_ADMIN',
  SUB_ADMINISTRATOR: 'SUB_ADMINISTRATOR',
  NISSHOKEN_ADMIN: 'NISSHOKEN_ADMIN',
  NISSHOKEN_SUPER_ADMIN: 'NISSHOKEN_SUPER_ADMIN',
  COURSE_ADMIN: 'COURSE_ADMIN',
  APPROVAL_MANAGEMENT: 'APPROVAL_MANAGEMENT'
}

export const REPORT_STATUS = {
  NEW: 'NEW',
  SUBMITTED: 'SUBMITTED',
  WAITING_FOR_RELEASE: 'WAITING_FOR_RELEASE',
  RESUBMITTED: 'RESUBMITTED',
  EVALUATION_COMPLETED: 'EVALUATION_COMPLETED'
}

export const TYPE_REGISTER = {
  INDIVIDUAL: 'INDIVIDUAL',
  COMPANY: 'COMPANY',
  EMPLOYEE: 'EMPLOYEE'
}

export const SIGNAL_TYPE = {
  LOGOUT: 1
}

export const CONFIG = {
  INTRODUCE_MAX_LENGTH: 2000
}

export const PAGE_404 = '/page-not-found'

export const COMPANY_NAME_JP = {
  COMPANY: 'ジョブナビ',
  NISSOKEN: 'ジョブナレ'
}

export const COURSE_TYPE = {
  COMPANY: 'COMPANY',
  NISSOKEN: 'NISSOKEN'
}

export const TabsName = {
  PAID_COURSE: 'PAID_COURSE',
  FREE_COURSE: 'FREE_COURSE',
  COMPANY_COURSE: 'COMPANY_COURSE',
  NISSOKEN_COURSE: 'NISSOKEN_COURSE',
  NEW_COURSE: 'NEW_COURSE'
}

export const ERROR_MESSAGE_API = [
  'ERROR_EMAIL_ALREADY_EXIST',
  'ERROR_DOMAIN_EMAIL_ALREADY_EXIST',
  'ERROR_TALK_BOARD_NOT_FOUND',
  'ERROR_TAG_ALREADY_EXISTS',
  'ERROR_COMPANY_NOT_FOUND',
  'ERROR_CAN_NOT_ACCESS_COURSE',
  'DAILY_REPORT_NOT_FOUND',
  'ERROR_EXISTED_SIGNIN_ID'
]

export const ERROR_API = {
  'ERROR_CAN_NOT_ACCESS_COURSE': 'ERROR_CAN_NOT_ACCESS_COURSE'
}

export const TYPE_PATH_LESSON = {
  'DEFAULT': 'DEFAULT',
  'YOUTUBE': 'YOUTUBE',
  'EXTERNAL': 'EXTERNAL'
}

export const VIDEO_COMPLETE_TIME = 8
export const VIDEO_WATCH_TIME = 0.8

export const MY_PAGE_TABS = {
  COMPANY_COURSE: 'COMPANY_COURSE',
  NISSOKEN_COURSE: 'NISSOKEN_COURSE',
  REQUIRED_COURSE: 'REQUIRED_COURSE'
}

export const QUERY = {
  WORKSPACE_ID: 'workspaceid',
  FROM_TAB: 'fromTab'
}

export const USER_WORKSPACE_ROLE = {
  COMPANY_ADMIN: 0,
  WORKSPACE_ADMIN: 1,
  VIRTUAL_COMPANY: 2
}

export const SORT_TYPE = {
  DESC: 'DESC',
  ASC: 'ASC'
}

export const TALK_BOARD_SORT = [
  {
    key: 1,
    value: SORT_TYPE.DESC,
    label: 'newest'
  },
  {
    key: 2,
    value: SORT_TYPE.ASC,
    label: 'oldest'
  }
]

export const SORTS_ORDER = [
  {
    key: 1,
    value: SORT_TYPE.ASC,
    label: 'oldest'
  },
  {
    key: 2,
    value: SORT_TYPE.DESC,
    label: 'newest'
  }
]

export const DEFAULT_PAG = { page: 1, pages: 1, limit: 20, total: 0 }

export const DEFAULT_LIMIT_COURSE_LIST = 12

export const NOT_AVAILABLE = 'N/A'
