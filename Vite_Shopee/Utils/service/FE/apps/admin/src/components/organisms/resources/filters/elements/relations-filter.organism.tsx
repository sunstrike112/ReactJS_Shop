import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { fetcher } from '@ss-fe-fw/api/fetcher'
import { useMount } from 'react-use'
import {
  Select,
  Spin,
  Empty,
} from 'antd'
import { fromString } from '@ss-fe-fw/utils/uuid'
import { snakeCase } from "change-case"
import * as inflection from 'inflection'
import { useDebounce } from 'react-use'

/* eslint-disable-next-line */
export interface OGRelationsFilterProps {
  value: {
    input?: any,
    operator?: any,
    idKey?: string;
    fieldName?: string;
    relationName: string;
    defaultValue?: any[];
  };
  onChange?: any;
}

export function OGRelationsFilter(props: OGRelationsFilterProps) {
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState(null)
  const url = `/${inflection.pluralize(props.value.relationName)}/search`
  const [cacheKey, setCacheKey] = useState(null)
  const { data, error } = useSWR(
    (mounted && query) ? [cacheKey, url, 'POST', query] : null, (key, url, method, body) => fetcher(url, method, body)
  )
  const [options, setOptions] = React.useState([]);
  const [val, setVal] = React.useState(null);
  const [debouncedValue, setDebouncedValue] = React.useState('');

  const onChange = (value) => {
    props.value.input = value
  }

  function onSearch(val) {
    setVal(val)
  }

  function onFocus() {
    setVal(null)
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
      customerQuery = {
        ...customerQuery, ...{
          where: {
            [props.value.fieldName]: {
              contains: debouncedValue,
              mode: "insensitive"
            }
          }
        }
      }
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
      console.log(data)
      const newOptions = data.items.map((item) => {
        return {
          label: item[props.value.fieldName] == 'Global' ? 'Global' : 'Local',
          value: item[props.value.idKey]
        }
      })
      setOptions(newOptions);
      console.log(newOptions)
      console.log(`All Options : ${newOptions}`)
    }
  }, [data])

  return (
    <Select
      labelInValue
      filterOption={false}
      defaultValue={props?.value?.defaultValue ?? []}
      onChange={onChange}
      onSearch={onSearch}
      onFocus={onFocus}
      mode="multiple"
      allowClear
      notFoundContent={!data ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      options={options}
    />
  )
}

export default OGRelationsFilter
