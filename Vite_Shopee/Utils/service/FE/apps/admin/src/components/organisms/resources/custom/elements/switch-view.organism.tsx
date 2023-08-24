import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
// Import from antd
import {
  Row,
  Col,
  Radio,
} from 'antd'
import {
  CalendarOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
/* eslint-disable-next-line */
export interface OGSwitchViewProps {
  defaultValue?: 'list' | 'card';
  linkList?: string;
  linkCard?: string;
}

export function OGSwitchView(props: OGSwitchViewProps) {
  const router = useRouter()

  const onChange = (e) => {
    if (e.target.value === 'list' && props.linkList) {
      router.push(props.linkList)
    }
    if (e.target.value === 'card' && props.linkCard) {
      router.push(props.linkCard)
    }
  }

  return (
    <Radio.Group style={{ width: 95 }} defaultValue={props.defaultValue} buttonStyle="solid" size="large" onChange={onChange}>
      <Radio.Button value="card"><CalendarOutlined /></Radio.Button>
      <Radio.Button value="list"><UnorderedListOutlined /></Radio.Button>
    </Radio.Group>
  )
}

export default OGSwitchView
