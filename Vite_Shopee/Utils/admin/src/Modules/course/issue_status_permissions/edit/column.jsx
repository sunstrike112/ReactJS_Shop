import { CheckOutlined } from '@ant-design/icons'
import { USER_ROLE } from 'Constants/auth'
import { FORMAT_TIME } from 'Constants/formatTime'
import moment from 'moment'
import React from 'react'

export default ({ t, pagination }) => [
  {
    title: 'No.',
    dataIndex: 'id',
    key: 'id',
    width: 60,
    align: 'right',
    render: (text, record, index) => (
      <div>{(pagination.page - 1) * pagination.limit + index + 1}</div>
    ),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  },
  {
    title: t('common.email'),
    dataIndex: 'email',
    key: 'email',
    sorter: true,
    ellipsis: true,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  },
  {
    title: t('common:loginId'),
    dataIndex: 'signinId',
    key: 'signinId',
    sorter: true,
    ellipsis: true,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  },
  {
    title: t('common.course'),
    dataIndex: 'courseName',
    key: 'courseName',
    ellipsis: true,
    render: (text) => text,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  },
  {
    title: t('common.name'),
    dataIndex: 'userName',
    key: 'userName',
    ellipsis: true,
    render: (text) => text,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  },
  {
    title: t('common.course_start_date'),
    dataIndex: 'startTime',
    key: 'startTime',
    sorter: true,
    width: 250,
    ellipsis: true,
    render: (text) => moment(text).format(FORMAT_TIME.DATE_HOUR_MINUTES),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  },
  {
    title: t('common.course_end_date'),
    dataIndex: 'endTime',
    key: 'endTime',
    sorter: true,
    width: 250,
    ellipsis: true,
    render: (text) => (text ? moment(text).format(FORMAT_TIME.DATE_HOUR_MINUTES) : ''),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  },
  {
    title: t('common.optional_required'),
    dataIndex: 'required',
    key: 'required',
    ellipsis: true,
    render: (text) => (text ? t('options.required') : t('options.optional')),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  },
  {
    title: t('common.request_password'),
    dataIndex: '',
    key: '',
    align: 'center',
    render: ({ isCheckPassword }) => (isCheckPassword ? <CheckOutlined /> : <>-</>),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  }
]
