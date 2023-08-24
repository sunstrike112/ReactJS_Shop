import { USER_ROLE } from 'Constants/auth'

export default ({ t }) => {
  const column = [
    {
      title: t('common.email'),
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      width: 250,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.name'),
      dataIndex: 'fullName',
      key: 'fullName',
      ellipsis: true,
      width: 150,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    }
  ]

  return column
}
