// Import from antd
import { Space, Input, Button, Row } from 'antd';
import { AimOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';
import { selectStoreState } from '@ss-fe-fw/booking/stores';

const { Search } = Input;

import { useEffect, useCallback } from 'react';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import StoreSelectList from './store-select-list';
import useComboState from '@ss-fe-fw/booking/hooks/use-combo-state';
import { getOrganizations } from '@ss-fe-fw/booking/api/organizations/organizations';
import { setDefaultTimezone } from '@ss-fe-fw/shared/ui';
import FormItem from 'antd/lib/form/FormItem';

export interface StoreSelectPopupProps {
  children?: any;
  isAutoSearchAll: Boolean;
  onClose: Function;
}

export function StoreSelectPopup(props: StoreSelectPopupProps) {
  const screens = useBreakpoint();
  const selectStore = useSetRecoilState(selectStoreState);

  const { state, setState } = useComboState({
    loading: false,
    searchText: '',
    storeList: [],
    isLast: false,
    isShowStoreList: false,
    isRequiredInput: false,
  });

  const fetchStores = async ({ isSearch = false, searchText }) => {
    try {
      setState({ loading: true });
      const response = await getOrganizations({
        page: isSearch ? 1 : Math.floor(state.storeList.length / 10) + 1,
        take: 10,
        include: { operatingHour: true },
        where: {
          type: 'servicecentre',
          isActive: true,
          OR: [
            {
              suburb: {
                contains: searchText.trim(),
                mode: 'insensitive',
              },
            },
            {
              postCode: {
                contains: searchText.trim(),
                mode: 'insensitive',
              },
            },
          ],
        },
      });

      const storeList = isSearch
        ? response.items
        : state.storeList.concat(response.items);

      setState({
        storeList,
        isLast: storeList.length == response.total,
        loading: false,
      });
    } catch (e) {
      setState({
        loading: false,
      });
      console.log(e);
    }
  };

  const onSearch = (value) => {
    if (value == '') {
      setState({ isRequiredInput: true });
      return;
    }
    setState({
      isShowStoreList: true,
      searchText: value,
      storeList: [],
    });
    fetchStores({ isSearch: true, searchText: value });
  };

  const onLoadMore = useCallback(() => {
    if (!state.isLast && !state.loading)
      fetchStores({
        searchText: state.searchText,
      });
  }, [state.loading, state.isLast]);

  const onGotoBasicStoreSelect = (e) => {
    e.stopPropagation();
    setState({
      storeList: [],
      isLast: false,
      searchText: '',
      isShowStoreList: false,
      isRequiredInput: false,
    });
  };

  const onShowAllStoreList = (e) => {
    e.stopPropagation();
    setState({
      storeList: [],
      isLast: false,
      searchText: '',
      isShowStoreList: true,
    });
    fetchStores({ searchText: '' });
  };

  const setCurrentLocation = async () => {
    // *** 26 Aug 2021
    // *** TODO: will integrate with ticket https://siliconstack.atlassian.net/browse/MSRV-200
    // Currently, just use first item or dummy data
    const response = await getOrganizations({
      where: {
        type: 'servicecentre',
        isActive: true,
      },
    });
    const currentLocation = response.items ? response.items[0] : {};
    selectStore(currentLocation);

    setDefaultTimezone(currentLocation?.timezone);
  };

  const onClickCurrentLocation = (e) => {
    props.onClose();
    setTimeout(setCurrentLocation, 100);
  };

  useEffect(() => {
    if (props.isAutoSearchAll) {
      setState({
        isShowStoreList: true,
        storeList: [],
      });
      fetchStores({ searchText: '' });
    }
  }, [props.isAutoSearchAll]);

  return (
    <>
      <Row id="store-select-popup">
        {state.isShowStoreList && (
          <Row className="back-button">
            <Button
              size="small"
              icon={<ArrowLeftOutlined style={{ color: 'gray' }} />}
              onClick={onGotoBasicStoreSelect}
              ghost
            ></Button>
          </Row>
        )}
        <FormItem
          className="search-input"
          validateStatus={state.isRequiredInput ? 'error' : 'success'}
          help={state.isRequiredInput && 'You must enter data to search'}
        >
          <Search
            placeholder="Enter Suburb or Postcode"
            value={state.searchText}
            onChange={(e) =>
              setState({ searchText: e.target.value, isRequiredInput: false })
            }
            onSearch={onSearch}
            enterButton
            size="large"
            autoFocus
            maxLength={50}
            loading={state.loading}
          />
        </FormItem>
        {state.isShowStoreList ? (
          <StoreSelectList
            storeList={state.storeList}
            onLoadMore={onLoadMore}
            loading={state.loading}
            onClose={props.onClose}
          />
        ) : (
          <Space
            direction="horizontal"
            className="group-function-button"
            size={screens['xs'] ? 'small' : 'middle'}
            wrap={true}
          >
            <Button
              className="button"
              shape="round"
              icon={<AimOutlined style={{ color: '#04BAE0' }} />}
              style={{ width: screens['xs'] ? 180 : 200 }}
              onClick={onClickCurrentLocation}
            >
              Use Current Location
            </Button>
            <Button
              className="button"
              shape="round"
              style={{ width: screens['xs'] ? 110 : 152 }}
              onClick={onShowAllStoreList}
            >
              View all stores
            </Button>
          </Space>
        )}
      </Row>

      <style jsx global>{`
        #store-select-popup {
          width: ${screens['xs'] ? 'unset' : '400px'};
          font-family: Arial;
        }
        #store-select-popup .back-button {
          padding: 16px 16px 0;
        }
        #store-select-popup .search-input {
          width: 100%;
          margin: 0;
          padding: 16px;
        }
        #store-select-popup .group-function-button {
          width: 100%;
          padding: 0 16px 16px;
          justify-content: space-between;
        }
        #store-select-popup .button {
          font-weight: bold;
          border: 0;
          box-shadow: 0px 2px 4px rgba(183, 183, 183, 0.5);
          padding: ${screens['xs'] ? '4px 4px' : '4px 16px'};
        }
      `}</style>
    </>
  );
}

export default StoreSelectPopup;
