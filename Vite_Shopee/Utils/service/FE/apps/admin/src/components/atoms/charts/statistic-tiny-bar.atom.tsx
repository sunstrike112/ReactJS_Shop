import { TinyColumn } from '@ant-design/charts'
export interface AtomStatisticTinyBarProps {
  height?: number;
  fillColor?: string;
  data: number[];
}

export function AtomStatisticTinyBar(props: AtomStatisticTinyBarProps) {
  const config = {
    height: props.height ?? 46,
    autoFit: false,
    data: props.data,
    smooth: true,
    areaStyle: { fill: props.fillColor ?? '#d6e3fd' },
  };
  return (
    <div className="box-tiny-bar">
      <TinyColumn {...config} />
      <style jsx global>{`
        .box-tiny-bar canvas {
          width: 100% !important;
        }
        `}</style>
    </div>
  );
}

export default AtomStatisticTinyBar
