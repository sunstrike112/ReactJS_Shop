import { OGSearchResource } from '@ss-fe-fw/organisms';
import { Button, List, Popover } from 'antd';
import React, { useState, useEffect } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { fetcher } from '@ss-fe-fw/api/fetcher';
import { useMount } from 'react-use';
import PubSub from 'pubsub-js';

export function MCRoleHeader(props) {
  const url = `${props.apiEndpoint}/search`;
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState(null);
  const [searchKey, setSearchKey] = useState('');
  const [roles, setRoles] = useState([]);
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
    if (data) setRoles(data.items);
  }, [data]);

  const onSearch = (value) => {
    setSearchKey(value);
  };

  const addNewRole = async (role) => {
    PubSub.publish('add_new_role', role);
  }

  const content = (
    <>
      <OGSearchResource onSearch={onSearch} searchKey={searchKey} />
      <List
        className="list-container add-header-list"
        dataSource={roles}
        renderItem={(item) => (
          <div className="list-item-container" onClick={() => addNewRole(item)}>
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

        {props.isSelectedLocation && (
          <Popover content={content} trigger="click">
            <Button
              className="user-roles-add"
              ghost
              shape="circle"
              icon={<PlusCircleOutlined style={{ color: '#04BAE0' }} />}
            ></Button>
          </Popover>
        )}
      </div>

      <style jsx>{`
        .location-role-header {
          padding: 8px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 40px
        }
      `}</style>
    </>
  );
}
