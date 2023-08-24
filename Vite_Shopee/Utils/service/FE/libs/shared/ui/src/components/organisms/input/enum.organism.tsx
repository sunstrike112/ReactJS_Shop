import React, { useState, useEffect } from 'react'
import {
  Select,
} from 'antd'
import {useMount} from 'react-use';
import useEnums from '@ss-fe-fw/hooks/use-enums'
import { capitalCase } from 'change-case'

/* eslint-disable-next-line */
export interface OGEnumInputProps {
  value: {
    input?: any,
    operator?: any,
    type?: string,
  };
  onChange?: any;
}

const { Option } = Select;

export function OGEnumInput(props: OGEnumInputProps) {
  const [mounted, setMounted] = useState(false)
  const {enums, isEnumsLoading, isEnumsError} = useEnums({mounted, typeEnum: props.value.type})

  // Hooks Mounted
  useMount(() => setMounted(true))

  const onChange = (value: any) => {
    props.value.input = value
  }

  useEffect(() => {
  }, [enums])

  return (
    <>
      {isEnumsError && <h1>Error</h1>}
      {!isEnumsError && <Select defaultValue={props.value.input} onChange={onChange} loading={isEnumsLoading}>
        {/* <Option value="">All</Option> */}
        { enums && enums.items.map((item: any, index: any) => {
            return (
              <Option key={`input-${index}-${item}`} value={item}>{capitalCase(item)}</Option>
            )
          })
        }
      </Select>
      }
    </>
  )
}

export default OGEnumInput
