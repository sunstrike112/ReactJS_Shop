import React from 'react'

import { TooltipCustom } from 'Components'
import { USER_ROLE } from 'Constants/auth'
import { formatNumber } from 'Utils'
import { Action } from 'Themes/facit'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { Column } from 'Constants'

export default ({ t, pagination, onDownloadCSV, companyObj }) => {
  const column = [
    // {
    //   title: t('questionnaire_course_name'),
    //   dataIndex: 'courseName',
    //   key: 'courseName',
    //   ellipsis: true,
    //   render: (text) => (<TooltipCustom text={text} />),
    //   rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    // },
    {
      title: t('company:company_name'),
      dataIndex: 'companyId',
      key: 'companyId',
      ellipsis: true,
      render: (text) => (<TooltipCustom text={companyObj?.[text]} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN]
    },
    {
      title: t('questionnaire_survey_name'),
      dataIndex: 'unitSurveyName',
      key: 'unitSurveyName',
      ellipsis: true,
      render: (text) => (<TooltipCustom text={text} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('questionnaire_question_number'),
      dataIndex: 'numberQuestion',
      key: 'numberQuestion',
      width: 190,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={formatNumber(text)} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('questionnaire_user_answer_number'),
      dataIndex: 'userAnswerQuestion',
      key: 'userAnswerQuestion',
      width: 190,
      ellipsis: true,
      render: (text) => (<TooltipCustom text={formatNumber(text)} />),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    },
    {
      title: t('common:download_csv'),
      key: '',
      dataIndex: '',
      width: 200,
      align: 'center',
      render: (_text, record) => (
        <Action>
          <Button icon={<DownloadOutlined />} className="order" onClick={() => onDownloadCSV(record)}>{t('common:download_csv')}</Button>
        </Action>
      ),
      rules: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }
  ]

  return [
    ...Column.order({
      pagination,
      rulesOrder: [USER_ROLE.NISSHOKEN_SUPER_ADMIN, USER_ROLE.NISSHOKEN_ADMIN, USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR]
    }),
    ...column
  ]
}
