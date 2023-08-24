import { USER_ROLE } from 'Constants/auth'
import { formatDate } from 'Utils'
import { Column } from 'Constants'

export default ({ t, pagination }) => {
  const column = [
    {
      title: t('login_history_management.login_time'),
      dataIndex: 'loginDate',
      key: 'loginDate',
      render: (text) => formatDate(text),
      width: 200,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
    },
    {
      title: t('login_history_management.full_name'),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
    },
    // {
    //   title: t('login_history_management.result'),
    //   dataIndex: 'login_result',
    //   key: 'login_result',
    //   rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
    // },
    // {
    //   title: t('login_history_management.number_of_active'),
    //   dataIndex: 'numberOfActive',
    //   key: 'numberOfActive',
    //   rules: [USER_ROLE.NISSHOKEN_ADMIN]
    // },
    {
      title: t('login_history_management.email'),
      dataIndex: 'loginId',
      key: 'loginId',
      rules: [USER_ROLE.NISSHOKEN_ADMIN]
    },
    {
      title: t('common:loginId'),
      dataIndex: 'signinId',
      key: 'signinId',
      rules: [USER_ROLE.NISSHOKEN_ADMIN]
    },
    {
      title: t('login_history_management.user_ip'),
      dataIndex: 'loginIpAddress',
      key: 'loginIpAddress',
      rules: [USER_ROLE.NISSHOKEN_ADMIN]
    },
    {
      title: t('login_history_management.user_agent'),
      dataIndex: 'userAgent',
      key: 'userAgent',
      width: 300,
      rules: [USER_ROLE.NISSHOKEN_ADMIN]
    }
  ]
  return [
    ...Column.order({
      pagination,
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN]
    }),
    ...column
  ]
}
