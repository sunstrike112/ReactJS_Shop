/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

const StyledDiv = styled.div`
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s;
  color: ${({ theme }) => theme.text_thirsdary};

  &.disabled {
    cursor: auto;
    color: ${({ theme }) => theme.grey_disable};
  }
`

const ClickAble = ({ children, disabled, className, onClick, ...rest }, ref) => (
  <StyledDiv
    className={classnames({ disabled }, className)}
    onClick={disabled ? () => null : onClick}
    disabled={disabled}
    {...rest}
    ref={ref}
  >
    {children}
  </StyledDiv>
)

export default forwardRef(ClickAble)
