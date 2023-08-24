import { Column } from 'Constants'
import { USER_ROLE } from 'Constants/auth'

export default ({ t, pagination, action: { setCurrentTag } }) => {
  const column = [
    {
      title: t('tag_name'),
      dataIndex: 'name',
      key: 'name',
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('company:company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      width: 600,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    }
  ]

  const onEdit = (record) => setCurrentTag(record)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onEdit,
      rulesOrder: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.NISSHOKEN_SUPER_ADMIN],
      rulesAction: [USER_ROLE.COMPANY_ADMIN]
    }),
    ...column
  ]
}
