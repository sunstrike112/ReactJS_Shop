// Import from antd
import { Space } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { Navigation } from './navigation';
import { StepsCustom } from './progress-bar';

/* eslint-disable-next-line */
interface BookingContentProps {
  currentStep: number;
  children: any;
}

export function BookingContent(props: BookingContentProps) {
  // responsive
  const screens = useBreakpoint();

  // rendering
  return (
    <>
      <Space direction='vertical' size={screens['xs'] ? 40 : 54} className='booking-step'>
        <Navigation/>
        <StepsCustom activeStep={props.currentStep}/>
        {props.children}
      </Space>
      <style jsx global>{`
        .booking-step {
          width: 100%;
          padding: ${screens['xs'] ? '0 21px 0 21px' : '0 190px 0 190px'};
          background: #FFFFFF;
        }
        .booking-step>.ant-space-item {
          width: 100%;
        }
      `}</style>
    </>
  );
}

export default BookingContent;
