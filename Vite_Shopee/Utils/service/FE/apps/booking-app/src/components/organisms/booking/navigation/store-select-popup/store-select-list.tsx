// Import from antd
import { Space, Typography, Button, Card, Row, Skeleton, Empty } from 'antd';

const { Text } = Typography;

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { storeState, selectStoreState } from '@ss-fe-fw/booking/stores';
import { setDefaultTimezone } from '@ss-fe-fw/shared/ui';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface StoreSelectListProps {
  children?: any;
  storeList: any;
  onLoadMore: Function;
  onClose: Function;
  loading: Boolean;
}

let isScrolling;

export function StoreSelectList(props: StoreSelectListProps) {
  const { storeList } = props;
  const screens = useBreakpoint();
  const selectedStore = useRecoilValue(storeState);
  const selectStore = useSetRecoilState(selectStoreState);

  const onSelectStore = (store) => {
    selectStore(store);
    setDefaultTimezone(store?.timezone);
    props.onClose();
  };

  const onLoadMore = () => {
    if (!props.loading) {
      props.onLoadMore();
    }
  };

  const handleScropTopBottom = (e) => {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      const isScrollToBottom =
        e.target.scrollHeight - e.target.scrollTop == e.target.clientHeight;
      if (isScrollToBottom) {
        onLoadMore();
      }
    }, 300);
    e.preventDefault();
  };

  useEffect(() => {
    const listEl = document.getElementById('store-select-list');
    if (listEl) {
      listEl.onscroll = handleScropTopBottom;
    }
  }, [props.loading]);

  return (
    <>
      <Space
        direction="vertical"
        className="store-select-list"
        id="store-select-list"
      >
        {storeList.length ? (
          storeList.map((store, i) => (
            <Card
              key={`store-${i}-${store.id}`}
              className="store-card"
              bodyStyle={{ padding: 16 }}
            >
              <Row justify="space-between">
                <Text className="store-card-title" strong={true}>
                  {store.name}
                </Text>
                <Text
                  className="store-card-description"
                  style={{ paddingTop: 4 }}
                >
                  2.5kms away
                </Text>
              </Row>

              <Row justify="space-between">
                <Text className="store-card-description">
                  {`${store.suburb} ${store.state} ${store.postCode}`}
                  <br />
                  {store.contactPhoneNumber}
                </Text>
                {selectedStore?.id === store.id ? (
                  <Button
                    disabled
                    className="button"
                    shape="round"
                    style={{ width: 136, boxShadow: 'none' }}
                  >
                    Selected
                  </Button>
                ) : (
                  <Button
                    className="button"
                    shape="round"
                    style={{ width: 136 }}
                    onClick={() => onSelectStore(store)}
                  >
                    Set As My Store
                  </Button>
                )}
              </Row>
            </Card>
          ))
        ) : (
          <span>
            {!props.loading && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          </span>
        )}
        {props.loading && <Skeleton />}
      </Space>

      <style jsx global>{`
        .store-select-list {
          width: 100%;
          max-height: calc(min(100vh - 450px, 400px));
          padding: 16px;
          background: #f9fafb;
          overflow-y: auto;
        }
        .store-card-title {
          font-size: 16px;
          line-height: 24px;
          color: #1d1655;
        }
        .store-card-description {
          font-size: 12px;
          line-height: 20px;
          color: #888e9c;
        }
        .store-card .button {
          margin-top: 16px;
        }
      `}</style>
    </>
  );
}

export default StoreSelectList;
