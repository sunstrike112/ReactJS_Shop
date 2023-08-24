import { LOGIN_SCREEN_STATE, validateMessages } from "@ss-fe-fw/constants";
import { serviceCentreState } from "@ss-fe-fw/stores";
import { Button, Form } from "antd";
import FormBuilder from "antd-form-builder";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AtomArrowButton } from '@ss-fe-fw/atoms'

/* eslint-disable-next-line */
export interface OGServiceCentreFormProps {
  setState: any,
  serviceCentres: any,
}

export function OGServiceCentreForm(props: OGServiceCentreFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [serviceCentreOptions, setServiceCentreOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setServiceCentre] = useRecoilState(serviceCentreState);

  useEffect(() => {
    const options = props.serviceCentres.map((item) => {
      return {
        value: item.id,
        label: item.name
      }
    });
    setServiceCentreOptions(options);
    setServiceCentre(options);

    // if (options && options[0]) {
    //   form.setFieldsValue({
    //     serviceCentre: options[0].value
    //   });
    // }
  }, [props.serviceCentres]);

  const meta = {
    columns: 4,
    formItemLayout: null,
    fields: [
      {
        key: 'serviceCentre',
        label: 'Store',
        widget: 'select',
        options: serviceCentreOptions,
        colSpan: 24,
        required: true,
        placeholder: isLoading ? 'Loading...' : 'Select Store...',
        disabled: isLoading,
      },
    ],
  };

  const handleFinish = useCallback((values) => {
    const serviceCentre = props.serviceCentres.find((item) => item.id === values.serviceCentre);
    localStorage.setItem('xOrganizationId', serviceCentre.id);
    return router.push('/');
  }, [props.serviceCentres]);

  const onBack = useCallback(() => {
    props.setState(LOGIN_SCREEN_STATE.INITIAL);
  }, []);

  return (
    <div className="box-form-login">
      <div className="box-form-login-back">
        <span onClick={onBack}>
          <AtomArrowButton color="#888E9C" href="/login" direction="left"/>
        </span>
        <p>Back to login</p>
      </div>
      <h3>Select Store</h3>
      <Form
        validateMessages={validateMessages}
        onFinish={handleFinish}
        style={{ marginTop: 40 }}
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <FormBuilder meta={meta} form={form} />
        <Form.Item style={{marginTop: 170, marginBottom: 0}}>
          <Button block htmlType="submit">Next</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default OGServiceCentreForm;
