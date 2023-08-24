export const VALUE_INIT_TABS = {
  COMPANY: 'courseCompany',
  NISSOKEN: 'courseNissoken',
  REQUIRED: 'courseRequired',
  COURSE_NEW: 'courseNew'
}

export const VALUE_INIT_MENUS = {
  TOP_PAGE: 'topPage',
  MY_PAGE: 'myPage'
}

export const initMenuRouteMapping = {
  [VALUE_INIT_MENUS.TOP_PAGE]: 'course-list',
  [VALUE_INIT_MENUS.MY_PAGE]: 'mypage'
}

export const initTabTextMapping = {
  [VALUE_INIT_TABS.COMPANY]: 'COMPANY_COURSE',
  [VALUE_INIT_TABS.NISSOKEN]: 'NISSOKEN_COURSE',
  [VALUE_INIT_TABS.REQUIRED]: 'REQUIRED_COURSE',
  [VALUE_INIT_TABS.COURSE_NEW]: 'NEW_COURSE'
}

export const menuTextMapping = {
  [VALUE_INIT_MENUS.TOP_PAGE]: 'home',
  [VALUE_INIT_MENUS.MY_PAGE]: 'mypage'
}
