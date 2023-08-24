import React, { useState, useEffect } from 'react'
import {
  Select,
} from 'antd'
import useSWR from 'swr'
import { fetcher } from '@ss-fe-fw/api/fetcher'
import {useMount} from 'react-use'

/* eslint-disable-next-line */
export interface OGSuburbInputProps {
  input?: any;
  postCode?: any;
  style?: any;
  form?: any;
  onChange?: any;
}

const { Option } = Select;

export function OGSuburbInput(props: OGSuburbInputProps) {
  const [mounted, setMounted] = useState(false)
  const [postCode, setPostCode] = useState(null)
  const [input, setInput] = useState(props?.input)
  const { data, error } = useSWR(mounted && postCode ? `/countries/AU/postCode/${postCode}` : null, fetcher)

  const onChange = (value: any) => {
    setInput(value)
    props?.onChange(value)
  }

  useMount(() => setMounted(true))

  useEffect(() => {
    setPostCode(props.postCode)
  }, [props.postCode])

  return (
    <Select placeholder="Select Suburb" defaultValue={input} onChange={onChange} loading={!data && !error} style={props.style}>
      {/* <Option value="">Select Suburb</Option> */}
      {
        (data && postCode) && data.items.map((item: any) => {
          return (
            <Option key={`suburb-${item.id}`} value={item.suburb}>{item.suburb}</Option>
          )
        })
      }
    </Select>
  )
}

export default OGSuburbInput
