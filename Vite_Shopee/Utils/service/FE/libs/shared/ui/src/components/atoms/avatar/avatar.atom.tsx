// Import from Antd
import {
  Avatar as AntdAvatar,
  Space,
  Typography,
  Dropdown
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

/* eslint-disable-next-line */
export interface AtomAvatarProps {
  styleBox?: any;
  style?: any;
  letter?: string;
  title?: string;
  role?: string;
  menu?: any;
  placement?: any;
}

const { Text } = Typography;

export function AtomAvatar(props: AtomAvatarProps) {
  return (
    <>
      <Dropdown overlay={props.menu}>
        <Space align="center" size="small" className="box-avatar" style={props.styleBox}>
          <AntdAvatar style={props.style} size={40}>{props.letter}</AntdAvatar>
          <div className="avatar-title">
            <Text className="avatar-title-txt" ellipsis={true}>{props.title}</Text>
            <Text  className="avatar-title-role" ellipsis={true}>{props.role}</Text>
          </div>
          <CaretDownOutlined />
        </Space>
      </Dropdown>
      <style jsx global>{`
        .box-avatar {
          border-left: 1px solid #F4F5F7;
        }
        .box-avatar:hover {
          cursor: pointer;
        }
        .avatar-title {
          display: flex;
          flex-direction: column;
        }
        .avatar-title-txt {
          font-size: 14px;
          line-height: 22px;
          color: #4D5562;
        }
        .avatar-title-role {
          font-size: 12px;
          line-height: 20px;
          color: #AFB4BE;
        }
      `}</style>
    </>
  );
}

export default AtomAvatar;
