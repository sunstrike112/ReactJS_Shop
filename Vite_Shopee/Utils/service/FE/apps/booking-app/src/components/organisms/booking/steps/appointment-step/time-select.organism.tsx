import { Typography, Space } from 'antd';
import { CarouselCustom } from '@ss-fe-fw/booking/molecules';
import { randomUuid } from '@ss-fe-fw/booking/utils/uuid';
import { useEffect, useRef, useState } from 'react';
import { TimeTag } from './time-tag.organism';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Text } = Typography;

interface TimeSelectProps {
  time: string;
  selectHandler: any;
  children?: any;
}

interface TimePair {
  upper: string,
  lower: string
}

export function TimeSelect(props: TimeSelectProps) {
  // responsive
  const screens = useBreakpoint();

  // constants
  const RUN_LENGTH = screens['xs'] ? 4 : 5;
  const DUMMY_SLOTS = [
    '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '13:00', 
    '14:00', '14:30', '15:00', '15:30', '16:00', 
    '16: 30', '17:00'
  ];

  // variables
  const carouselRef = useRef(null);

  // states
  const [workingSlots, setWorkingSlots] = useState(DUMMY_SLOTS);

  // effects
  useEffect(() => {
    scrollCarousel();
  });

  // utils
  const translateToTimePair = () => {
    let roundIndex = 0;
    const pairs: TimePair[] = [];
    while (roundIndex < workingSlots.length) {
      for (let i = roundIndex; i < roundIndex + RUN_LENGTH && i < workingSlots.length; i++) {
        const upperVal = workingSlots[i];
        const lowerVal = (i + RUN_LENGTH) < workingSlots.length ? workingSlots[i + RUN_LENGTH] : '';
        pairs.push({upper: upperVal, lower: lowerVal});
      }

      roundIndex += 2 * RUN_LENGTH;
    }

    return pairs;
  };

  const scrollCarousel = () => {
    const selectedIndex = workingSlots.findIndex(date => date === props.time);
    const carouselScrollIndex = selectedIndex > 0 ? Math.floor(selectedIndex / (2 * RUN_LENGTH)) * RUN_LENGTH : selectedIndex;

    carouselScrollIndex >= 0 && 
    carouselRef?.current?.goTo(carouselScrollIndex);
  }

  // rendering
  return (
    <>
      <Space direction='vertical' className='time-select'>
        <Text className='time-title'>Select time</Text>
        <CarouselCustom 
          ref={carouselRef}
          arrows={true}
          dots={false}
          infinite={false}
          slidesToShow={RUN_LENGTH} 
          slidesToScroll={RUN_LENGTH}
        >
          {translateToTimePair().map((pair: TimePair) => {
            return (
              <Space direction='vertical' key={randomUuid()}>
                <TimeTag selectHandler={props.selectHandler} status={pair.upper === props.time ? 'selected' : 'normal'} time={pair.upper} style={{marginBottom: 8}}/>
                <TimeTag selectHandler={props.selectHandler} status={pair.lower === props.time ? 'selected' : 'normal'} time={pair.lower}/>
              </Space>
            );
          })}
        </CarouselCustom>
      </Space>
      
      <style jsx global>{`
        .time-select {
          width: 100%;
        }
        .time-select .time-title {
          font-family: Arial;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 24px;
          color: #1D1655;
        }
        .time-select .ant-carousel {
          padding-left: ${screens['xs'] ? '15px' : '0'};
          padding-right: ${screens['xs'] ? '15px' : '0'};
        }

        .time-select .ant-carousel .carousel-custom .slick-list .slick-slide.slick-active {
          padding: 2px 4px 2px 4px;
        }
      `}</style>
    </>
  );
}

export default TimeSelect;