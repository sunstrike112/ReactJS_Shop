import React from 'react'

import { USER_ROLE } from 'Constants/auth'
import { TooltipCustom } from 'Components'
import { Column } from 'Constants'

export default ({ t, pagination, action: { openModal } }) => {
  const column = [
    {
      title: t('course'),
      dataIndex: 'courseName',
      key: 'courseName',
      ellipsis: true,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('unit'),
      dataIndex: 'surveyName',
      key: 'surveyName',
      width: 400,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('number_request'),
      dataIndex: 'numberOfUserRequested',
      key: 'numberOfUserRequested',
      width: 210,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('number_response'),
      dataIndex: 'numberOfUserResponded',
      key: 'numberOfUserResponded',
      width: 220,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }
  ]

  const onView = (record) => openModal(record)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView,
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }),
    ...column
  ]
}
