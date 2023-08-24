import { Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { PhoneFilled, MailFilled, HomeFilled, IdcardFilled } from '@ant-design/icons';
import PubSub from 'pubsub-js';
import { OGCustomerActionBtn } from './customer-action-btn.organism';

export function OGLeftColumnCustomerManagement(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadedResourceFormSubscribe = PubSub.subscribe('loaded_resource_form', (msg, formData) => {
      setData(formData);
    });

    return () => {
      PubSub.unsubscribe(loadedResourceFormSubscribe);
    }
  }, []);
  
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <h1 className="left-column-title">{ `${data?.firstName} ${data?.lastName}` }</h1>
      <OGCustomerActionBtn />
      <div className="divider"></div>
      <h4>Customer Details</h4>
      <Space direction="vertical" size={4}>
        <Space direction="horizontal" size={8} align="center">
          <PhoneFilled />
          <span>
            { data?.phoneNumber }
          </span>
        </Space>
        <Space direction="horizontal" size={8} align="center">
          <MailFilled />
          <span>
            { data?.email }
          </span>
        </Space>
        <Space direction="horizontal" size={8} align="center">
          <IdcardFilled />
          <span>
            { data?.nrma }
          </span>
        </Space>
        <Space direction="horizontal" size={8} align="center">
          <MailFilled />
          <span>
            { data?.companyName }
          </span>
        </Space>
        <Space direction="horizontal" size={8} align="start">
          <HomeFilled />
          <Space direction="vertical" size={4}>
            <span>
              { data?.addressLine1 }
            </span>

            <span>
              { data?.addressLine2 ? data.addressLine2 : '-'}
            </span>            
          </Space>
        </Space>
      </Space>

      <h4 className="left-column-secondary-title">Other Information</h4>

      <div className="upcoming-booking-block">
        <Space direction="vertical" size={4} style={{ width: '100%', margin: '4px' }}>
          <p className="secondary-title">Upcoming Booking</p>
          <span className="upcoming-booking-date">27/06/2021 07:00 AM</span>
        </Space>
      </div>

      <div>
        <Space direction="vertical" size={4} style={{ width: '100%', margin: '4px' }}>
          <p className="secondary-title">Last Booking</p>
          <span className="last-booking-date">27/06/2021 07:00 AM</span>
        </Space>
      </div>

      <Space direction="vertical" size={4} style={{ width: '100%' }}>
        <div className="note-block">
          <p className="secondary-title">Note</p>
          <a className="edit-note">Edit</a>
        </div>
        <span>Call Customer after this discussion</span>
      </Space>
    </Space>
  )
}
