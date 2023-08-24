import React from 'react'

import { USER_ROLE } from 'Constants/auth'
import { formatMoney, formatOption } from 'Utils'
import { PAID_COURSE_OPTION_TEXT } from 'Constants/course'

export default ({ t, pagination }) => [
  {
    title: 'No.',
    dataIndex: 'courseId',
    key: 'courseId',
    width: 60,
    align: 'right',
    render: (text, record, index) => (
      <div>{(pagination.page - 1) * pagination.limit + index + 1}</div>
    ),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('batch_register_user.result.login_id'),
    dataIndex: 'courseName',
    key: 'courseName',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('batch_register_user.result.name'),
    dataIndex: 'courseCategoryName',
    key: 'courseCategoryName',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('batch_register_user.result.group'),
    dataIndex: 'typeCourse',
    key: 'typeCourse',
    width: 100,
    render: (text) => t(formatOption(text, PAID_COURSE_OPTION_TEXT)),
    rules: [USER_ROLE.NISSHOKEN_ADMIN]
  },
  {
    title: t('batch_register_user.result.latest_login'),
    dataIndex: 'price',
    key: 'price',
    render: (text) => formatMoney(text),
    rules: [USER_ROLE.NISSHOKEN_ADMIN]
  }
]
