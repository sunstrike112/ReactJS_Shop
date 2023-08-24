import React from 'react'
import { Column } from 'Constants'

export default ({ t, pagination, handleDelete }) => {
  const column = [
    {
      title: t('domain'),
      dataIndex: '',
      key: '',
      render: (record) => <div>{record}</div>
    }
  ]

  const onDelete = (record) => handleDelete(record)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onDelete,
      confirmDeleteText: 'warning_delete_domain'
    }),
    ...column
  ]
}
