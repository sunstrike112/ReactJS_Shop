/* eslint-disable no-unused-vars */
import React from 'react'
import { TooltipCustom } from 'Components'
import { USER_ROLE } from 'Constants/auth'
import { formatDateShort } from 'Utils'
import { Column, UNIT_TYPE_UPPERCASE } from 'Constants'
import { Popover, Tag } from 'antd'

const UNIT_HAS_QUESTION = [UNIT_TYPE_UPPERCASE.REPORT, UNIT_TYPE_UPPERCASE.SURVEY, UNIT_TYPE_UPPERCASE.TEST]

const checkShowAction = (unitType, record) => {
  if (UNIT_HAS_QUESTION.includes(unitType)) {
    if (unitType === 'REPORT') {
      return !record.listReport
    }
    if (unitType === 'SURVEY') {
      return !record.listSurvey
    }
    return !record.listQuestion
  }
  return true
}

export default ({ t, sortInfo, pagination, onSelectQuestions, language }) => {
  const column = [
    {
      title: t('views'),
      dataIndex: 'time',
      align: 'center',
      key: 'time',
      render: (time) => time,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('name'),
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'userName' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('course'),
      dataIndex: 'courseName',
      key: 'courseName',
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'courseName' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('unit'),
      dataIndex: 'unitName',
      key: 'unitName',
      ellipsis: { showTitle: false },
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
      render: (text) => (<TooltipCustom text={(text !== 0 ? formatDateShort(text) : '')} title={(text !== 0 ? formatDateShort(text) : '')} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('completion_date_and_time'),
      dataIndex: 'actualCompleteTime',
      key: 'actualCompleteTime',
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'actualCompleteTime' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={(text !== 0 ? formatDateShort(text) : '')} title={(text !== 0 ? formatDateShort(text) : '')} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('group'),
      dataIndex: 'groupName',
      key: 'groupName',
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
      title: t('company:company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      ellipsis: true,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('email'),
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'email' && sortInfo?.order,
      render: (text) => (<TooltipCustom isEllipsis text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      ellipsis: true,
      sortOrder: sortInfo?.columnKey === 'signinId' && sortInfo?.order,
      render: (text) => (<TooltipCustom isEllipsis text={text} title={text} />),
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
      title: t('unit_completation_status'),
      dataIndex: 'complete',
      key: 'complete',
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfo?.columnKey === 'complete' && sortInfo?.order,
      render: (text) => (<TooltipCustom text={t(text.toLowerCase())} title={t(text.toLowerCase())} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }
  ]

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView: onSelectQuestions,
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
      verifyDisabledView: (record) => !UNIT_HAS_QUESTION.includes(record.unitType),
      language
    }),
    ...column
  ]
}
