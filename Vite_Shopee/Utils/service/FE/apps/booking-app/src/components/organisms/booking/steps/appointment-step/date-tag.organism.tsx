import { Card, Space, Typography } from 'antd';
import { CALCULATION_FORMAT_DATE_MOMENT } from '@ss-fe-fw/booking/constants';
import { formatWeekday, getCurrentTime } from '@ss-fe-fw/shared/ui';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Text } = Typography;

interface DateTagProps {
  status: string;
  date: string;
  selectHandler: any;
  children?: any;
}

export function DateTag(props: DateTagProps) {
  const status = !props.date || props.date === getCurrentTime().format(CALCULATION_FORMAT_DATE_MOMENT) ? 'disabled' : props.status;
  const format = props.date ? formatWeekday(new Date(props.date)) : {weekday: '', day: ''};

  // handlers
  const handleDateSelect = () => {
    status !== 'disabled' && props.selectHandler(props.date);
  }

  // rendering
  return (
    <>
      <Card 
        onClick={handleDateSelect}
        hoverable={status !== 'disabled'} 
        className={status === 'normal' ? 'date-tag' : `date-tag ${status}`}
      >
        <Space direction='vertical' style={{width: '100%', rowGap: '0px'}}>
          <Text className='weekday'>{format.weekday}</Text>
          <Text className='day'>{format.day}</Text>
        </Space>
      </Card>

      <style jsx global>{`
        .date-tag {
          width: 100%;
          height: 81px;
          background: #FFFFFF;

          border: 1px solid #EAECEF;
          box-sizing: border-box;
          border-radius: 4px;
        }
        .date-tag.disabled {
          border: none;
          background: #F9FAFB;
        }
        .date-tag.selected {
          border: 2px solid #04BAE0;
        }

        .date-tag .ant-card-body {
          padding: 12px 0 0 0;
        }
        .date-tag .weekday {
          margin-top: 12px;

          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          color: #AFB4BE;
        }
        .date-tag .day {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 24px;
          line-height: 32px;

          color: #1D1655;
        }
        .date-tag.selected .day {
          font-weight: bold;
        }
        .date-tag.disabled .day {
          color: #AFB4BE;
        }
        .date-tag .ant-space-item {
          text-align: center;
        }
      `}</style>
    </>
  );
}

export default DateTag;