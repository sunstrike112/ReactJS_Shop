import { Row, Col, Space, Button, Typography, notification } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { bookingStepState, bookingServicesState, bookingAppointmentState, bookingVehicleState, storeState, bookingVehicleManualState } from '@ss-fe-fw/booking/stores';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { BOOKING_STEPS } from 'apps/booking-app/src/constants/booking';

const { Text } = Typography;

interface BookingFooterProps {
  children?: any;
}

export function BookingFooter (props: BookingFooterProps) {
  // responsive
  const screens = useBreakpoint();

  // const
  const navMap = {
    1: '/',
    2: '/booking/services',
    3: '/booking/appointment',
    4: '/booking/contact-book'
  }

  // global states
  const selectedStore = useRecoilValue(storeState);
  const bookingVehicleManual = useRecoilValue(bookingVehicleManualState);
  const [bookingVehicle] = useRecoilState(bookingVehicleState);
  const [bookingServices] = useRecoilState(bookingServicesState);
  const [bookingAppointment] = useRecoilState(bookingAppointmentState);
  const [bookingStep] = useRecoilState(bookingStepState);

  // states
  const checkProceed = () => {
    let selected = false;

    if (bookingStep === BOOKING_STEPS.VEHICLE) {
      (bookingVehicle || bookingVehicleManual) && (selected = true);
    }
    else if (bookingStep === BOOKING_STEPS.SERVICES) {
      bookingServices && 
      bookingServices.services.forEach(service => {
        service.selected && 
        service.packages.find(item => item.selected) &&
        (selected = true);
      });
    }
    else if (bookingStep === BOOKING_STEPS.APPOINTMENT) {
      bookingAppointment &&
      (selected = bookingAppointment.selectedDate && bookingAppointment.selectedTime)
    }

    return selected;
  };

  // hooks
  const router = useRouter();
  

  // handlers
  const handleClick = (e) => {
    if (bookingStep === BOOKING_STEPS["VEHICLE"] && !Boolean(selectedStore)) {
      notification.error({ message: "You must select a Store to proceed." });
      return;
    }
    navMap[bookingStep + 1] && router.push(navMap[bookingStep + 1]);
  }

  const handleBack = (e) => {
    navMap[bookingStep - 1] && router.push(navMap[bookingStep - 1]);
  }

  // rendering
  const proceed = checkProceed();
  return (
    <>
      {((bookingStep === BOOKING_STEPS["VEHICLE"] && proceed) || bookingStep > BOOKING_STEPS["VEHICLE"]) &&
        <Row className='booking-footer'>
          <Col span={bookingStep > BOOKING_STEPS["VEHICLE"] ? 12 : 0}>
            <Space onClick={handleBack} direction='horizontal' style={{height: '100%', cursor: 'pointer'}}>
              <LeftOutlined style={{color: '#1D1655'}}/>
              <Text className='back'>Back</Text>
            </Space>
          </Col>
          <Col span={bookingStep > BOOKING_STEPS["VEHICLE"] ? 12 : 24}>
          {
            bookingStep === BOOKING_STEPS["VEHICLE"] ?
              <Button 
                onClick={handleClick}
                type={Boolean(bookingVehicle) ? 'primary' : 'ghost'} 
                disabled={!Boolean(bookingVehicle)}
                shape='round' 
                className='proceed'
              >
                CONFIRM AND PROCEED
              </Button>
              :
              <Button 
                onClick={handleClick}
                type={proceed ? 'primary' : 'ghost'} 
                disabled={!proceed}
                shape='round' 
                className='proceed'
              >
                CHOOSE AND PROCEED
              </Button>
          }
          </Col>
        </Row>
      }
      <style jsx global>{`
        .booking-footer {
          width: 100%;
          padding: ${screens['xs'] ? '16px 23px 16px 23px' : '28px 190px 28px 190px'};
          background: #F9FAFB;
        }
        .booking-footer .back {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          
          color: #1D1655;
        }
        .booking-footer .proceed {
          float: right;
          border: none;
        }
        .booking-footer .proceed.ant-btn-ghost[disabled] {
          background: #F4F5F7;
          color: #D5D8DD;

          font-family: Arial;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          line-height: 18px;

          text-transform: uppercase;
        }
        .booking-footer .proceed.ant-btn-primary {
          color: #1D1655;

          font-family: Arial;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          line-height: 18px;

          text-transform: uppercase;
        }
      `}</style>
    </>
  )
}