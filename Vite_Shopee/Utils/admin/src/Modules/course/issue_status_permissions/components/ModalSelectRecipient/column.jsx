import { USER_ROLE } from 'Constants/auth'
import { Popover, Tag } from 'antd'
import React from 'react'

export default ({ t, pagination }) => [
  {
    title: 'No.',
    dataIndex: 'userId',
    key: 'userId',
    width: 60,
    align: 'right',
    render: (text, record, index) => (
      <div>{(pagination?.page - 1) * pagination?.limit + index + 1}</div>
    ),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  },
  {
    title: t('common.email'),
    dataIndex: 'email',
    key: 'email',
    width: 250,
    ellipsis: true,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  },
  {
    title: t('common:loginId'),
    dataIndex: 'signinId',
    key: 'signinId',
    width: 250,
    ellipsis: true,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  },
  {
    title: t('common.name'),
    dataIndex: 'fullName',
    key: 'fullName',
    width: 150,
    ellipsis: true,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  },
  {
    title: t('common.group'),
    dataIndex: 'groupName',
    key: 'groupName',
    ellipsis: true,
    render: (record) => (
      <Popover
        overlayClassName="group-popover"
        content={record?.map((item, index) => (
          <Tag key={index}>{item}</Tag>
        ))}
      >
        {record?.map((item, index) => index < 3 && (
        <Tag className="truncate" key={index}>{item}</Tag>
        ))}
      </Popover>
    ),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  }
]
