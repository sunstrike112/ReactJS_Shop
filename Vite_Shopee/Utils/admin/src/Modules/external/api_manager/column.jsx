import { Column } from 'Constants'

export default ({ t, pagination, handleDelete }) => {
  const column = [
    {
      title: t('externalApi.externalApi'),
      dataIndex: 'externalApi',
      key: 'externalApi',
      width: 400,
      render: ({ name }) => name
    },
    {
      title: t('externalIp.ipAddress'),
      dataIndex: 'listIp',
      key: 'listIp'
    }
  ]

  const onDelete = (record) => handleDelete(record)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onDelete,
      confirmDeleteText: 'apiManager.confirmDelete'
    }),
    ...column
  ]
}
