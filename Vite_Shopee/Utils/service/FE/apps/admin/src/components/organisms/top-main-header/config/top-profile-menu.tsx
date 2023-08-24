// Import from next
import Link from 'next/link'
// Import from antd
import { Menu } from 'antd';

export const topProfileMenu = (props: any) => (
  <Menu onClick={props.onClick}>
    <Menu.Item key="account-settings">
      <Link href="/profile">
        <a>Account Settings</a>
      </Link>
    </Menu.Item>
    <Menu.Item key="logout">Logout</Menu.Item>
  </Menu>
);
