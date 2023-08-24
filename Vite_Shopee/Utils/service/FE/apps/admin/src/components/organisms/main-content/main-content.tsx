import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// Import from antd
import { Layout, Space } from 'antd';
// Import from @ss-fe-fw/organisms
import {
  OGTopMainHeader,
  OGTopBreadcrumb,
} from '@ss-fe-fw/organisms';
// Import from store
import {
  useRecoilState,
} from 'recoil';
import { sidebarState } from '@ss-fe-fw/stores';
import { listRoute } from '@ss-fe-fw/configs';

/* eslint-disable-next-line */
export interface MainContentProps {
  children: any;
}

const { Content } = Layout;

export function MainContent(props: MainContentProps) {
  const router = useRouter()

  const [sidebar] = useRecoilState(sidebarState)
  const [hasBreadcrumb, setHasBreadcrumb] = useState(true)
  const [itemsOfBreadcrumb, setItemsOfBreadcrumb] = useState(null)
  const [titleOfBreadcrumb, setTitleOfBreadcrumb] = useState('')
  const [extraComponentOfBreadcrumb, setExtraComponentOfBreadcrumb] = useState(null)

  useEffect(() => {
    const handleDisplayBreadcrumb = (url) => {
      Object.entries(listRoute).forEach(([key, route]) => {
        if (route.link === url ||
          (url.includes('/update') && url.includes(route.link))
        ) {
          setHasBreadcrumb(route.isDisplayBreadcrumb)
          if (route.isDisplayBreadcrumb) setTitleOfBreadcrumb(route.title)
          if (route?.breadcrumb && route?.breadcrumb.length > 0) {
            // setTitleOfBreadcrumb(route.breadcrumb[route.breadcrumb.length - 1].breadcrumbName)
            setItemsOfBreadcrumb(route.breadcrumb)

            // Handle controls on page header
            if (route?.ui?.list?.topControls?.breadcrumbTopRight?.isDisplay &&
            route?.ui?.list?.topControls?.breadcrumbTopRight?.component) {
              setExtraComponentOfBreadcrumb(route.ui.list.topControls.breadcrumbTopRight.component)
            } else {
              setExtraComponentOfBreadcrumb(null)
            }
          } else setItemsOfBreadcrumb(null)
        }
      });
    }
    handleDisplayBreadcrumb(router.asPath)

    const handleRouteChange = (url, { shallow }) => {
      handleDisplayBreadcrumb(url)
    }

    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <>
      <Layout className="site-layout" style={{ marginLeft: sidebar.layoutMarginLeft }}>
        <OGTopMainHeader />
        <Space direction="vertical">
          { hasBreadcrumb && <OGTopBreadcrumb title={titleOfBreadcrumb} breadcrumb={itemsOfBreadcrumb} extra={extraComponentOfBreadcrumb} />}
          <Content
            className="site-layout-background"
            style={{ margin: '24px 10px 0', marginTop: hasBreadcrumb ? 0 : 72, overflow: 'initial', minHeight: 280, padding: 16 }}
          >
            {props.children}
          </Content>
        </Space>
      </Layout>
      <style jsx global>{`
        .site-layout .site-layout-background {
          background: #fff;
        }
      `}</style>
    </>
  );
}

export default MainContent;
