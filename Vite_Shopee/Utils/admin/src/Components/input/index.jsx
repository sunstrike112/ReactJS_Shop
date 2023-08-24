/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'
import styled from 'styled-components'

const InputWrapper = styled.input`
  background-color: ${({ theme, background }) => theme[background]};
  padding: 8px;
  font-size: 16px;
  border: 0.5px solid ${({ theme }) => theme.grey};
  border-radius: 4px;
  width: ${({ theme, inputSize }) => theme[inputSize] || '100%'};
  transition: 0.2s;
  height: ${({ height }) => height || '38px'};
  
  &:hover {
    opacity: 0.8;
    border: 0.5px solid ${({ theme }) => theme.secondary};
  }
  
  &:active {
    opacity: 0.7;
    border: 0.5px solid ${({ theme }) => theme.secondary};
  }

  &:focus {
    opacity: 1;
    border: 0.5px solid ${({ theme }) => theme.secondary};
    outline: none;
  }
`

const Input = ({ background = 'white', placeholder, inputSize, onChange, disabled = false, ...rest }, inputRef) => (
  <InputWrapper
    {...rest}
    background={background}
    ref={inputRef}
    placeholder={placeholder}
    onChange={onChange}
    disabled={disabled}
    inputSize={inputSize}
  />
)

export default forwardRef(Input)
