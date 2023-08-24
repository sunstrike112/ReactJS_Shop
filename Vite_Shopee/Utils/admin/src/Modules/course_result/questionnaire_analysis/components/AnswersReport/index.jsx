/* eslint-disable no-unused-vars */
/* eslint-disable react/no-danger */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Brush, ReferenceLine } from 'recharts'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Empty, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { maxBy } from 'lodash'

import { formatNumber } from 'Utils'
import { Loading, Modal } from 'Components'

import { sanitize } from 'dompurify'
import { TableStyle } from '../../../component/TableSort'
import TestDescription from '../TestDescription'
import { StyledQuestionWrapper } from './styled'

const WIDTH_COLUMN_ANSWER = 100
const BAR_SIZE = 48

const ANSWER_TYPE = {
  SELECT_ONE: 'SELECT_ONE',
  CHOOSE_MANY: 'CHOOSE_MANY',
  DESCRIPTION: 'DESCRIPTION'
}

const COLORS_CHART = [
  '#69A4FF',
  '#C0504D',
  '#9BB333',
  '#8884D8',
  '#08979c',
  '#faad14',
  '#eb2f96',
  '#722ed1',
  '#ff7a45',
  '#faa222',
  '#2f54eb',
  '#9254de',
  '#f759ab',
  '#73c033',
  '#36cfb0',
  '#cf1322',
  '#096dd9',
  '#d46b08',
  '#7cb305',
  '#531dab',
  '#08979c',
  '#c41d7f',
  '#8c8c8c',
  '#277da1',
  '#43aa8b'
]

const AnswerReportStyled = styled.div`
  padding: 0 0 24px 0;

  .answer-chart {
    // margin: 0 auto;
    min-width: 600px;
    width: ${({ widthC }) => (widthC ? `${widthC + 40}px` : '100%')};
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    margin-bottom: 24px;
    padding-top: 20px;
    background-color: #fff;

    .chart-title {
      text-align: center;
    }
  }

  .table-style {
    // margin: 16px auto;
    max-width: ${({ widthT }) => (widthT ? `${WIDTH_COLUMN_ANSWER * widthT + 200}px` : '100%')};
  }
`

