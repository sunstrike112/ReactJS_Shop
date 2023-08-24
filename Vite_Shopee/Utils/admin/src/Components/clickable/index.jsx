import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

const StyledDiv = styled.div`
  cursor: pointer;
  transition: opacity 0.2s;
  background: ${({ theme, background }) => theme[background]};
  color: ${({ theme, color }) => theme[color]};
  display: flex;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    opacity: 0.7;
  }
  
  &.disabled {
    cursor: auto;
    opacity: 0.5;
  }
`

const ClickAble = ({
  children,
  disabled,
  className,
  onClick,
  color = 'text_hight_light',
  background = 'transparent',
  ...rest
}) => (
  <StyledDiv
    className={classnames({ disabled }, className)}
    onClick={disabled ? () => null : onClick}
    color={color}
    background={background}
    {...rest}
  >
    {children}
  </StyledDiv>
)
ClickAble.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  background: PropTypes.string
}

export default ClickAble
