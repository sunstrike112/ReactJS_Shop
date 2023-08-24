/* eslint-disable no-unused-vars */
import React from 'react'
import { USER_ROLE } from 'Constants/auth'
import { formatDate } from 'Utils'
import { FORMAT_TIME } from 'Constants/formatTime'
import { Column } from 'Constants'
import { ActionGroup } from './styled'

export default ({ t, pagination, history, RoutesName }) => {
  const column = [
    {
      title: t('management.subject'),
      dataIndex: 'subject',
      width: 200,
      ellipsis: true,
      key: 'subject',
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('management.sender_name'),
      dataIndex: 'senderName',
      key: 'senderName',
      width: 150,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('company:company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      ellipsis: true,
      width: 200,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('management.email_address'),
      dataIndex: 'senderEmailAddress',
      key: 'senderEmailAddress',
      width: 300,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      width: 300,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('management.send_date_and_time'),
      dataIndex: '',
      key: '',
      sorter: true,
      width: 250,
      render: (action) => (
        <ActionGroup>
          {formatDate(new Date(action?.sendTime), FORMAT_TIME.DATE_HOUR_MINUTES_SECOND)}
        </ActionGroup>
      ),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('management.the_number_record'),
      dataIndex: 'numberOfRecordSend',
      key: 'numberOfRecordSend',
      width: 200,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('management.sending_status'),
      dataIndex: '',
      key: '',
      width: 150,
      render: (action) => (
        <ActionGroup>
          {t(`management.${action.sendStatus}`)}
        </ActionGroup>
      ),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }
  ]

  const onView = (record) => history.push(`${RoutesName.EMAIL_DETAIL}/${record?.mailId}`)

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
