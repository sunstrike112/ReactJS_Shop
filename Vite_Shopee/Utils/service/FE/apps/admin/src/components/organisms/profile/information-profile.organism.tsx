import {
  EnvironmentFilled, MailFilled,
  PhoneFilled
} from '@ant-design/icons';
import { userState } from '@ss-fe-fw/stores';
import React from 'react';
import { useRecoilState } from 'recoil';

/* eslint-disable-next-line */
export interface OGInformationProfileProps {
  children?: any;
}

export function OGInformationProfile(props: OGInformationProfileProps) {
  const [user] = useRecoilState(userState);

  return (
    <>
      <div>
        <h3>{user?.firstName + ' ' + user?.lastName}</h3>
      </div>
      <p>
        <h4>Contact Information</h4>
        <div>
          <MailFilled /> &nbsp;
          <span>{user?.email}</span>
        </div>
        <div>
          <PhoneFilled /> &nbsp;
          <span>{user?.phoneNumber}</span>
        </div>
        <div>
          <EnvironmentFilled /> &nbsp;
          <span>{user?.addressLine1}, {user?.suburb} {user?.state} {user?.postCode}</span>
        </div>
      </p>
      <p>
        <h4>User Roles</h4>
      </p>
    </>
  )
}

export default OGInformationProfile
