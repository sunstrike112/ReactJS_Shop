import React, { useState } from 'react'
import dynamic from 'next/dynamic'
// Import from antd
import { Row, Col, Card } from 'antd'
// Import from local
import { MCColumnStatistic } from '@ss-fe-fw/molecules'

/* eslint-disable-next-line */
export interface OGSalesAndVisitsStatisticProps {}

export function OGSalesAndVisitsStatistic(props: OGSalesAndVisitsStatisticProps) {
  const [key, setKey] = useState('sales')
  const tabList = [
    {
      key: 'sales',
      tab: 'Sales',
    },
    {
      key: 'visits',
      tab: 'Visits',
    }
  ]

  const contentList = {
    sales: <MCColumnStatistic chartTitle="Stores Sales Trend" listTitle="Sales Ranking" />,
    visits: <MCColumnStatistic chartTitle="Visits Trend" listTitle="Visits Ranking" />,
  }

  const onTabChange = (key, type) => {
    // console.log(key, type);
    setKey(key);
  };

  return (
    <>
      <Card
        tabList={tabList}
        activeTabKey={key}
        onTabChange={key => onTabChange(key, 'key')}
      >
        {contentList[key]}
      </Card>
    </>
  )
}

export default OGSalesAndVisitsStatistic
