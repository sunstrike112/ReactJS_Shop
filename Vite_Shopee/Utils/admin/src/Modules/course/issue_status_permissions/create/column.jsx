import React from 'react'
import { Checkbox, Popover, Tag } from 'antd'
import { Column } from 'Constants'
import { USER_ROLE } from 'Constants/auth'

export default ({ t, pagination, handleSetRequestPassword }) => {
  const column = [
    {
      title: t('common.email'),
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      width: 250,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      ellipsis: true,
      width: 250,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.name'),
      dataIndex: 'fullName',
      key: 'fullName',
      ellipsis: true,
      width: 150,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.group'),
      dataIndex: 'groupName',
      key: 'groupName',
      ellipsis: true,
      width: 100,
      render: (record) => (
        <Popover
          overlayClassName="group-popover"
          content={record.map((item, index) => (
            <Tag key={index}>{item}</Tag>
          ))}
        >
          {record.map((item, index) => index < 3 && (
            <Tag className="truncate" key={index}>{item}</Tag>
          ))}
        </Popover>
      ),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.course'),
      dataIndex: 'listCourseNames',
      key: 'listCourseNames',
      ellipsis: true,
      width: 300,
      render: (text) => text?.join(', '),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.request_password'),
      dataIndex: '',
      key: '',
      align: 'center',
      width: 100,
      render: ({ userId }) => <Checkbox onChange={(e) => handleSetRequestPassword(e, userId)} />,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    }
  ]

  return [
    ...Column.order({
      pagination,
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    }),
    ...column
  ]
}
