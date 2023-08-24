/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React, { useEffect } from 'react';
// Import from next
import Head from 'next/head'
// Import from antd
import { Layout } from 'antd'
// Import from ss-fe-fw/booking/organisms
import { MainHeader, MainContent, MainFooter, BookingFooter } from '@ss-fe-fw/booking/organisms';
import { setDefaultTimezone } from '@ss-fe-fw/shared/ui';
import { storeState } from '@ss-fe-fw/booking/stores';
import { useRecoilState } from 'recoil';

import '../../../styles/main.less';
import 'slick-carousel/slick/slick.less';
import '../../../styles/slider.less';


/* eslint-disable-next-line */
export interface MainLayoutProps {
  pathName: string;
  title?: string;
  pageName?: string;
  children?: any;
}

export function MainLayout(props: MainLayoutProps) {
  // determine page name according to pathName
  const pageConfigs = {
    '/': {name: 'BOOK A SERVICE', footer: <BookingFooter/>},
    '/booking/services': {name: 'BOOK A SERVICE', footer: <BookingFooter/>},
    '/booking/appointment': {name: 'BOOK A SERVICE', footer: <BookingFooter/>},
    '/booking/contact-book': {name: 'BOOK A SERVICE'},
    '/profile': {name: 'MY PROFILE'}
  };
  const pageConfig = pageConfigs[props.pathName] || {name: 'NOT FOUND'};

  // global states
  const [store] = useRecoilState(storeState);

  // effects
  useEffect(() => {
    setDefaultTimezone(store?.timezone);
  }, [])

  // rendering
  return (
    <>
      {props.title &&
      <Head>
        <title>{props.title}</title>
      </Head>
      }
      <Layout style={{ minHeight: '100vh' }}>
        <MainHeader pageName={pageConfig.name}/>
        <MainContent>
          {props.children}
        </MainContent>
        {pageConfig.footer && <MainFooter>{pageConfig.footer}</MainFooter>}
      </Layout>
    </>
  );
}

export default MainLayout
