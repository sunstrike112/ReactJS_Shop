import { CustomIcon } from '@ss-fe-fw/booking/atoms';
import { CarouselCustom } from '@ss-fe-fw/booking/molecules';
import { randomUuid } from '@ss-fe-fw/booking/utils/uuid';
import { CALCULATION_FORMAT_MONTH_MOMENT, CALCULATION_FORMAT_DATE_MOMENT } from '@ss-fe-fw/booking/constants';
import { Row, Col, Typography, Space, DatePicker } from 'antd';
import { getCurrentTime, getMomentDate, formatMonth, formatDate, getRemainDatesInMonth, getDatesInMonth } from '@ss-fe-fw/shared/ui';
import { DateTag } from './date-tag.organism';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useRef, useEffect, useState } from 'react';

const { Text } = Typography;

interface DateSelectProps {
  month: string,
  date: string;
  calendarDateSelectHandler: any;
  dateSelectHandler: any;
  style?: any;
  children?: any;
}

export function DateSelect(props: DateSelectProps) {
  // responsive
  const screens = useBreakpoint();

  // constants
  const RUN_LENGTH = screens['xs'] ? 5 : 8;

  // variables
  const carouselRef = useRef(null);
  let dates = [];

  // states
  const [calendarKey, setCalendarKey] = useState(randomUuid());

  // effects
  useEffect(() => {
    scrollCarousel();
  });

  // utils
  const getDatesForDisplay = () => {
    const currentMonth = getCurrentTime().format(CALCULATION_FORMAT_MONTH_MOMENT);
    dates = props.month > currentMonth 
      ? getDatesInMonth(new Date(`${props.month}-01`)) 
      : getRemainDatesInMonth(new Date(getCurrentTime().format(CALCULATION_FORMAT_DATE_MOMENT)));
      dates = dates.map(date => formatDate(date, CALCULATION_FORMAT_DATE_MOMENT));

    // pad with null to fit RUN_LENGTH
    const remainder = dates.length % RUN_LENGTH;
    remainder > 0 && 
    (dates = dates.concat(Array(RUN_LENGTH - remainder).fill(null)));

    return dates;
  }

  const scrollCarousel = () => {
    const selectedIndex = dates.findIndex(date => date === props.date);
    const carouselScrollIndex = selectedIndex > 0 ? Math.floor(selectedIndex / RUN_LENGTH) * RUN_LENGTH : selectedIndex;

    carouselScrollIndex >= 0 && 
    carouselRef?.current?.goTo(carouselScrollIndex);
  }

  // handlers
  const handleCalendarSelect = (date) => {
    props.calendarDateSelectHandler(date);
  }

  const handleBlur = () => {
    setCalendarKey(randomUuid());
  }

  // rendering
  return (
    <>
      <Space direction='vertical' className='date-select' style={props.style}>
        <Row>
          <Col span={12}>
            <Text className='date-title'>Select date</Text>
          </Col>
          <Col span={12}>
            <Space direction='horizontal' style={{float: 'right'}}>
              <DatePicker 
                key={calendarKey}
                inputReadOnly={true}
                placeholder=''
                format={'MMM YYYY'}
                onChange={handleCalendarSelect}
                onBlur={handleBlur}
                value={props.date ? getMomentDate(props.date) : getCurrentTime()}
                showToday={false}
                disabledDate = {(date) => {return date <= getCurrentTime()}}
                suffixIcon={<CustomIcon src='/images/icons/calendar.svg'/>}
                style={{padding: 0, cursor: 'pointer'}}
                picker='date' 
                bordered={false} 
                allowClear={false} />
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CarouselCustom 
              arrows={true}
              dots={false}
              infinite={false}
              slidesToShow={RUN_LENGTH} 
              slidesToScroll={RUN_LENGTH}
              ref={carouselRef}
            >
              {getDatesForDisplay().map(date => 
                <div key={randomUuid()}>
                  <DateTag 
                    status={date === props.date ? 'selected' : 'normal'}
                    selectHandler={props.dateSelectHandler}
                    date={date}/>
                </div>)}
            </CarouselCustom>
          </Col>
        </Row>
      </Space>
    
      <style jsx global>{`
        .date-select {
          width: 100%;
        }
        .date-select .date-title {
          font-family: Arial;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 24px;
          color: #1D1655;
        }
        .date-select .month {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          color: #1D1655;
        }
        .date-select .ant-picker-input input {
          cursor: pointer;
          width: 250px;
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          color: #1D1655;
          text-decoration: underline;
          text-align: right;
        }
        .date-select .ant-carousel {
          padding-left: ${screens['xs'] ? '15px' : '0'};
          padding-right: ${screens['xs'] ? '15px' : '0'};
        }
        .date-select .ant-carousel .carousel-custom .slick-list .slick-slide.slick-active {
          padding: ${screens['xs'] ? '2px 4px 2px 4px' : '2px 8px 2px 0px'};
        }
      `}</style>
    </>
  );
}

export default DateSelect;