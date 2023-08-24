import React, { useState, useEffect } from 'react'
import {
  Select,
  Spin,
  Empty,
} from 'antd'
import useSWR from 'swr'
import { fetcher } from '@ss-fe-fw/api/fetcher'
import { useMount } from 'react-use'

/* eslint-disable-next-line */
export interface OGUserTypeFilterProps {
  value: {
    input?: any,
    operator?: any,
    defaultValue?: any[];
    form?: any;
  };
  onChange?: any;
}

export function OGUserTypeFilter(props: OGUserTypeFilterProps) {
  const [mounted, setMounted] = useState(false)
  const [options, setOptions] = React.useState([]);
  const { data, error } = useSWR(mounted ? `/countries/AU/states` : null, fetcher)

  const onChange = (value) => {
    props.value.input = value
  }

  useMount(() => setMounted(true))

  useEffect(() => {
    if (data) {
      const newOptions = data.items.map((item) => {
        return {
          label: item?.isoCode,
          value: item?.isoCode
        }
      })
      setOptions(newOptions);
    }
  }, [data])

  return (
    <Select
      labelInValue
      mode="multiple"
      allowClear
      defaultValue={props?.value?.defaultValue ?? []}
      onChange={onChange}
      notFoundContent={!data ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      options={options}
      showSearch={false}
    />
  )
}

export default OGUserTypeFilter
