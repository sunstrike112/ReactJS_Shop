/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
// import core
import React, { useEffect, useState } from 'react';
// Import from next
import Link from 'next/link'
import { useRouter } from 'next/router'
// Import from antd
import { Layout, Menu, Image, Space } from 'antd';
// Import from ss framework
import { MCLogo } from '@ss-fe-fw/molecules';
import { OGSidebarMenu } from '@ss-fe-fw/organisms';
import {
  brandingColors,
  LEFT_SIDE_BAR_WIDTH,
} from "@ss-fe-fw/constants";
// Import from store
import {
  useRecoilState,
} from 'recoil';
import { sidebarState } from '@ss-fe-fw/stores';
import { menuItems, listRoute } from '@ss-fe-fw/configs';
import { Scrollbars } from 'react-custom-scrollbars-2';

/* eslint-disable-next-line */
export interface OGLeftSidebarProps {
  collapsed: boolean;
  collapsedWidth: string | number;
  // selectedKeys?: string[];
  onBreakpoint: (broken: boolean) => void;
  onCollapse: (collapsed: boolean, type: any) => void;
}

// Define variables
const { Sider } = Layout;

export function OGLeftSidebar(props: OGLeftSidebarProps) {
  const router = useRouter();

  const [displayBrandingName, setDisplayBrandingName] = useState(true);
  const [sidebar, setSidebar] = useRecoilState(sidebarState);

  const onBreakpoint = (broken) => {
    setSidebar((state) => ({ ...state, broken: broken }));
  }

  const onSidebarMenuSelected = ({ key }) => {
    setSidebar((state) => ({ ...state, selectedKeys: [key] }));
  }

  useEffect(() => {
    const setStyleSidebar = (width: number, marginLeft: number) => {
      setSidebar((state) => ({ ...state, collapsedWidth: width }));
      setSidebar((state) => ({ ...state, layoutMarginLeft: marginLeft }));
    }

    !sidebar.broken && !sidebar.collapsed ? setStyleSidebar(LEFT_SIDE_BAR_WIDTH, LEFT_SIDE_BAR_WIDTH) :
    !sidebar.broken && sidebar.collapsed ? setStyleSidebar(50, 50) :
    sidebar.broken && sidebar.collapsed ? setStyleSidebar(0, 0) : setStyleSidebar(50, LEFT_SIDE_BAR_WIDTH);

    let delay = 0;
    if (!sidebar.collapsed) delay = 200;
    setTimeout(() => {
      setDisplayBrandingName(!sidebar.collapsed)
    }, delay);
  }, [sidebar.broken, sidebar.collapsed, setSidebar]);

  // useEffect Hooks for handle set sidebar when router change
  useEffect(() => {
    const handleSelectedKeys = (url) => {
      Object.entries(listRoute).forEach(([key, route]) => {
        if (route.link == url) setSidebar((state) => ({ ...state, selectedKeys: [route.key] }));
      })
    }
    handleSelectedKeys(router.asPath)

    router.events.on('routeChangeStart', handleSelectedKeys)
    return () => {
      router.events.off('routeChangeStart', handleSelectedKeys)
    }
  }, [])

  return (
    <>
      <Sider
        breakpoint="sm"
        trigger={null}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          background: brandingColors['menu-dark-background'],
          zIndex: 100
        }}
        width={LEFT_SIDE_BAR_WIDTH}
        className="main-sider"
        collapsible
        collapsed={sidebar.collapsed}
        collapsedWidth={sidebar.collapsedWidth}
        onBreakpoint={onBreakpoint}
        // onCollapse={props.onCollapse}
      >
        <MCLogo
          className="branding-logo"
          displayBrandingName={displayBrandingName}
          // brandingName="Siliconstack"
        />
        <div className="box-left-sidebar" style={{ height: '90%' }}>
          <Scrollbars
            className="box-left-sidebar__top custom-scrollbar"
            renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
            autoHide
            universal={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
          >
            <OGSidebarMenu
              mainKey="main-top-siderbar"
              menuItems={menuItems}
              selectedKeys={sidebar.selectedKeys}
              onSelect={onSidebarMenuSelected}
            />
          </Scrollbars>
        </div>
      </Sider>

      <style jsx global>{`
        .branding-logo {
          height: 64px;
          margin: 0px;
          text-align: ${displayBrandingName ? 'left' : 'center'};
        }
        .branding-logo h1 {
          color: #fff;
        }
        .branding-logo > .ant-space {
          position: relative;
          top: 24px;
          left: ${displayBrandingName ? '24px' : 0};
        }
        .main-sider {
          overflow-y: hidden;
        }
        .main-sider .ant-menu-sub.ant-menu-inline {
          background: #000B73;
          color: #fff;
        }
        .custom-scrollbar .thumb-vertical {
          background: rgb(62, 64, 66);
        }
      `}</style>
    </>
  );
}

export default OGLeftSidebar;
