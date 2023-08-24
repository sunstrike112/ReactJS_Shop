import { resetPasswordApi } from "@ss-fe-fw/api/auth/password";
import { validateMessages } from "@ss-fe-fw/constants";
import { confirmPassworddValidator, formValidator } from "@ss-fe-fw/shared/ui";
import { Button, Form } from "antd";
import FormBuilder from "antd-form-builder";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { AtomArrowButton } from '@ss-fe-fw/atoms'
import { debounce } from 'lodash'

/* eslint-disable-next-line */
export interface OGResetPasswordFormProps { }

export function OGResetPasswordForm(props: OGResetPasswordFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [formInvalid, setFormInvalid] = useState(true)

  // TODO: validate confirm password
  const meta = {
    columns: 4,
    formItemLayout: null,
    fields: [
      {
        key: 'newPassword', label: 'New Password', placeholder: 'Enter your password', widget: 'password',
        colSpan: 24, required: true,
        rules: [
          {
            max: 20, message: `Maximum of password should be 20 characters`
          }
        ],
        onChange: () => {
          if (form.isFieldTouched('confirmNewPassword')) {
            form.validateFields(['confirmNewPassword'])
          }
        },
      },
      {
        key: 'confirmNewPassword', label: 'Confirm New Password', placeholder: 'Enter your password', widget: 'password',
        colSpan: 24,
        rules: [
          {
            max: 20, message: `Maximum of password should be 20 characters`
          },
          {
            validator: async (rule, value, callback) => {
              return confirmPassworddValidator(form.getFieldValue('newPassword'), value);
            },
          },
        ],
      },
    ],
  };

  const handleValuesChange = debounce(() => {
    if (form.getFieldValue('confirmNewPassword') == undefined) {
      setFormInvalid(true)
    } else {
      setTimeout(() => {
        setFormInvalid(formValidator(form))
      }, 0)
    }
  }, 500)


  const onBack = useCallback(() => {
    router.push('/login');
  }, []);

  const handleFinish = useCallback(async (values) => {
    if (!router.query || !router.query.token) {
      return;
    }
    await resetPasswordApi({ newPassword: values.newPassword, token: router.query.token });
    onBack();
  }, []);

  return (
    <>
      <div className="box-form-login">
        <div className="box-form-login-back">
          <AtomArrowButton color="#888E9C" href="/login" direction="left" />
          <p>Back to login</p>
        </div>
        <h3>Reset Password</h3>
        <p>Please enter your new password below</p>
        <Form
          onValuesChange={handleValuesChange}
          validateMessages={validateMessages}
          onFinish={handleFinish}
          style={{ marginTop: 40 }}
          form={form}
          layout="vertical"
          requiredMark={false}
        >
          <FormBuilder meta={meta} form={form} />
          <Form.Item style={{ marginTop: 50, marginBottom: 0 }}>
            <Button block htmlType="submit" disabled={formInvalid}>Save</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default OGResetPasswordForm;