export default function AnswersReport({ answerData, chartAnswer, chartAction }) {
  const { t } = useTranslation(['courseResult'])
  const { i18n } = useTranslation()
  const { data, isLoading } = chartAnswer
  const [dataC, setDataC] = useState([])
  const [widthC, setWidthC] = useState()
  const [detail, setDetail] = useState(null)

  const getMostResult = (dt) => maxBy(dt, (o) => o.result?.length)?.result || []
  const getAllResult = (dt) => dt.reduce((acc, cur) => [...acc, ...cur.result], [])
  const mostResult = useMemo(() => getMostResult(data), [data])
  const maxAnswerAmount = useMemo(() => {
    const amount = maxBy(getAllResult(data), (o) => (o.selectAnswerAmount === '-' ? 0 : +o.selectAnswerAmount))
    return amount?.selectAnswerAmount || 0
  }, [data]) || 0

  const getData = useMemo(
    () => data.map((m) => {
      const dataCl = {}
      m.result.forEach((obj) => {
        dataCl[obj.answerName] = obj.selectAnswerAmount
      })
      return { ...m, ...dataCl }
    }), [data]
  )

  useEffect(() => {
    setWidthC(mostResult.length * BAR_SIZE * dataC.length)
  }, [dataC, mostResult])

  useEffect(() => {
    if ((answerData?.unitTestId || answerData?.unitSurveyId) && !isLoading) {
      chartAction({
        params: {
          companyId: answerData.companyId,
          courseId: answerData.courseId,
          version: answerData.version,
          unitTestId: answerData.unitTestId,
          unitSurveyId: answerData.unitSurveyId
        }
      })
    }
  }, [answerData])

  useEffect(() => {
    setDataC(data.filter((f) => f.questionType !== ANSWER_TYPE.DESCRIPTION).map((m) => {
      const merge = {}
      mostResult.forEach((r) => {
        merge[r.answerName] = 0
      })
      m.result.forEach((obj) => {
        merge[obj.answerName] = obj.selectAnswerAmount
      })
      return {
        questionName: m.questionName,
        ...merge
      }
    }))
  }, [mostResult])

  const columns = useMemo(
    () => [
      { title: t('questionnaire_question'), width: 300, dataIndex: 'questionName', key: 'questionName' },
      ...(mostResult.length > 0 ? mostResult : [{ answerName: ' ' }]).map((m, index) => ({
        title: `${t('questionnaire_answer_legend')} ${m.answerName}`,
        dataIndex: m.answerName,
        key: m.answerName,
        width: WIDTH_COLUMN_ANSWER,
        render: (text, record) => {
          if (record.questionType === ANSWER_TYPE.DESCRIPTION && index === 0) {
            return <Button onClick={() => setDetail(record)}>{t('questionnaire_answer_detail')}</Button>
          }
          return formatNumber(text)
        }
      }))
    ],
    [t, data, mostResult]
  )

  return isLoading ? <Loading size="default" height={180} tip={t('questionnaire_calculating')} /> : (
    <AnswerReportStyled
      widthC={widthC > (window.innerWidth - 210) ? undefined : widthC}
      widthT={mostResult.length > 12 ? undefined : mostResult.length < 2 ? 2 : mostResult.length}
    >
      {data?.length === 0 && (<Empty description={t('questionnaire_answer_test_result_answer_empty')} />)}
      {data?.length > 0 && (
        <>
          {mostResult?.length ? (
            <div className="answer-chart">
              <Typography.Paragraph strong className="chart-title">{t('questionnaire_answer_test_result_answer')}</Typography.Paragraph>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={dataC}
                  margin={{
                    top: 24,
                    right: 32,
                    left: 0,
                    bottom: 48
                  }}
                >
                  <CartesianGrid strokeDasharray="3 2" />
                  <Legend
                    verticalAlign="top"
                    wrapperStyle={{ top: 0 }}
                    formatter={(value) => <span style={{ marginRight: 16 }}>{`${t('questionnaire_answer_legend')} ${value}`}</span>}
                  />
                  <YAxis tickCount={+maxAnswerAmount ? +maxAnswerAmount + 1 : 2} interval="preserveStartEnd" allowDecimals={false} />
                  <XAxis
                    label={{ value: t('questionnaire_answer_analysis'), position: 'insideBottom', offset: -52 }}
                    dataKey="questionName"
                    tickFormatter={(a) => `${t('questionnaire_question')} ${a}`}
                  />
                  <ReferenceLine y={0} stroke="#000" />
                  <Brush
                    dataKey="questionName"
                    height={32}
                    stroke="#8884d8"
                    endIndex={Math.floor(widthC / (window.innerWidth + 250)) > 0 ? Math.floor(widthC / (window.innerWidth + 250)) : undefined}
                  />
                  {mostResult?.map((m, id) => (
                    <Bar
                      barSize={BAR_SIZE || undefined}
                      minPointSize={2}
                      dataKey={m.answerName}
                      fill={COLORS_CHART[id > id % COLORS_CHART.length ? Math.ceil(id % COLORS_CHART.length) : id]}
                      label={{ position: 'top' }}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : <></>}
          <TableStyle
            size="small"
            className="table-style"
            dataSource={getData}
            loading={isLoading}
            columns={columns}
            pagination={data.length <= 10 ? false : {
              className: `${i18n.language === 'jp' ? 'pagination-jp' : ''}`,
              showQuickJumper: true,
              showSizeChanger: true,
              locale: { items_per_page: `/ ${t('common:page')}`, jump_to: t('common:go_to'), page: i18n.language === 'jp' ? null : t('common:page') }
            }}
            rowKey="questionId"
            bordered
          />
        </>
      )}
      <Modal
        destroyOnClose
        visible={Boolean(detail)}
        width={900}
        title={<>{`${answerData.unitTestName || answerData.unitSurveyName || '---'} - ${t('questionnaire_question')} ${detail?.questionName} (${t('questionnaire_answer_description')})`}</>}
        onCancel={() => setDetail(null)}
        onSubmit={() => setDetail(null)}
        cancel={false}
        onSubmitText={t('questionnaire_close')}
      >
        <StyledQuestionWrapper>
          <Typography.Paragraph>{`${t('questionnaire_question')} ${detail?.questionName || ''} :`}</Typography.Paragraph>&nbsp;
          <div className="content" dangerouslySetInnerHTML={{ __html: sanitize(`${detail?.questionContent || ''}`) }} />
        </StyledQuestionWrapper>
        <TestDescription detail={detail} answerData={answerData} />
      </Modal>
    </AnswerReportStyled>
  )
}

AnswersReport.propTypes = {
  answerData: PropTypes.any,
  chartAnswer: PropTypes.any,
  chartAction: PropTypes.any
}
