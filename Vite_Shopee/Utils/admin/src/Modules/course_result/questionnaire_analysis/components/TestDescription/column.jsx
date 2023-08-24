import React from 'react'

import { TooltipCustom } from 'Components'
import { USER_ROLE } from 'Constants/auth'

export default ({ t, pagination }) => [
  {
    title: 'No.',
    dataIndex: 'key',
    key: 'key',
    width: 60,
    align: 'right',
    render: (_text, _record, index) => (<TooltipCustom text={`${(pagination.page - 1) * pagination.limit + index + 1}`} title={`${(pagination.page - 1) * pagination.limit + index + 1}`} />),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
  },
  {
    title: t('questionnaire_user_name'),
    dataIndex: 'userName',
    key: 'userName',
    width: 200,
    ellipsis: true,
    render: (text) => (<TooltipCustom text={text} title={text} />),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
  },
  {
    title: t('questionnaire_answer_content'),
    dataIndex: 'answerTextDescription',
    key: 'answerTextDescription',
    ellipsis: true,
    render: (text) => (<TooltipCustom text={text} overlayStyle={{ maxWidth: '700px' }} overlayInnerStyle={{ maxWidth: '700px', overflow: 'auto', maxHeight: '50vh' }} />),
    rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
  }
]
