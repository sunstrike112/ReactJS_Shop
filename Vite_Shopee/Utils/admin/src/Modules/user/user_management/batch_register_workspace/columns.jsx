import React from 'react'
import { Tag, Popover } from 'antd'
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
    title: t('common:company_code'),
    dataIndex: 'companyCode',
    key: 'companyCode',
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
    title: t('management.group'),
    dataIndex: 'departmentIdList',
    key: 'departmentIdList',
    width: 200,
    render: (departmentIdList) => (departmentIdList ? (
      <Popover
        overlayClassName="group-popover"
        content={departmentIdList.map((item) => (
          <Tag>{item}</Tag>
        ))}
      >
        {departmentIdList.map((item, index) => index < 3 && (
          <Tag className="truncate">{item}</Tag>
        ))}
      </Popover>
    ) : '')
  },
  {
    title: t('management.attribute'),
    dataIndex: 'attributeIdList',
    key: 'attributeIdList',
    width: 200,
    render: (attributeIdList) => (attributeIdList ? (
      <Popover
        overlayClassName="attribute-popover"
        content={attributeIdList.map((item) => (
          <Tag>{item}</Tag>
        ))}
      >
        {attributeIdList.map((item, index) => index < 3 && (
          <Tag className="truncate">{item}</Tag>
        ))}
      </Popover>
    ) : '')
  },
  {
    title: t('member_type'),
    dataIndex: 'userRole',
    key: 'userRole',
    width: 150,
    render: (value) => t(value)
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
