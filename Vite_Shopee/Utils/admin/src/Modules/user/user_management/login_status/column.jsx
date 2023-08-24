import React from 'react'

import { USER_ROLE } from 'Constants/auth'

export default ({ t, isSuperAdmin }) => [
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
    title: t('user:management.email'),
    dataIndex: 'loginId',
    key: 'loginId',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('common:loginId'),
    dataIndex: 'signinId',
    key: 'signinId',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('login_status.name'),
    dataIndex: 'fullname',
    key: 'fullname',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  isSuperAdmin ? {
    title: t('management.company_name'),
    dataIndex: 'companyName',
    key: 'companyName',
    width: 250
  } : null,
  {
    title: t('login_status.status'),
    dataIndex: 'statusLogin',
    key: 'statusLogin',
    width: 200,
    render: (text) => t(text),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  }
]
