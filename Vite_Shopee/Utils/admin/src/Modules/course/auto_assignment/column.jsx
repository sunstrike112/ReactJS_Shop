import React from 'react'
import { USER_ROLE } from 'Constants/auth'
import styled from 'styled-components'
import { TooltipCustom } from 'Components'
import { Column } from 'Constants'
import { Popover, Tag } from 'antd'

const TdItem = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export default ({ t, pagination, isSuperAdmin, navigateDetail }) => {
  const column = [
    {
      title: t('auto_assignment_settings'),
      key: 'assignId',
      width: 220,
      ellipsis: true,
      render: (record) => (<TooltipCustom title={record.assignName} text={record.assignName} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('status'),
      key: 'isEffective',
      width: 100,
      ellipsis: true,
      render: (record) => (<TooltipCustom title={record.isEffective} text={record.isEffective} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('target_group'),
      key: 'assignId',
      ellipsis: true,
      render: (record) => (
        <Popover
          overlayClassName="group-popover"
          content={record.listDepartments.map((item, index) => (
            <Tag key={index}>{item.name}</Tag>
          ))}
        >
          {record.listDepartments.map((item, index) => index < 3 && (
            <Tag className="truncate" key={index}>{item.name}</Tag>
          ))}
        </Popover>
      ),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('target_attribute'),
      key: 'assignId',
      ellipsis: true,
      render: (record) => (
        <TooltipCustom
          title={record.listAttributes.map((item, index) => (
            <div key={index}>{item.name}</div>))}
          text={record.listAttributes.map((item, index) => (
            <TdItem key={index}>{item.name}</TdItem>
          ))}
        />
      ),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('company:company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('common:course'),
      key: 'assignId',
      render: (record) => (
        <TooltipCustom
          title={record.listCourses.map((item, index) => (
            <div key={index}>{item.name}</div>))}
          text={record.listCourses.map((item, index) => (
            <TdItem key={index}>{item.name}</TdItem>
          ))}
        />
      )
    }
  ]

  const onView = (record) => navigateDetail(record)
  const onEdit = (record) => navigateDetail(record)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView,
      onEdit,
      verifyView: () => isSuperAdmin,
      verifyEdit: () => !isSuperAdmin,
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    }),
    ...column
  ]
}
