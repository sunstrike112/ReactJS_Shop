// Import from antd
import { Card, Typography } from 'antd';
import { MinusCircleFilled } from '@ant-design/icons';
import { CustomIcon } from '@ss-fe-fw/booking/atoms';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { BookingService } from '@ss-fe-fw/booking/configs';

const { Paragraph } = Typography;

/* eslint-disable-next-line */
interface ServiceProps {
  mode: number;
  selected: boolean;
  service: BookingService;
  addOrSelectHandler: any;
  removeHandler: any;
  children?: any;
}

export const SERVICE_PACKAGE_MODE = {
  TEMPLATE: 0,
  INSTANCE: 1
}

export function Service(props: ServiceProps) {
  // responsive
  const screens = useBreakpoint();

  // states
  const selectedItems = props.service.packages.filter(item => item.selected);

  // handlers
  const addOrSelectService = () => {
    props.addOrSelectHandler(props.service.id, props.mode);
  }

  const removeService = (e) => {
    e.stopPropagation();

    props.removeHandler(props.service.id);
  }

  // rendering
  return (
    <>
      <Card onClick={addOrSelectService} 
            hoverable={true}
            className={props.selected ? 'booking-service selected' : 'booking-service unselected'}
      >
        <CustomIcon src={props.service.image}/>
        {
          props.mode === SERVICE_PACKAGE_MODE.INSTANCE && 
          <MinusCircleFilled onClick={removeService} className='remove'/>
        }

        <Paragraph className='name'>{props.service.name}</Paragraph>
        <Paragraph className={selectedItems.length === 0 ? 'status item-unselected' : 'status item-selected'}>
          {selectedItems.length === 0 ? 'Not selected' 
                    : (selectedItems.length === 1 ? selectedItems[0].name 
                                                  : `${selectedItems.length} Items selected`)}
        </Paragraph>
        {props.selected && <div className='ellipse'></div>}
      </Card>
      <style jsx global>{`
        .booking-service {
          width: 100%;
          height: 147p;
          background: #FFFFFF;

          box-sizing: border-box;
          border-radius: 0 0 25px 0;
          overflow: hidden;
        }
        .booking-service:hover {
          border: ${!props.selected ? '2px solid #04BAE0;' : '1px solid #EAECEF'}
        }
        .booking-service > .ant-card-body {
          padding: 25px 0px 10px 20px;
        }
        .booking-service .name {
          margin-top: 30px;
          margin-bottom: 0;

          font-family: Arial;
          font-style: normal;
          font-weight: bold;
          font-size: 20px;
          line-height: 28px;

          color: #1D1655;
        }
        .booking-service .status {
          margin-bottom: 0;

          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 22px;
        }
        .booking-service .item-selected {
          color: #888E9C;
        }
        .booking-service .item-unselected {
          color: #D5D8DD;
        }
        .booking-service.selected {
          border: 2px solid #04BAE0;
        }

        .booking-service.unselected {
          border: 1px solid #EAECEF;
        }
        .booking-service .ellipse {
          z-index: 100;
          position: absolute;
          right: ${screens['xs'] ? '-90px' : '-120px'};
          top: -80px;
          width: ${screens['xs'] ?  '180px' : '240px'};
          height: 160px;
          background: #04BAE0;
          border-radius: ${screens['xs'] ? '90px' : '120px'} / 80px;
        }
        .booking-service .remove {
          z-index: 101;
          position: absolute;
          color: #1D1655;
          right: 13px;
          top: 13px;
        }
      `}</style>
    </>
  );
}

export default Service;