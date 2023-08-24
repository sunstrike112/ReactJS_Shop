// Import from antd
import { Card, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Paragraph } = Typography;

/* eslint-disable-next-line */
interface ServiceAddProps {
  displayHandler: any;
  children?: any;
}

export function ServiceAdd(props: ServiceAddProps) {
  // responsive
  const screens = useBreakpoint();

  // handlers
  const addService = () => {
    props.displayHandler(true);
  }

  // rendering
  return (
    <>
      <Card 
        hoverable={true}
        onClick={addService} 
        className='service-add'
      >
        <div style={{textAlign: 'center'}}><PlusOutlined className='icon'/></div>
        <Paragraph className='instruction'>Add other services</Paragraph>
      </Card>
      <style jsx global>{`
        .service-add {
          width: 100%;
          height: 147px;
          background: #FFFFFF;

          box-sizing: border-box;
          border-radius: 0 0 25px 0;
        }
        .service-add > .ant-card-body {
          padding: 40px 20px 20px 20px;
        }
        .service-add .icon {
          font-size: 150%;
        }
        .service-add .instruction {
          text-align: center;
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;

          color: #888E9C;
        }
      `}</style>
    </>
  );
}

export default ServiceAdd;