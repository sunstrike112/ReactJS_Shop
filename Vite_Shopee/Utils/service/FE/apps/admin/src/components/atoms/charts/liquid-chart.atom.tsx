import { Liquid } from '@ant-design/charts';
export interface AtomLiquidProps {
}

export function AtomLiquid(props: AtomLiquidProps) {
  var config: any = {
    width: 80,
    height: 80,
    percent: 0.55,
    outline: {
      border: 1,
      distance: 1,
    },
    wave: { length: 128 },
    statistic: {
      content: {
        style: {
          fontSize: 12,
          color: '#fff'
        }
      }
    }
  };
  return <Liquid {...config} />;
}

export default AtomLiquid
