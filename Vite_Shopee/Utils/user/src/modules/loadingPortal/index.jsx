/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import { useLoadingPortal } from '../../hooks'

const antIcon = <LoadingOutlined style={{ fontSize: 65, color: '#FFFFFF' }} spin />

const OverLay = styled.div`
  position: fixed;
  inset: 0;
  background-color: #000000;
  opacity: 0.5;
  z-index: 1000;
`

const SpinStyled = styled(Spin)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`

const LoadingPortal = ({ isLoadingPortal }) => {
  if (!isLoadingPortal) return null

  return ReactDom.createPortal(
    <>
      <OverLay />
      <SpinStyled indicator={antIcon} />
    </>,
    document.getElementById('loadingPortal')
  )
}

export default LoadingPortal
