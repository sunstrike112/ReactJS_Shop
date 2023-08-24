/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React from 'react'
// Import from next
import Head from 'next/head'
// Import from antd
import { Layout } from 'antd'
// Import from ss-fe-fw/booking/organisms
import {
  LoginMainContent
} from '@ss-fe-fw/booking/organisms';
import '../../../styles/main.less';

/* eslint-disable-next-line */
export interface LoginLayoutProps {
  title?: string;
  children?: any;
}

export function LoginLayout(props: LoginLayoutProps) {
  return (
    <>
      {props.title &&
      <Head>
        <title>{props.title}</title>
      </Head>
      }
      <Layout style={{ minHeight: '100vh' }}>
        <LoginMainContent>
          {props.children}
        </LoginMainContent>
      </Layout>
    </>
  );
}

export default LoginLayout
