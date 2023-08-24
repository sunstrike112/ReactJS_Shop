import { UnorderedListOutlined } from '@ant-design/icons'

import { USER_ROLE } from 'Constants/auth'
import { formatNumber } from 'Utils'
import { Column } from 'Constants'
import { RoutesName } from '../routes'

export default ({ t, history, onNavigation, pagination, action: { selectCourseIdAction }, isSuperAdmin, valueCompany, isWebviewMode }) => {
  const column = isWebviewMode ? [{
    title: t('registration_course.management.course_name'),
    dataIndex: 'courseName',
    key: 'courseName',
    sorter: true,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
  }] : [
    {
      title: t('registration_course.management.course_name'),
      dataIndex: 'courseName',
      key: 'courseName',
      sorter: true,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('registration_course.management.course_category_name'),
      dataIndex: 'courseCategoryName',
      key: 'courseCategoryName',
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('views'),
      dataIndex: 'totalView',
      key: 'totalView',
      render: (text) => formatNumber(text) || 0,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('like'),
      dataIndex: 'totalLike',
      key: 'totalLike',
      render: (text) => formatNumber(text) || 0,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('company:company_name'),
      dataIndex: 'companyName',
      key: 'companyName',
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    }
  ]

  const onView = (record) => onNavigation(record)

  const onEdit = (record) => onNavigation(record)

  const moreAction = [
    {
      title: 'common:tooltip:unit_setting',
      icon: UnorderedListOutlined,
      onClick: (record) => {
        const selectCourseId = {
          data: record,
          title: record.courseName,
          value: record.courseName,
          label: record.courseName,
          companyId: valueCompany
        }
        selectCourseIdAction(selectCourseId)
        history.push(RoutesName.UNIT_SETTINGS)
      }
    }
  ]

  return !isWebviewMode ? [
    ...Column.orderAction({
      t,
      pagination,
      moreAction: !isWebviewMode && moreAction,
      onView,
      onEdit,
      verifyView: (record) => isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record?.created),
      verifyEdit: (record) => !(isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record?.created)),
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN],
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN]
    }),
    ...column
  ] : [
    ...column
  ]
}
