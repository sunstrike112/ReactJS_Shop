// Import from antd
import { Card, Typography } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Text } = Typography;

/* eslint-disable-next-line */
export interface ProgressStepProps {
  children?: any;
  step: number;
  stepName: string;
  active: boolean;
}

export function ProgressStep(props: ProgressStepProps) {
  const screens = useBreakpoint();

  return (
    <>
      <Card className={props.active ? 'progress-step active' : 'progress-step inactive'}>
        <Text>{props.step}. {screens['xs'] ? '' : props.stepName}</Text>
      </Card>
      <style jsx global>{`
        .progress-step {
        }
        .progress-step > .ant-card-body {
          padding: 6px;
        }
        .active {
          font-family: Arial;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          line-height: 22px;

          color: #1D1655;
          border-bottom: 4px solid #1D1655;
          border-top: none;
          border-left: none;
          border-right: none;
        }

        .inactive {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 22px;
          
          color: #888E9C;
          border-bottom: 1px solid #EAECEF;
          border-top: none;
          border-left: none;
          border-right: none;
        }
      `}</style>
    </>
  );
}

export default ProgressStep;