// Import from antd
import { Space, Typography, Button, Input, Row, Select, Col } from 'antd';
import { CaretDownFilled, ArrowRightOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import useComboState from '@ss-fe-fw/booking/hooks/use-combo-state';
import Paragraph from 'antd/lib/typography/Paragraph';

const { Text } = Typography;
const { Option } = Select;

/* eslint-disable-next-line */
interface VehicleSearchProps {
  children?: any;
  statesList: any[];
  message: String;
  isValidated: Boolean;
  isFinding: Boolean;
  onFindCarByRego: Function;
  onHideMessage: Function;
}

export function VehicleSearch(props: VehicleSearchProps) {
  // responsive
  const screens = useBreakpoint();
  const { state, setState } = useComboState({ rego: '', stateVehicle: 'NSW' });

  const onChangeRego = (e) => {
    if (props.message) props.onHideMessage();
    setState({ rego: e.target.value });
  };

  const onChangeState = (value) => {
    if (props.message) props.onHideMessage();
    setState({ stateVehicle: value });
  };

  const onFindCarByRego = () => {
    props.onFindCarByRego(state.rego, state.stateVehicle);
  };

  const isDisableButton = Boolean(state.rego) && Boolean(state.stateVehicle);

  // rendering
  return (
    <>
      <Row className="vehicle-search-rego">
        <Space direction="horizontal" size={0} className="vehicle-search">
          <Row className="dropdown">
            <Select
              suffixIcon={<CaretDownFilled />}
              size="large"
              value={state.state}
              onChange={onChangeState}
              defaultValue="NSW"
            >
              {(props.statesList || []).map((state, i) => (
                <Option key={i} value={state.isoCode}>
                  {state.isoCode}
                </Option>
              ))}
            </Select>
          </Row>
          <Space style={{ padding: 6 }}>
            <Input
              name="rego"
              className="input rego-input"
              placeholder="Enter your rego"
              maxLength={20}
              onChange={onChangeRego}
            />
            {screens['xs'] ? (
              <Button
                type="primary"
                shape="circle"
                icon={<ArrowRightOutlined />}
                className="button"
                disabled={!isDisableButton}
                loading={Boolean(props.isFinding)}
                onClick={onFindCarByRego}
              ></Button>
            ) : (
              <Button
                type="primary"
                shape="round"
                className="button"
                disabled={!isDisableButton}
                loading={Boolean(props.isFinding)}
                onClick={onFindCarByRego}
              >
                FIND MY CAR
              </Button>
            )}
          </Space>
        </Space>
        <Col span={24} className="message">
          {props.message}
        </Col>
      </Row>

      <style jsx global>{`
        .vehicle-search-rego {
          font-family: Arial;
          margin: 32px 0 48px;
        }
        .vehicle-search-rego .message {
          color: #f5222d;
        }
        .vehicle-search {
          border: 1px solid #eaecef;
          box-sizing: border-box;
          border-radius: 0 21px 21px 0;
        }
        .vehicle-search .dropdown {
          width: 107px;
          background: #f9fafb;
          border-right: 1px solid #eaecef;
        }
        .vehicle-search .dropdown .ant-card-body {
          padding: 0px;
        }
        .vehicle-search .dropdown .ant-select-selector {
          align-items: center;
          width: 100%;
          background: transparent;
          border: 0;
          height: ${screens['xs'] ? '52px' : '46px'} !important;
          padding: ${screens['xs'] ? '6px 11px' : '3px 11px'} !important;
        }
        .vehicle-search .dropdown .ant-select {
          width: 100%;
        }
        .vehicle-search .ant-dropdown-trigger {
          padding: 14px;
          width: 100%;
          height: 100%;
          border: 0;
          box-shadow: none;
          background: transparent;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .vehicle-search .ant-dropdown-trigger:hover,
        .ant-dropdown-trigger:focus {
          color: inherit;
        }
        .vehicle-search .input {
          ${screens['xs'] ? 'width: 100%;' : 'width: 270px;'}
          border: none;
        }
        .vehicle-search .button {
          ${screens['xs'] && 'width: 40px;'}
          ${screens['xs'] && 'height: 40px;'}
          font-family: Arial;
          font-style: normal;
          font-weight: bold;
          font-size: 14px;
          line-height: 18px;
        }
      `}</style>
    </>
  );
}

export default VehicleSearch;
