import { Button, Popover } from 'antd';
import React, { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { OGSearchResource } from '@ss-fe-fw/organisms';

export function MCLocationRoleAddBtn(props) {
  const [visible, setVisible] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const onSearch = (value) => {
    setSearchKey(value)
  }

  const content = (
    <>
      <OGSearchResource apiEndpoint={props.apiEndpoint} onSearch={onSearch} searchKey={searchKey}/>
      <h1>Hello</h1>
    </>
  );

  return (
    <Popover content={content} trigger="click" visible={visible}>
      <Button
        className="user-roles-add"
        ghost
        shape="circle"
        icon={<PlusCircleOutlined style={{ color: '#04BAE0' }} />}
        onClick={() => setVisible(!visible)}
      ></Button>
    </Popover>
  );
}
