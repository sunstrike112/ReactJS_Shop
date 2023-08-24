// Import from antd
import { Steps } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Step } = Steps;

/* eslint-disable-next-line */
export interface StepsCustomProps {
  activeStep?: number;
  children?: any;
}

export function StepsCustom(props: StepsCustomProps) {
  const screens = useBreakpoint();
  const steps = ['Vehicle', 'Services', 'Appointment', 'Contact & Book'];

  return (
    <>
      <Steps
        type="navigation" initial={0} current={props.activeStep ? props.activeStep - 1 : 0} className="steps-custom">
          {[...Array(steps.length)].map((x, i) => {
            return (
              <Step key={i} icon={<></>} title={screens['xs'] ? `${i+1}`.padStart(2, '0') + '.' : `${i+1}`.padStart(2, '0') + `. ${steps[i]}`}/>
            );
          })}
      </Steps>
      <style jsx global>{`
        .steps-custom.ant-steps-navigation {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          
          box-shadow: 0px -1px 0 0 #EAECEF inset;
        }
        .steps-custom.ant-steps-navigation .ant-steps-item::before {
          background-color: #1D1655;
          height: 4px;
        }
        .steps-custom.ant-steps-navigation .ant-steps-item::after {
          display: none;
        }
        .steps-custom.ant-steps-navigation .ant-steps-item {
          padding-left: 0px;
          text-align: left;
        }
        .steps-custom.ant-steps-navigation .ant-steps-item-container {
          margin-left: 0px;
        }
        .steps-custom.ant-steps-navigation .ant-steps-item-process .ant-steps-item-title {
          font-size: 14px;
          line-height: 22px;
          font-weight: bold;
          color: #1D1655;
        }
        .steps-custom.ant-steps-navigation .ant-steps-item-wait .ant-steps-item-title {
          font-size: 14px;
          line-height: 22px;
          color: #888E9C;
        }
        .steps-custom.ant-steps-navigation .ant-steps-item-finish .ant-steps-item-title {
          font-size: 14px;
          line-height: 22px;
          color: #272F3E;
        }
      `}</style>
    </>
  );
}

export default StepsCustom;