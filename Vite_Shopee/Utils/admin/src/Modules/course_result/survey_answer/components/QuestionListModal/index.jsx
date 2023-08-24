/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Row, Col, Radio, Checkbox, Input } from 'antd'

import './index.css'
import { Modal, Text } from 'Components'
import Table from '../../../component/TableSort'
import { ModalWrapper, TextWrapper, TextQuestion, InputWrapper } from './styled'

const { TextArea } = Input

const QuestionListModal = ({
  onClose,
  visible,
  errors,
  surveyDetail,
  recordSelected,
  loadSurveyAnswerDetailAction
}) => {
  const { t } = useTranslation(['courseResult'])

  const renderSelectOne = (record) => (
    <InputWrapper>
      <TextQuestion>{record.questionName.split('\n').map((str) => <p>{str}</p>)}</TextQuestion>
      {record.listAnswer && record.listAnswer.map((answer) => (
        <Row>
          <Col span={1}>
            <Radio defaultChecked={answer?.selectedAnswer} />
          </Col>
          <Col span={23}>
            <TextWrapper style={{ color: 'black' }}>{answer?.answerText}</TextWrapper>
          </Col>
        </Row>
      ))}
    </InputWrapper>
  )

  const renderSelectMulti = (record) => (
    <InputWrapper>
      <TextQuestion>{record.questionName.split('\n').map((str) => <p>{str}</p>)}</TextQuestion>
      {record.listAnswer && record.listAnswer.map((answer) => (
        <Row>
          <Col span={1}>
            <Checkbox defaultChecked={answer?.selectedAnswer} />
          </Col>
          <Col span={23}>
            <TextWrapper style={{ color: 'black' }}>{answer?.answerText}</TextWrapper>
          </Col>
        </Row>
      ))}
    </InputWrapper>
  )

  const renderDescription = (record) => (
    <>
      <Text.primary>{record.questionName.split('\n').map((str) => <p>{str}</p>)}</Text.primary>
      <TextArea rows={4} style={{ color: 'black' }} disabled defaultValue={record?.answerText} />
    </>
  )

  const columns = [
    {
      title: 'No.',
      dataIndex: 'courseId',
      width: 60,
      align: 'right',
      key: (record) => record.id,
      render: (text, record, index) => (
        <div>{(surveyDetail.pageQuestionSurvey.page - 1) * surveyDetail.pageQuestionSurvey.limit + index + 1}</div>
      )
    },
    {
      title: t('question'),
      dataIndex: 'questionName',
      ellipsis: true,
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
    const { courseId, unitSurveyId: surveyId } = recordSelected
    loadSurveyAnswerDetailAction({
      userId: recordSelected.userId,
      courseId,
      surveyId,
      params: {
        page: tablePaging.current,
        limit: tablePaging.pageSize
      }
    })
  }

  return (
    <Modal
      visible={visible}
      onCancel={() => onClose(false)}
      title={t('question_list_modal')}
      disabledSubmit={!isEmpty(errors)}
      isNotFooterButton
    >
      <ModalWrapper>
        <Row justify="center" align="middle" className="modal-header" gutter={[4, 4]}>
          <div className="unitBox">
            <Text.primary className="title" fontSize="size_14">{t('survey_name')}</Text.primary>
            <Text.primary className="value" fontSize="size_14">{surveyDetail?.surveyName}</Text.primary>
          </div>
        </Row>
        <Table
          locale={{ emptyText: t('common:empty_data') }}
          dataSource={surveyDetail.pageQuestionSurvey.result}
          columns={columns}
          total={surveyDetail.pageQuestionSurvey.total}
          currentPage={surveyDetail.pageQuestionSurvey.page}
          pageSize={surveyDetail.pageQuestionSurvey.limit}
          onChange={handleTableChange}
        />
      </ModalWrapper>
    </Modal>
  )
}

export default QuestionListModal
