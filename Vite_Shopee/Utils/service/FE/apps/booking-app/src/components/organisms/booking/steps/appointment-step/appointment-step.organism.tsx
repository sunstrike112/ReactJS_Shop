// Import from antd
import React, { useEffect, useState } from 'react';
import { Space, Typography, Row, Col, Checkbox , Tooltip} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { OGBasePageComponent } from '@ss-fe-fw/booking/organisms';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { bookingStepState, bookingAppointmentState } from '@ss-fe-fw/booking/stores';
import { getCurrentTime, getMomentDate } from '@ss-fe-fw/shared/ui';
import { BOOKING_STEPS, CALCULATION_FORMAT_MONTH_MOMENT, CALCULATION_FORMAT_DATE_MOMENT } from '@ss-fe-fw/booking/constants';
import DateSelect from './date-select.organism';
import TimeSelect from './time-select.organism';
import StoreInfo from './store-info.organism';

const { Text } = Typography;

/* eslint-disable-next-line */
interface AppointmentStepProps {
  children?: any;
  style?: any;
}

export function AppointmentStep(props: AppointmentStepProps) {
  // responsive
  const screens = useBreakpoint();

  // constants
  const DATE_TIME_SPAN = screens['xs'] ? 24 : 16;
  const STORE_SPAN = screens['xs'] ? 24 : 8;
  const DATE_TIME_PADDING = screens['xs'] ? 0 : 84;
  const STORE_PADDING = screens['xs'] ? 40 : 0;

  // global states
  const setBookingStep = useSetRecoilState(bookingStepState);
  const [bookingAppointment, setBookingAppointment] = useRecoilState(bookingAppointmentState);

  // states
  const [selectedMonth, setSelectedMonth] = useState((bookingAppointment?.selectedDate ? getMomentDate(bookingAppointment.selectedDate) : getCurrentTime()).format(CALCULATION_FORMAT_MONTH_MOMENT));
  const [selectedDate, setSelectedDate] = useState(bookingAppointment?.selectedDate ?? '');
  const [selectedTime, setSelectedTime] = useState(bookingAppointment?.selectedTime ?? '');
  const [shuttleServiceRequired, setShuttleServiceRequired] = useState(bookingAppointment?.shuttleServiceRequired ?? false);
  const [afterHoursKeyDropOff, setAfterHoursKeyDropOff] = useState(bookingAppointment?.afterHoursKeyDropOff ?? false);

  // effects
  useEffect(() => {
    setBookingStep(BOOKING_STEPS.APPOINTMENT);
    
  }, []);

  // handlers
  const handleCalendarDateSelect = (date) => {
    const newSelectedMonth = date.format(CALCULATION_FORMAT_MONTH_MOMENT);
    const newSelectedDate = date.format(CALCULATION_FORMAT_DATE_MOMENT);
    if (newSelectedDate !== selectedDate) {
      setSelectedMonth(newSelectedMonth);
      setSelectedDate(newSelectedDate);
      setSelectedTime('');

      updateBookingState({selectedDate: newSelectedDate, selectedTime: ''});

      // TODO: fetch new time slots of the date
    }
  }

  const handleDateSelect = (date) => {
    if (date !== selectedDate) {
      setSelectedDate(date);
      setSelectedTime('');

      updateBookingState({selectedDate: date, selectedTime: ''});

      // TODO: fetch new time slots of the date
    }
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time);

    updateBookingState({selectedTime: time});
  }

  const handleShuttleServiceRequiredCheck = (e) => {
    const checked = e.target.checked;
    setShuttleServiceRequired(checked);

    updateBookingState({shuttleServiceRequired: checked});
  }

  const handleAfterHoursKeyDropOffCheck = (e) => {
    const checked = e.target.checked;
    setAfterHoursKeyDropOff(checked);

    updateBookingState({afterHoursKeyDropOff: checked});
  }

  // utils
  const updateBookingState = (states: {selectedDate?: string, selectedTime?: string, shuttleServiceRequired?: boolean, afterHoursKeyDropOff?: boolean}) => {
    const defaultState = {
      selectedDate: '',
      selectedTime: '',
      shuttleServiceRequired: false,
      afterHoursKeyDropOff: false
    };
    
    bookingAppointment ? 
      setBookingAppointment(Object.assign({...bookingAppointment}, states)) : 
      setBookingAppointment(Object.assign(defaultState, states));
  }

  // rendering
  return (
    <OGBasePageComponent>
      <Space direction='vertical' className='appointment-select'>
        <Text className='title'>SELECT AN APPOINTMENT</Text>
        <Row gutter={[0, 0]} style={{width: '100%', marginBottom: 40, marginTop: 24}}>
          <Col span={DATE_TIME_SPAN} style={{paddingRight: DATE_TIME_PADDING}}>
            <DateSelect 
              calendarDateSelectHandler={handleCalendarDateSelect} 
              dateSelectHandler={handleDateSelect}
              month={selectedMonth} 
              date={selectedDate} 
              style={{marginBottom: '40px'}}
            />
            <TimeSelect selectHandler={handleTimeSelect} time={selectedTime}/>
          </Col>
          <Col span={STORE_SPAN}>
            <StoreInfo style={{paddingTop: STORE_PADDING}}/>
          </Col>
        </Row>
        <Text className='drop-off-title'>Select drop off options</Text>
        <Space direction='horizontal'>
          <Checkbox checked={shuttleServiceRequired} onChange={handleShuttleServiceRequiredCheck} className='check'>Shuttle service required</Checkbox>
          <Tooltip title='Complimentary return ride within the local area'>
            <InfoCircleOutlined className='info-icon' style={{verticalAlign: '-0.3em'}}/>
          </Tooltip>
        </Space>
        <Space direction='horizontal'>
          <Checkbox checked={afterHoursKeyDropOff} onChange={handleAfterHoursKeyDropOffCheck} className='check'>After hours key drop off</Checkbox>
          <Tooltip title='Lock boxes are available to drop off or pick up your car outside of trading hours'>  
            <InfoCircleOutlined className='info-icon' style={{verticalAlign: '-0.3em'}}/>
          </Tooltip>
        </Space>
      </Space>
      <style jsx global>{`
        .appointment-select {
          width: 100%;
          margin-bottom: 142px;
        }
        .appointment-select .title {
          font-family: TT Commons;
          font-style: normal;
          font-weight: 900;
          font-size: 24px;
          line-height: 30px;
          
          color: #1D1655;
        }
        .appointment-select .drop-off-title {
          font-family: Arial;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 24px;
          
          color: #1D1655;
        }
        .appointment-select .check {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          
          color: #1D1655;
        }
        .appointment-select .info-icon {
          font-size: 130%;
          color: #AFB4BE;
          margin-bottom: 5px;
        }
      `}</style>
    </OGBasePageComponent>
  );
}

export default AppointmentStep;