import { Column } from '@ant-design/charts'
export interface AtomStatisticColumnChartProps {
  xField: string;
  yField: string;
  data: any;
  xAxis: {
    label: {
      autoHide?: boolean,
      autoRotate?: boolean,
    },
  },
  meta: {
    type: { alias: string, },
    sales: { alias: string, },
  },
}

export function AtomStatisticColumnChart(props: AtomStatisticColumnChartProps) {
  return (
    <div className="box-column-chart">
      <Column {...props} />
      <style jsx global>{`
      `}</style>
    </div>
  );
}

export default AtomStatisticColumnChart
