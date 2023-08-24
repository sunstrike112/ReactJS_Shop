/* eslint-disable no-unused-vars */
import React from 'react'
import { EyeOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'

import { USER_ROLE } from 'Constants/auth'
import { formatDate } from 'Utils'
import { USER_URL } from 'Constants'
import { Action } from './styled'

export default ({ t }) => [
  {
    title: 'No.',
    dataIndex: 'courseId',
    key: 'courseId',
    width: 60,
    align: 'right',
    render: (text, record, index) => (
      <div>{index + 1}</div>
    ),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('user_test_result.course_name'),
    dataIndex: 'courseName',
    key: 'courseName',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('user_test_result.unit'),
    dataIndex: 'unitName',
    key: 'unitName',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('user_test_result.test_time'),
    dataIndex: 'dateSubmit',
    key: 'dateSubmit',
    width: 100,
    render: (text) => formatDate(text),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('user_test_result.result'),
    dataIndex: 'result',
    key: 'result',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('user_test_result.score'),
    dataIndex: 'point',
    key: 'point',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  },
  {
    title: t('common:action'),
    key: '',
    dataIndex: '',
    width: 100,
    align: 'center',
    render: (record) => (
      <Action>
        <Tooltip title={t('common:tooltip:user_detail')}>
          <EyeOutlined
            style={{ fontSize: '16px' }}
          />
        </Tooltip>
      </Action>
    ),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
  }
]
