import { Column, NOT_FOUND_VALUE, UNIT_TYPE_UPPERCASE } from 'Constants'
import { FORMAT_TIME } from 'Constants/formatTime'
import moment from 'moment'

const UNIT_HAS_QUESTION = [UNIT_TYPE_UPPERCASE.REPORT, UNIT_TYPE_UPPERCASE.SURVEY, UNIT_TYPE_UPPERCASE.TEST]

const checkShowAction = (unitType, record) => {
  if (UNIT_HAS_QUESTION.includes(unitType)) {
    if (unitType === 'REPORT') {
      return !record.listReport
    }
    if (unitType === 'SURVEY') {
      return !record.listSurvey
    }
    return !record.listQuestion
  }
  return true
}

export default ({ t, pagination, onSelectQuestions, signinId }) => {
  const column = [
    {
      title: t('email'),
      key: 'mail',
      width: 250,
      dataIndex: 'mail'
    },
    {
      title: t('common:loginId'),
      key: 'mail',
      width: 250,
      render: () => signinId
    },
    {
      title: t('project:start_time'),
      key: 'viewTime',
      width: 200,
      dataIndex: 'viewTime',
      render: (viewTime) => (viewTime ? moment(viewTime).format(FORMAT_TIME.DATE_HOUR_MINUTES_SECOND) : NOT_FOUND_VALUE)
    },
    {
      title: t('project:end_time'),
      key: 'completeTime',
      width: 200,
      dataIndex: 'completeTime',
      render: (completeTime) => (completeTime ? moment(completeTime).format(FORMAT_TIME.DATE_HOUR_MINUTES_SECOND) : NOT_FOUND_VALUE)
    },
    {
      title: t('common:status'),
      key: 'completeStatus',
      width: 150,
      dataIndex: 'completeStatus',
      render: (completeStatus) => (completeStatus ? t(`common:${completeStatus}`) : NOT_FOUND_VALUE)
    }
  ]

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView: onSelectQuestions,
      verifyDisabledView: (record) => checkShowAction(record.unitType, record)
    }),
    ...column
  ]
}
