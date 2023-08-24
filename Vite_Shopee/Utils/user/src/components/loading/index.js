/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

import { alpha } from '../../themes/colors'

const StyledDiv = styled.div`
  width: 100%;
  max-width: 540px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 20px;
  &::after {
    display: block;
    content: "";
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 6px solid ${({ theme }) => theme.primary};
    border-left-color: ${({ theme }) => alpha(theme.primary, 0.5)};
    border-right-color: ${({ theme }) => alpha(theme.primary, 0.5)};
    -webkit-animation: rotation 2s infinite linear;
  }
  
  &.small {
    &::after {
      width: 25px;
      height: 25px;
      border: 4px solid ${({ theme }) => theme.primary};
      border-left-color: ${({ theme }) => alpha(theme.primary, 0.5)};
      border-right-color: ${({ theme }) => alpha(theme.primary, 0.5)};
    }
  }
  @keyframes rotation {
  0% {
    transform: scale(0.5) rotate(0deg);
    border-radius: 50%;
  }

  100% {
    transform: scale(0.5) rotate(360deg);
    border-radius: 50%;
  }
}
`

const Loading = ({ size, className }) => (
  <StyledDiv
    className={classnames(size, className)}
  />
)

export default Loading
