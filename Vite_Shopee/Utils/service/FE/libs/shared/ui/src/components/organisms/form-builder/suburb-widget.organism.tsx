import { useEffect } from 'react'
import { OGSuburbInput } from '@ss-fe-fw/shared/ui'

/* eslint-disable-next-line */
export interface OGSuburbWidgetProps {
  value: {
    input: any,
    postCode?: any,
  };
  form?: any;
  onChange?: any;
}

export function OGSuburbWidget(props: OGSuburbWidgetProps) {

  const onChange = (value: any) => {
    props.value.input = value
  }

  return (
    <OGSuburbInput
      input={props?.value?.input}
      form={props.form}
      postCode={props?.value?.postCode}
      onChange={onChange}
    />
  )
}

export default OGSuburbWidget
