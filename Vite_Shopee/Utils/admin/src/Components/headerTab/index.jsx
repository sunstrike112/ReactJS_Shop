/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { Divider as DividerAntd } from 'antd'

const Header = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  .icon {
    stroke: ${({ theme }) => theme.primary};
    margin-right: 16px;
  }
`
const Divider = styled(DividerAntd)`
  background-color: ${({ theme }) => theme.text_hight_light};
  height: 2px;
  padding: 0;
  margin: 0;
  margin-top: 10px;
`

const HeaderTab = ({ icon, title }) => {
  const ComponentIcon = icon
  return (
    <>
      <Header>
        <ComponentIcon className="icon" />
        <span>{title}</span>
      </Header>
      <Divider />
    </>
  )
}

export default HeaderTab
