import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// Import from antd
import {
  Space,
  Switch,
  Typography,
  notification,
} from 'antd'
import baseApi from '@ss-fe-fw/api/base-api';
import useSWR, { mutate } from 'swr'
import { fetcher } from '@ss-fe-fw/api/fetcher'
import {useMount} from 'react-use'
import { ITEM_UPDATE_SUCCESSFULLY } from '@ss-fe-fw/constants'
import PubSub from 'pubsub-js'

/* eslint-disable-next-line */
export interface OGToggleActiveResourceProps {
  apiEndpoint: string;
  children?: any;
  setmetadata?: any;
  metadata?: any;
}

const { Text } = Typography;

export function OGToggleActiveResource(props: OGToggleActiveResourceProps) {
  const router = useRouter()
  const [detailUrl, setDetailUrl] = useState(null)
  const [active, setActive] = useState(props?.metadata?.formData?.isActive ?? false)

  const onChange = (e) => {
    onToggleActiveItem(e)
    // props?.children?.setmetadata((oldMetaData) => ({ ...oldMetaData, toggleDefaultChecked: e }))
  }

  const onToggleActiveItem = async (e) => {
    if (router.query.id) {
      const result = await baseApi(detailUrl, 'PATCH', {isActive: e})
      if (!result.status) {
        setActive(e)
        notification.success({
          message: ITEM_UPDATE_SUCCESSFULLY
        })
      }
    }
  }

  useEffect(() => {
    const url = `${props.apiEndpoint}/${router.query.id}`
    setDetailUrl(url)

    const loadedResourceFormSubscribe = PubSub.subscribe('loaded_resource_form', (msg, formData) => {
      setActive(formData?.isActive ?? false)
    });

    return () => {
      PubSub.unsubscribe(loadedResourceFormSubscribe);
    }
  }, [])

  return (
    <Space>
      <Text style={{ visibility: active ? 'visible' : 'hidden' }}>
        {active ? 'Active' : 'InActive'}
      </Text>
      <Switch defaultChecked={active} checked={active} onChange={onChange} size="small" />
    </Space>
  )
}

export default OGToggleActiveResource
