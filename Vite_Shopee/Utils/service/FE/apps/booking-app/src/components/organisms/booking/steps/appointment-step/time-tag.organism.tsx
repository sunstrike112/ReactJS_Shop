import { Card, Typography } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Text } = Typography;

interface TimeTagProps {
  status: string;
  time: string;
  selectHandler: any;
  style?: any;
  children?: any;
}

export function TimeTag(props: TimeTagProps) {
  // responsive
  const screens = useBreakpoint();

  const status = props.time ? props.status : 'disabled';

  // handlers
  const handleTimeSelect = () => {
    status !== 'disabled' && props.selectHandler(props.time);
  }

  // rendering
  return (
    <>
      <Card 
        onClick={handleTimeSelect}
        hoverable={status !== 'disabled'} 
        className={status === 'normal' ? 'time-tag' : `time-tag ${status}`}
        style={props.style}
      >
        <Text className='slot'>{props.time}</Text>
      </Card>
      
      <style>{`
        .time-tag {
          width: 100%;
          height: 38px;
          background: #FFFFFF;

          border: 1px solid #EAECEF;
          box-sizing: border-box;
          border-radius: 4px;
        }
        .time-tag.disabled {
          border: none;
          background: #F9FAFB;
        }
        .time-tag.selected {
          border: 2px solid #04BAE0;
        }
        .time-tag.ant-card .ant-card-body {
          padding: 5px;
          text-align: center;
        }
        
        .time-tag .slot {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          
          color: #1D1655;
        }
        .time-tag.disabled .slot {
          color: #AFB4BE;
        }
        .time-tag.selected .slot {
          font-weight: bold;
        }
      `}</style>
    </>
  );
}

export default TimeTag;