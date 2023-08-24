/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
`

export const withButton = (Component) => (props) => {
  const { onClick } = props
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }
  return (
    <Button onClick={handleClick}>
      <Component {...props} />
    </Button>
  )
}

export default withButton
