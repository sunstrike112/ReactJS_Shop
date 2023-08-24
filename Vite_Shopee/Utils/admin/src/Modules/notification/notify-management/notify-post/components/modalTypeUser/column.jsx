import { Popover, Tag } from 'antd'
import { Column } from 'Constants'
import React from 'react'

export default ({ t, pagination, isSuperAdmin, isAdmin }) => {
  const column = [
    {
      title: t('post.loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      width: 250
    },
    (isSuperAdmin || isAdmin) && {
      title: t('user:management.company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      width: 200
    },
    {
      title: t('post.name'),
      dataIndex: 'name',
      key: 'name',
      width: 200
    },
    {
      title: t('post.group'),
      dataIndex: 'departmentName',
      key: 'departmentName',
      width: 200,
      render: (groups) => (groups ? (
        <Popover
          overlayClassName="group-popover"
          content={groups.map((group) => (
            <Tag>{group}</Tag>
          ))}
        >
          {groups.map((group, index) => index < 3 && (
            <Tag className="truncate">{group}</Tag>
          ))}
        </Popover>
      ) : '')
    }
  ]
  return [
    ...Column.order({
      pagination
    }),
    ...column
  ]
}
