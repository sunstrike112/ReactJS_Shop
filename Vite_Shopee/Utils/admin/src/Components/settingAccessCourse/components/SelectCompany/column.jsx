import { Column } from 'Constants'

export default ({ t, pagination }) => {
  const column = [
    {
      title: t('company:company_name'),
      dataIndex: 'companyName',
      key: 'courseName'
    }
  ]
  return [
    ...Column.order({
      pagination
    }),
    ...column
  ]
}
