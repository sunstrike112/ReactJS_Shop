// Import from antd
import { Card, Space, Row, Col, Typography, Popover } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import {
  IconButton,
  TruckIcon,
  SendIcon,
  UserIcon,
} from '@ss-fe-fw/booking/atoms';
import { StoreSelect } from './store-select.organism';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { bookingVehicleState, userState } from '@ss-fe-fw/booking/stores';
import useComboState from '@ss-fe-fw/booking/hooks/use-combo-state';
import { useRouter } from 'next/router';

const { Text } = Typography;

/* eslint-disable-next-line */
export interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  const screens = useBreakpoint();
  const router = useRouter();
  const bookingVehicle = useRecoilValue(bookingVehicleState);
  const userProfile = useRecoilValue(userState);
  const resetUserState = useResetRecoilState(userState);
  const selectedVehicle = Boolean(bookingVehicle);

  const { state, setState } = useComboState({ isOpenPopup: false });

  const handleClickProfile = (e) => {
    if (userProfile) {
      //TODO: Go to profile page
    } else {
      router.push('/login');
    }
  };

  const handleLogout = () => {
    resetUserState();
    router.push('/login');
  };

  return (
    <>
      <Card className="nav">
        <Row align="middle">
          <Col xs={18} md={12}>
            <StoreSelect />
          </Col>
          <Col xs={6} md={12}>
            <Space direction="horizontal" style={{ float: 'right' }}>
              {!screens['xs'] && (
                <IconButton
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 40,
                    background: '#EAECEF',
                  }}
                >
                  <SendIcon />
                </IconButton>
              )}
              {!screens['xs'] && (
                <IconButton
                  style={{
                    width: selectedVehicle ? '' : 44,
                    height: 44,
                    borderRadius: 40,
                    background: '#EAECEF',
                    padding: Boolean(bookingVehicle) ? '0 10px' : '',
                  }}
                >
                  <TruckIcon />
                  {Boolean(bookingVehicle) && (
                    <Text
                      strong={true}
                      style={{
                        fontSize: 16,
                        color: '#1D1655',
                        paddingLeft: 8,
                        textTransform: 'uppercase',
                      }}
                    >
                      {bookingVehicle.rego}
                    </Text>
                  )}
                </IconButton>
              )}
              <Popover
                placement="bottomRight"
                content={
                  <Space
                    direction="vertical"
                    size={24}
                    style={{ width: 190, padding: 32, fontFamily: 'Arial' }}
                  >
                    <Text style={{ color: '#272F3E', cursor: 'pointer' }}>
                      View Profile
                    </Text>

                    <Text
                      style={{ color: '#272F3E', cursor: 'pointer' }}
                      onClick={handleLogout}
                    >
                      Log out
                    </Text>
                  </Space>
                }
                trigger="click"
              >
                <IconButton
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 40,
                    background: '#EAECEF',
                  }}
                  onClick={handleClickProfile}
                >
                  {userProfile ? (
                    <Text
                      strong={true}
                      style={{
                        fontSize: 16,
                        color: '#1D1655',
                        textTransform: 'uppercase',
                      }}
                    >
                      {userProfile.firstName[0] + userProfile.lastName[0]}
                    </Text>
                  ) : (
                    <UserIcon />
                  )}
                </IconButton>
              </Popover>

              {screens['xs'] && (
                <Popover
                  placement="bottom"
                  content={
                    <Space
                      direction="vertical"
                      style={{ padding: 16, fontFamily: 'Arial' }}
                    >
                      <Space direction="horizontal">
                        <IconButton
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 40,
                            background: '#EAECEF',
                          }}
                        >
                          <TruckIcon />
                        </IconButton>
                        <Text
                          strong={true}
                          style={{
                            color: '#1D1655',
                            textTransform: 'uppercase',
                          }}
                        >
                          {bookingVehicle ? bookingVehicle.rego : ''}
                        </Text>
                      </Space>
                      <Space direction="horizontal">
                        <IconButton
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 40,
                            background: '#EAECEF',
                          }}
                        >
                          <SendIcon />
                        </IconButton>
                        <Text style={{ color: '#272F3E' }}>
                          General Enquiry
                        </Text>
                      </Space>
                    </Space>
                  }
                  trigger="click"
                  visible={state.isOpenPopup}
                  onVisibleChange={(value) => setState({ isOpenPopup: value })}
                >
                  <IconButton
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 40,
                      background: '#EAECEF',
                    }}
                  >
                    <MenuOutlined
                      style={{ fontSize: '150%' }}
                      onClick={() =>
                        setState({ isOpenPopup: !state.isOpenPopup })
                      }
                    />
                  </IconButton>
                </Popover>
              )}
            </Space>
          </Col>
        </Row>
      </Card>
      <style jsx global>{`
        .nav {
          width: 100%;
          background: #f9fafb;
          border-radius: 40px;
        }
        .nav > .ant-card-body {
          font-family: Arial;
          padding: 8px;
        }
        .nav .icon-button {
          cursor: pointer;
        }
        .nav .icon-button:hover {
          background: #e4faff !important;
        }
      `}</style>
    </>
  );
}

export default Navigation;
