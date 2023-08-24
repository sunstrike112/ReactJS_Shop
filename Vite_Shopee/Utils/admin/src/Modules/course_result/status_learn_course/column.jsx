import React from 'react'
import { Popover, Progress, Tag } from 'antd'

import { TooltipCustom } from 'Components'
import { USER_ROLE } from 'Constants/auth'
import { formatDate } from 'Utils'
import { Column } from 'Constants'
import { ReadOutlined } from '@ant-design/icons'

export default ({ t, sortInfo, pagination, onRedirectToUnitResult }) => {
  const column = [
    {
      title: t('name'),
      dataIndex: 'userName',
      key: 'userName',
      width: 200,
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'userName' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('group'),
      dataIndex: 'listGroupName',
      key: 'listGroupName',
      width: 300,
      ellipsis: true,
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
      width: 250,
      ellipsis: true,
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
      title: t('progress'),
      dataIndex: 'courseProgress',
      key: 'courseProgress',
      ellipsis: true,
      width: 150,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'courseProgress' && sortInfo?.order,
      render: (text) => (<Progress percent={text} trailColor="grey" />
      ),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('learning_progress'),
      dataIndex: 'learningProgress',
      key: 'learningProgress',
      ellipsis: true,
      width: 200,
      render: (learningProgress) => (learningProgress === 'UNCOMPLETED' ? t('uncompleted_learn') : t('completed_learn')),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      width: 300,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      width: 300,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('common:employee_number'),
      dataIndex: 'employeeNumber',
      key: 'employeeNumber',
      width: 300,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('course_start'),
      dataIndex: 'startTime',
      key: 'startTime',
      ellipsis: true,
      width: 250,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'startTime' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={(text !== 0 ? `${formatDate(text)}` : '')} title={(text !== 0 ? `${formatDate(text)}` : '')} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('course_end'),
      dataIndex: 'endTime',
      key: 'endTime',
      ellipsis: true,
      width: 250,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'endTime' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={(text !== 0 ? `${formatDate(text)}` : '')} title={(text !== 0 ? `${formatDate(text)}` : '')} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('learning_start_date_and_time'),
      dataIndex: 'actualStartTime',
      key: 'actualStartTime',
      ellipsis: true,
      width: 250,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'actualStartTime' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={(text !== 0 ? `${formatDate(text)}` : '')} title={(text !== 0 ? `${formatDate(text)}` : '')} />),
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
      render: (text) => (<TooltipCustom text={(text !== 0 ? `${formatDate(text)}` : '')} title={(text !== 0 ? `${formatDate(text)}` : '')} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }
  ]

  const moreAction = [
    {
      title: t('go_unit'),
      icon: ReadOutlined,
      onClick: onRedirectToUnitResult
    }
  ]

  return [
    ...Column.orderAction({
      t,
      pagination,
      moreAction,
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }),
    ...column
  ]
}
