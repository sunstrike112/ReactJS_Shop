// Import from antd
import { Typography, Form, Input, Select, Row, Col } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CaretDownFilled, LoadingOutlined } from '@ant-design/icons';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import useComboState from '@ss-fe-fw/booking/hooks/use-combo-state';
import { useEffect, useRef } from 'react';
import {
  getColorsOfVehicle,
  getMakesOfVehicle,
  getModelsOfVehicle,
  getVariantsOfVehicle,
  getVehicleManual,
  getYearsOfVehicle,
} from '@ss-fe-fw/booking/api/vehicles/vehicles';
import { bookingVehicleState } from '@ss-fe-fw/booking/stores';
import { useRecoilState } from 'recoil';

const { Text } = Typography;
const { Option } = Select;

/* eslint-disable-next-line */
interface VehicleSearchManualProps {
  children?: any;
  statesList: any[];
  onValidateForm: Function;
}

export function VehicleSearchManual(props: VehicleSearchManualProps) {
  // responsive
  const screens = useBreakpoint();
  const [form] = Form.useForm();

  const DEFAULT_VALUES = {
    registrationNumber: '',
    state: 'NSW',
    make: null,
    model: null,
    variant: null,
    transmission: null,
    year: null,
    cylinder: null,
    color: null,
  };

  // state
  const { state: comboState, setState } = useComboState({
    isValidatedRegoAndState: false,
    registrationNumber: '',
    state: 'NSW',
    makeOptions: [],
    modelOptions: [],
    variantOptions: [],
    yearOptions: [],
    transmissionOptions: [],
    cylinderOptions: [],
    colorOptions: [],
  });
  const { state: loadingState, setState: setLoadingState } = useComboState({});

  // global state
  const [bookingVehicle, setBookingVehicle] = useRecoilState(
    bookingVehicleState
  );

  const onValuesChange = (changedValues, allValues): void => {
    const {
      registrationNumber,
      state,
      make,
      model,
      variant,
      year,
      transmission,
      cylinder,
      color,
    } = allValues;
    if (registrationNumber && state && make && model) {
      setBookingVehicle({
        slId: comboState.slId,
        rego: registrationNumber,
        state,
        make,
        model,
        variant,
        year,
        transmission,
        cylinder,
        color,
      });
      props.onValidateForm(true);
    } else {
      setBookingVehicle(null);
      props.onValidateForm(false);
    }

    if ('registrationNumber' in changedValues || 'state' in changedValues) {
      if (registrationNumber && state) {
        const resetFields = { color: null };
        setState({ colorOptions: [] });
        form.setFieldsValue(resetFields);
        if (bookingVehicle) {
          setBookingVehicle({ ...bookingVehicle, ...resetFields });
        }
        fetchColorsOfVehicle(registrationNumber, state);
      }
    }

    if ('make' in changedValues) {
      const resetFields = {
        model: null,
        variant: null,
        year: null,
        transmission: null,
        cylinder: null,
      };
      setState({
        modelOptions: [],
        variantOptions: [],
        yearOptions: [],
        transmissionOptions: [],
        cylinderOptions: [],
      });
      form.setFieldsValue(resetFields);
      if (bookingVehicle) {
        setBookingVehicle(null);
      }
      fetchModelsOfVehicle(make);
      return;
    }
    if ('model' in changedValues) {
      const resetFields = {
        variant: null,
        year: null,
        transmission: null,
        cylinder: null,
      };
      setState({
        variantOptions: [],
        yearOptions: [],
        transmissionOptions: [],
        cylinderOptions: [],
      });
      form.setFieldsValue(resetFields);
      if (bookingVehicle) {
        setBookingVehicle({
          ...bookingVehicle,
          ...changedValues,
          ...resetFields,
        });
      }
      fetchVariantsOfVehicle(make, model);
      return;
    }
    if ('variant' in changedValues) {
      const resetFields = { year: null, transmission: null, cylinder: null };
      setState({
        yearOptions: [],
        transmissionOptions: [],
        cylinderOptions: [],
      });
      form.setFieldsValue(resetFields);
      if (bookingVehicle) {
        setBookingVehicle({
          ...bookingVehicle,
          ...changedValues,
          ...resetFields,
        });
      }
      fetchYearsOfVehicle(make, model, variant);
      return;
    }

    if (
      !('transmission' in changedValues) &&
      !('cylinder' in changedValues) &&
      !('color' in changedValues)
    ) {
      if (registrationNumber && state && make && model && year && variant) {
        const resetFields = { transmission: null, cylinder: null };
        const payload = {
          rego: registrationNumber,
          state,
          make,
          family: model,
          year: year.toString(),
          variant,
        };
        setState({ transmissionOptions: [], cylinderOptions: [] });
        form.setFieldsValue(resetFields);
        if (bookingVehicle) {
          setBookingVehicle({
            ...bookingVehicle,
            ...changedValues,
            ...resetFields,
          });
        }
        fetchTransmissionAndCylinder(payload);
      }
    }
  };

  const fetchTransmissionAndCylinder = async (payload): Promise<void> => {
    try {
      setLoadingState({ transmission: true, cylinder: true });
      const response = await getVehicleManual(payload);
      const rawData = response.items || [];
      if (rawData.length > 0) {
        const slId = response.items[0].slId;
        const transmissionOptions = rawData.map(
          (vehicle) => vehicle.transmission
        );
        const cylinderOptions = rawData.map((vehicle) => vehicle.cylinder);
        setState({ slId, transmissionOptions, cylinderOptions });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingState({ transmission: false, cylinder: false });
    }
  };

  const fetchColorsOfVehicle = async (
    rego: string,
    state: string
  ): Promise<void> => {
    try {
      setLoadingState({ color: true });
      const response = await getColorsOfVehicle({ rego, state });
      setState({ colorOptions: response.items || [] });
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingState({ color: false });
    }
  };

  const fetchModelsOfVehicle = async (make: string): Promise<void> => {
    try {
      setLoadingState({ model: true });
      const response = await getModelsOfVehicle({ make });
      setState({ modelOptions: response.items || [] });
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingState({ model: false });
    }
  };

  const fetchVariantsOfVehicle = async (
    make: string,
    family: string
  ): Promise<void> => {
    try {
      setLoadingState({ variant: true });
      const response = await getVariantsOfVehicle({ make, family });
      setState({ variantOptions: response.items || [] });
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingState({ variant: false });
    }
  };

  const fetchYearsOfVehicle = async (
    make: string,
    family: string,
    variant: string
  ): Promise<void> => {
    try {
      setLoadingState({ year: true });
      const response = await getYearsOfVehicle({ make, family, variant });
      setState({ yearOptions: response.items || [] });
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingState({ year: false });
    }
  };

  const fetchMakesOfVehicle = async (): Promise<void> => {
    try {
      setLoadingState({ make: true });
      const response = await getMakesOfVehicle();
      setState({ makeOptions: response.items || [] });
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingState({ make: false });
    }
  };

  const renderSelectField = (
    name: string,
    options: any[],
    dependency: string
  ) => (
    <Select
      showSearch
      suffixIcon={
        loadingState[name] ? <LoadingOutlined /> : <CaretDownFilled />
      }
      size="large"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >=
        0
      }
      // disabled={
      //   dependency ? !Boolean((comboState[dependency] || []).length) : false
      // }
    >
      {(options || []).map((option, i) => (
        <Option key={`${name}-${i}`} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );

  useEffect(() => {
    fetchMakesOfVehicle();
  }, []);

  // rendering
  return (
    <>
      <Form
        className="vehicle-search-manual"
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={DEFAULT_VALUES}
        form={form}
        onValuesChange={onValuesChange}
      >
        <Row gutter={24}>
          <Col span={16}>
            <Form.Item
              label="Registration Number"
              name="registrationNumber"
              rules={[
                {
                  required: true,
                  message: 'The Registration Number field is required!',
                },
              ]}
            >
              <Input size="large" className="rego-input" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="State" name="state" rules={[{ required: true }]}>
              {renderSelectField(
                'state',
                (props.statesList || []).map((state) => state.isoCode),
                ''
              )}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Make" name="make" rules={[{ required: true }]}>
          {renderSelectField('make', comboState.makeOptions, '')}
        </Form.Item>
        <Form.Item label="Model" name="model" rules={[{ required: true }]}>
          {renderSelectField('model', comboState.modelOptions, 'makeOptions')}
        </Form.Item>
        <Form.Item label="Variant" name="variant">
          {renderSelectField(
            'variant',
            comboState.variantOptions,
            'modelOptions'
          )}
        </Form.Item>
        <Form.Item label="Year" name="year">
          {renderSelectField('year', comboState.yearOptions, 'variantOptions')}
        </Form.Item>
        <Form.Item label="Transmission" name="transmission">
          {renderSelectField(
            'transmission',
            comboState.transmissionOptions,
            ''
          )}
        </Form.Item>
        <Form.Item label="Cylinder" name="cylinder">
          {renderSelectField('cylinder', comboState.cylinderOptions, '')}
        </Form.Item>
        <Form.Item label="Color" name="color">
          {renderSelectField('color', comboState.colorOptions, '')}
        </Form.Item>
      </Form>
      <style jsx global>{`
        .vehicle-search-manual {
          ${!screens['xs'] && 'width: 600px;'}
          margin: 32px 0;
          border-radius: 0 21px 21px 0;
        }
        .vehicle-search-manual .dropdown {
          width: 107px;
          padding: 16px 12px 16px 12px;
          background: #f9fafb;
          border-right: 1px solid #eaecef;
        }
        .vehicle-search-manual .dropdown .ant-card-body {
          padding: 0px;
        }
        .vehicle-search-manual .input {
          ${screens['xs'] ? 'width: 100%;' : 'width: 270px;'}
          border: none;
        }
        .vehicle-search-manual .button {
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

export default VehicleSearchManual;
