import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// Import from antd
import { Layout , Row, Col, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
// Import from store
import {
  useRecoilState, useResetRecoilState,
} from 'recoil';
import { serviceCentreState, sidebarState } from '@ss-fe-fw/stores'
// Import from local
import { MCTopBoxUserAction } from '@ss-fe-fw/molecules'
import useProfile from '@ss-fe-fw/hooks/use-profile'
import { topProfileMenu } from './config/top-profile-menu'
import { APP_LOGIN_URL } from '@ss-fe-fw/constants'
import Cookies from 'js-cookie'

/* eslint-disable-next-line */
export interface OGTopMainHeaderProps {}

const { Header } = Layout;

export function OGTopMainHeader(props: OGTopMainHeaderProps) {
  const router = useRouter()
  const [sidebar, setSidebar] = useRecoilState(sidebarState)
  const resetServiceCentreState = useResetRecoilState(serviceCentreState);
  const { profile, isLoading, isError, callbackSetUser } = useProfile()

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  const onToggle = () => {
    setSidebar((state) => ({ ...state, collapsed: !state.collapsed }))
  }

  const clearUserSession = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('xOrganizationId')
    Cookies.remove('Refresh')
    resetServiceCentreState();
    /** TECH-DEPT: Should use router */
    window.location.href = APP_LOGIN_URL;
  }

  const topProfileMenuClick = ({ key }) => {
    if (key == 'logout') clearUserSession()
  }

  const avatarProps = {
    title: profile?.firstName ?? 'John Doe',
    menu: topProfileMenu({ onClick: topProfileMenuClick }),
    role: profile?.roles?.[0]?.name ?? 'No role'
  }

  // useEffect for profile
  useEffect(() => {
    callbackSetUser()
  }, [profile])

  return (
    <Header className="site-layout-background" style={
      { position: 'fixed', zIndex: 100, padding: 0, width: `calc(100% - ${sidebar.layoutMarginLeft}px)` }
    }>
      <div style={{ padding: '0 16px' }}>
        <Row justify="space-between">
          <Col span={4}>
            {React.createElement(sidebar.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: onToggle,
            })}
          </Col>
          <Col span={20}>
            <MCTopBoxUserAction
              isLoading={isLoading}
              isError={isError}
              notificationMenu={menu}
              avatar={avatarProps}
            />
          </Col>
          <Col flex="none"></Col>
        </Row>
      </div>
    </Header>
  );
}

export default OGTopMainHeader;
