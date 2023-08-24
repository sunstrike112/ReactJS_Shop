import React from 'react'
import { USER_ROLE } from 'Constants/auth'
import { TooltipCustom } from 'Components'
import { Column } from 'Constants'

export default ({ t, pagination }) => {
  const column = [
    {
      title: t('course_name'),
      key: 'courseName',
      ellipsis: true,
      render: (record) => (<TooltipCustom title={record.courseName} text={record.courseName} />),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.COURSE_ADMIN]
    },
    {
      title: t('course_category_name'),
      key: 'courseCategoryName',
      ellipsis: true,
      render: (record) => (<TooltipCustom title={record.courseCategoryName} text={record.courseCategoryName} />),
      rules: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.COURSE_ADMIN]
    }
  ]
  return [
    ...Column.order({
      pagination,
      rulesOrder: [USER_ROLE.COMPANY_ADMIN, USER_ROLE.COURSE_ADMIN]
    }),
    ...column
  ]
}
