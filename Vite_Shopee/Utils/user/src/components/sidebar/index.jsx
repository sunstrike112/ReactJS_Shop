/* eslint-disable react/prop-types */
import React from 'react'
import { Drawer } from 'antd'
import styled from 'styled-components'
import { Image } from '..'
import { IMG_CANCEL_LESSON } from '../../assets'

const DrawerWrapper = styled(Drawer)`
  .ant-drawer-body {
    padding-top: 50px;
  }
  .ant-drawer-content {
    img {
      width: 20px;
      height: 20px;
    }
  }
`

const Sidebar = ({ placement, width = 300, visible, onVisible, ...rest }) => (
  <DrawerWrapper
    placement={placement}
    width={width}
    visible={visible}
    onClose={() => onVisible(false)}
    closeIcon={<Image src={IMG_CANCEL_LESSON} />}
    {...rest}
  />
)

export default Sidebar
