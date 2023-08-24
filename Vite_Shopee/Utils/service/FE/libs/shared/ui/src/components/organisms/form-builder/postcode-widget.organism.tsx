import React, { useEffect } from 'react'
import { OGPostCodeInput } from '@ss-fe-fw/shared/ui'

/* eslint-disable-next-line */
export interface OGPostCodeWidgetProps {
  value: any;
  onChange?: any;
  style?: any;
  form?: any;
}

export function OGPostCodeWidget(props: OGPostCodeWidgetProps) {

  return (
    <OGPostCodeInput
      input={props?.value}
      form={props?.form}
      // onChange={onChange}
      style={props.style}
      {...props}
    />
  )
}

export default OGPostCodeWidget
