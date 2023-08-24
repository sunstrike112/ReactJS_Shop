import { Column, USER_ROLE } from 'Constants'
import { CheckOutlined } from '@ant-design/icons'
import { FORMAT_TIME } from 'Constants/formatTime'
import { formatDate } from 'Utils'
import { TooltipCustom } from 'Components'
import React from 'react'
import { RoutesName } from 'Modules/notification/routes'

export default ({ t, pagination, history, isSuperAdmin, isAdmin, isCompany }) => {
  const column = [
    {
      title: t('management.title_text'),
      dataIndex: 'title',
      key: 'title',
      width: 300,
      render: (text) => (
        <TooltipCustom
          text={text}
          title={text}
          isOneLine
        />
      )
    },
    (isSuperAdmin || isAdmin) ? {
      title: t('management.company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      width: 250
    } : null,
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      width: 200
    },
    {
      title: t('management.poster'),
      dataIndex: 'notificationPoster',
      key: 'notificationPoster',
      width: 200
    },
    {
      title: t('management.recipients'),
      dataIndex: 'numberOfUser',
      key: 'numberOfUser',
      width: 150
    },
    (isSuperAdmin || isCompany) ? {
      title: t('post.create.push'),
      dataIndex: 'sendNotification',
      key: 'sendNotification',
      width: 100,
      align: 'center',
      render: (sendNotification) => (sendNotification === 1 ? <CheckOutlined /> : <>-</>)
    } : null,
    {
      title: t('management.new_status'),
      dataIndex: '',
      key: '',
      width: 200,
      render: (action) => t(`management.${action?.newsStatus}`)
    },
    {
      title: t('management.public_date'),
      dataIndex: '',
      key: '',
      width: 200,
      render: (action) => (action?.publicationEnd
        ? `${formatDate(new Date(action?.publicationStart), FORMAT_TIME.DATE_HOUR_MINUTES_SECOND)} ~ ${formatDate(new Date(action?.publicationEnd), FORMAT_TIME.DATE_HOUR_MINUTES_SECOND)}`
        : `${formatDate(new Date(action?.publicationStart), FORMAT_TIME.DATE_HOUR_MINUTES_SECOND)}`)
    }
  ]

  const onView = (record) => {
    history.push(`${RoutesName.NOTIFY_DETAIL}/${record?.id}`)
  }

  const onEdit = (record) => {
    history.push(`${RoutesName.EDIT_NOTIFI}/${record?.id}`)
  }

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView,
      onEdit,
      verifyView: (record) => ((!([USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record?.created))
        || record.courseId !== null || record.talkboardId !== null)),
      verifyEdit: (record) => record.editable === 1 && record.sent === false,
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
    }),
    ...column
  ]
}
