import React from 'react'
import { Progress } from 'antd'

import { USER_ROLE } from 'Constants/auth'
import { formatDate } from 'Utils'

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
    title: t('user_learn_status.login_id'),
    dataIndex: 'email',
    key: 'email',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('user_learn_status.course_name'),
    dataIndex: 'courseName',
    key: 'courseName',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('user_learn_status.progress'),
    dataIndex: 'courseProgress',
    key: 'courseProgress',
    width: 200,
    render: (text) => <Progress percent={text} />,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('user_learn_status.latest_attend'),
    dataIndex: 'lastJoinTime',
    key: 'lastJoinTime',
    render: (text) => formatDate(text),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('user_learn_status.completion_time'),
    dataIndex: 'completeTime',
    key: 'completeTime',
    render: (text) => formatDate(text),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  }
]
