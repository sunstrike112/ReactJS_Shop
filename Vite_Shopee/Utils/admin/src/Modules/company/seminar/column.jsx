/* eslint-disable no-unused-vars */
import { Column } from 'Constants'
import { USER_ROLE } from 'Constants/auth'
import { FORMAT_TIME } from 'Constants/formatTime'
import moment from 'moment'

export default ({ t, pagination, history, isSuperAdmin, isAdmin }) => {
  const column = [
    {
      title: t('common.seminar_title_input'),
      dataIndex: 'seminarTitle',
      key: 'seminarId',
      ellipsis: true,
      width: 300,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    (isSuperAdmin || isAdmin) && {
      title: t('user:management.company_name'),
      dataIndex: 'createdCompany',
      key: 'createdCompany',
      width: 300,
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('common.start_date'),
      dataIndex: 'startTime',
      key: 'seminarId',
      width: 300,
      render: (text) => (text ? moment(text).format(FORMAT_TIME.DATE_HOUR_MINUTES) : ''),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('common.end_date'),
      dataIndex: 'endTime',
      key: 'seminarId',
      width: 200,
      render: (text) => (text ? moment(text).format(FORMAT_TIME.DATE_HOUR_MINUTES) : ''),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('management.public_status'),
      dataIndex: 'publicSetting',
      key: 'seminarId',
      width: 200,
      render: (text) => (text ? t(`common.${text.toLowerCase()}`) : ''),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }
  ]

  const onView = (record) => history.push(`/seminar-management/${record.seminarId}/edit`)

  const onEdit = (record) => history.push(`/seminar-management/${record.seminarId}/edit`)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView,
      onEdit,
      verifyView: (record) => isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record.created),
      verifyEdit: (record) => !(isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record.created)),
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR],
      rulesAction: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }),
    ...column
  ]
}
