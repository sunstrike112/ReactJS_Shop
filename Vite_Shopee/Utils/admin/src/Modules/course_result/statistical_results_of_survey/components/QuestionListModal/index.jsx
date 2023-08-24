/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Row, Radio, Checkbox, Input } from 'antd'
import { UseSurveyResult } from 'Hooks/survey_result'

import './index.css'
import { Modal, Text } from 'Components'
import Table from '../../../component/TableSort'
import { ModalWrapper } from './styled'

const { TextArea } = Input

const QuestionListModal = ({ onClose, visible, errors, survey }) => {
  const { t } = useTranslation(['courseResult'])

  const { questions, questionPagination, loadSurveyQuestionAction } = UseSurveyResult()
  const { total, limit: pageSize, page: currentPage } = questionPagination

  const renderSelectOne = (record) => (
    <>
      <Text.primary>{record.questionName}</Text.primary>
      {record.listAnswer && record.listAnswer.map((answer) => (
        <>
          <Radio style={{ margin: 10 }} disabled />{answer.answerText}
        </>
      ))}
    </>
  )

  const renderSelectMulti = (record) => (
    <>
      <Text.primary>{record.questionName}</Text.primary>
      {record.listAnswer && record.listAnswer.map((answer) => (
        <>
          <Checkbox style={{ margin: 10 }} disabled />{answer.answerText}
        </>
      ))}
    </>
  )

  const renderDescription = (record) => (
    <>
      <Text.primary>{record.questionName}</Text.primary>
      <TextArea rows={4} disabled />
    </>
  )

  const columns = [
    {
      title: 'No.',
      dataIndex: 'courseId',
      width: 60,
      align: 'right',
      key: (record) => record.surveyId,
      render: (text, record, index) => (
        <div>{`${(questionPagination.page - 1) * questionPagination.limit + index + 1}`}</div>
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
  ]

  const handleTableChange = (tablePaging) => {
    document.getElementsByClassName('ant-modal-body')[0].scrollTo(0, 0)
    loadSurveyQuestionAction({
      page: tablePaging.current,
      limit: tablePaging.pageSize,
      courseId: survey.courseId,
      surveyId: survey.surveyId
    })
  }

  useEffect(() => {
    if (survey) {
      loadSurveyQuestionAction({
        courseId: survey.courseId,
        surveyId: survey.surveyId,
        page: 1,
        limit: 100
      })
    }
  }, [survey])

  return (
    <Modal
      visible={visible}
      onCancel={() => onClose(false)}
      title={t('question_list')}
      disabledSubmit={!isEmpty(errors)}
      isNotFooterButton
      destroyOnClose
      forceRender
    >
      <ModalWrapper>
        <Row justify="center" align="middle" className="modal-header" gutter={[4, 4]}>
          <div className="courseBox">
            <Text.primary className="title" fontSize="size_14">{t('course')}</Text.primary>
            <Text.primary className="value" fontSize="size_14">{survey?.courseName}</Text.primary>
          </div>
          <div className="unitBox">
            <Text.primary className="title" fontSize="size_14">{t('unit')}</Text.primary>
            <Text.primary className="value" fontSize="size_14">{survey?.surveyName}</Text.primary>
          </div>
        </Row>
        <Table
          dataSource={questions}
          columns={columns}
          rowKey={(record) => record.questionId}
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          onChange={handleTableChange}
        />
      </ModalWrapper>
    </Modal>
  )
}

export default QuestionListModal
