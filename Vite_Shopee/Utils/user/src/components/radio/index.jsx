/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { Radio } from 'antd'

const RadioWrapper = styled(Radio)`
  color: #1A1A1A;
  font-size: 16px;
  font-weight: 600;
  .ant-radio-checked {
    border-color: #07CF84;
    .ant-radio-inner {
      border-color: #07CF84;
      &::after {
        background: #07CF84;
      }
    }
  }
  span {
    white-space: pre-wrap;
  }
`

const RadioButton = ({ size, value, title, ...rest }, ref) => (
  <RadioWrapper
    ref={ref}
    value={value}
    {...rest}
  >{title}
  </RadioWrapper>
)
export default forwardRef(RadioButton)
