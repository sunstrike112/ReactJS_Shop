import { Column, NOT_FOUND_VALUE } from 'Constants'
import { FORMAT_TIME } from 'Constants/formatTime'
import moment from 'moment'

export default ({ t, pagination }) => {
  const column = [
    {
      title: 'Email',
      key: 'mail',
      width: 250,
      dataIndex: 'mail'
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
    ...Column.order({
      pagination
    }),
    ...column
  ]
}
