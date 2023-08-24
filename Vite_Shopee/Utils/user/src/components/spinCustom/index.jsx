/* eslint-disable react/prop-types */
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'

const SpinCustom = ({ fontSize = 20, color = '#FFFFFF', spinning = true, ...rest }) => {
  const antIcon = <LoadingOutlined style={{ fontSize, color }} spin />
  return <Spin spinning={spinning} indicator={antIcon} {...rest} />
}

export default SpinCustom
