import React, { useEffect, useState } from 'react'
// Import from store
import {
  useRecoilState,
} from 'recoil'
import { userState } from '@ss-fe-fw/stores'
import { useRouter } from 'next/router'
import { APP_LOGIN_URL, APP_DASHBOARD_URL } from '@ss-fe-fw/constants'
import { isTokenExpired } from '@ss-fe-fw/shared/ui'
import useIsServer from '@ss-fe-fw/hooks/use-is-server'

function useUser(redirectTo = '/login') {
  const router = useRouter()
  const isServer = useIsServer()
  const [user] = useRecoilState(userState);
  let isExpired = true;
  // const [token] = useRecoilState(accessTokenState);

  let accessToken = null
  if (!isServer) {
    accessToken = localStorage.getItem('accessToken') &&
      localStorage.getItem('accessToken') !== undefined ?
      localStorage.getItem('accessToken') : null
  }

  useEffect(() => {
    if (!accessToken && router.pathname !== APP_LOGIN_URL) router.push(redirectTo)
    if (accessToken) {
      const _token = JSON.parse(atob(accessToken.split('.')[1]))
      isExpired = isTokenExpired(_token.exp);
    }
    if (isExpired && router.pathname !== APP_LOGIN_URL) router.push(redirectTo)
    if (!isExpired && router.pathname === APP_LOGIN_URL) router.push(APP_DASHBOARD_URL)
  }, []);

  return { user };
}

export default useUser;
