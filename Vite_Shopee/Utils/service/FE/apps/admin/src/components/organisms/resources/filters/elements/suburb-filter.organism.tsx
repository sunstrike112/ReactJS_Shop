import { OGSuburbInput } from '@ss-fe-fw/shared/ui'

/* eslint-disable-next-line */
export interface OGSuburbFilterProps {
  value: {
    input?: any,
    operator?: any,
    postCode?: any,
    form?: any;
  };
  onChange?: any;
}

export function OGSuburbFilter(props: OGSuburbFilterProps) {

  const onChange = (value) => {
    props.value.input = value
  }

  return (
    <OGSuburbInput
      input={props.value.input}
      form={props.value.form}
      postCode={props.value.postCode}
      onChange={onChange}
    />
  )
}

export default OGSuburbFilter
