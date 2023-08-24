import React from 'react'

import { USER_ROLE } from 'Constants/auth'

export default ({ t }) => [
  {
    title: 'No.',
    dataIndex: 'userId',
    key: 'userId',
    width: 60,
    align: 'right',
    render: (text, record, index) => (
      <div>{index + 1}</div>
    ),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('group_of_user.login_id'),
    dataIndex: 'signinId',
    key: 'signinId',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('group_of_user.name'),
    dataIndex: 'fullname',
    key: 'fullname',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('group_of_user.group'),
    dataIndex: 'departmentName',
    key: 'departmentName',
    width: 250,
    render: (text, record) => (
      <div>{record.departmentDto.map((item, idx) => (<span key={idx}>{idx === record.departmentDto.length - 1 ? item.departmentName : `${item.departmentName}, `}</span>))}</div>
    ),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  }
]
