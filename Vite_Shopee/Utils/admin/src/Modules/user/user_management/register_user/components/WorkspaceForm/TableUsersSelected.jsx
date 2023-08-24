/* eslint-disable react/prop-types */
import { ClearOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Table } from 'Components'
import React from 'react'

const TableUsersSelected = ({ t, data, action }) => {
  const columns = [

    {
      title: t('common:action'),
      key: 'recordId',
      width: 120,
      render: (_, record) => (
        <Button
          icon={<ClearOutlined />}
          size="large"
          danger
          onClick={() => action(record)}
        >
          <span>{t('common:delete')}</span>
        </Button>
      )
    },
    {
      title: t('common:email'),
      dataIndex: 'email',
      key: 'email',
      width: 250
    },
    {
      title: t('common:company_code'),
      dataIndex: 'companyCode',
      key: 'companyCode',
      width: 150
    },
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      width: 250
    }
  ]
  return (
    <Table
      rowKey="recordId"
      columns={columns}
      dataSource={data}
      pagination={false}
      locale={{ emptyText: t('common:noOption') }}
      isHideDelete
      total={data.length}
      heightTable={400}
    />
  )
}

export default TableUsersSelected
