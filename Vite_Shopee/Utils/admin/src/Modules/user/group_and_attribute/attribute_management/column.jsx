import { Column } from 'Constants'
import { USER_ROLE } from 'Constants/auth'

export default ({ t, pagination, action: { setCurrentAttribute, setIsReloading } }) => {
  const onEdit = (record) => {
    setCurrentAttribute(record)
    setIsReloading(false)
  }

  const column = [
    {
      title: t('attribute.attribute_name'),
      dataIndex: 'attributeName',
      key: 'attributeName',
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
    },
    {
      title: t('attribute.number_of_user'),
      dataIndex: 'numberOfUsers',
      key: 'numberOfUsers',
      width: 180,
      render: (text) => `${text}${t('common:person')}`,
      rules: [USER_ROLE.NISSHOKEN_ADMIN]
    },
    {
      title: t('attribute.explanation'),
      dataIndex: 'explanation',
      key: 'explanation',
      rules: [USER_ROLE.NISSHOKEN_ADMIN]
    }
  ]

  return [
    ...Column.orderAction({
      t,
      pagination,
      onEdit,
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN],
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
    }),
    ...column
  ]
}
