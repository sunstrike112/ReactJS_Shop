/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Radio, Checkbox, Input } from 'antd'
import { useReportResult } from 'Hooks'
import { stripHTML } from 'Utils/string'
import { Block } from 'Themes/facit'
import { Title } from 'Components'

const { TextArea } = Input

const Questions = ({
  report
}) => {
  const { t } = useTranslation(['courseResult'])

  const { questions, loadReportQuestionsAction } = useReportResult()

  const renderSelectOne = (record) => (
    <>
      <span>{record.questionName}</span>
      {record.listAnswer && record.listAnswer.map((answer) => (
        <>
          <Radio style={{ margin: 10 }} disabled />{answer.answerText}
        </>
      ))}
    </>
  )

  const renderSelectMulti = (record) => (
    <>
      <span>{record.questionName}</span>
      {record.listAnswer && record.listAnswer.map((answer) => (
        <>
          <Checkbox style={{ margin: 10 }} disabled />{answer.answerText}
        </>
      ))}
    </>
  )

  const renderDescription = (record) => (
    <>
      <span>{stripHTML(record.questionName)}</span>
      <TextArea style={{ color: '#323232' }} rows={4} disabled value={record.answerTextDescription} />
    </>
  )

  const columns = useMemo(() => [
    {
      title: 'No.',
      dataIndex: 'courseId',
      width: 60,
      align: 'right',
      key: (record) => record.surveyId,
      render: (text, record, index) => (
        <div>{index + 1}</div>
      )
    },
    {
      title: () => t('question'),
      dataIndex: 'questionName',
      render: (text, record) => {
        switch (record.questionType) {
          case 'SELECT_ONE': {
            return renderSelectOne(record)
          }

          case 'CHOOSE_MANY': {
            return renderSelectMulti(record)
          }

          default: {
            return renderDescription(record)
          }
        }
      }
    }
  ], [])

  useEffect(() => {
    if (report) {
      loadReportQuestionsAction({
        courseId: report.courseId,
        reportId: report.reportId,
        userId: report.userId
      })
    }
  }, [report])

  return (
    <>
      <Title title={t('submitted_content')} />
      <Block>
        {(report?.submitStatus && report?.submitStatus !== 'NEW') ? (
          <Table
            dataSource={questions}
            columns={columns}
            rowKey="index"
            pagination={false}
          />
        ) : (<span>{t('not_submit_report')}</span>)}
      </Block>
    </>
  )
}

export default Questions
