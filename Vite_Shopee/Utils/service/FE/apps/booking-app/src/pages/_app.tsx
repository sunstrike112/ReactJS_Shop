import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';
import dynamic from 'next/dynamic';
// import antd
import 'antd/dist/antd.less';

import _JSXStyle from 'styled-jsx/style'

if (typeof global !== 'undefined') {
  Object.assign(global, { _JSXStyle })
}

const MainLayout = dynamic(() => import('../components/templates/layout/main.layout'), { ssr: false })
const LoginLayout = dynamic(() => import('../components/templates/layout/login.layout'), { ssr: false })

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pathName, setPathName] = useState(router.pathname);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setPathName(url);
    }
    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          dedupingInterval: 2000,
          focusThrottleInterval: 5000,
        }}
      >
        { !['/login', '/register', '/reset-password', '/forgot-password'].some(element => pathName.includes(element)) ?
          <MainLayout pathName={pathName}>
            <Component {...pageProps} key={router.asPath}/>
          </MainLayout> :
          <LoginLayout>
            <Component {...pageProps} key={router.asPath} />
          </LoginLayout>
        }
      </SWRConfig>
    </RecoilRoot>
  );
}

export default CustomApp;
