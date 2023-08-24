// Import from antd
import { Space } from 'antd'
// Import from local
import OGTopFourStatistic from './widgets/top-four-statistics.organism'
import OGSalesAndVisitsStatistic from './widgets/sales-visits-statistics.organism'

/* eslint-disable-next-line */
export interface OGDashboardProps {}

export function OGDashboard(props: OGDashboardProps) {
  return (
    <>
      <Space direction="vertical">
        <OGTopFourStatistic />
        <OGSalesAndVisitsStatistic />
      </Space>
    </>
  );
}

export default OGDashboard;
