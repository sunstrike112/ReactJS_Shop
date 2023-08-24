/* eslint-disable max-len */
import { USER_ROLE } from 'Constants/auth'
import { FORMAT_TIME } from 'Constants/formatTime'
import { TooltipCustom } from 'Components'
import moment from 'moment'
import React from 'react'
import { Column } from 'Constants'
import { CheckOutlined } from '@ant-design/icons'
import { Popover, Tag } from 'antd'

export default ({ t, pagination }) => {
  const column = [
    {
      title: t('management.date_time_issue'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true,
      sorter: true,
      width: 200,
      render: (text) => (text ? <TooltipCustom text={moment(text).format(FORMAT_TIME.DATE_HOUR_MINUTES)} title={moment(text).format(FORMAT_TIME.DATE_HOUR_MINUTES)} /> : ''),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.course'),
      dataIndex: 'courseDto',
      key: 'courseDto',
      ellipsis: true,
      sorter: true,
      width: 200,
      render: (text) => (<TooltipCustom text={text.name} title={text.name} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.email'),
      dataIndex: 'userDto',
      key: 'email',
      ellipsis: true,
      sorter: true,
      width: 200,
      render: (text) => (<TooltipCustom text={text.email} title={text.email} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common:loginId'),
      dataIndex: 'userDto',
      key: 'signinId',
      ellipsis: true,
      sorter: true,
      width: 200,
      render: (text) => (<TooltipCustom text={text.signinId} title={text.signinId} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.name'),
      dataIndex: 'userDto',
      key: 'name',
      ellipsis: true,
      sorter: true,
      width: 200,
      render: (text) => (<TooltipCustom text={text.fullName} title={text.fullName} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.group'),
      dataIndex: 'userDto',
      key: 'group',
      ellipsis: true,
      width: 150,
      render: (record) => (
        <Popover
          overlayClassName="group-popover"
          content={record.listGroupNames.map((item, index) => (
            <Tag key={index}>{item}</Tag>
          ))}
        >
          {record.listGroupNames.map((item, index) => index < 3 && (
            <Tag className="truncate" key={index}>{item}</Tag>
          ))}
        </Popover>
      ),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('select_user.attribute'),
      dataIndex: 'userDto',
      key: 'attribute',
      ellipsis: true,
      width: 150,
      render: (text) => {
        const listAttribute = text.listAttributeName?.length > 0 ? text.listAttributeName.join(', ') : ''
        return (
          <TooltipCustom isEllipsis text={(listAttribute)} title={(listAttribute)} />
        )
      },
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.course_start_date'),
      dataIndex: 'startTime',
      key: 'startTime',
      ellipsis: true,
      sorter: true,
      width: 250,
      render: (text) => (<TooltipCustom text={moment(text).format(FORMAT_TIME.DATE_HOUR_MINUTES)} title={moment(text).format(FORMAT_TIME.DATE_HOUR_MINUTES)} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.course_end_date'),
      dataIndex: 'endTime',
      key: 'endTime',
      ellipsis: true,
      sorter: true,
      width: 250,
      render: (text) => (text ? (<TooltipCustom text={moment(text).format(FORMAT_TIME.DATE_HOUR_MINUTES)} title={moment(text).format(FORMAT_TIME.DATE_HOUR_MINUTES)} />) : ''),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.optional_required'),
      dataIndex: 'required',
      key: 'required',
      ellipsis: true,
      width: 250,
      render: (text) => (text ? <TooltipCustom text={t('options.required')} title={t('options.required')} placement="left" /> : <TooltipCustom text={t('options.optional')} title={t('options.optional')} placement="left" />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.request_password'),
      dataIndex: '',
      key: '',
      align: 'center',
      width: 200,
      render: ({ isCheckPassword }) => (isCheckPassword ? <CheckOutlined /> : <>-</>),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    }
  ]
  return [
    ...Column.order({
      pagination,
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    }),
    ...column
  ]
}
