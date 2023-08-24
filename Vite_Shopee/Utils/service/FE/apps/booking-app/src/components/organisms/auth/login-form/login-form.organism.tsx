import React from 'react';

import loginApi from '@ss-fe-fw/booking/api/auth/login';
import { validateMessages } from '@ss-fe-fw/booking/constants';
import { emailValidator } from '@ss-fe-fw/shared/ui';
import { userState } from '@ss-fe-fw/booking/stores';
import {
  Form,
  Input,
  Checkbox,
  Button,
  Typography,
  Divider,
  Row,
  Col,
  notification,
} from 'antd';

// Import from next
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useSetRecoilState } from 'recoil';

import {
  FacebookButton,
  FormPrimaryButton,
  GoogleButton,
} from '@ss-fe-fw/booking/atoms';
import useComboState from '@ss-fe-fw/booking/hooks/use-combo-state';
const { Text, Link } = Typography;

/* eslint-disable-next-line */
export interface OGLoginFormProps {
  children?: any;
}

export function OGLoginForm(props: OGLoginFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();
  const setUserState = useSetRecoilState(userState);
  const [, setCookie] = useCookies(['Refresh']);

  const { state, setState } = useComboState({ isValidatedForm: false });

  const signInSuccess = (userResult) => {
    localStorage.setItem('accessToken', userResult.accessToken);
    localStorage.setItem('refreshToken', userResult.refreshToken);
    setCookie('Refresh', userResult.refreshToken, { path: '/' });
    router.push('/');
  };

  const handleFinish = async (values) => {
    try {
      const userResult = await loginApi({
        email: values.email,
        password: values.password,
      });

      if (userResult.accessToken) {
        signInSuccess(userResult);
        setUserState(userResult);
        notification.success({ message: 'Login Successfully' });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleValuesChange = async (changedValue, allValues) => {
    const { email, password } = allValues;
    if (email && password) {
      setState({ isValidatedForm: true });
      return;
    }
    if (state.isValidatedForm) {
      setState({ isValidatedForm: false });
    }
  };

  return (
    <>
      <Text className="login-title">LOGIN TO YOUR ACCOUNT</Text>

      <Form
        form={form}
        layout="vertical"
        className="form"
        validateMessages={validateMessages}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true },
            {
              validator: async (rule, value, callback) => {
                return emailValidator(value);
              },
            },
          ]}
        >
          <Input
            autoFocus
            size="large"
            maxLength={50}
            placeholder="e.g. myemail@example.com"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password
            size="large"
            maxLength={20}
            placeholder="Enter your password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item noStyle>
            <Checkbox className="check" defaultChecked={true}>
              Remember me
            </Checkbox>
          </Form.Item>
          <Link href="/forgot-password" className="forgot-password">
            Forgot password?
          </Link>
        </Form.Item>
        <Form.Item>
          <FormPrimaryButton name="login" disabled={!state.isValidatedForm} />
        </Form.Item>

        <Divider className="divider">or login with</Divider>
        <Row gutter={[24, 24]}>
          <Col span={12} className="social-login-button">
            <GoogleButton style={{ height: '40px', width: '100%' }} />
          </Col>
          <Col span={12} className="social-login-button">
            <FacebookButton style={{ height: '40px', width: '100%' }} />
          </Col>
        </Row>
        <Row style={{ margin: '32px 0 0 0' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Text className="not-have-account">Don’t have an account?</Text>
            <Link href="/register" className="sign-up">
              Sign Up
            </Link>
          </Col>
        </Row>
      </Form>

      <style jsx global>{`
        .login-title {
          width: 354px;
          height: 30px;

          font-family: TT Commons;
          font-style: normal;
          font-weight: 900;
          font-size: 24px;
          line-height: 30px;

          color: #1d1655;
        }
        .form {
          width: 100%;
          margin: 24px 0 0 0;

          font-family: Arial;
          font-style: normal;
          font-weight: normal;
        }
        .form .check {
          color: #272f3e;
        }
        .form .ant-form-item-label > label {
          font-size: 14px;
          line-height: 22px;
          color: #272f3e;
        }
        .form .ant-form-item-label > label::before {
          display: none !important;
        }
        .form .forgot-password {
          font-size: 14px;
          line-height: 22px;

          float: right;
          text-align: right;
          text-decoration-line: underline;

          color: #1d1655;
        }
        .form .divider {
          font-family: Arial;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 22px;

          text-align: center;

          color: #afb4be;
        }
        .form .not-have-account {
          font-size: 16px;
          line-height: 24px;

          color: #1d1655;
        }
        .form .sign-up {
          margin-left: 8px;
          font-weight: bold;
          font-size: 16px;
          line-height: 24px;

          text-decoration-line: underline;

          color: #1d1655;
        }
        .form .social-login-button .ant-typography {
          font-weight: bold;
          color: #888e9c;
        }
      `}</style>
    </>
  );
}

export default OGLoginForm;
