import { Space } from 'antd';
import React, { useState, useEffect } from 'react';
import {
  PhoneFilled,
  MailFilled,
  EnvironmentFilled,
} from '@ant-design/icons';
import PubSub from 'pubsub-js';

export function OGLeftColumnServiceCentre(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadedResourceFormSubscribe = PubSub.subscribe(
      'loaded_resource_form',
      (msg, formData) => {
        setData(formData);
      }
    );

    return () => {
      PubSub.unsubscribe(loadedResourceFormSubscribe);
    };
  }, []);

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <h1 className="left-column-title">{data?.name}</h1>
      <div className="divider"></div>
      <Space direction="vertical" size={4}>
        <Space direction="horizontal" size={8} align="center">
          <PhoneFilled />
          <span>{data?.contactPhoneNumber}</span>
        </Space>
        <Space direction="horizontal" size={8} align="center">
          <MailFilled />
          <span>{data?.contactEmail}</span>
        </Space>
        <Space direction="horizontal" size={8} align="start">
          <EnvironmentFilled />
          <span>{data?.addressLine1}, {data?.suburb} {data?.state} {data?.postCode}</span>
        </Space>
      </Space>
    </Space>
  );
}
