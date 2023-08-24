import { login2FAApi } from "@ss-fe-fw/api/auth/two-factor";
import { LOGIN_SCREEN_STATE, validateMessages } from "@ss-fe-fw/constants";
import { Button, Form } from "antd";
import FormBuilder from "antd-form-builder";
import { useCallback } from "react";
import { AtomArrowButton } from '@ss-fe-fw/atoms'

/* eslint-disable-next-line */
export interface OGVerificationCodeFormProps {
  setState: any,
  signInSuccess: any,
}

export function OGVerificationCodeForm(props: OGVerificationCodeFormProps) {
  const [form] = Form.useForm();

  const meta = {
    columns: 4,
    formItemLayout: null,
    fields: [
      {
        key: 'verificationCode',
        label: 'Verification code',
        placeholder: 'Enter your verification code',
        colSpan: 24,
        required: true
      },
    ],
  };

  const handleFinish = useCallback(async (values) => {
    const userResult = await login2FAApi({twoFactorAuthenticationCode: values.verificationCode});
    props.signInSuccess(userResult);
  }, []);

  const onBack = useCallback(() => {
    props.setState(LOGIN_SCREEN_STATE.INITIAL);
  }, []);

  return (
    <div className="box-form-login">
      <div className="box-form-login-back">
        <AtomArrowButton color="#888E9C" href="/login" direction="left"/>
        <p>Back to login</p>
      </div>
      <h3>Enter Your Verification Code</h3>
      <p>Please enter the code from your Authenticator App and then click the Verify button to begin.</p>
      <Form
        validateMessages={validateMessages}
        onFinish={handleFinish}
        style={{ marginTop: 40 }}
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <FormBuilder meta={meta} form={form} />
        <Form.Item style={{marginTop: 66, marginBottom: 0}}>
          <Button block htmlType="submit">Verify</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default OGVerificationCodeForm;
