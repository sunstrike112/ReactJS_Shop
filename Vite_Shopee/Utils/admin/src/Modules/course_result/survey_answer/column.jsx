import React from 'react'
import { USER_ROLE } from 'Constants/auth'
import { TooltipCustom } from 'Components'
import { Column } from 'Constants'
import { Popover, Tag } from 'antd'

export default ({ t, sortInfor, pagination, action: { openModal } }) => {
  const column = [
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      width: 250,
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
      title: t('course'),
      dataIndex: 'courseName',
      key: 'courseName',
      width: 250,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('unit'),
      dataIndex: 'unitSurveyName',
      key: 'unitSurveyName',
      width: 200,
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
      title: t('email'),
      dataIndex: 'emailSurvey',
      key: 'emailSurvey',
      width: 250,
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfor?.columnKey === 'emailSurvey' && sortInfor?.order,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('name'),
      dataIndex: 'userName',
      key: 'userName',
      width: 150,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={text} title={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('group'),
      dataIndex: 'groupName',
      key: 'groupName',
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
      title: t('response_status'),
      dataIndex: 'unitSurveyStatus',
      key: 'unitSurveyStatus',
      width: 200,
      ellipsis: true,
      sorter: true,
      sortOrder: sortInfor?.columnKey === 'unitSurveyStatus' && sortInfor?.order,
      render: (text) => (<TooltipCustom text={(text === 'ANSWERED' ? t('answered') : t('not_answered'))} title={(text === 'ANSWERED' ? t('answered') : t('not_answered'))} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }
  ]

  const onView = (record) => openModal(record)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView,
      verifyView: (record) => record.action === 1,
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }),
    ...column
  ]
}
