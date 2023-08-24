import { Spin } from 'antd'
import React from 'react'
import { Wrapper } from './styled'

const LoadingScreen = () => (
  <Wrapper>
    <Spin size="large" />
  </Wrapper>
)

export default LoadingScreen
