import React from 'react'
import { Tag } from 'antd'

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
    title: t('attribute_of_user.login_id'),
    dataIndex: 'signinId',
    key: 'signinId',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('attribute_of_user.name'),
    dataIndex: 'fullname',
    key: 'fullname',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('attribute_of_user.attribute'),
    dataIndex: 'attributeDto',
    key: 'attributeDto',
    width: 100,
    render: (attributeDto) => (
      <div>
        {attributeDto?.map((item) => (
          <Tag>{item.attributeName}</Tag>
        ))}
      </div>
    ),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  }
]
