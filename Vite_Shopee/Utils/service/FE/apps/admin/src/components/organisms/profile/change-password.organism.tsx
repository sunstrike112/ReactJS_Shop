import { changePasswordApi } from '@ss-fe-fw/api/auth/password';
import { validateMessages } from '@ss-fe-fw/constants';
import { confirmPassworddValidator } from '@ss-fe-fw/shared/ui';
import { userState } from '@ss-fe-fw/stores';
import { Button, Form, Space } from 'antd';
import FormBuilder from 'antd-form-builder';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import OGAuthenticationSetting from './authentication-setting.organism';

/* eslint-disable-next-line */
export interface OGChangePasswordProps {}

export function OGChangePassword(props: OGChangePasswordProps) {
  const [form] = Form.useForm();
  const [user] = useRecoilState(userState);
  const meta = {
    columns: 4,
    formItemLayout: null,
    fields: [
      {
        key: 'currentPassword',
        label: 'Current Password',
        placeholder: 'Enter your password',
        widget: 'password',
        colSpan: 2,
        required: true,
      },
      {
        key: 'hidden',
        colSpan: 2,
        render: () => (null)
      },
      {
        key: 'newPassword',
        label: 'New Password',
        placeholder: 'Enter your password',
        widget: 'password',
        colSpan: 2,
        required: true,
        // clear: 'left',
        onChange: () => {
          if (form.isFieldTouched('confirmNewPassword')) {
            form.validateFields(['confirmNewPassword'])
          }
        },

      },
      {
        key: 'confirmNewPassword',
        label: 'Confirm New Password',
        placeholder: 'Enter your password',
        widget: 'password',
        colSpan: 2,
        rules: [
          {
            validator: async (rule, value, callback) => {
              return confirmPassworddValidator(form.getFieldValue('newPassword'), value);
            },
          },
        ],
      },
    ],
  };

  const handleFinish = useCallback(async (values) => {
    await changePasswordApi({
      password: values.currentPassword,
      newPassword: values.newPassword,
    });
    form.resetFields();
  }, []);

  return (
    <div style={{ width: '80%' }} >
      <h2>Login Password</h2>
      <Form
        validateMessages={validateMessages}
        onFinish={handleFinish}
        style={{ marginTop: 10 }}
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <FormBuilder meta={meta} form={form} />
        <Form.Item style={{ textAlign: 'right' }}>
        <Space align="end">
          <Button type="primary" htmlType="submit">Save</Button>
        </Space>
        </Form.Item>
      </Form>
      <OGAuthenticationSetting />
    </div>
  );
}

export default OGChangePassword;
