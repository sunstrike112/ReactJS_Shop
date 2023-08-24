import React from 'react'
import { USER_ROLE } from 'Constants/auth'
import { formatDate } from 'Utils'
import { FORMAT_TIME } from 'Constants/formatTime'

export default ({ t }) => [
  {
    title: 'No.',
    dataIndex: 'courseId',
    key: 'courseId',
    width: 60,
    align: 'right',
    render: (text, record, index) => (
      <div>{index + 1}</div>
    ),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('user_learn_history.course_name'),
    dataIndex: 'courseName',
    key: 'courseName',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('user_learn_history.unit_name'),
    dataIndex: 'courseCategoryName',
    key: 'courseCategoryName',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('user_learn_history.view_time'),
    dataIndex: 'lastJoinTime',
    key: 'lastJoinTime',
    width: 220,
    render: (text) => (
      <div>{formatDate(text, FORMAT_TIME.DATE_HOUR_MINUTES_SECOND)}</div>
    ),
    rules: [USER_ROLE.NISSHOKEN_ADMIN]
  }
]
