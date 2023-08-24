import React from 'react'
import { TooltipCustom } from 'Components'
import { USER_ROLE } from 'Constants/auth'
import { Column } from 'Constants'

export default ({ t, pagination }) => {
  const column = [
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
      title: t('creator'),
      dataIndex: 'user',
      key: 'user',
      width: 200,
      render: (text) => (
        <TooltipCustom
          text={text.fullName || ''}
          title={text.fullName || ''}
          isOneLine
        />
      ),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('totalLike'),
      dataIndex: 'totalLike',
      key: 'totalLike',
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
      title: t('totalDislike'),
      dataIndex: 'totalDislike',
      key: 'totalDislike',
      width: 300,
      render: (text) => (
        <TooltipCustom
          text={text}
          title={text}
          isOneLine
        />
      ),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    }
  ]

  return [
    ...Column.order({
      t,
      pagination,
      rulesOrder: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    }),
    ...column
  ]
}
