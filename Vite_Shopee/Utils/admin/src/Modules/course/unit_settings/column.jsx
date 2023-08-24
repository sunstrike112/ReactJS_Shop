import { Column } from 'Constants'
import { USER_ROLE } from 'Constants/auth'
import { UNIT_TYPE } from 'Constants/course'
import { formatNumber } from 'Utils'

export default ({ t, pagination, handleRedirectDetail, isSuperAdmin }) => {
  const column = [
    {
      title: t('unitTypeName'),
      dataIndex: 'unitTypeName',
      key: 'unitTypeName',
      ellipsis: {
        showTitle: false
      },
      render: (text) => t(`common:${UNIT_TYPE[text]}`),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('unit'),
      dataIndex: 'unitName',
      key: 'unitName',
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('views'),
      dataIndex: 'totalView',
      key: 'totalView',
      render: (totalView) => formatNumber(totalView) || 0,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('num_of_viewers'),
      dataIndex: 'totalViewer',
      key: 'totalViewer',
      render: (totalView) => formatNumber(totalView) || 0,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('company:company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    }
  ]

  const onView = (record) => handleRedirectDetail(record)
  const onEdit = (record) => handleRedirectDetail(record)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView,
      onEdit,
      verifyView: (record) => (isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record.created)),
      verifyEdit: (record) => !(isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record.created)),
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    }),
    ...column
  ]
}
