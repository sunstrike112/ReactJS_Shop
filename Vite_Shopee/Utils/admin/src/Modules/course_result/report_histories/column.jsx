import React from 'react'

import { TooltipCustom } from 'Components'
import { USER_ROLE } from 'Constants/auth'
import { formatDate } from 'Utils'
import { Column } from 'Constants'
import { Popover, Tag } from 'antd'

export default ({ t, sortInfor, pagination, action: { evaluation }, isSuperAdmin }) => {
  const column = [
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      ellipsis: true,
      key: 'signinId',
      width: 300,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('email'),
      dataIndex: 'email',
      ellipsis: true,
      key: 'email',
      width: 300,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('name'),
      dataIndex: 'userName',
      key: 'userName',
      width: 200,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      ellipsis: true,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('group'),
      dataIndex: 'groupName',
      ellipsis: true,
      key: 'groupName',
      width: 200,
      render: (listGroup) => (
        <Popover
          overlayClassName="group-popover"
          content={listGroup.map((item, index) => (
            <Tag key={index}>{item}</Tag>
          ))}
        >
          {listGroup.map((item, index) => index < 3 && (
          <Tag className="truncate" key={index}>{item}</Tag>
          ))}
        </Popover>
      ),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('course'),
      dataIndex: 'courseName',
      key: 'courseName',
      ellipsis: true,
      width: 200,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('unit'),
      dataIndex: 'reportName',
      key: 'reportName',
      ellipsis: true,
      width: 200,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('evaluation_status'),
      dataIndex: 'evaluationStatus',
      key: 'evaluationStatus',
      width: 200,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={t(text.toLowerCase())} title={t(text.toLowerCase())} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('complete_status'),
      dataIndex: 'submissionStatus',
      key: 'submissionStatus',
      width: 200,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={t(text.toLowerCase())} title={t(text.toLowerCase())} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('submission_date'),
      dataIndex: 'submissionTime',
      key: 'submissionTime',
      width: 250,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={(text !== 0 ? `${formatDate(text)}` : '')} title={(text !== 0 ? `${formatDate(text)}` : '')} />),
      sorter: true,
      sortOrder: sortInfor?.columnKey === 'submissionTime' && sortInfor?.order,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('evaluation_date'),
      dataIndex: 'evaluationTime',
      key: 'evaluationTime',
      render: (text) => (<TooltipCustom text={(text !== 0 ? `${formatDate(text)}` : '')} title={(text !== 0 ? `${formatDate(text)}` : '')} />),
      sorter: true,
      sortOrder: sortInfor?.columnKey === 'evaluationTime' && sortInfor?.order,
      ellipsis: true,
      width: 250,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }
  ]

  const onView = (record) => evaluation(record)
  const onEdit = (record) => evaluation(record)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView,
      onEdit,
      verifyView: (record) => isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record?.created),
      verifyEdit: (record) => !(isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record?.created)),
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }),
    ...column
  ]
}
