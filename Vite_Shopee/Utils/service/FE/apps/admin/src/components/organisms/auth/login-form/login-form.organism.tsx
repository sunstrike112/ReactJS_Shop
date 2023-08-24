/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
// Import from local
import loginApi from '@ss-fe-fw/api/auth/login';
import { validateMessages } from '@ss-fe-fw/constants';
import { emailValidator } from '@ss-fe-fw/shared/ui';
import { userState } from '@ss-fe-fw/stores';
import { Button, Checkbox, Form } from 'antd';
import FormBuilder from 'antd-form-builder';
// Import from next
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
// Import from store
import {
  useResetRecoilState
} from 'recoil';

/* eslint-disable-next-line */
export interface OGLoginFormProps {
  setState: any,
  signInSuccess: any,
}

export function OGLoginForm(props: OGLoginFormProps) {
  const [form] = Form.useForm()
  const router = useRouter()
  const resetUserState = useResetRecoilState(userState);
  const [, setCookie] = useCookies(['Refresh']);

  const meta = {
    columns: 4,
    formItemLayout: null,
    fields: [
      {
        key: 'email', label: 'Email', placeholder: 'Enter your email', colSpan: 24, required: true,
        rules: [
          {
            validator: async (rule, value, callback) => {
              return emailValidator(value)
            }
          }
        ]
      },
      {
        key: 'password', label: 'Password', placeholder: 'Enter your password', widget: 'password',
        colSpan: 24, required: true
      },
    ],
  };

  const handleFinish = React.useCallback(async values => {
    const userResult = await loginApi({
      email: values.email,
      password: values.password
    });
    props.signInSuccess(userResult);
  }, [])

  useEffect(() => {
    resetUserState();
  }, [])

  return (
    <div className="box-form-login">
      <h3>Welcome back</h3>
      <p>Please enter your details to sign in</p>
      <Form
        validateMessages={validateMessages}
        onFinish={handleFinish}
        style={{ marginTop: 40 }}
        form={form}
        layout="vertical"
        initialValues={{ remember: true }}
        requiredMark={false}
      >
        <FormBuilder meta={meta} form={form} />
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember my credentials</Checkbox>
          </Form.Item>
          <Link href="/forgot-password">
            <a className="login-form-forgot">Forgot Password?</a>
          </Link>
        </Form.Item>
        <Form.Item style={{marginTop: 50, marginBottom: 0}}>
          <Button block htmlType="submit">Sign In</Button>
        </Form.Item>
      </Form>
      <style jsx global>{`
        .login-form-forgot {
          float: right;
        }
      `}
      </style>
    </div>
  );
}

export default OGLoginForm;
