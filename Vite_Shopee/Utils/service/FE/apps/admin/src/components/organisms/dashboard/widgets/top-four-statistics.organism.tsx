// Import from antd
import { Row, Col } from 'antd'
// Import from local
import { MCWidgetStatistic } from '@ss-fe-fw/molecules'

/* eslint-disable-next-line */
export interface OGTopFourStatisticProps {}

export function OGTopFourStatistic(props: OGTopFourStatisticProps) {
  return (
    <>
      <Row gutter={16} className="box-statistics">
        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <MCWidgetStatistic
            kind="stocks"
            title="Total Sales"
            value={126560}
            precision={2}
            prefix="$"
            footer={{ title: "Daily Sales", value: 12650, currency: 'AUD' }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <MCWidgetStatistic
            kind="area"
            title="Visits"
            value={8846}
            footer={{ title: "Daily Visits", value: 1234, currency: null }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <MCWidgetStatistic
            kind="bar"
            title="Payments"
            value={126560}
            footer={{ title: "Conversion Rate", value: "60%" }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <MCWidgetStatistic
            kind="area"
            title="Total Customer Activated"
            value={3500}
            footer={{ title: "Daily Customer Activated", value: 120 }}
          />
        </Col>
      </Row>
      <style jsx global>{`
      .box-statistics .ant-col {
        padding-bottom: 16px;
      }
      `}</style>
    </>
  )
}

export default OGTopFourStatistic
