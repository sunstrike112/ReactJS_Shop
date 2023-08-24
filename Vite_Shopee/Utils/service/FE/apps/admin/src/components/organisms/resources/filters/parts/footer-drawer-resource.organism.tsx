import { Button } from 'antd'
import {
  LABEL_CLEAR_ALL,
  LABEL_APPLY,
} from '@ss-fe-fw/constants'

/* eslint-disable-next-line */
export interface OGFooterDrawerResourceProps {
  onClose?: any;
  onApply?: any;
  filters?: any;
}


export function OGFooterDrawerResource(props: OGFooterDrawerResourceProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button type="text" onClick={props.onClose}>
        {LABEL_CLEAR_ALL}
      </Button>
      <Button onClick={props.onApply} type="primary">
        {LABEL_APPLY}
      </Button>
    </div>
  )
}

export default OGFooterDrawerResource
