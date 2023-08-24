import vi from 'antd/lib/locale/vi_VN'
import jp from 'antd/lib/locale/ja_JP'
import en from 'antd/lib/locale/en_US'

export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL
export const DOWNLOAD_CSV = process.env.REACT_APP_DOWNLOAD_CSV
export const S3_DOMAIN = process.env.REACT_APP_S3_DOMAIN
export const S3_PDF_DOMAIN = process.env.REACT_APP_S3_DOMAIN_PDF
export const USER_URL = process.env.REACT_APP_USER_URL
export const ROBOT_PAYMENT_STORE_ID = process.env.REACT_APP_ROBOT_PAYMENT_STORE_ID
export const S3_BUCKET_NAME = process.env.REACT_APP_S3_BUCKET_NAME
export const S3_BUCKET_PDF_NAME = process.env.REACT_APP_S3_BUCKET_PDF_NAME

export const PDF_DEV = 'elearning-pdf-to-image-dev'
export const PDF_STG = 'elearning-pdf-to-image-stg'
export const PDF_PROD = 'elearning-pdf-to-image-prod'

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount'
export const DAEMON = '@@saga-injector/daemon'
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount'

export * from './user'
export * from './setting_password_plan'
export * from './query'
export * from './auth'
export * from './upload_file'
export * from './column'
export * from './myCompany'
export * from './course'
export * from './initDisplay'
export * from './string'
export * from './validation'
export * from './formatTime'
export * from './company'

export const ANTD_UPLOAD_STATUS = {
  UPLOADING: 'uploading',
  DONE: 'done'
}

export const TABLE_CHANGE_ACTION = {
  PAGING: 'paginate',
  FILTER: 'filter',
  SORT: 'sort'
}

export const SIGNAL_TYPE = {
  LOGOUT: 1
}

export const KEY_TYPE = {
  ENTER: 'Enter'
}

export const ANTD_ORDER_TO_API_FIELD = {
  descend: 'DESC',
  ascend: 'ASC'
}

export const LOCALES = {
  vi,
  jp,
  en
}

export const COURSE_TYPE = {
  NISSOKEN: 'NISSOKEN',
  COMPANY: 'COMPANY'
}

export const LABEL_TYPES = {
  REQUIRED: 'Required',
  OPTIONAL: 'Optional'
}

export const STATUS_UPLOAD = {
  ACTIVE: 'ACTIVE',
  PROCESSING: 'PROCESSING',
  FAILED: 'FAILED',
  FAIL: 'FAIL' // BE side add this field
}

export const NOT_FOUND_VALUE = '-'
export const NOT_AVAILABLE = 'N/A'
