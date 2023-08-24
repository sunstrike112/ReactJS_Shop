import { VALUE_INIT_MENUS, VALUE_INIT_TABS } from './initDisplay'

export const MENU_INIT = [
  { value: VALUE_INIT_MENUS.TOP_PAGE, label: 'common:top_page' },
  { value: VALUE_INIT_MENUS.MY_PAGE, label: 'common:my_page' }
]

export const TAB_INIT = {
  TOP_PAGE: [
    { value: VALUE_INIT_TABS.COMPANY, label: 'common:job_nav' },
    { value: VALUE_INIT_TABS.NISSOKEN, label: 'common:job_nare' },
    { value: VALUE_INIT_TABS.COURSE_NEW, label: 'common:COURSE_NEW' }
  ],
  MY_PAGE: [
    { value: VALUE_INIT_TABS.COMPANY, label: 'common:job_nav' },
    { value: VALUE_INIT_TABS.NISSOKEN, label: 'common:job_nare' },
    { value: VALUE_INIT_TABS.REQUIRED, label: 'common:label_required' }
  ]
}

export const ID_NISSOKEN_COMPANY = 1

export const PLAN_TYPE = {
  PLAN_USER: 'PLAN_USER',
  PLAN_DATA: 'PLAN_DATA'
}
