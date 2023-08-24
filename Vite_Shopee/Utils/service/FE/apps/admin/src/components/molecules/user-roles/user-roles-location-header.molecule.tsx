import { OGSearchResource } from '@ss-fe-fw/organisms';
import { Button, List, Popover } from 'antd';
import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { fetcher } from '@ss-fe-fw/api/fetcher';
import { useMount } from 'react-use';
import PubSub from 'pubsub-js';

export function MCLocationHeader(props) {
  const url = `${props.apiEndpoint}/search`;
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const { data, error } = useSWR(
    mounted && query ? [url, 'POST', query] : null,
    (url, method, body) => fetcher(url, method, body)
  );

  useMount(() => setMounted(true));

  useEffect(() => {
    const query = {
      where: {
        name: {
          contains: searchKey,
          mode: 'insensitive',
        },
      },
    };

    setQuery(query);
  }, [searchKey]);

  useEffect(() => {
    if (data) setOrganizations(data.items);
  }, [data]);

  const onSearch = (value) => {
    setSearchKey(value);
  };

  const addNewOrganization = (organization) => {
    PubSub.publish('add_new_organization', organization);
  }

  const content = (
    <>
      <OGSearchResource onSearch={onSearch} searchKey={searchKey} />
      <List
        className="list-container add-header-list"
        dataSource={organizations}
        renderItem={(item) => (
          <div className="list-item-container" onClick={() => addNewOrganization(item)}>
            <a className="list-item">
              {item.name}
            </a>
          </div>
        )}
      />
    </>
  );

  return (
    <>
      <div className="location-role-header">
        <h4>{props.title}</h4>

        <Popover content={content} trigger="click">
          <Button
            className="user-roles-add"
            ghost
            shape="circle"
            icon={<PlusCircleOutlined style={{ color: '#04BAE0' }} />}
          ></Button>
        </Popover>
      </div>

      <style jsx>{`
        .location-role-header {
          padding: 8px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .list-item {
          padding: 8px 0;
        }
      `}</style>
    </>
  );
}
