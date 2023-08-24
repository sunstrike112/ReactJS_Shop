import { TinyArea } from '@ant-design/charts'
export interface AtomStatisticTinyAreaProps {
  height?: number;
  fillColor?: string;
  data: number[];
}

export function AtomStatisticTinyArea(props: AtomStatisticTinyAreaProps) {
  const config = {
    height: props.height ?? 46,
    autoFit: false,
    data: props.data,
    smooth: true,
    areaStyle: { fill: props.fillColor ?? '#d6e3fd' },
  };
  return (
    <div className="box-tiny-area">
      <TinyArea {...config} />
      <style jsx global>{`
        .box-tiny-area canvas {
          width: 100% !important;
        }
        `}</style>
    </div>
  );
}

export default AtomStatisticTinyArea
