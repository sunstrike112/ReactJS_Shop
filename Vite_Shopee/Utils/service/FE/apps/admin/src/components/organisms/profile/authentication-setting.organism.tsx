import { getQrCodeApi, setup2FAApi } from '@ss-fe-fw/api/auth/two-factor';
import { userState } from '@ss-fe-fw/stores';
import { Button, Space } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';

/* eslint-disable-next-line */
export interface OGAuthenticationSettingProps {}

export function OGAuthenticationSetting(props: OGAuthenticationSettingProps) {
  const [, setCookie] = useCookies(['Refresh']);
  const [qrCodeBase64, setQrCodeBase64] = useState();
  const [user] = useRecoilState(userState);

  const setup2FA = useCallback(async (isEnableTwoFactorAuth) => {
    const userResult = await setup2FAApi({isEnableTwoFactorAuth});

    // Update token
    localStorage.setItem('accessToken', userResult.accessToken);
    localStorage.setItem('refreshToken', userResult.refreshToken);
    setCookie('Refresh', userResult.refreshToken, { path: '/' })

    setQrCodeBase64(userResult.qrCode);
  }, []);

  useEffect(() => {
    const fetchQrCode = async () => {
      if (user && user.isTwoFactorAuthenticationEnabled) {
        const qrCode = await getQrCodeApi();
        if (qrCode) {
          setQrCodeBase64(qrCode);
        }
      }
    };

    fetchQrCode();
  }, [])

  return (
    <>
      <h2>Authentication Setting</h2>
      <h1>Google Authentication</h1>
      <div>
        Use the authenticator app fo get free verification code, even when your phone is offline.
        Available for Android and iPhone
      </div>
      {qrCodeBase64 && <img src={qrCodeBase64} /> }
      <br/>
      <Space align="start">
        <Button type="primary" onClick={() => setup2FA(!qrCodeBase64)}>{qrCodeBase64 ? "Disable" : "Setup"}</Button>
      </Space>
    </>
  );
}

export default OGAuthenticationSetting;
