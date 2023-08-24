import { Column } from 'Constants'
import { RoutesName } from './routes'

export default ({ t, pagination, handleRedirect }) => {
  const column = [
    {
      title: t('workspace:workspace_name'),
      dataIndex: 'workSpaceName',
      key: 'workSpaceName',
      width: 400
    },
    {
      title: t('workspace:number_participants'),
      dataIndex: 'numberUserWorkSpace',
      key: 'numberUserWorkSpace',
      width: 200
    },
    {
      title: t('workspace:created_date'),
      dataIndex: 'startDateWorkspace',
      key: 'startDateWorkspace ',
      width: 200
    }
  ]

  const onEdit = (record) => handleRedirect(`${RoutesName.EDIT_WORKSPACE}/${record.id}`)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onEdit
    }),
    ...column
  ]
}
