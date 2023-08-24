import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { fetcher } from '@ss-fe-fw/api/fetcher'
import {useMount} from 'react-use'
import {
  Select,
  Spin,
  Empty,
} from 'antd'
import { fromString } from '@ss-fe-fw/utils/uuid'
import { snakeCase } from "change-case"
import { useDebounce } from 'react-use'

/* eslint-disable-next-line */
export interface OGRelationsInputProps {
  value: {
    input?: any,
    urlSearch: string,
    idKey: string,
    fieldName: string,
    defaultValue?: any[],
  };
  onChange?: any;
  mode?: 'multiple'
}

export function OGRelationsInput(props: OGRelationsInputProps) {
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState({})
  const url = props.value.urlSearch
  const [cacheKey, setCacheKey] = useState('')
  const { data, error } = useSWR(
    (mounted && query) ? [cacheKey, url, 'POST', query] : null, (key, url, method, body) => fetcher(url, method, body)
  )
  const [options, setOptions] = React.useState([]);
  const [val, setVal] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');

  const onChange = (value: any) => {
    props.value.input = value
  }

  function onSearch(value: any) {
    setVal(value)
  }

  function onFocus() {
    setVal('')
  }

  useDebounce(() => {
    setDebouncedValue(val);
  }, 500, [val]);

  useEffect(() => {
    let customerQuery = {
      page: 1,
      size: 1000
    }
    if (debouncedValue) {
      customerQuery = {...customerQuery, ...{
        where: {
          [props.value.fieldName]: {
            contains: debouncedValue,
            mode: "insensitive"
          }
        }
      }}
    }
    setCacheKey(`${fromString(url)}-${snakeCase(fromString(JSON.stringify(customerQuery)))}`)
    setQuery(customerQuery)
  }, [debouncedValue])

  useMount(() => setMounted(true))

  useEffect(() => {
    onSearch(null)
  }, [])

  useEffect(() => {
    if (data) {
      const newOptions = data.items.map((item: any) => {
        return {
          label: item[props.value.fieldName],
          value: item[props.value.idKey]
        }
      })
      setOptions(newOptions);
    }
  }, [data])

  return (
    <Select
      showSearch
      labelInValue
      filterOption={false}
      defaultValue={props?.value?.defaultValue ?? []}
      onChange={onChange}
      onSearch={onSearch}
      onFocus={onFocus}
      mode={props?.mode}
      allowClear
      notFoundContent={!data ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      options={options}
    />
  )
}

export default OGRelationsInput
