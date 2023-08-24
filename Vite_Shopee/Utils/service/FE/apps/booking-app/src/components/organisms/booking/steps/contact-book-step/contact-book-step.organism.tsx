// Import from antd
import React, { useEffect } from 'react';
import { Space, Typography } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { OGBasePageComponent } from '@ss-fe-fw/booking/organisms';
import { useSetRecoilState } from 'recoil';
import { bookingStepState } from '@ss-fe-fw/booking/stores';
import { BOOKING_STEPS } from '@ss-fe-fw/booking/constants';

const { Text } = Typography;

/* eslint-disable-next-line */
interface ContactBookStepProps {
  children?: any;
  style?: any;
}

export function ContactBookStep(props: ContactBookStepProps) {
  // responsive
  const screens = useBreakpoint();

  // global states
  const setBookingStep = useSetRecoilState(bookingStepState);

   // effects
   useEffect(() => {
    setBookingStep(BOOKING_STEPS.CONTACT_BOOK);
  }, []);

  // rendering
  return (
    <OGBasePageComponent>
      <Space direction='vertical' className='contact-select'>
        <Text className='title'>CONTACT DETAILS</Text>
        <Text className='instruction'>Please add your contact details to make a booking</Text>
      </Space>
      <style jsx global>{`
        .contact-select .title {
          font-family: TT Commons;
          font-style: normal;
          font-weight: 900;
          font-size: 24px;
          line-height: 30px;
          
          color: #1D1655;
        }
        .contact-select .instruction {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          
          color: #888E9C;
        }
      `}</style>
    </OGBasePageComponent>
  );
}

export default ContactBookStep;