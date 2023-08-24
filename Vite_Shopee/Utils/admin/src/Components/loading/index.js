/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: ${({ height }) => (height ? `${height}px` : '100vh')};
`

const Loading = ({ height, ...rest }) => (
  <Wrapper height={height}>
    <Spin size="large" {...rest} />
  </Wrapper>
)

export default Loading
