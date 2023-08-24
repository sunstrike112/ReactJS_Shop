// Import from antd
import { Space, Skeleton, Divider } from 'antd';
// Import from local
import {
  AtomAvatar,
  AtomNotification,
} from '@ss-fe-fw/shared/ui';
import { ERROR_MESSAGE_RENDER } from '@ss-fe-fw/constants';
import { AtomServiceCenter } from '@ss-fe-fw/atoms';

/* eslint-disable-next-line */
export interface MCTopBoxUserActionProps {
  isLoading?: boolean;
  isError?: boolean;
  notificationMenu: any;
  avatar: {
    title: any,
    menu: any,
    role: any
  }
}

export function MCTopBoxUserAction(props: MCTopBoxUserActionProps) {
  return (
    <>
      <Space
        className="box-top-user-action"
        align="center"
        size="small"
        style={{ display: 'flex', position: 'relative', justifyContent: 'flex-end' }}
        split={<Divider type="vertical" />}
      >
        { props.isLoading && <p>{ERROR_MESSAGE_RENDER}</p>}
        { props.isLoading &&
          <>
            <Skeleton.Button active={true} />
            <Skeleton.Button active={true}  />
          </>
        }
        {
          !props.isLoading && !props.isError &&
          <>
            <AtomServiceCenter
             placement="bottomRight"
             styleBox={{ padding: '0 12px' }}
            />
            <AtomNotification
              menu={props.notificationMenu}
              placement="bottomRight"
              styleBox={{ padding: '0 12px' }}
              styleBoxBadge={{ top: 5, position: 'relative' }}
              styleIcon={{ fontSize: '20px' }}
              count={99}
            />
            <AtomAvatar
              placement="bottomLeft"
              menu={props.avatar.menu}
              styleBox={{ padding: '0 12px' }}
              style={{ color: '#272F3E', backgroundColor: '#EAECEF', fontWeight: "bold" }}
              letter={props.avatar.title.slice(0, 1).toUpperCase()}
              title={props.avatar.title}
              role={props.avatar.role}
            />
          </>
        }
      </Space>
      <style jsx global>{`
        .box-top-user-action .ant-skeleton-element {
          display: flex;
        }
        .ant-space-item-split .ant-divider-vertical {
          margin: 0;
        }
      `}</style>
    </>
  );
}

export default MCTopBoxUserAction;
