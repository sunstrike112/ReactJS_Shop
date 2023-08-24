import React from 'react'
import { TooltipCustom } from 'Components'
import { USER_ROLE } from 'Constants/auth'
import { Column } from 'Constants'
import { FORMAT_TIME } from 'Constants/formatTime'
import moment from 'moment'
import { Popover, Tag } from 'antd'

export default ({ t, pagination, history, RoutesName }) => {
  const column = [
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'author',
      width: 250,
      render: (signInId) => (
        <TooltipCustom
          text={signInId || ''}
          title={signInId || ''}
        />
      ),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('creator'),
      dataIndex: 'author',
      key: 'author',
      width: 200,
      render: (text) => (
        <TooltipCustom
          text={text.firstName || ''}
          title={text.firstName || ''}
          isOneLine
        />
      ),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('title'),
      dataIndex: 'title',
      key: 'title',
      width: 200,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('content'),
      dataIndex: 'content',
      key: 'content',
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
      title: t('template'),
      key: 'templateTitle',
      dataIndex: 'templateTitle',
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
      title: t('companyName'),
      key: 'companyName',
      dataIndex: 'companyName',
      width: 200,
      render: (text) => (
        <TooltipCustom
          text={text}
          title={text}
          isOneLine
        />
      ),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('group'),
      key: 'departments',
      dataIndex: 'departments',
      width: 300,
      render: (departments) => (departments ? (
        <Popover
          overlayClassName="group-popover"
          content={departments?.map((i) => (
            <Tag>{i.name}</Tag>
          ))}
        >
          {departments.map((item, index) => index < 3 && (
            <Tag className="truncate">{item.name}</Tag>
          ))}
        </Popover>
      ) : ''),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('attribute'),
      key: 'attributes',
      dataIndex: 'attributes',
      width: 300,
      render: (attributes) => (attributes ? (
        <Popover
          overlayClassName="group-popover"
          content={attributes?.map((i) => (
            <Tag>{i.name}</Tag>
          ))}
        >
          {attributes.map((item, index) => index < 3 && (
            <Tag className="truncate">{item.name}</Tag>
          ))}
        </Popover>
      ) : ''),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('communityManagement:total_complete'),
      key: 'totalComplete',
      dataIndex: 'totalComplete',
      width: 200,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('totalComment'),
      key: 'totalComment',
      dataIndex: 'totalComment',
      width: 150,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('totalLike'),
      key: 'totalLike',
      dataIndex: 'totalLike',
      width: 150,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('totalDislike'),
      key: 'totalDislike',
      dataIndex: 'totalDislike',
      width: 150,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('created_at'),
      key: 'createdAt',
      dataIndex: 'createdAt',
      width: 200,
      render: (text) => (text ? moment(text).format(FORMAT_TIME.DATE_HOUR_MINUTES) : null),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('is_draft'),
      key: 'isDraft',
      dataIndex: 'isDraft',
      width: 150,
      render: (text) => (text === 0 ? t('no') : t('yes')),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    }
  ]

  const onView = (record) => history.push(`${RoutesName.REPORT_DETAIL}/${record.id}`)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView,
      rulesOrder: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN],
      rulesAction: [USER_ROLE.COMPANY_ADMIN]
    }),
    ...column
  ]
}
