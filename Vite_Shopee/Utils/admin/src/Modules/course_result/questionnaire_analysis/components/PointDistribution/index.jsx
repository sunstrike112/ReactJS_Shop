/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import { Empty, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import styled from 'styled-components'
import { maxBy } from 'lodash'

import { useQuestionnaire } from 'Hooks'
import { formatNumber } from 'Utils'
import { Loading } from 'Components'

import { TableStyle } from '../../../component/TableSort'

const WIDTH_CHART = 520

const PointDistributionStyled = styled.div`
  padding: 0 0 64px 0;

  .point-chart{
    // margin: 0 auto;
    min-width: 420px;
    max-width: ${WIDTH_CHART + 40}px;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    margin-bottom: 24px;
    padding: 20px 0;
    background-color: #fff;

    .chart-title {
      text-align: center;
    }
  }


  .table-style {
    // margin: 16px auto;
    max-width: 720px;

    .table-title {
      margin-bottom: 0;
    }
  }

  .ant-table-thead {
    tr{
      .ant-table-cell {
        background-color: #FFFCD3;
        &:last-child{
          background-color: transparent;
        }
      }
    }
  }
`

export default function PointDistribution({ pointData }) {
  const { t } = useTranslation(['courseResult'])

  const {
    chartPoint: { data, isLoading },
    loadAnalysisTestChartPointAction
  } = useQuestionnaire()

  const getMostResult = (dt) => maxBy(dt, (o) => o.numberUser)?.numberUser || []

  const columns = useMemo(
    () => [
      { title: ' ', render: () => t('questionnaire_people_number') },
      ...data.map((m) => ({
        title: `${m.distancePoint} ${t('questionnaire_point')}`,
        dataIndex: m.distancePoint,
        key: m.distancePoint,
        render: (text) => formatNumber(text)
      })),
      {
        title: t('questionnaire_total'),
        width: 100,
        align: 'center',
        render: (_text, record) => formatNumber(Object.keys(record).reduce((acc, key) => acc + record[key], 0))
      }
    ],
    [t, data]
  )

  useEffect(() => {
    if (pointData?.unitTestId) {
      loadAnalysisTestChartPointAction({
        params: {
          companyId: pointData.companyId,
          courseId: pointData.courseId,
          version: pointData.version,
          unitTestId: pointData.unitTestId
        }
      })
    }
  }, [pointData])

  const getData = useMemo(
    () => {
      const dataCl = {}
      data.forEach((obj) => {
        dataCl[obj.distancePoint] = obj.numberUser
      })
      return Object.keys(dataCl).length ? [dataCl] : []
    }, [data]
  )

  return isLoading ? <Loading size="default" height={180} tip={t('questionnaire_calculating')} /> : (
    <PointDistributionStyled>
      {data?.length === 0 && (<Empty description={t('questionnaire_answer_test_result_point_empty')} />)}
      {data?.length > 0 && (
        <>
          <div className="point-chart">
            <Typography.Paragraph strong className="chart-title">{t('questionnaire_answer_test_result_point')}</Typography.Paragraph>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{
                  top: 16,
                  right: 32,
                  left: 0,
                  bottom: 24
                }}
              >
                <CartesianGrid strokeDasharray="3 2" />
                <YAxis
                  tickCount={getMostResult(data) + 1}
                  interval="preserveStart"
                  allowDecimals={false}
                  label={{ value: t('questionnaire_people_number'), position: 'left', offset: -20, angle: -90 }}
                />
                <XAxis
                  allowDecimals={false}
                  label={{ value: t('questionnaire_point_analysis'), position: 'insideBottom', offset: -16 }}
                  dataKey="distancePoint"
                  tickFormatter={(a) => `${a} ${t('questionnaire_point')}`}
                />
                <Bar
                  minPointSize={2}
                  barSize={48 || undefined}
                  dataKey="numberUser"
                  fill="#69A4FF"
                  label={{ position: 'top' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <TableStyle
            title={() => <Typography.Paragraph strong className="table-title">{t('questionnaire_answer_test_result_point_table')}</Typography.Paragraph>}
            size="small"
            className="table-style"
            dataSource={getData}
            loading={isLoading}
            columns={columns}
            pagination={false}
            rowKey="distancePoint"
            bordered
          />
        </>
      )}
    </PointDistributionStyled>
  )
}

PointDistribution.propTypes = {
  pointData: PropTypes.any
}
