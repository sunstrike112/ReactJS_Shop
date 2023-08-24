import React, { useRef } from 'react';
import debounce from 'lodash.debounce';

import registerApi from '@ss-fe-fw/booking/api/auth/register';
import {
  PRIVACY_POLICY_URL,
  validateMessages,
} from '@ss-fe-fw/booking/constants';
import {
  emailValidator,
  requiredValidator,
  passwordValidator,
  phoneNumberValidator,
} from '@ss-fe-fw/shared/ui';
import {
  Form,
  Input,
  Button,
  Typography,
  Divider,
  Row,
  Col,
  notification,
} from 'antd';

// Import from next
import { useRouter } from 'next/router';

import {
  GoogleButton,
  FacebookButton,
  FormPrimaryButton,
} from '@ss-fe-fw/booking/atoms';
import useComboState from '@ss-fe-fw/booking/hooks/use-combo-state';
const { Text, Link } = Typography;

/* eslint-disable-next-line */
export interface OGRegisterFormProps {
  children?: any;
}

export function OGRegisterForm(props: OGRegisterFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();
  const emailInput = useRef(null);

  const { state, setState } = useComboState({
    isValidatedForm: false,
    emailFieldError: '',
  });

  const handleFinish = async (values) => {
    try {
      if (!state.emailFieldError) {
        const userResult = await registerApi(values);
        if (!userResult.message) {
          router.push('/login');
        } else {
          if (emailInput.current) {
            emailInput.current.focus();
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleValuesChange = async (changedValue, allValues) => {
    const { firstName, lastName, email, password } = allValues;
    if (firstName && lastName && email && password) {
      setState({ isValidatedForm: true });
      return;
    }
    if (state.isValidatedForm) {
      setState({ isValidatedForm: false });
    }
  };

  const checkEmailField = (email) => {
    try {
      const emailFieldError = form.getFieldError('email');
      if (emailFieldError.length === 0) {
        // TODO: check existed email
        // if (email === 'tuan@example.com') {
        //   setState({
        //     emailFieldError: 'This Email is already existed. Please try again',
        //   });
        // } else {
        //   setState({ emailFieldError: '' });
        // }
        setState({ emailFieldError: '' });
        return;
      }
      setState({ emailFieldError: emailFieldError[0] });
    } catch (e) {
      console.log(e);
    }
  };

  const onTypeEmail = debounce((e) => {
    checkEmailField(e.target.value);
  }, 500);

  return (
    <>
      <Text className="register-title">SIGN UP TO MOTORSERVE</Text>

      <Form
        form={form}
        layout="vertical"
        className="form"
        validateMessages={validateMessages}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[
                {
                  required: true,
                  message: 'Your First name is required',
                },
              ]}
            >
              <Input size="large" maxLength={100} placeholder="John" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[
                {
                  required: true,
                  message: 'Your Last name is required',
                },
              ]}
            >
              <Input size="large" maxLength={100} placeholder="Doe" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Your Email is required' },
            {
              validator: async (rule, value, callback) => {
                return emailValidator(value);
              },
            },
          ]}
          validateStatus={state.emailFieldError ? 'error' : ''}
          help={state.emailFieldError ? state.emailFieldError : ' '}
        >
          <Input
            ref={emailInput}
            size="large"
            maxLength={50}
            placeholder="e.g. myemail@example.com"
            onChange={onTypeEmail}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              validator: async (rule, value, callback) => {
                return requiredValidator(value, 'password');
              },
            },
            {
              validator: async (rule, value, callback) => {
                return passwordValidator(value);
              },
            },
          ]}
        >
          <Input.Password
            size="large"
            maxLength={20}
            placeholder="Enter your password"
          />
        </Form.Item>
        <Form.Item
          label="Mobile Number"
          name="phoneNumber"
          rules={[
            {
              validator: async (rule, value, callback) => {
                return phoneNumberValidator(value);
              },
            },
          ]}
        >
          <Input size="large" maxLength={20} placeholder="e.g. 041234567" />
        </Form.Item>

        <Row style={{ marginBottom: 16 }}>
          <Text style={{ color: '#272F3E' }}>
            By clicking Sign Up, you have read and agreed to the
            <Link
              className="policy-link"
              href={PRIVACY_POLICY_URL}
              target="_blank"
            >
              Motorserve Privacy Policy.
            </Link>
          </Text>
        </Row>

        <Form.Item>
          <FormPrimaryButton name="sign up" disabled={!state.isValidatedForm} />
        </Form.Item>

        <Divider className="divider">or sign up with</Divider>
        <Row gutter={[24, 24]}>
          <Col span={12} className="social-sign-up-button">
            <GoogleButton style={{ height: '40px', width: '100%' }} />
          </Col>
          <Col span={12} className="social-sign-up-button">
            <FacebookButton style={{ height: '40px', width: '100%' }} />
          </Col>
        </Row>
        <Row style={{ margin: '32px 0 0 0' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Text className="already-have-account">
              Already have an account?
            </Text>
            <Link href="/login" className="login-link">
              Log in
            </Link>
          </Col>
        </Row>
      </Form>

      <style jsx global>{`
        .register-title {
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
        .form .already-have-account {
          font-size: 16px;
          line-height: 24px;

          color: #1d1655;
        }
        .form .policy-link {
          margin-left: 4px;
          text-decoration-line: underline;
          color: #272f3e;
        }
        .form .login-link {
          margin-left: 8px;
          font-weight: bold;
          font-size: 16px;
          line-height: 24px;

          text-decoration-line: underline;

          color: #1d1655;
        }
        .form .sign-up-button {
          font-weight: bold;
          font-size: 14px;
        }
        .form .social-sign-up-button .ant-typography {
          font-weight: bold;
          color: #888e9c;
        }
      `}</style>
    </>
  );
}

export default OGRegisterForm;
