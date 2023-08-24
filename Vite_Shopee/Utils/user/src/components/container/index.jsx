import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

const Div = styled.div`
  width: 100%;
  // padding: 0 20px;
`

const Container = ({ children, className }) => {
  className = classNames(className, 'container')
  return (
    <Div className={className}>{ children }</Div>
  )
}

export default Container
