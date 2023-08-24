import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import { MailFilled, MessageFilled } from '@ant-design/icons';

export function OGCustomerActionBtn(props) {
  return (
    <Space direction="horizontal" size={8} align="start">
      <Tooltip title="Send mail">
        <Button shape="circle" icon={<MailFilled style={{color: '#04BAE0' }}/>}></Button>
      </Tooltip>
      <Tooltip title="Send SMS">
        <Button shape="circle" icon={<MessageFilled style={{color: '#04BAE0' }}/>}></Button>
      </Tooltip>
    </Space>
  )
}