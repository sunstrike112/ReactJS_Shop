import React from 'react'
import { TooltipCustom } from 'Components'
import { USER_ROLE } from 'Constants/auth'
import { Column } from 'Constants'
import moment from 'moment/moment'
import { FORMAT_TIME } from 'Constants/formatTime'

export default ({ t, pagination, history, RoutesName }) => {
  const column = [
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      width: 250,
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
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
      title: t('email'),
      key: 'email',
      dataIndex: 'email',
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
      title: t('createdDate'),
      key: 'createdDate',
      dataIndex: 'createdDate',
      width: 300,
      render: (text) => (text ? moment(text).format(FORMAT_TIME.DATE_HOUR_MINUTES) : null),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    }
  ]

  const onView = (record) => history.push(`${RoutesName.TEMPLATE_DETAIL}/${record.id}`)

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
