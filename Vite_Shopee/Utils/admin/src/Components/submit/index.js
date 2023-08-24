/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const InputWrapper = styled.input`
  background-color: ${({ theme, background }) => theme[background]};
  padding: 8px;
  font-size: 17px;
  border: none;
  border-radius: 4px;
  color: ${({ color, theme }) => theme[color]};
  width: ${({ theme, inputSize }) => theme[inputSize]};
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
    border: none;
  }
  
  &:active {
    opacity: 0.7;
    border: none;
  }

  &:focus {
    opacity: 1;
    border: none;
    outline: none;
  }
`

const Submit = ({
  background = 'primary',
  placeholder,
  inputSize = 'input_small',
  onChange,
  disabled = false,
  color = 'white',
  value = 'Submit',
  ...rest
}) => (
  <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
    <InputWrapper
      {...rest}
      type="submit"
      background={background}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      inputSize={inputSize}
      color={color}
      value={value}
    />
  </div>
)

export default Submit
