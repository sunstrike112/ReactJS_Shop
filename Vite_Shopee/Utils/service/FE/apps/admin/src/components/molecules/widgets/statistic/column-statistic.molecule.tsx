import React, { useState } from 'react'
import dynamic from 'next/dynamic'
// Import from antd
import { Typography, Row, Col, List, Avatar } from 'antd'
// Import from local

/* eslint-disable-next-line */
export interface MCColumnStatisticProps {
  chartTitle?: string;
  listTitle?: string;
}

const DynamicStatisticColumnChart = dynamic(() => import('../../../atoms/charts/statistic-column-chart.atom'), { ssr: false })
const { Text } = Typography;

const columnData = [
  {
    type: '01/2020',
    sales: 38,
  },
  {
    type: '02/2020',
    sales: 52,
  },
  {
    type: '03/2020',
    sales: 61,
  },
  {
    type: '04/2020',
    sales: 145,
  },
  {
    type: '05/2020',
    sales: 48,
  },
  {
    type: '06/2020',
    sales: 38,
  },
  {
    type: '07/2020',
    sales: 38,
  },
  {
    type: '08/2020',
    sales: 38,
  },
  {
    type: '09/2020',
    sales: 100,
  },
  {
    type: '10/2020',
    sales: 208,
  },
  {
    type: '11/2020',
    sales: 38,
  },
  {
    type: '12/2020',
    sales: 98,
  },
];

const listData = [
  {
    title: 'Product 1',
    icon: <Avatar style={{ backgroundColor: '#314659', color: '#fff' }}>1</Avatar>
  },
  {
    title: 'Product 2',
    icon: <Avatar style={{ backgroundColor: '#314659', color: '#fff' }}>2</Avatar>
  },
  {
    title: 'Product 3',
    icon: <Avatar style={{ backgroundColor: '#314659', color: '#fff' }}>3</Avatar>
  },
  {
    title: 'Product 4',
    icon: <Avatar style={{ backgroundColor: '#fafafa', color: '#000' }}>4</Avatar>
  },
  {
    title: 'Product 5',
    icon: <Avatar style={{ backgroundColor: '#fafafa', color: '#000' }}>5</Avatar>
  },
  {
    title: 'Product 6',
    icon: <Avatar style={{ backgroundColor: '#fafafa', color: '#000' }}>6</Avatar>
  },
  {
    title: 'Product 7',
    icon: <Avatar style={{ backgroundColor: '#fafafa', color: '#000' }}>7</Avatar>
  }
]

export function MCColumnStatistic(props: MCColumnStatisticProps) {

  const columnProps = {
    data: columnData,
    xField: 'type',
    yField: 'sales',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: { alias: 'Category' },
      sales: { alias: 'Sales' },
    },
  }

  return (
    <>
      <Row gutter={32} className="box-sales-column-statistic">
        <Col xs={24} sm={24} md={24} lg={16} xl={16} style={{ marginBottom: 32 }}>
          <Text strong style={{ marginBottom: 16, display: 'flex' }}>{props.chartTitle}</Text>
          <DynamicStatisticColumnChart {...columnProps} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Text strong style={{ marginBottom: 16, display: 'flex' }}>{props.listTitle}</Text>
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={listData}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.icon}
                  title={item.title}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <style jsx global>{`
      .box-sales-column-statistic .ant-list-items li.ant-list-item {
        padding: 5px 0px;
        border-bottom: none;
      }
      .box-sales-column-statistic .box-column-chart canvas {
        height: 300px !important;
        width: 100% !important;
      }
      `}</style>
    </>
  )
}

export default MCColumnStatistic
