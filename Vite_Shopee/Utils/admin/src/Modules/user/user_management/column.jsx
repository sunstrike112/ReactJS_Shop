/* eslint-disable no-unused-vars */
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Popover, Tag, Tooltip } from 'antd'
import { USER_CLASSIFICATIONS, QUERY, USER_ROLE, Column } from 'Constants'
import React from 'react'
import { Action } from 'Themes/facit'
import { formatDate, MEMBER_TYPE_CONVERT } from 'Utils'
import { RoutesName } from '../routes'

export default ({ t, history, pagination, isSuperAdmin, isCompany, isWorkspaceAdmin, isWorkspaceVirtual }) => {
  const column = [
    {
      title: t('management.email'),
      dataIndex: 'loginId',
      key: 'loginId',
      sorter: true,
      width: 300
    },
    isWorkspaceAdmin ? {
      title: t('common:company_code'),
      dataIndex: 'companyCode',
      key: 'companyCode',
      sorter: true,
      width: 300
    } : null,
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      sorter: true,
      width: 300
    },
    {
      title: t('management.name'),
      dataIndex: 'fullname',
      key: 'fullname',
      sorter: true,
      width: 150
    },
    {
      title: t('user:member_type'),
      dataIndex: 'roles',
      key: 'roles',
      width: 200,
      render: (user) => t(MEMBER_TYPE_CONVERT[user])
    },
    isSuperAdmin ? {
      title: t('management.company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      width: 250
    } : null,
    !isWorkspaceVirtual && {
      title: t('management.group'),
      dataIndex: 'departmentName',
      key: 'attributeDto',
      width: 200,
      render: (text, record) => (record.departmentDto ? (
        <Popover
          overlayClassName="group-popover"
          content={record.departmentDto.map((item) => (
            <Tag key={record.departmentId}>{item.departmentName}</Tag>
          ))}
        >
          {record.departmentDto.map((item, index) => index < 3 && (
            <Tag className="truncate" key={record.departmentId}>{item.departmentName}</Tag>
          ))}
        </Popover>
      ) : '')
    },
    !isWorkspaceVirtual && {
      title: t('management.attribute'),
      dataIndex: 'departmentName',
      key: 'departmentName',
      width: 200,
      render: (text, record) => (record.attributeDto ? (
        <Popover
          overlayClassName="attribute-popover"
          content={record.attributeDto.map((item) => (
            <Tag key={record.attributeId}>{item.attributeName}</Tag>
          ))}
        >
          {record.attributeDto.map((item, index) => index < 3 && (
            <Tag className="truncate" key={record.attributeId}>{item.attributeName}</Tag>
          ))}
        </Popover>
      ) : '')
    },
    {
      title: t('user_classification'),
      dataIndex: 'classification',
      key: 'classification',
      width: 200,
      render: (classification) => {
        const itemClassification = USER_CLASSIFICATIONS.find(({ value }) => value === classification)
        return <>{itemClassification?.label}</>
      }
    },
    {
      title: t('common:employee_number'),
      dataIndex: 'employeeNumber',
      key: 'employeeNumber',
      width: 150,
      render: (employeeNumber) => (employeeNumber ? employeeNumber.trim() : '')
    },
    {
      title: t('management.latest_login'),
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
      width: 250,
      sorter: true,
      render: (text) => formatDate(text)
    },
    {
      title: t('management.login_status'),
      dataIndex: 'statusLogin',
      key: 'statusLogin',
      width: 150,
      render: (text) => t(text)
    }
  ]

  const onView = (record) => {
    if (isSuperAdmin) {
      history.push(`${RoutesName.USER_DETAIL}/${record.userId}?${QUERY.COMPANY_ID}=${record.companyId}`)
    } else {
      history.push(`${RoutesName.USER_DETAIL}/${record.userId}`)
    }
  }

  const onEdit = (record) => {
    history.push(`${RoutesName.EDIT_USER}/${record.userId}?isMainCompany=${record.isMainAdminCompany}`)
  }

  return ([
    ...Column.orderAction({
      t,
      pagination,
      onView,
      onEdit,
      verifyEdit: (record) => ((isWorkspaceAdmin || isWorkspaceVirtual) && record.roles !== USER_ROLE.COMPANY_EMPLOYEE)
       || isCompany
    }),
    ...column
  ])
}
