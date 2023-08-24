// import core
import React, { useEffect, useState } from 'react'
import { SWRConfig } from 'swr'
// import next
import dynamic from 'next/dynamic'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
// import antd
import 'antd/dist/antd.less'
import './styles/styles.less'

import '../styles/fullcalendar/common/main.less'
import '../styles/fullcalendar/daygrid/main.less'
import '../styles/fullcalendar/timegrid/main.less'
import '../styles/left-column/main.less'
import '../styles/user-roles/main.less'

// Import from store
import {
  RecoilRoot,
} from 'recoil'
// import local
// import { AdminLayout, LoginLayout } from '@ss-fe-fw/templates'
import { APP_LOGIN_URL, APP_ERROR_URL } from '@ss-fe-fw/constants'
import { AbilityContext } from '@ss-fe-fw/utils/can'
import ability from '@ss-fe-fw/utils/ability'
import PubSub from 'pubsub-js'
import _JSXStyle from 'styled-jsx/style'

if (typeof global !== 'undefined') {
  Object.assign(global, { _JSXStyle })
}

const AdminLayout = dynamic(() => import('../components/templates/layout/admin.layout'), { ssr: false })
const LoginLayout = dynamic(() => import('../components/templates/layout/login.layout'), { ssr: false })
// const Error = dynamic(() => import('./_error'), { ssr: false })

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pathName, setPathName] = useState(router.pathname);
  // const [errorStatusCode, setErrorStatusCode] = useState(null);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setPathName(url);
      // setErrorStatusCode(null)
    }
    router.events.on('routeChangeStart', handleRouteChange)
    const tokenExpiredSubscribe = PubSub.subscribe('token_expired', () => {
      router.push(APP_LOGIN_URL)
    });
    // const errorPageSubscribe = PubSub.subscribe('error_page', (msg, statusCode) => {
    //   // setErrorStatusCode(statusCode)
    // });


    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      PubSub.unsubscribe(tokenExpiredSubscribe);
      // PubSub.unsubscribe(errorPageSubscribe);
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
        { !['/login', '/forgot-password', '/reset-password'].some(element => pathName.includes(element)) ?
          <AbilityContext.Provider value={ability}>
            <AdminLayout>
              {<Component {...pageProps} key={router.asPath} /> }
              {/* { errorStatusCode && <Error statusCode={errorStatusCode} /> } */}
            </AdminLayout>
          </AbilityContext.Provider> :
          <LoginLayout>
            <Component {...pageProps} key={router.asPath} />
          </LoginLayout>
        }
      </SWRConfig>
    </RecoilRoot>
  );
}

export default CustomApp;
