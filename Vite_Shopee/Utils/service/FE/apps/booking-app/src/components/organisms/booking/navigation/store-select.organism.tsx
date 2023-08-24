// Import from antd
import { Space, Typography, Row, Popover } from 'antd';
import { EnvironmentFilled } from '@ant-design/icons';

const { Text } = Typography;

import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import StoreSelectPopup from './store-select-popup/store-select-popup';
import CurrentLocationPopup from './current-location-popup/current-location-popup';
import {
  selectStoreState,
  storeState,
} from '@ss-fe-fw/booking/stores';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import useComboState from '@ss-fe-fw/booking/hooks/use-combo-state';

export interface StoreSelectProps {
  children?: any;
}

export function StoreSelect(props: StoreSelectProps) {
  const screens = useBreakpoint();
  const selectedStore = useRecoilValue(storeState);
  const selectStore = useSetRecoilState(selectStoreState);

  const ref = useRef(null);

  const { state, setState } = useComboState({
    isOpenCurrentLocationPopup: false,
    isOpenSearchLocationPopup: false,
    isAutoSearchAll: false,
  });

  const onCloseCurrentLocationPopup = () =>
    setState({
      isOpenCurrentLocationPopup: false,
      isOpenSearchLocationPopup: false,
      isAutoSearchAll: false,
    });

  const onBackCurrentLocationPopup = () => {
    setState({
      isOpenCurrentLocationPopup: false,
      isOpenSearchLocationPopup: true,
      isAutoSearchAll: true,
    });
  };

  const onCloseAllPopup = () =>
    setState({
      isOpenCurrentLocationPopup: false,
      isOpenSearchLocationPopup: false,
      isAutoSearchAll: false,
    });

  const onTogglePopup = (value) => {
    setState({
      isOpenCurrentLocationPopup: value && Boolean(selectedStore),
      isOpenSearchLocationPopup: value && !selectedStore,
      isAutoSearchAll: false,
    });
  };

  return (
    <>
      <Row id="search-location-row" ref={ref} style={{ width: 'fit-content' }}>
        <Popover
          placement="bottomLeft"
          content={
            <>
              {state.isOpenCurrentLocationPopup && (
                <CurrentLocationPopup
                  onClose={onCloseCurrentLocationPopup}
                  onBack={onBackCurrentLocationPopup}
                />
              )}
              {state.isOpenSearchLocationPopup && (
                <StoreSelectPopup
                  onClose={onCloseAllPopup}
                  isAutoSearchAll={state.isAutoSearchAll}
                />
              )}
            </>
          }
          trigger="click"
          visible={
            state.isOpenCurrentLocationPopup || state.isOpenSearchLocationPopup
          }
          onVisibleChange={onTogglePopup}
          getPopupContainer={() => document.body}
        >
          <Space direction="horizontal" className="store-select">
            <EnvironmentFilled className="map-icon" />
            <Text
              className="text"
              underline={true}
              strong={selectedStore ? true : false}
              style={{ color: selectedStore ? '#1D1655' : '' }}
            >
              {selectedStore
                ? selectedStore.name
                : 'No store currently selected'}
            </Text>
          </Space>
        </Popover>
      </Row>

      <style jsx global>{`
        .store-select {
          height: 44px;
          cursor: pointer;
          margin-left: ${screens['xs'] ? '10px' : '27px'};
        }
        .store-select .map-icon {
          font-size: 150%;
          color: #22075e;
        }
        .store-select .text {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 22px;

          text-align: center;
          text-decoration-line: underline;

          color: #afb4be;
        }
        .ant-popover {
          width: ${screens['xs'] ? '100vw' : 'unset'};
          box-sizing: border-box;
          padding: ${screens['xs'] ? '6px 21px 0 21px' : '6px 0px 0 0px'};
        }
        .ant-popover-arrow {
          display: none;
        }
        .ant-popover-inner-content {
          padding: 0;
        }
      `}</style>
    </>
  );
}

export default StoreSelect;
