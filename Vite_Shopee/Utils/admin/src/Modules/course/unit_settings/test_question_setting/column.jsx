/* eslint-disable react/no-danger */
import { Column } from 'Constants'
import React from 'react'
import { RoutesName } from '../../routes'

export default ({ t, pagination, history, courseId, unitId, createBy, isViewing }) => {
  const column = [
    {
      title: t('question_setting.question_type'),
      dataIndex: 'questionType',
      key: 'questionId'
    },
    {
      title: t('question_setting.question_text'),
      dataIndex: 'questionTextHtml',
      key: 'questionId',
      render: (questionTextHtml) => <div dangerouslySetInnerHTML={{ __html: questionTextHtml }} />,
      ellipsis: true
    },
    {
      title: t('question_setting.point_allocation'),
      dataIndex: 'pointAllocation',
      key: 'questionId'
    }
  ]

  const onView = (record) => history.push(`${RoutesName.EDIT_QUESTION}/${courseId}/${unitId}/question/${record.questionId}?createBy=${createBy}`)

  const onEdit = (record) => history.push(`${RoutesName.EDIT_QUESTION}/${courseId}/${unitId}/question/${record.questionId}?createBy=${createBy}`)

  return [
    ...Column.orderAction({
      t,
      pagination,
      onView: isViewing && onView,
      onEdit: !isViewing && onEdit
    }),
    ...column
  ]
}
