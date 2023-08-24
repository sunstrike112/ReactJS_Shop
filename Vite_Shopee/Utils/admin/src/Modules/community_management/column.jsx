import React from 'react'
import { Popover, Tag } from 'antd'
import { TooltipCustom } from 'Components'
import { USER_ROLE } from 'Constants/auth'
import { formatDate } from 'Utils'
import { Column } from 'Constants'

export default ({ t, pagination, history, RoutesName }) => {
  const column = [
    {
      title: t('creator'),
      dataIndex: 'creator',
      key: 'creator',
      width: 200,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('title'),
      dataIndex: 'title',
      key: 'title',
      width: 300,
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
      title: t('description'),
      key: 'description',
      dataIndex: 'description',
      width: 300,
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
      dataIndex: 'lstDepartmentName',
      key: 'lstDepartmentName',
      width: 200,
      render: (text, record) => (record.lstDepartmentName ? (
        <Popover
          overlayClassName="group-popover"
          content={record.lstDepartmentName.map((item) => (
            <Tag>{item}</Tag>
          ))}
        >
          {record.lstDepartmentName.map((item, index) => index < 3 && (
          <Tag className="truncate">{item}</Tag>
          ))}
        </Popover>
      ) : ''),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('attribute'),
      dataIndex: 'lstAttributeName',
      key: 'lstAttributeName',
      width: 200,
      render: (text, record) => (record.lstAttributeName ? (
        <Popover
          overlayClassName="attribute-popover"
          content={record.lstAttributeName.map((item) => (
            <Tag>{item}</Tag>
          ))}
        >
          {record.lstAttributeName.map((item, index) => index < 3 && (
          <Tag className="truncate">{item}</Tag>
          ))}
        </Popover>
      ) : ''),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('tag'),
      dataIndex: 'totalComment',
      key: 'totalComment',
      width: 150,
      render: (text, record) => (record.lstTagName ? (
        <Popover
          overlayClassName="attribute-popover"
          content={record.lstTagName.map((item) => (
            <Tag>{item}</Tag>
          ))}
        >
          {record.lstTagName.map((item, index) => index < 3 && (
          <Tag className="truncate">{item}</Tag>
          ))}
        </Popover>
      ) : ''),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('common:status'),
      dataIndex: 'enabled',
      key: 'enabled',
      width: 150,
      render: (status) => (status ? t('common:enable') : t('common:disabled')),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('total_commnent'),
      dataIndex: 'totalComment',
      key: 'totalComment',
      width: 150,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('total_like'),
      dataIndex: 'totalLike',
      key: 'totalLike',
      width: 150,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('total_dislike'),
      dataIndex: 'totalDislike',
      key: 'totalDislike',
      width: 150,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('total_complete'),
      dataIndex: 'totalComplete',
      key: 'totalComplete',
      width: 160,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('created_date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (date) => formatDate(date),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    }
  ]

  const onEdit = (record) => history.push(`${RoutesName.EDIT_TALKBOARD}/${record.id}`)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onEdit,
      rulesOrder: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN],
      rulesAction: [USER_ROLE.COMPANY_ADMIN]
    }),
    ...column
  ]
}
