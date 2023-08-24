/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React from 'react'
// Import from next
import Head from 'next/head'
// Import from antd
import {
  Layout,
  Space,
  Affix
} from 'antd'
// Import from @ss-fe-fw/organisms
import {
  OGLeftSidebar,
  MainContent,
} from '@ss-fe-fw/organisms'
/* eslint-disable-next-line */
export interface AdminTwoColumnLayoutProps {
  left: {
    isDisplay: boolean,
    headerComponent?: any,
    component?: any,
    footerComponent?: any
  };
  children?: any;
}

const { Content, Sider } = Layout;

export function AdminTwoColumnLayout(props: AdminTwoColumnLayoutProps) {

  return (
    <>
      <Layout className="two-columns-layout" style={{ minHeight: 'calc(100vh - 135px)' }}>
        { props?.left?.isDisplay &&
          <Sider width={'300px'} className="site-layout-background" style={{ padding: 20 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              { props.left.headerComponent }
              { props.left.component }
              { props?.left?.footerComponent &&
                <Affix style={{ position: 'absolute', bottom: 20 }}>
                  { props.left.footerComponent }
                </Affix>
              }
            </Space>
          </Sider>
        }
        <Layout style={{ marginLeft: props?.left?.isDisplay ? 24 : 0 }}>
          <Content
            className="two-column-main-content site-layout-background"
            style={{ padding: '10px 0px' }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
      <style jsx global>{`
      .two-columns-layout .ant-layout-content.site-layout-background {
        background: #fff;
      }
      .two-column-main-content .ant-tabs .ant-tabs-nav,
      .two-column-main-content .ant-tabs .ant-tabs-content {
        padding-left: 20px;
        padding-right: 20px;
      }
      `}</style>
    </>
  )
}

export default AdminTwoColumnLayout
