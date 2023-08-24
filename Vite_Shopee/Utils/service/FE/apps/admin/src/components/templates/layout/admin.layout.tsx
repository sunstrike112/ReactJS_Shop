/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React from 'react'
// Import from next
import Head from 'next/head'
// Import from antd
import { Layout } from 'antd'
// Import from @ss-fe-fw/organisms
import {
  OGLeftSidebar,
  MainContent,
} from '@ss-fe-fw/organisms'
/* eslint-disable-next-line */
export interface AdminLayoutProps {
  title?: string;
  collapsed?: boolean;
  collapsedWidth?: number;
  onBreakpoint?: any;
  onCollapse?: any;
  children?: any;
}

export function AdminLayout(props: AdminLayoutProps) {
  return (
    <>
      {props.title &&
      <Head>
        <title>{props.title}</title>
      </Head>
      }
      <Layout style={{ minHeight: '100vh' }}>
        <OGLeftSidebar
          collapsed={props.collapsed}
          collapsedWidth={props.collapsedWidth}
          onBreakpoint={props.onBreakpoint}
          onCollapse={props.onCollapse}
        />
        <MainContent>
          {props.children}
        </MainContent>
      </Layout>

      <style jsx global>{`
        .site-layout .site-layout-background {
          background: #fff;
        }
        .site-layout .ant-layout-content {
          background: transparent;
        }
        .ant-layout-header {
          box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
        }
        .ant-layout-sider {
          box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
          z-index: 10;
        }
        .trigger {
          padding: 0 10px;
          font-size: 18px;
          line-height: 64px;
          cursor: pointer;
          transition: color 0.3s;
        }
        .trigger:hover {
          color: #1890ff;
        }
      `}</style>
    </>
  );
}

export default AdminLayout
