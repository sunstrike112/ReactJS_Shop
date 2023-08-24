import React from 'react'
import { EditOutlined, UpCircleFilled, DownCircleFilled, EyeOutlined } from '@ant-design/icons'

import { USER_ROLE } from 'Constants/auth'
import { formatOption } from 'Utils'
import { QUESTION_TYPE_OPTION } from 'Constants/survey'
import { Action } from 'Themes/facit'

export default ({ t, action: { onEditQuestion, handleOrder }, dataSource, isViewing }) => [
  {
    title: 'No.',
    dataIndex: 'questionId',
    key: 'questionId',
    render: (text, record, index) => (
      <div>{index + 1}</div>
    ),
    width: 60,
    align: 'right',
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
  },
  {
    title: t('unit_survey_question.management.question_text'),
    dataIndex: 'questionText',
    key: 'questionText',
    render: (text, record) => text || record.contentQuestion,
    width: 350,
    ellipsis: true,
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
  },
  {
    title: t('unit_survey_question.management.question_type'),
    dataIndex: 'questionType',
    key: 'questionType',
    width: 125,
    render: (text) => t(formatOption(text, QUESTION_TYPE_OPTION)),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
  },
  {
    title: t('common:action'),
    key: '',
    dataIndex: '',
    width: 100,
    align: 'center',
    render: (text, record, index) => (
      <Action>
        {isViewing ? (
          <EyeOutlined
            onClick={() => onEditQuestion(record.questionId)}
            style={{ fontSize: '20px' }}
          />
        ) : (
          <EditOutlined
            onClick={() => onEditQuestion(record.questionId)}
            style={{ fontSize: '20px' }}
          />
        )}
        {!isViewing && (
          <div className="order">
            {index > 0 && (
              <UpCircleFilled
                onClick={() => handleOrder(index, index - 1)}
                style={{ fontSize: '20px', marginBottom: '.1rem' }}
              />
            )}
            {index < dataSource.length - 1 && (
              <DownCircleFilled
                onClick={() => handleOrder(index, index + 1)}
                style={{ fontSize: '20px', marginTop: '.1rem' }}
              />
            )}
          </div>
        )}
      </Action>
    ),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
  }
]
