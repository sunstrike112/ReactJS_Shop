import { OGEnumInput } from '@ss-fe-fw/shared/ui'

/* eslint-disable-next-line */
export interface OGEnumFilterProps {
  value: {
    input?: number,
    operator?: any,
    type?: string,
  };
  onChange?: any;
}

export function OGEnumFilter(props: OGEnumFilterProps) {

  const onChange = (value) => {
    props.value.input = value
  }

  return (
    <OGEnumInput
      value={props.value}
      onChange={onChange}
    />
  )
}

export default OGEnumFilter
