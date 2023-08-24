/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { Header } from 'Components'

const Wrapper = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: no-repeat center ${({ bgImage, theme }) => `url(${bgImage})` || theme.white};
  background-size: cover;
`
const Body = styled.div`
  display: flex;
  width: 100%;
  padding: 36px 0;
  justify-content: center;
`

const AuthLayout = ({ children }) => (
  <Wrapper>
    <Header />
    <Body>
      {children}
    </Body>
  </Wrapper>
)

export default AuthLayout
