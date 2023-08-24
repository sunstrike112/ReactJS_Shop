import { USER_ROLE } from 'Constants/auth'
import { Column } from 'Constants'
import { RoutesName } from '../routes'

export default ({ t, history, pagination, isSuperAdmin }) => {
  const column = [
    {
      title: t('unit_setting:course'),
      dataIndex: 'courseName',
      key: 'questionId',
      ellipsis: true
    },
    {
      title: t('unit_setting:unit'),
      dataIndex: 'unitTestName',
      key: 'questionId',
      ellipsis: true
    },
    {
      title: t('unit_setting:question_setting.question_type'),
      dataIndex: 'questionType',
      key: 'questionId',
      ellipsis: true
    },
    {
      title: t('unit_setting:question_setting.question_text'),
      dataIndex: 'questionText',
      key: 'questionId',
      ellipsis: true
    },
    {
      title: t('test_question:create.remark'),
      dataIndex: 'note',
      key: 'questionId',
      ellipsis: true
    }
  ]

  const onView = (record) => history.push(`${RoutesName.TEST_QUESTION_DETAIL}/${record.questionId}`)

  const onEdit = (record) => {
    history.push(
      isSuperAdmin
        ? `${RoutesName.EDIT_QUESTION}/${record.courseId}/${record.unitTestId}/question/${record.questionId}?locationFrom=${RoutesName.TEST_QUESTION_MANAGEMENT}&createBy=${record.created}`
        : `${RoutesName.EDIT_QUESTION}/${record.courseId}/${record.unitTestId}/question/${record.questionId}?locationFrom=${RoutesName.TEST_QUESTION_MANAGEMENT}`
    )
  }

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView,
      onEdit,
      verifyDisabledEdit: (record) => isSuperAdmin && [USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR].includes(record.created)
    }),
    ...column
  ]
}
