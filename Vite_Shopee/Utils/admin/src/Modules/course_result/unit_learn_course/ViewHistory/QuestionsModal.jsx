/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Radio, Checkbox, Input } from 'antd'

import { Modal } from 'Components'
import { Column, UNIT_TYPE_UPPERCASE } from 'Constants'
import { EyeOutlined } from '@ant-design/icons'
import { sanitize } from 'dompurify'
import { useUnitStatus } from 'Hooks'
import { DEFAULT_PAG } from 'Utils'
import Table from '../../component/TableSort'

const { TextArea } = Input

const DEFAULT_LIMIT = 20

const QuestionsModal = ({ onClose, recordId, typeSelected }) => {
  const { t } = useTranslation(['courseResult'])

  const {
    unitDetailById,
    paginationDetail,
    loadUnitDetailByIdAction,
    isLoading
  } = useUnitStatus()

  useEffect(() => {
    let params = {
      page: DEFAULT_PAG.page,
      limit: DEFAULT_LIMIT,
      historyId: recordId
    }
    loadUnitDetailByIdAction({ params })
  }, [])

  const renderSelectOne = (record) => (
    <>
      {record.listAnswer && record.listAnswer.map((answer) => (
        <>
          <Radio style={{ margin: 10 }} checked={answer.selectedAnswer} disabled />{answer.answerText}
          <br />
        </>
      ))}
    </>
  )

  const renderSelectMulti = (record) => (
    <>
      {record.listAnswer && record.listAnswer.map((answer) => (
        <>
          <Checkbox style={{ margin: 10 }} checked={answer.selectedAnswer} disabled />{answer.answerText}
          <br />
        </>
      ))}
    </>
  )

  const renderDescriptionQuestion = (record) => (
    <>
      {record.listAnswer && record.listAnswer.map((answer) => (
        <>
          <TextArea style={{ color: '#323232' }} rows={4} disabled value={answer.answerTextDescription} />
          <br />
        </>
      ))}
    </>
  )

  const renderDescriptionSurvey = (record) => (
    <>
      <TextArea style={{ color: '#323232', marginTop: 10 }} rows={4} disabled value={record.answerText} />
      <br />
    </>
  )

  const renderDescriptionReport = (record) => {
    if (record.isDraft) {
      return (
        <>
          <TextArea style={{ color: '#323232', marginTop: 10 }} rows={4} disabled value={record.textDraft} />
          <br />
        </>
      )
    }
    return (
      <>
        <TextArea style={{ color: '#323232', marginTop: 10 }} rows={4} disabled value={record.answerTextDescription} />
        <br />
      </>
    )
  }

  const renderAnswer = (record) => {
    if (record.questionType === 'DESCRIPTION' && typeSelected === UNIT_TYPE_UPPERCASE.SURVEY) {
      return renderDescriptionSurvey(record)
    }
    if (record.questionType === 'DESCRIPTION' && typeSelected === UNIT_TYPE_UPPERCASE.REPORT) {
      return renderDescriptionReport(record)
    }
    switch (record.questionType) {
      case 'SELECT_ONE': return renderSelectOne(record)
      case 'CHOOSE_MANY': return renderSelectMulti(record)
      default: return renderDescriptionQuestion(record)
    }
  }

  const columns = [
    ...Column.order({
      pagination: paginationDetail,
      t
    }),
    {
      title: () => t('question'),
      dataIndex: 'questionName',
      render: (_, record) => (
        <>
          <div dangerouslySetInnerHTML={{ __html: sanitize(record.questionName) }} />
          {renderAnswer(record)}
        </>
      )
    }
  ]

  const handleTableChange = (tablePaging) => {
    document.getElementsByClassName('ant-modal-body')[0].scrollTo(0, 0)
    let params = {
      page: tablePaging.current,
      limit: tablePaging.pageSize,
      historyId: recordId
    }
    loadUnitDetailByIdAction({ params })
  }

  const questionsShow = useMemo(() => {
    if (unitDetailById) {
      if (typeSelected === UNIT_TYPE_UPPERCASE.TEST) return unitDetailById[0]?.listQuestion
      if (typeSelected === UNIT_TYPE_UPPERCASE.SURVEY) return unitDetailById[0]?.listSurvey
      return unitDetailById[0]?.listReport
    } return []
  }, [unitDetailById])

  return (
    <Modal
      visible
      onCancel={() => onClose(false)}
      title={t('viewsHistoryQuestion')}
      isNotFooterButton
      destroyOnClose
      forceRender
      titleIcon={<EyeOutlined />}
    >
      <Table
        dataSource={questionsShow || []}
        columns={columns}
        rowKey={(record) => record?.questionId}
        total={paginationDetail?.total || 1}
        currentPage={paginationDetail?.page || 1}
        pageSize={paginationDetail?.limit || 1}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </Modal>
  )
}

export default QuestionsModal
