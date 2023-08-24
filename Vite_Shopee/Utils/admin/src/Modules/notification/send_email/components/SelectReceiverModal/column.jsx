import React from 'react'
import { Tag, Popover } from 'antd'
import { USER_ROLE } from 'Constants/auth'
import { Column } from 'Constants'

export default ({ t, pagination, sortInfo }) => {
  const column = [
    {
      title: t('common:email'),
      dataIndex: 'email',
      key: 'loginId',
      sorter: true,
      sortOrder: sortInfo?.field === 'loginId' && sortInfo?.order,
      ellipsis: true,
      width: 300,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      sorter: true,
      sortOrder: sortInfo?.field === 'signinId' && sortInfo?.order,
      ellipsis: true,
      width: 300,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('company:company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      ellipsis: true,
      width: 150,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('issue_permission:select_user.name'),
      dataIndex: 'fullName',
      key: 'fullname',
      sorter: true,
      sortOrder: sortInfo?.field === 'fullname' && sortInfo?.order,
      ellipsis: true,
      width: 250,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('issue_permission:common.group'),
      dataIndex: 'groupName',
      key: 'groupName',
      ellipsis: true,
      width: 150,
      render: (text, record) => (record.groupName ? (
        <Popover
          overlayClassName="group-popover"
          content={record.groupName.map((item) => (
            <Tag>{item}</Tag>
          ))}
        >
          {record.groupName.map((item, index) => index < 3 && (
            <Tag className="truncate">{item}</Tag>
          ))}
        </Popover>
      ) : ''),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }
  ]
  return [
    ...Column.order({
      pagination,
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }),
    ...column
  ]
}
