import React, { useEffect } from 'react'
// Import from hooks
import useUser from '@ss-fe-fw/hooks/use-user'
import { setDefaultTimezone } from '@ss-fe-fw/shared/ui'
import {
  useRecoilState,
} from 'recoil';
import { timezoneState } from '@ss-fe-fw/stores';

/* eslint-disable-next-line */

export function OGBasePageComponent(props) {
  useUser('/login');
  const [timezone, setTimezone] = useRecoilState(timezoneState);

  useEffect(() => {
    // setTimezone('America/Resolute')
    setDefaultTimezone(timezone)
  }, [])

  return (
    <>
      {props.children}
    </>
  )
}

export default OGBasePageComponent;
