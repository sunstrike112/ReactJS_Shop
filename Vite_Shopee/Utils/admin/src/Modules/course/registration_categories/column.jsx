/* eslint-disable no-unused-vars */
import { USER_ROLE } from 'Constants/auth'
import { Column } from 'Constants'

export default ({ t, pagination, onEdit, isSuperAdmin, isWebviewMode, handleSaveCategoryData }) => {
  const column = isWebviewMode
    ? [
      {
        title: t('course_category_name'),
        dataIndex: 'courseCategoryNameWithParent',
        key: 'courseCategoryNameWithParent',
        onCell: (record) => ({
          onClick: () => handleSaveCategoryData(record)
        }),
        rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
      }] : [
      {
        title: t('course_category_name'),
        dataIndex: 'courseCategoryNameWithParent',
        key: 'courseCategoryNameWithParent',
        rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
      },
      {
        title: t('company:company_name'),
        dataIndex: 'companyName',
        key: 'companyName',
        rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN]
      },
      {
        title: t('number_of_course'),
        dataIndex: 'courseNumber',
        width: 180,
        key: 'courseNumber',
        rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
      }
    ]

  return [
    ...Column.orderAction({
      t,
      pagination,
      onEdit,
      verifyDisabledEdit: (record) => isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN].includes(record.created),
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    }),
    ...column
  ]
}
