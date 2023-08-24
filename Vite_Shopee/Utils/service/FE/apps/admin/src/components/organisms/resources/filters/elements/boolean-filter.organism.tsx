import React, { useState } from 'react'
import {
  Select,
} from 'antd'

/* eslint-disable-next-line */
export interface OGBooleanFilterProps {
  value: {
    input?: any,
    operator?: any
  };
  onChange?: any;
}

const { Option } = Select;

export function OGBooleanFilter(props: OGBooleanFilterProps) {

  const onChange = (value) => {
    props.value.input = value
  }

  return (
    <Select defaultValue={props.value.input} onChange={onChange}>
      <Option value={null}>All</Option>
      <Option value="true">Yes</Option>
      <Option value="false">No</Option>
    </Select>
  )
}

export default OGBooleanFilter
