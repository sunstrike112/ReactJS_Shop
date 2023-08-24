// Import from antd
import { Space, Card, Statistic, Divider, Typography } from 'antd'
import { StockItemIncreaseSvg, StockItemDecreaseSvg } from './stock-svg';
import Icon from '@ant-design/icons';

const StockItemIncreaseIcon = (props: any) => <Icon component={StockItemIncreaseSvg} {...props} />;
const StockItemDecreaseIcon = (props: any) => <Icon component={StockItemDecreaseSvg} {...props} />;

export interface AtomStockItemProps {
  title: string;
  value: number;
  style?: any;
  type?: boolean; // true is increase, false is decrease
  children?: any;
}

export function AtomStockItem(props: AtomStockItemProps) {
  return (
    <div style={props.style}>
      {props.title}&nbsp;{props.value + '%'}&nbsp;
      {props.type && <StockItemIncreaseIcon style={{ fontSize: 12, color: '#f5222d' }} />}
      {!props.type && <StockItemDecreaseIcon style={{ fontSize: 12, color: '#52c41a' }} />}
    </div>
  )
}

export default AtomStockItem
