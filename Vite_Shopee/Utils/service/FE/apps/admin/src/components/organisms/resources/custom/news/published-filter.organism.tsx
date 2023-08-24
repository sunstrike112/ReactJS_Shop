import React, { useEffect } from 'react'
// Import from antd
import {
  Row,
  Col,
  Radio,
} from 'antd'

/* eslint-disable-next-line */
export interface OGNewsPublishedFilterProps {
  searchKey?: any;
  setSearchKey?: any;
  listFiltered?: any;
  setListFiltered?: any;
  children?: any;
}

export function OGNewsPublishedFilter(props: OGNewsPublishedFilterProps) {

  const onChange = (e) => {
    let result = []
    if (e.target.value) {
      result = [{
        filterItem: e.target.value,
        isBoolean: true,
        key: "published",
        operator: "equals",
        value: e.target.value,
      }]
    }
    props.setListFiltered(result)
  }

  return (
    <Row gutter={[16, 16]} align="middle">
      <Col>
        <Radio.Group defaultValue={null} buttonStyle="solid" onChange={onChange}>
          <Radio.Button value={null}>All</Radio.Button>
          <Radio.Button value="true">Yes</Radio.Button>
          <Radio.Button value="false">No</Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  )
}

export default OGNewsPublishedFilter
