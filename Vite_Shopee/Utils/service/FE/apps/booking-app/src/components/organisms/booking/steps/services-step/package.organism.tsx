import { Card, Space, Tooltip, Typography } from 'antd';
import { InfoCircleOutlined, CheckCircleFilled } from '@ant-design/icons';
import { CustomIcon } from '@ss-fe-fw/booking/atoms';
import { BookingPackage } from '@ss-fe-fw/booking/configs';

const { Text } = Typography;

interface PackageProps {
  item: BookingPackage;
  clickHandler: any;
  children?: any;
}

export function Package (props: PackageProps) {
  // handlers
  const clickHandler = () => {
    props.clickHandler(props.item.serviceId, props.item.id);
  }

  // rendering
  return (
    <>
      <Card 
        onClick={clickHandler}
        hoverable={true} 
        className={props.item.selected ? 'package-item selected' : 'package-item unselected'}
      >
        <Space direction='horizontal'>
          <div className='icon-box'>
            <CustomIcon src={props.item.selected ? props.item.solidImage : props.item.outlinedImage} style={{verticalAlign: '0.1em'}}/>
          </div>
          <Text>{props.item.name}</Text>
          {
            !!props.item.description && 
            <Tooltip title={props.item.description}>
              <InfoCircleOutlined className='info-icon' style={{verticalAlign: '-0.3em'}}/>
            </Tooltip>
          }
        </Space>
        <Space style={{float: 'right'}} align='center'>
          <CheckCircleFilled className={props.item.selected ? 'check-icon selected' : 'check-icon unselected'} style={{verticalAlign: '-0.3em'}}/>
        </Space>
      </Card>
      <style jsx global>{`
        .package-item {
          border-radius: 4px;
        }
        .package-item.selected {
          background: #F9FAFB;
        }
        .package-item.unselected {
          background: #FFFFFF;
        }
        .package-item.ant-card-bordered {
          border: none;
        }
        .package-item .ant-card-body {
          padding: 8px 12px 8px 12px;
        }
        .package-item .info-icon {
          font-size: 150%;
          color: #AFB4BE;
        }
        .package-item .check-icon {
          font-size: 150%;
        }
        .package-item .check-icon.selected{
          color: #04BAE0};
        }
        .package-item .check-icon.unselected{
          color: #F4F5F7;
        }
        .package-item .icon-box {
          width: 25px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  )
}