import dynamic from 'next/dynamic'
// Import from antd
import { Space, Card, Statistic, Divider, Typography } from 'antd'
import { AUD, USD, EURO, JPY, numberFormat } from "@ss-fe-fw/shared/ui"
import { AtomStockItem } from '@ss-fe-fw/atoms'

export interface MCWidgetStatisticProps {
  kind?: string;
  title: string;
  value: number;
  precision?: number;
  prefix?: any;
  suffix?: any;
  footer?: {
    title: string;
    value: number | string;
    currency?: string;
  },
  children?: any;
}

const { Text } = Typography;
const DynamicStatisticTinyArea = dynamic(() => import('../../../atoms/charts/statistic-tiny-area.atom'), { ssr: false })
const DynamicStatisticTinyBar = dynamic(() => import('../../../atoms/charts/statistic-tiny-bar.atom'), { ssr: false })

const mockChartData = [
  264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539,
  243, 226, 192,
];

export function MCWidgetStatistic(props: MCWidgetStatisticProps) {
  return (
    <Card className="box-widget-statistic">
      <Statistic precision={props.precision ?? 0} title={props.title} value={props.value} prefix={props.prefix} suffix={props.suffix}/>
      <Space className="box-widget-statistic__space-content" wrap style={{ marginBottom: 0, height: 46 }}>
        {props.kind === 'stocks' &&
          <>
            <AtomStockItem type={true} title="Product One" value={12} style={{ marginRight: 16 }} />
            <AtomStockItem type={false} title="Product Two" value={1} style={{ marginRight: 16 }} />
          </>
        }
        {props.kind === 'area' && <DynamicStatisticTinyArea data={mockChartData} />}
        {props.kind === 'bar' && <DynamicStatisticTinyBar data={mockChartData} />}
      </Space>
      {!props.kind && props.children}
      <Divider style={{ margin: '8px auto' }} />
      {props.footer &&
        <Text className="box-widget-statistic__text-has-ellipsis" ellipsis={true}>
          {props.footer.title}&nbsp;
          {(typeof props.footer.value == 'string') && props.footer.value}
          {
            ((!props.footer.currency || props.footer.currency === null) && (typeof props.footer.value == 'number')) &&
              numberFormat(props.footer.value)
          }
          {props.footer.currency === 'AUD' && AUD(props.footer.value).format()}
          {props.footer.currency === 'USD' && USD(props.footer.value).format()}
          {props.footer.currency === 'EURO' && EURO(props.footer.value).format()}
          {props.footer.currency === 'JPY' && JPY(props.footer.value).format()}
        </Text>
      }

      <style jsx global>{`
      .box-widget-statistic__space-content, .box-space-content__stocks {
        gap: 0 !important;
      }
      .box-widget-statistic__text-has-ellipsis {
        width: calc(100% - 10px)
      }
      `}</style>
    </Card>
  )
}

export default MCWidgetStatistic;
