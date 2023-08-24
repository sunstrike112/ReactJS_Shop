// Import from Antd
import {
  Space,
  Dropdown,
  Badge
} from 'antd';
import {
  BellOutlined
} from '@ant-design/icons';
/* eslint-disable-next-line */
export interface AtomNotificationProps {
  menu?: any;
  placement?: any;
  styleBox?: any;
  styleBoxBadge?: any;
  styleBadge?: any;
  styleIcon?: any;
  count?: number;
}

export function AtomNotification(props: AtomNotificationProps) {
  return (
    <>
      <Dropdown overlay={props.menu} placement={props.placement}>
        <Space className="box-notification" size="small" style={props.styleBox}>
          <div style={props.styleBoxBadge}>
            <Badge count={props.count} style={props.styleBadge}>
              <BellOutlined style={props.styleIcon} />
            </Badge>
          </div>
          </Space>
      </Dropdown>
      <style jsx global>{`
        .box-notification:hover {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

export default AtomNotification;
