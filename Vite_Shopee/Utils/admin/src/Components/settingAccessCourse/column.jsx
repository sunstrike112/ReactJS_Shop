import { Column } from 'Constants'

export default ({ t, paginationCompanySelected }) => {
  const column = [
    {
      title: t('company:company_name'),
      dataIndex: 'companyName',
      key: 'courseName'
    }
  ]

  return [
    ...Column.order({
      pagination: paginationCompanySelected
    }),
    ...column
  ]
}
