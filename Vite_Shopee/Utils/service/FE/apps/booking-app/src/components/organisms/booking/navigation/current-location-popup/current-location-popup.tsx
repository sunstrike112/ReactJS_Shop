// Import from antd
import { Space, Typography, Button, Row, Col } from 'antd';
import {
  AimOutlined,
  PhoneFilled,
  RightOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { storeState, selectStoreState } from '@ss-fe-fw/booking/stores';

const { Text } = Typography;

import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { dayOfWeek } from '@ss-fe-fw/booking/constants';
import useComboState from '@ss-fe-fw/booking/hooks/use-combo-state';

export interface CurrentLocationPopupProps {
  onClose: Function;
  onBack: Function;
}

export function CurrentLocationPopup(props: CurrentLocationPopupProps) {
  const screens = useBreakpoint();
  const selectedStore = useRecoilValue(storeState);
  const selectStore = useSetRecoilState(selectStoreState);
  const { state, setState } = useComboState({
    isShowOpeningHours: false,
  });
  const openingHours = (selectedStore.operatingHour || {}).schedule || [];

  const onGotoBasicStoreSelect = (e) => {
    e.stopPropagation();
    props.onBack();
  };

  const onShowOpeningHours = () =>
    setState({ isShowOpeningHours: !state.isShowOpeningHours });

  return (
    <>
      <Row className="current-location-popup">
        <Row className="section">
          <Text className="main-title">{selectedStore.name}</Text>
          <Col className="description">
            <AimOutlined />
            <Text>{`${selectedStore.addressLine1}, ${selectedStore.suburb} ${selectedStore.state} ${selectedStore.postCode}`}</Text>
          </Col>
          <Col className="description">
            <PhoneFilled />
            <Text>{selectedStore.contactPhoneNumber}</Text>
          </Col>
        </Row>

        <Space className="section" direction="horizontal" size="middle">
          <Button className="button" shape="round">
            Get Directions
          </Button>
          <Button
            className="button"
            shape="round"
            href={`tel:${selectedStore.contactPhoneNumber}`}
          >
            Call Now
          </Button>
        </Space>

        <Row
          className="section"
          style={{ width: '100%', height: 90, background: '#f3f3f3' }}
        ></Row>

        <Row className="section">
          <Row align="middle" onClick={onShowOpeningHours}>
            <Text className="title" strong={true}>
              Opening Hours
            </Text>
            {screens['xs'] && (
              <>
                {state.isShowOpeningHours ? (
                  <DownOutlined className="expand-icon" />
                ) : (
                  <RightOutlined className="expand-icon" />
                )}
              </>
            )}
          </Row>
          <Row
            gutter={{ xs: 0, md: 22 }}
            className="hours-schedule"
            style={{
              maxHeight: `${
                screens['xs'] && !state.isShowOpeningHours ? '0' : '154px'
              }`,
            }}
          >
            <Col xs={24} md={12}>
              {openingHours.slice(0, 4).map((time, i) => (
                <Row key={time.dayOfWeek} justify="space-between">
                  <Text>{dayOfWeek[time.dayOfWeek - 1]}</Text>
                  <Text>
                    {time.isClose
                      ? 'Closed'
                      : `${time.startTime} - ${time.endTime}`}
                  </Text>
                </Row>
              ))}
            </Col>

            <Col xs={24} md={12}>
              {openingHours.slice(4, 7).map((time, i) => (
                <Row key={time.dayOfWeek} justify="space-between">
                  <Text>{dayOfWeek[time.dayOfWeek - 1]}</Text>
                  <Text>
                    {time.isClose
                      ? 'Closed'
                      : `${time.startTime} - ${time.endTime}`}
                  </Text>
                </Row>
              ))}
            </Col>
          </Row>
        </Row>

        <Button
          type="primary"
          shape="round"
          className="main-button"
          onClick={onGotoBasicStoreSelect}
        >
          Change Store
        </Button>
      </Row>

      <style jsx global>{`
        .current-location-popup {
          width: ${screens['xs'] ? 'unset' : '400px'};
          font-family: Arial;
          background: white;
          box-shadow: 0px 6px 24px rgba(183, 183, 183, 0.5);
          border-radius: 0 0 8px 8px;
          padding: 16px;
          box-sizing: border-box;
          z-index: 1;
        }
        .current-location-popup .button {
          font-weight: bold;
          border: 0;
          box-shadow: 0px 2px 4px rgba(183, 183, 183, 0.5);
        }
        .current-location-popup .section {
          margin-bottom: 16px;
        }
        .current-location-popup .description {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #888e9c;
        }
        .current-location-popup .main-button {
          width: 100%;
          height: 40px;
          border: none;
          text-transform: uppercase;
          font-weight: bold;
        }
        .current-location-popup .hours-schedule {
          width: 100%;
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.2s ease-out;
        }
        .current-location-popup .main-title {
          font-size: 20px;
          font-weight: bold;
          line-height: 28px;
          color: #1d1655;
          margin-bottom: 8px;
        }
        .current-location-popup .title {
          font-size: 14px;
          color: #1d1655;
          padding-bottom: 4px;
        }
        .current-location-popup .hours-schedule .ant-typography {
          font-size: 12px;
          color: #888e9c;
          line-height: 22px;
        }
        .current-location-popup .ant-row {
          margin-right: 0 !important;
          margin-left: 0 !important;
        }
        .current-location-popup .ant-col:first-child {
          padding-left: 0 !important;
        }
        .current-location-popup .ant-col:last-child {
          padding-right: 0 !important;
        }
        .current-location-popup .expand-icon {
          padding: 0 0 4px 4px;
        }
      `}</style>
    </>
  );
}

export default CurrentLocationPopup;
