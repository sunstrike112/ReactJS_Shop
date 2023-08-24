/* eslint-disable react/prop-types */
import React from 'react'
import { Progress } from 'antd'

const ProgressSlider = ({ percent, status = 'exception', ...rest }) => (
  <Progress
    {...rest}
    percent={percent}
    status={status}
  />
)

export default ProgressSlider
