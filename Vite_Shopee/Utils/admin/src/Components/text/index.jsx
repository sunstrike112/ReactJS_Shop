/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const TextWrapper = styled.p`
  color: ${({ color, theme }) => theme[color]};
  padding: 0;
  margin: 0;
  font-size: ${({ fontSize, theme }) => theme[fontSize] || '16px'};
  font-weight: ${({ fontWeight, theme }) => theme[fontWeight] || '400'};
`

const Text = {
  primary: ({ fontSize, fontWeight, color = 'text_primary', ...rest }) => (
    <TextWrapper color={color} fontSize={fontSize} fontWeight={fontWeight} {...rest} />
  ),
  secondary: (props) => <TextWrapper color="green" {...props} />,
  error: ({ error, ...rest }) => <TextWrapper color="red" {...rest} />,
  label: ({ ...rest }) => <TextWrapper color="primary" {...rest} size="size_18" />,
  button: ({ fontSize = 'size_17', fontWeight = 'fw_400', color = 'white', ...rest }) => (
    <TextWrapper color={color} fontSize={fontSize} fontWeight={fontWeight} {...rest} />
  ),
  socialTitle: ({ color, ...rest }) => <TextWrapper color={color || 'white'} size="size_16" {...rest} />,
  textIcon: ({ color, fontSize, ...rest }) => <TextWrapper color={color} fontSize={fontSize} {...rest} />
}

export default Text
