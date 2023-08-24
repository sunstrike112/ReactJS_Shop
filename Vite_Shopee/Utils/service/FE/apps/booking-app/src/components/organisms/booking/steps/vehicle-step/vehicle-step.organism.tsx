// Import from antd
import React, { useEffect } from 'react';
import { Space, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { OGBasePageComponent } from '@ss-fe-fw/booking/organisms';
import useComboState from '@ss-fe-fw/booking/hooks/use-combo-state';

import { VehicleSearch } from './vehicle-search/vehicle-search.organism';
import VehicleSearchManual from './vehicle-search/vehicle-search-manual.organism';
import VehicleSearchConfirm from './vehicle-search/vehicle-search-confirm.organism';
import { getVehicleByRegoAndState } from '@ss-fe-fw/booking/api/vehicles/vehicles';
import {
  bookingStepState,
  bookingVehicleManualState,
  bookingVehicleState,
} from '@ss-fe-fw/booking/stores';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getStateOfCountry } from '@ss-fe-fw/booking/api/countries/contries';
import { BOOKING_STEPS } from 'apps/booking-app/src/constants/booking';

const { Text, Paragraph } = Typography;

/* eslint-disable-next-line */
interface VehicleStepProps {
  children?: any;
  style?: any;
}

export function VehicleStep(props: VehicleStepProps) {
  // responsive
  const screens = useBreakpoint();

  // state
  const { state, setState } = useComboState({
    isSearchByRego: true,
    isValidated: false,
    isFinding: false,
    isRequiredSearchAgain: false,

    message: '',
    statesList: [],
    vehiclesList: [],
  });

  // global states
  const [bookingVehicle, setBookingVehicle] = useRecoilState(
    bookingVehicleState
  );
  const setBookingStep = useSetRecoilState(bookingStepState);
  const setBookingVehicleManual = useSetRecoilState(bookingVehicleManualState);

  const onChangeSearchMethod = () => {
    const isConfirmSearchByRego = state.isSearchByRego && state.isValidated;
    const isSearchByRego = isConfirmSearchByRego ? true : !state.isSearchByRego;
    setBookingVehicle(null);
    setBookingVehicleManual(!isSearchByRego);
    setState({
      isSearchByRego: isSearchByRego,
      isValidated: false,
      message: '',
    });
  };

  const onHideMessage = () => setState({ message: '' });

  const onValidateForm = (validated) => setState({ isValidated: validated });

  const onFindCarByRego = async (rego: string, stateVehicle: string) => {
    try {
      setState({ isFinding: true });
      if (!state.isFinding) {
        const response = await getVehicleByRegoAndState({
          rego,
          state: stateVehicle,
        });
        if (response.items.length > 0) {
          setState({
            isValidated: true,
            vehiclesList: response.items.map((v) => ({ ...v, rego })),
          });
        } else {
          setState({
            isValidated: false,
            message: 'Vehicle Not Found',
          });
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setState({ isFinding: false });
    }
  };

  const fetchStateOfCountry = async () => {
    try {
      const response = await getStateOfCountry('AU');
      setState({ statesList: response.items });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchStateOfCountry();

    if (Boolean(bookingVehicle)) {
      setState({
        isSearchByRego: true,
        isValidated: true,
        vehiclesList: [bookingVehicle],
      });
    }

    // set current step
    setBookingStep(BOOKING_STEPS['VEHICLE']);
  }, []);

  // rendering
  return (
    <OGBasePageComponent>
      <Space direction="vertical" className="vehicle-select">
        {state.isSearchByRego ? (
          <>
            {state.isValidated ? (
              <>
                <Text className="title">CONFIRM YOUR VEHICLE</Text>
                <VehicleSearchConfirm vehiclesList={state.vehiclesList} />
              </>
            ) : (
              <>
                <Text className="title">SELECT YOUR VEHICLE</Text>
                <Text className="instruction">
                  Enter your registration number to quickly identify your car
                </Text>
                <VehicleSearch
                  statesList={state.statesList}
                  message={state.message}
                  isValidated={state.isValidated}
                  isFinding={state.isFinding}
                  onFindCarByRego={onFindCarByRego}
                  onHideMessage={onHideMessage}
                />
              </>
            )}
          </>
        ) : (
          <>
            <Text className="title">PLEASE ENTER YOUR CAR DETAILS</Text>
            <VehicleSearchManual
              statesList={state.statesList}
              onValidateForm={onValidateForm}
            />
          </>
        )}
      </Space>

      <Paragraph
        style={{ marginBottom: '120px', width: screens['xs'] ? '206px' : '' }}
      >
        {state.isSearchByRego && state.isValidated && (
          <Text
            className="other-find-option"
            style={{ fontWeight: 'normal', cursor: 'inherit' }}
          >
            That's not your car?{' '}
          </Text>
        )}
        <Text
          underline
          className="other-find-option"
          onClick={onChangeSearchMethod}
        >
          {state.isSearchByRego
            ? state.isValidated
              ? 'Search Again'
              : `Or find your car by make, model and year`
            : 'Search by Rego'}
        </Text>
        <RightOutlined style={{ color: '#04BAE0', paddingLeft: 8 }} />
      </Paragraph>

      <style jsx global>{`
        .vehicle-select {
          width: 100%;
        }
        .other-find-option {
          font-family: Arial;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 22px;

          color: #1d1655;
          cursor: pointer;
        }
        .vehicle-select .title {
          font-family: TT Commons;
          font-style: normal;
          font-weight: 900;
          font-size: 24px;
          line-height: 30px;

          color: #1d1655;
        }
        .vehicle-select .instruction {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;

          color: #888e9c;
        }
        .rego-input {
          text-transform: uppercase;
        }
      `}</style>
    </OGBasePageComponent>
  );
}

export default VehicleStep;
