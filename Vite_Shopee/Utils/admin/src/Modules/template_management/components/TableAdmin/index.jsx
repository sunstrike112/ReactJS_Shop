/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ClearOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import React from 'react'

const TableAdmin = ({ t, adminsAssigned, action }) => {
  const columns = [
    {
      title: t('common:email'),
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId'
    },
    {
      title: t('common:action'),
      key: 'id',
      render: (_, record) => (
        <Button
          icon={<ClearOutlined />}
          size="large"
          danger
          onClick={() => action(record.id)}
        >
          <span>{t('common:delete')}</span>
        </Button>
      )
    }
  ]
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={adminsAssigned.selectedRows}
      pagination={false}
      locale={{ emptyText: t('common:noOption') }}
    />
  )
}

export default TableAdmin
