/* eslint-disable no-unused-vars */
import React from 'react'
import { TooltipCustom } from 'Components'
import { Column, USER_ROLE } from 'Constants'
import { formatDate } from 'Utils'
import { Popover, Tag } from 'antd'

export default ({ t, pagination }) => {
  const column = [
    {
      title: t('common:loginId'),
      dataIndex: 'userDTO',
      key: 'userDTO',
      width: 250,
      render: (userDTO) => (
        userDTO.signinId
      ),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('creator'),
      dataIndex: 'userDTO',
      key: 'fullName',
      width: 300,
      render: (userDTO) => (
        userDTO.fullName
      ),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('title'),
      dataIndex: 'talkBoardName',
      key: 'talkBoardName',
      width: 300,
      ellipsis: true,
      render: (text) => (
        <TooltipCustom
          text={text}
          title={text}
          isOneLine
        />
      ),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('group'),
      dataIndex: 'departments',
      key: 'departments',
      width: 200,
      render: (text, record) => (record.departments ? (
        <Popover
          overlayClassName="group-popover"
          content={record.departments.map((item) => (
            <Tag key={record.id}>{item}</Tag>
          ))}
        >
          {record.departments.map((item, index) => index < 3 && (
          <Tag className="truncate" key={record.id}>{item}</Tag>
          ))}
        </Popover>
      ) : ''),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('attribute'),
      dataIndex: 'attributes',
      key: 'attributes',
      width: 200,
      render: (text, record) => (record.attributes ? (
        <Popover
          overlayClassName="attribute-popover"
          content={record.attributes.map((item) => (
            <Tag key={record.id}>{item}</Tag>
          ))}
        >
          {record.attributes.map((item, index) => index < 3 && (
          <Tag className="truncate" key={record.id}>{item}</Tag>
          ))}
        </Popover>
      ) : ''),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('comment'),
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      width: 300,
      render: (content) => (
        <TooltipCustom
          text={content}
          title={content}
          isOneLine
        />
      ),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('created_date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (date) => formatDate(date),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('comment_status'),
      dataIndex: 'hide',
      key: 'hide',
      width: 100,
      render: (hide) => {
        if (hide === 0) {
          return t('show')
        }
        return t('hide')
      },
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('like'),
      dataIndex: 'totalLike',
      key: 'totalLike',
      width: 200,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('dislike'),
      dataIndex: 'totalDislike',
      key: 'totalDislike',
      width: 200,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    }
  ]
  return [
    ...Column.order({
      pagination,
      rulesOrder: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    }),
    ...column
  ]
}
