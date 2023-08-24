/* eslint-disable no-unused-vars */
import React from 'react'
import { Tag, Popover } from 'antd'
import { Text } from 'Components'
import { Column } from 'Constants'
import { STATUS_CSV } from '.'

const getColorStatus = (text) => {
  if (text === STATUS_CSV.FAILED || text === STATUS_CSV.FAIL) return 'text_error'
  if (text === STATUS_CSV.REGISTERED || text === STATUS_CSV.UPDATED || text === STATUS_CSV.SUCCESS) return 'green'
  return ''
}
const getError = (error) => {
  if (error.error_code === 'VALIDATION') {
    return error.message
  }
  return `error_message:${error.error_code}`
}

export default ({ t, pagination }) => {
  const column = [
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
  return [
    ...Column.order({
      pagination
    }),
    ...column
  ]
}
