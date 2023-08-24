import { Input, Tooltip } from 'antd';

/* eslint-disable-next-line */
export interface AtomNumericInputProps {
  addonBefore?: any;
  value: any;
  onChange?: any;
  onBlur?: any;
}

export function AtomNumericInput(props: AtomNumericInputProps) {

  const onChange = (e: any) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      props.onChange(value);
    }
  };

  const onBlur = () => {
    const { value, onBlur, onChange } = props;
    let valueTemp = value;
    if (value && value.length > 1 && value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }

    (value && value.length > 1) && onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <Input
      {...props}
      addonBefore={props.addonBefore}
      onChange={onChange}
      onBlur={onBlur}
      maxLength={25}
      value={props.value}
    />
  )
}
