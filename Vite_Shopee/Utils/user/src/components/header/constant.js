import {
  ICON_EDIT_PROFILE,
  EN_ICON,
  VI_ICON,
  ICON_SETTING_PROFILE,
  ICON_PROFILE,
  ICON_LOGOUT_PROFLE,
  JA_ICON
} from '../../assets'
import { USER_ROLE } from '../../constants'

export const SETTING_PROFILE = [
  {
    value: '0',
    name: 'common.header.profile',
    src: ICON_PROFILE,
    srcActive: ICON_PROFILE,
    getPath: '/profile',
    rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.COURSE_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.INDIVIDUAL_USER, USER_ROLE.NISSHOKEN_ADMIN]
  },
  {
    value: '1',
    name: 'common.header.edit_profile',
    src: ICON_EDIT_PROFILE,
    getPath: '/profile/edit',
    rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.COURSE_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.INDIVIDUAL_USER, USER_ROLE.NISSHOKEN_ADMIN]
  },
  {
    value: '2',
    name: 'common.header.setting',
    src: ICON_SETTING_PROFILE,
    getPath: '/management',
    rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.COURSE_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.NISSHOKEN_ADMIN]
  },
  {
    value: '3',
    name: 'common.header.logout',
    src: ICON_LOGOUT_PROFLE,
    getPath: '/auth/login',
    rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.COURSE_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COMPANY_EMPLOYEE, USER_ROLE.INDIVIDUAL_USER, USER_ROLE.NISSHOKEN_ADMIN]
  }
]

export const LANGUAGE = [
  {
    value: 'jp',
    name: '日本語',
    src: JA_ICON
  },
  {
    value: 'vi',
    name: 'Tiếng Việt',
    src: VI_ICON
  },
  {
    value: 'en',
    name: 'English',
    src: EN_ICON
  }
]
