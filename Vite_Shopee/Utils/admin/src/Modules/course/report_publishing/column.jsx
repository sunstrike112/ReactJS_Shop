import React from 'react'
import { EditOutlined } from '@ant-design/icons'
import { RoutesName } from 'Modules/course/routes'
import { Action } from './styled'

export default ({ t, pagination, history }) => [
  {
    title: 'No.',
    dataIndex: 'index',
    key: 'index',
    align: 'right',
    width: 60,
    render: (text, record, index) => (
      <div>{(pagination.page - 1) * pagination.limit + index + 1}</div>
    )
  },
  {
    title: t('course:block_course_title'),
    dataIndex: 'courseName',
    key: 'courseName',
    ellipsis: true
  },
  {
    title: t('unit_setting:unit'),
    dataIndex: 'reportName',
    key: 'reportName',
    ellipsis: true
  },
  {
    title: t('publish_other_students'),
    dataIndex: 'publicSetting',
    key: 'publicSetting'
  },
  {
    title: t('common:action'),
    key: '',
    dataIndex: '',
    width: 100,
    align: 'center',
    render: (record) => (
      <Action>
        <EditOutlined
          style={{ fontSize: '16px' }}
          onClick={() => history.push({
            pathname: `${RoutesName.REPORT_PUBLISHING_UPDATE}/${record.reportId}`,
            state: {
              from: history.location.pathname
            }
          })}
        />
      </Action>
    )
  }
]
