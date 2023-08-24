import { displayDateTime } from '@ss-fe-fw/shared/ui'
import {
  useRecoilValue,
} from 'recoil';
import { currentTimezoneState } from '@ss-fe-fw/stores';

/* eslint-disable-next-line */
export interface OGTextDateTimeProps {
  date: any;
  format?: any;
}

export function OGTextDateTime(props: OGTextDateTimeProps) {
  const timezone = useRecoilValue(currentTimezoneState);

  return (
    <>
      {displayDateTime(props.date, timezone, props.format)}
    </>
  )
}

export default OGTextDateTime
