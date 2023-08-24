import React from 'react'

import { TooltipCustom } from 'Components'
import { USER_ROLE } from 'Constants/auth'
import { formatDateShort } from 'Utils'
import { Column } from 'Constants'
import { RoutesName } from '../routes'

export default ({ t, sortInfo, pagination, history }) => {
  const column = [
    {
      title: t('views'),
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 100,
      render: (viewCount) => viewCount,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },

    {
      title: t('name'),
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
      width: 150,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'userName' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('group'),
      dataIndex: 'groupName',
      key: 'groupName',
      ellipsis: true,
      width: 250,
      render: (listGroup) => (<TooltipCustom text={(listGroup?.length > 0 ? listGroup.join(', ') : '')} title={(listGroup?.length > 0 ? listGroup.join(', ') : '')} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('course'),
      dataIndex: 'courseName',
      key: 'courseName',
      ellipsis: true,
      width: 250,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'courseName' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('company:company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      ellipsis: true,
      width: 200,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      width: 250,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'email' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      ellipsis: true,
      width: 250,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'signinId' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('unit'),
      dataIndex: 'unitName',
      key: 'unitName',
      ellipsis: { showTitle: false },
      width: 250,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'unitName' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('learning_start_date_and_time'),
      dataIndex: 'actualStartTime',
      key: 'actualStartTime',
      ellipsis: true,
      width: 250,
      render: (text) => (<TooltipCustom text={(text !== 0 ? formatDateShort(text) : '')} title={(text !== 0 ? formatDateShort(text) : '')} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('completion_date_and_time'),
      dataIndex: 'actualCompleteTime',
      key: 'actualCompleteTime',
      ellipsis: true,
      width: 250,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'actualCompleteTime' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={(text !== 0 ? formatDateShort(text) : '')} title={(text !== 0 ? formatDateShort(text) : '')} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('unit_completation_status'),
      dataIndex: 'complete',
      key: 'complete',
      ellipsis: true,
      width: 250,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'complete' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={t(text.toLowerCase())} title={t(text.toLowerCase())} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }
  ]

  const onView = (record) => {
    history.push(`${RoutesName.UNIT_VIEW_HISTORY}?courseId=${record.courseId}&userId=${record.userId}&unitId=${record.unitId}`)
  }

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView,
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }),
    ...column
  ]
}
