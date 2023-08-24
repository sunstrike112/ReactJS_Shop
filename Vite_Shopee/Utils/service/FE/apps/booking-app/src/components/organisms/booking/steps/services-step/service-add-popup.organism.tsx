// Import from antd
import { Modal, Row } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

/* eslint-disable-next-line */
interface ServiceAddPopupProps {
  display: boolean;
  displayHandler: any;
  serviceRender: any;
  children?: any;
}

export function ServiceAddPopup(props: ServiceAddPopupProps) {
  // responsive
  const screens = useBreakpoint();
  
  // handlers
  const handleClose = () => {
    props.displayHandler(false);
  }
  
  // rendering
  return (
    <>
      <Modal 
        title='Add other type of services'
        width={'auto'}
        footer={null}
        centered={screens['xs']}
        maskClosable={true}
        closable={false}
        keyboard={true}
        visible={props.display}
        onCancel={handleClose}
        className='service-add-popup'
      >
        <Row gutter={24}>
          {props.serviceRender}
        </Row>
      </Modal>
      <style jsx global>{`
        .service-add-popup {
          max-width: ${screens['xs'] ? '268px' : '800px'};
        }
        .service-add-popup .ant-modal-content {
          border-radius: 4px;
        }
        .service-add-popup .ant-modal-title {
          font-family: Arial;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 24px;
          
          color: #1D1655;
        }
        
      `}</style>
    </>
  );
}

export default ServiceAddPopup;