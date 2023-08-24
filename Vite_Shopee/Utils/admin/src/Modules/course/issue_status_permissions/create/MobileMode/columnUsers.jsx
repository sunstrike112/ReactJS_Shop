import { USER_ROLE } from 'Constants/auth'

export default ({ t }) => {
  const column = [
    {
      title: t('common.email'),
      dataIndex: 'email',
      key: 'email',
      width: 250,
      ellipsis: true,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('common.name'),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 150,
      ellipsis: true,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    }
  ]
  return column
}
