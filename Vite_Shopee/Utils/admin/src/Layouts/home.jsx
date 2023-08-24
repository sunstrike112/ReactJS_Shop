/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { SideBar, Footer } from 'Components'
import { useRoot, useWebview } from 'Hooks'

const Wrapper = styled.div`
  overflow: auto;
  padding-left: ${({ sidebarCompact, isWebviewMode }) => (isWebviewMode ? '0px' : sidebarCompact ? '4rem' : '14rem')};
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.bg_primary_light};
  height: 100%;
`
const Main = styled.main`
  display: flex;
  width: 100%;
  padding: 0;
  background: ${({ theme }) => theme.bg_primary_light};
  justify-content: center;
`
const Content = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`

const HomeLayout = ({ children }) => {
  const { sidebarCompact } = useRoot()
  const { isWebviewMode } = useWebview()
  return (
    <Wrapper
      sidebarCompact={sidebarCompact}
      isWebviewMode={isWebviewMode}
    >
      <Main>
        {!isWebviewMode && <SideBar />}
        <Content id="content">
          {children}
        </Content>
      </Main>
      {!isWebviewMode && <Footer />}
    </Wrapper>
  )
}

export default HomeLayout
