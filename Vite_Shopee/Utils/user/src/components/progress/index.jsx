/* eslint-disable react/prop-types */
import React from 'react'
import { Progress } from 'antd'

const ProgressSlider = ({ percent, status = 'active', ...rest }) => (
  <Progress
    {...rest}
    percent={percent}
    status={status}
    showInfo={false}
    strokeColor={`${percent === 100 ? '#00C271' : '#FFA928'}`}
  />
)

export default ProgressSlider
