import { Row, Col } from 'antd';
import React from 'react';

export function MCPermissionHeader(props) {
  return (
    <>
      <div className="permission-header">
        <h4>Permission</h4>
      </div>
      <Row className="permission-sub-header">
        <Col span={12}>
          <h4>Module</h4>
        </Col>
        <Col span={3}>
          <h4 className="checkbox-column">Create</h4>
        </Col>
        <Col span={3}>
          <h4 className="checkbox-column">View</h4>
        </Col>
        <Col span={3}>
          <h4 className="checkbox-column">Update</h4>
        </Col>
        <Col span={3}>
          <h4 className="checkbox-column">Delete</h4>
        </Col>
      </Row>

      <style>{`
        h4 {
          margin-bottom: 0px !important;  
        }
        .permission-header {
          padding: 8px 12px;
        }
        .permission-sub-header {
          padding: 12px 8px;
        }
        .permission-sub-header .checkbox-column {
          display: flex;
          justify-content: center
        }
        .permission-header {
          height: 41px;
          border-bottom: 1px solid #EAECEF;
        }
      `}</style>
    </>
  );
}
