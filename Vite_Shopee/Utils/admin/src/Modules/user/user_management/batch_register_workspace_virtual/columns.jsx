import React from 'react'
import { Text } from 'Components'
import { STATUS_CSV } from '.'

const getColorStatus = (text) => {
  if (text === STATUS_CSV.FAILED) return 'text_error'
  if (text === STATUS_CSV.REGISTERED || text === STATUS_CSV.UPDATED) return 'green'
  return ''
}
const getError = (error) => {
  if (error.error_code === 'VALIDATION') {
    return error.message
  }
  return `error_message:${error.error_code}`
}

export default ({ t, pagination }) => [
  {
    title: 'No.',
    dataIndex: 'recordId',
    key: 'recordId',
    align: 'right',
    width: 60,
    render: (text, record, index) => (
      <div>{(pagination.page - 1) * pagination.limit + index + 1}</div>
    )
  },
  {
    title: t('management.email'),
    dataIndex: 'email',
    key: 'email',
    width: 300
  },
  {
    title: t('common:loginId'),
    dataIndex: 'signinId',
    key: 'signinId',
    width: 300
  },
  {
    title: t('register_user.full_name'),
    dataIndex: 'fullName',
    key: 'fullname',
    width: 150
  },
  {
    title: t('register_user.full_name_furi'),
    dataIndex: 'fullNameKatakana',
    key: 'fullNameKatakana',
    width: 200
  },
  {
    title: t('management.classification'),
    dataIndex: 'classification',
    key: 'classification',
    width: 200
  },
  {
    title: t('common:employee_number'),
    dataIndex: 'employeeNumber',
    key: 'employeeNumber',
    width: 200
  },
  {
    title: t('member_type'),
    dataIndex: 'userRole',
    key: 'userRole',
    render: (value) => t(value),
    width: 150
  },
  {
    title: t('common:status'),
    dataIndex: 'status',
    key: 'status',
    width: 150,
    render: (text) => (
      <Text.primary fontWeight="fw_400" color={getColorStatus(text)}>
        {text === STATUS_CSV.PENDING ? '' : t(`management.${text}`)}
      </Text.primary>
    )
  },
  {
    title: t('management.error_reason'),
    dataIndex: 'error',
    key: 'error',
    width: 300,
    render: (error) => (
      <Text.primary fontWeight="fw_400" color="text_error">
        {error ? t(getError(error)) : ''}
      </Text.primary>
    )
  }
]
